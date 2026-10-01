const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Province = require('../models/Province');

exports.getAllProvinces = catchAsync(async (req, res, next) => {
  const provinces = await Province.find({ isPublished: true });
  res.status(200).json({
    status: 'success',
    results: provinces.length,
    data: { provinces },
  });
});

exports.getProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findById(req.params.id);
  if (!province) {
    return next(new AppError('No province found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { province },
  });
});

exports.createProvince = catchAsync(async (req, res, next) => {
  const newProvince = await Province.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { province: newProvince },
  });
});

exports.updateProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!province) {
    return next(new AppError('No province found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { province },
  });
});

exports.deleteProvince = catchAsync(async (req, res, next) => {
  const province = await Province.findByIdAndDelete(req.params.id);
  if (!province) {
    return next(new AppError('No province found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
