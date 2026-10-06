const defineModel = require('../utils/sqliteModel');

// One row per admin-panel content section (projects, teamMembers, settings, ...).
const ContentSection = defineModel('ContentSection', 'content_sections', {
  name: {
    type: 'string',
    required: 'Section name is required',
    unique: true,
    trim: true,
  },
  value: { type: 'json' },
});

module.exports = ContentSection;
