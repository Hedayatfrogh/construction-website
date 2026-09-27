const express = require('express');
const advertisementController = require('../Controllers/advertisementController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(advertisementController.getAllAdvertisements)
  .post(authController.protect, authController.restrictTo('admin'), advertisementController.createAdvertisement);

router
  .route('/:id')
  .get(advertisementController.getAdvertisement)
  .patch(authController.protect, authController.restrictTo('admin'), advertisementController.updateAdvertisement)
  .delete(authController.protect, authController.restrictTo('admin'), advertisementController.deleteAdvertisement);

module.exports = router;
