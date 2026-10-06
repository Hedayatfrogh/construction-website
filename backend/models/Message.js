const defineModel = require('../utils/sqliteModel');

const Message = defineModel('Message', 'messages', {
  firstName: {
    type: 'string',
    required: 'First name is required',
    trim: true,
  },
  lastName: { type: 'string', default: '', trim: true },
  company: { type: 'string', default: '', trim: true },
  email: {
    type: 'string',
    required: 'Email is required',
    trim: true,
    lowercase: true,
  },
  phone: { type: 'string', default: '', trim: true },
  description: {
    type: 'string',
    required: 'Description is required',
    trim: true,
  },
  websiteId: {
    type: 'string',
    required: 'Website ID is required',
    enum: {
      values: ['spark_trust', 'azad_noori'],
      message: 'Invalid websiteId',
    },
  },
  isRead: { type: 'boolean', default: false },
});

module.exports = Message;
