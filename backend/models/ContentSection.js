const mongoose = require('../utils/mongoose');

// One document per non-list admin section (company, about, settings, ...).
const contentSectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Section name is required'], unique: true, trim: true },
    value: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true, minimize: false, collection: 'siteSettings' },
);

module.exports = mongoose.model('ContentSection', contentSectionSchema);
