const express = require('express');
const provinceController = require('../Controllers/provinceController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(provinceController.getAllProvinces)
  .post(authController.protect, authController.restrictTo('admin'), provinceController.createProvince);

router
  .route('/:id')
  .get(provinceController.getProvince)
  .patch(authController.protect, authController.restrictTo('admin'), provinceController.updateProvince)
  .delete(authController.protect, authController.restrictTo('admin'), provinceController.deleteProvince);

module.exports = router;
