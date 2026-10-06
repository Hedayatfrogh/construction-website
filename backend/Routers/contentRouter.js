const express = require('express');
const contentController = require('../Controllers/contentController');
const authController = require('../Controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(contentController.getAllContent)
  .delete(authController.protect, authController.restrictTo('admin'), contentController.deleteAllContent);

router
  .route('/:name')
  .patch(authController.protect, authController.restrictTo('admin'), contentController.updateSection)
  .delete(authController.protect, authController.restrictTo('admin'), contentController.deleteSection);

module.exports = router;
