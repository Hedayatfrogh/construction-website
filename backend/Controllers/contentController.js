const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const ContentSection = require('../models/ContentSection');

const SECTION_NAME = /^[A-Za-z0-9_-]{1,64}$/;

exports.getAllContent = catchAsync(async (req, res, next) => {
  const rows = await ContentSection.find();
  const sections = {};
  rows.forEach((row) => {
    sections[row.name] = row.value;
  });
  res.status(200).json({
    status: 'success',
    data: { sections },
  });
});

exports.updateSection = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  if (!SECTION_NAME.test(name)) {
    return next(new AppError('Invalid section name', 400));
  }
  if (!req.body || !('value' in req.body)) {
    return next(new AppError('Request body must include "value"', 400));
  }

  const existing = await ContentSection.findOne({ name });
  const section = existing
    ? await ContentSection.findByIdAndUpdate(existing._id, { value: req.body.value })
    : await ContentSection.create({ name, value: req.body.value });

  res.status(200).json({
    status: 'success',
    data: { name: section.name, value: section.value },
  });
});

exports.deleteSection = catchAsync(async (req, res, next) => {
  await ContentSection.deleteMany({ name: req.params.name });
  res.status(204).json({ status: 'success', data: null });
});

exports.deleteAllContent = catchAsync(async (req, res, next) => {
  await ContentSection.deleteMany();
  res.status(204).json({ status: 'success', data: null });
});
