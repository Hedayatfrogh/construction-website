const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Advertisement title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      default: 'sidebar',
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

advertisementSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;
