const mongoose = require('../utils/mongoose');

// List content managed in the admin panel. Each item keeps the client-side
// `id` as `itemId` and its position as `order`; extra localized/optional
// fields used by the frontend are stored as-is (strict: false).
const defineCollection = (modelName, collection, labelField, fields = {}) => {
  const schema = new mongoose.Schema(
    {
      itemId: { type: String, required: true, unique: true, trim: true, maxlength: 200 },
      order: { type: Number, default: 0 },
      [labelField]: { type: String, required: [true, `${labelField} is required`], trim: true, maxlength: 300 },
      slug: { type: String, trim: true, maxlength: 200 },
      description: { type: String, trim: true },
      isPublished: { type: Boolean },
      ...fields,
    },
    { timestamps: true, strict: false, minimize: false, collection },
  );
  schema.index({ order: 1 });
  const model = mongoose.model(modelName, schema);
  model.labelField = labelField;
  return model;
};

const str = { type: String, trim: true };

module.exports = {
  Project: defineCollection('Project', 'projects', 'title', {
    category: str, location: str, status: str, coverImage: str, client: str,
  }),
  Service: defineCollection('Service', 'services', 'title', { icon: str, image: str, summary: str }),
  Equipment: defineCollection('Equipment', 'equipment', 'title', { icon: str, image: str, category: str }),
  Client: defineCollection('Client', 'clients', 'name', { logo: str }),
  TeamMember: defineCollection('TeamMember', 'team', 'name', { role: str, photo: str, bio: str }),
  BlogPost: defineCollection('BlogPost', 'blogPosts', 'title', {
    body: str, excerpt: str, coverImage: str, category: str, publishedAt: Date,
  }),
};
