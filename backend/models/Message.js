const mongoose = require('../utils/mongoose');

const messageSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'First name is required'], trim: true, maxlength: 100 },
    lastName: { type: String, default: '', trim: true, maxlength: 100 },
    company: { type: String, default: '', trim: true, maxlength: 150 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please provide a valid email.'],
    },
    phone: { type: String, default: '', trim: true, maxlength: 40 },
    subject: { type: String, default: '', trim: true, maxlength: 200 },
    description: { type: String, required: [true, 'Description is required'], trim: true, maxlength: 5000 },
    websiteId: {
      type: String,
      required: [true, 'Website ID is required'],
      enum: { values: ['spark_trust', 'azad_noori'], message: 'Invalid websiteId' },
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'contactMessages' },
);

messageSchema.index({ websiteId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
