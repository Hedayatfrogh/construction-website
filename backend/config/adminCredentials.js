module.exports = {
  name: process.env.ADMIN_NAME || process.env.SEED_ADMIN_NAME || 'Admin',
  email: (process.env.ADMIN_EMAIL || process.env.SEED_ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase(),
  password: process.env.ADMIN_PASSWORD || process.env.SEED_ADMIN_PASSWORD,
};
