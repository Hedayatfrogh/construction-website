// routes/messageRoutes.js

const express = require('express')
const messageController = require('../Controllers/MessageController')
const authController = require('../Controllers/authController')

const router = express.Router()

// Create message — public access
const contactLimiter = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'fail', message: 'Too many messages. Please try again later.' },
})

router.post('/', contactLimiter, messageController.createMessage)

// Get all messages for a website — admin only
router.get(
  '/:websiteId',
  authController.protect,
  authController.restrictTo('admin'),
  messageController.getMessagesByWebsite
)

router.patch('/:id',authController.protect, authController.restrictTo('admin'), messageController.updateMessage)
router.delete('/:id', authController.protect, authController.restrictTo('admin'), messageController.deleteMessage)

module.exports = router
