const mongoose = require('../utils/mongoose');

const provinceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Province name is required'], unique: true, trim: true },
    code: { type: String, trim: true, uppercase: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Province', provinceSchema);
