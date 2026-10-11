const mongoose = require('../utils/mongoose');

const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Advertisement title is required'], trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    link: { type: String, trim: true },
    position: { type: String, default: 'sidebar', trim: true },
    isPublished: { type: Boolean, default: true },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Advertisement', advertisementSchema);
