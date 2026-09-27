// routes/messageRoutes.js

const express = require('express')
const messageController = require('../Controllers/MessageController')
const authController = require('../Controllers/authController')

const router = express.Router()

// Create message — public access
router.post('/', messageController.createMessage)

// Get all messages for a website — admin only
router.get(
  '/:websiteId',
  authController.protect,
  messageController.getMessagesByWebsite
)

router.patch('/:id',authController.protect, messageController.updateMessage)

module.exports = router
