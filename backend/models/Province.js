const defineModel = require('../utils/sqliteModel');

const Province = defineModel('Province', 'provinces', {
  name: {
    type: 'string',
    required: 'Province name is required',
    unique: true,
    trim: true,
  },
  code: { type: 'string', trim: true, uppercase: true },
  description: { type: 'string', trim: true },
  image: { type: 'string', trim: true },
  isPublished: { type: 'boolean', default: true },
});

module.exports = Province;
