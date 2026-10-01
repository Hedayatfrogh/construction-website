const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    websiteId: {
      type: String,
      required: [true, 'Website ID is required'],
      enum: {
        values: ['spark_trust', 'azad_noori'],
        message: 'Invalid websiteId',
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

messageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
