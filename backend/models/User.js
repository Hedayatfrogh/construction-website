const defineModel = require('../utils/sqliteModel');

const User = defineModel('User', 'users', {
  name: {
    type: 'string',
    required: 'Please tell us your name!',
    trim: true,
  },
  email: {
    type: 'string',
    required: 'Please provide your email!',
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: 'string',
    required: 'Please provide a password!',
    select: false,
  },
  role: {
    type: 'string',
    enum: ['user', 'admin'],
    default: 'admin',
  },
  tokenVersion: {
    type: 'string',
    default: '0',
  },
  is_active: {
    type: 'boolean',
    default: true,
  },
  is_super_admin: {
    type: 'boolean',
    default: false,
  },
});

module.exports = User;
