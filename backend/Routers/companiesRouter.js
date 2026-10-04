const express = require('express');
const companyController = require('../Controllers/companyController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(companyController.getAllCompanies)
  .post(authController.protect, authController.restrictTo('admin'), companyController.createCompany);

router
  .route('/:id')
  .get(companyController.getCompany)
  .patch(authController.protect, authController.restrictTo('admin'), companyController.updateCompany)
  .delete(authController.protect, authController.restrictTo('admin'), companyController.deleteCompany);

module.exports = router;
