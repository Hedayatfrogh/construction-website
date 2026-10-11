const crypto = require('crypto');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const ContentSection = require('../models/ContentSection');
const { Project, Service, Equipment, Client, TeamMember, BlogPost } = require('../models/SiteCollections');

const SECTION_NAME = /^[A-Za-z0-9_-]{1,64}$/;

// Admin list sections stored in their own MongoDB collections.
const COLLECTION_SECTIONS = {
  projects: Project,
  services: Service,
  equipmentCategories: Equipment,
  clients: Client,
  teamMembers: TeamMember,
  newsArticles: BlogPost,
};

const toItem = ({ _id, __v, itemId, order, ...rest }) => ({ ...rest, id: itemId });

const toDoc = (item, order, seen) => {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    throw new AppError('Each item must be an object.', 400);
  }
  const { id, _id, __v, itemId: _ignored, ...rest } = item;
  let itemId = String(id || item.slug || crypto.randomUUID()).slice(0, 200);
  if (seen.has(itemId)) itemId = `${itemId}-${order}`;
  seen.add(itemId);
  return { ...rest, itemId, order };
};

const listItems = (Model) => Model.find().sort({ order: 1, createdAt: -1 }).lean().then((docs) => docs.map(toItem));

// Replaces a collection's contents with the given ordered list.
const syncCollection = async (Model, list) => {
  const seen = new Set();
  const docs = list.map((item, index) => toDoc(item, index, seen));
  for (const doc of docs) {
    const error = new Model(doc).validateSync();
    if (error) throw new AppError(Object.values(error.errors)[0].message, 400);
  }
  if (docs.length) {
    await Model.bulkWrite(
      docs.map((doc) => ({
        replaceOne: { filter: { itemId: doc.itemId }, replacement: doc, upsert: true },
      })),
    );
  }
  await Model.deleteMany({ itemId: { $nin: docs.map((d) => d.itemId) } });
  return listItems(Model);
};

exports.COLLECTION_SECTIONS = COLLECTION_SECTIONS;
exports.syncCollection = syncCollection;
exports.toItem = toItem;

exports.getAllContent = catchAsync(async (req, res) => {
  const sections = {};
  (await ContentSection.find().lean()).forEach((row) => {
    sections[row.name] = row.value;
  });
  await Promise.all(
    Object.entries(COLLECTION_SECTIONS).map(async ([name, Model]) => {
      if (await Model.estimatedDocumentCount()) sections[name] = await listItems(Model);
    }),
  );
  res.status(200).json({ status: 'success', data: { sections } });
});

exports.updateSection = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  if (!SECTION_NAME.test(name)) {
    return next(new AppError('Invalid section name', 400));
  }
  if (!req.body || !('value' in req.body)) {
    return next(new AppError('Request body must include "value"', 400));
  }

  const Model = COLLECTION_SECTIONS[name];
  if (Model) {
    if (!Array.isArray(req.body.value)) {
      return next(new AppError(`"${name}" must be a list.`, 400));
    }
    const value = await syncCollection(Model, req.body.value);
    return res.status(200).json({ status: 'success', data: { name, value } });
  }

  const section = await ContentSection.findOneAndUpdate(
    { name },
    { name, value: req.body.value },
    { upsert: true },
  );
  res.status(200).json({
    status: 'success',
    data: { name: section.name, value: section.value },
  });
});

exports.deleteSection = catchAsync(async (req, res) => {
  const Model = COLLECTION_SECTIONS[req.params.name];
  if (Model) await Model.deleteMany({});
  else await ContentSection.deleteMany({ name: req.params.name });
  res.status(204).send();
});

exports.deleteAllContent = catchAsync(async (req, res) => {
  await Promise.all([
    ContentSection.deleteMany({}),
    ...Object.values(COLLECTION_SECTIONS).map((Model) => Model.deleteMany({})),
  ]);
  res.status(204).send();
});
