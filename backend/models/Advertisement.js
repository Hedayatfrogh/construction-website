const defineModel = require('../utils/sqliteModel');

const Advertisement = defineModel('Advertisement', 'advertisements', {
  title: {
    type: 'string',
    required: 'Advertisement title is required',
    trim: true,
  },
  description: { type: 'string', trim: true },
  image: { type: 'string', trim: true },
  link: { type: 'string', trim: true },
  position: { type: 'string', default: 'sidebar', trim: true },
  isPublished: { type: 'boolean', default: true },
  startDate: { type: 'date' },
  endDate: { type: 'date' },
});

module.exports = Advertisement;
