const defineModel = require('../utils/sqliteModel');

const Company = defineModel('Company', 'companies', {
  name: {
    type: 'string',
    required: 'Company name is required',
    trim: true,
  },
  description: { type: 'string', trim: true },
  logo: { type: 'string', trim: true },
  website: { type: 'string', trim: true },
  phone: { type: 'string', trim: true },
  email: { type: 'string', trim: true, lowercase: true },
  category: { type: 'ref', ref: 'Category' },
  province: { type: 'ref', ref: 'Province' },
  address: { type: 'string', trim: true },
  isPublished: { type: 'boolean', default: true },
});

module.exports = Company;
