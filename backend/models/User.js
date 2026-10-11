const mongoose = require('../utils/mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please tell us your name!'], trim: true, maxlength: 150 },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email.'],
    },
    password: { type: String, required: [true, 'Please provide a password!'], select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'admin' },
    tokenVersion: { type: String, default: '0' },
    is_active: { type: Boolean, default: true },
    is_super_admin: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'admins' },
);

module.exports = mongoose.model('User', userSchema);
