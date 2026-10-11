const crypto = require('crypto');
const express = require('express');
const mongoose = require('../utils/mongoose');
const authController = require('../Controllers/authController');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const ContentSection = require('../models/ContentSection');
const { COLLECTION_SECTIONS, toItem } = require('../Controllers/contentController');

const ITEM_ID = /^[A-Za-z0-9_.:-]{1,200}$/;
const adminOnly = [authController.protect, authController.restrictTo('admin')];

const idFilter = (id) => {
  if (mongoose.isValidObjectId(id) && String(id).length === 24) {
    return { $or: [{ _id: id }, { itemId: id }] };
  }
  if (!ITEM_ID.test(id)) throw new AppError('Invalid ID.', 400);
  return { itemId: id };
};

const cleanBody = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new AppError('Request body must be an object.', 400);
  }
  const { _id, __v, id, itemId, order, createdAt, updatedAt, ...rest } = body;
  return rest;
};

// `?all=true` (including unpublished items) is admin-only.
const adminIfAll = (req, res, next) => {
  if (req.query.all !== 'true') return next();
  return authController.protect(req, res, (err) =>
    err ? next(err) : authController.restrictTo('admin')(req, res, next));
};

const buildRouter = (Model) => {
  const router = express.Router();

  router
    .route('/')
    .get(adminIfAll, catchAsync(async (req, res) => {
      const docs = await Model.find(req.user ? {} : { isPublished: { $ne: false } })
        .sort({ order: 1, createdAt: -1 })
        .lean();
      res.status(200).json({ status: 'success', results: docs.length, data: docs.map(toItem) });
    }))
    .post(...adminOnly, catchAsync(async (req, res) => {
      const first = await Model.findOne().sort({ order: 1 }).lean();
      const doc = await Model.create({
        ...cleanBody(req.body),
        itemId: crypto.randomUUID(),
        order: first ? first.order - 1 : 0,
      });
      res.status(201).json({ status: 'success', data: toItem(doc.toObject({ virtuals: false })) });
    }));

  router
    .route('/:id')
    .get(catchAsync(async (req, res, next) => {
      const doc = await Model.findOne(idFilter(req.params.id)).lean();
      if (!doc) return next(new AppError('Item not found.', 404));
      res.status(200).json({ status: 'success', data: toItem(doc) });
    }))
    .put(...adminOnly, catchAsync(async (req, res, next) => {
      const existing = await Model.findOne(idFilter(req.params.id)).lean();
      if (!existing) return next(new AppError('Item not found.', 404));
      const replacement = { ...cleanBody(req.body), itemId: existing.itemId, order: existing.order, createdAt: existing.createdAt };
      const error = new Model(replacement).validateSync();
      if (error) return next(new AppError(Object.values(error.errors)[0].message, 400));
      await Model.replaceOne({ _id: existing._id }, replacement);
      const doc = await Model.findById(existing._id).lean();
      res.status(200).json({ status: 'success', data: toItem(doc) });
    }))
    .patch(...adminOnly, catchAsync(async (req, res, next) => {
      const doc = await Model.findOneAndUpdate(idFilter(req.params.id), { $set: cleanBody(req.body) }).lean();
      if (!doc) return next(new AppError('Item not found.', 404));
      res.status(200).json({ status: 'success', data: toItem(doc) });
    }))
    .delete(...adminOnly, catchAsync(async (req, res, next) => {
      const doc = await Model.findOneAndDelete(idFilter(req.params.id));
      if (!doc) return next(new AppError('Item not found.', 404));
      res.status(204).send();
    }));

  return router;
};

const settingsRouter = express.Router();
settingsRouter
  .route('/')
  .get(catchAsync(async (_req, res) => {
    const doc = await ContentSection.findOne({ name: 'settings' }).lean();
    res.status(200).json({ status: 'success', data: doc ? doc.value : {} });
  }))
  .put(...adminOnly, catchAsync(async (req, res) => {
    const value = cleanBody(req.body);
    await ContentSection.findOneAndUpdate({ name: 'settings' }, { name: 'settings', value }, { upsert: true });
    res.status(200).json({ status: 'success', data: value });
  }));

module.exports = {
  projects: buildRouter(COLLECTION_SECTIONS.projects),
  services: buildRouter(COLLECTION_SECTIONS.services),
  equipment: buildRouter(COLLECTION_SECTIONS.equipmentCategories),
  clients: buildRouter(COLLECTION_SECTIONS.clients),
  team: buildRouter(COLLECTION_SECTIONS.teamMembers),
  blog: buildRouter(COLLECTION_SECTIONS.newsArticles),
  settings: settingsRouter,
};
