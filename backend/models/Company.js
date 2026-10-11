const mongoose = require('../utils/mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Company name is required'], trim: true },
    description: { type: String, trim: true },
    logo: { type: String, trim: true },
    website: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province' },
    address: { type: String, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Company', companySchema);
