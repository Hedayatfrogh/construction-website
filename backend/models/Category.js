const defineModel = require('../utils/sqliteModel');

const Category = defineModel('Category', 'categories', {
  name: {
    type: 'string',
    required: 'Category name is required',
    unique: true,
    trim: true,
  },
  slug: { type: 'string', lowercase: true, trim: true },
  description: { type: 'string', trim: true },
  image: { type: 'string', trim: true },
  isPublished: { type: 'boolean', default: true },
});

module.exports = Category;
