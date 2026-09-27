const express = require('express');
const categoryController = require('../Controllers/categoryController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(authController.protect, authController.restrictTo('admin'), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(authController.protect, authController.restrictTo('admin'), categoryController.updateCategory)
  .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory);

module.exports = router;
