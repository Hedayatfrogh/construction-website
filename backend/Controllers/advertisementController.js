const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Advertisement = require('../models/Advertisement');

exports.getAllAdvertisements = catchAsync(async (req, res, next) => {
  const ads = await Advertisement.find({ isPublished: true });
  res.status(200).json({
    status: 'success',
    results: ads.length,
    data: { advertisements: ads },
  });
});

exports.getAdvertisement = catchAsync(async (req, res, next) => {
  const ad = await Advertisement.findById(req.params.id);
  if (!ad) {
    return next(new AppError('No advertisement found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { advertisement: ad },
  });
});

exports.createAdvertisement = catchAsync(async (req, res, next) => {
  const newAd = await Advertisement.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { advertisement: newAd },
  });
});

exports.updateAdvertisement = catchAsync(async (req, res, next) => {
  const ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ad) {
    return next(new AppError('No advertisement found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { advertisement: ad },
  });
});

exports.deleteAdvertisement = catchAsync(async (req, res, next) => {
  const ad = await Advertisement.findByIdAndDelete(req.params.id);
  if (!ad) {
    return next(new AppError('No advertisement found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
