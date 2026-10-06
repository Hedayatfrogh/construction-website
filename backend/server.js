const dotenv = require('dotenv');
const path = require('path');
const os = require('os');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

// Load environment variables (.env first, config.env fallback)
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, 'config.env') });

console.log('Loaded environment variables in server.js:', {
  DB_PATH: process.env.DB_PATH || 'data/database.sqlite (default)',
  JWT_SECRET: process.env.JWT_SECRET ? '[CONFIGURED]' : '[MISSING]',
  PORT: process.env.PORT || 2000,
  HOST: process.env.HOST || '0.0.0.0',
});

if (!process.env.JWT_SECRET) {
  console.error(
    'FATAL ERROR: JWT_SECRET is missing. Copy config.example.env to config.env and set JWT_SECRET.'
  );
  process.exit(1);
}

const app = require('./app');
const User = require('./models/User');
const adminCredentials = require('./config/adminCredentials');

// Open (or create) the local SQLite database and its tables
connectDB();

// Create the local admin once without resetting a password changed in the UI.
const ensureLocalAdmin = async () => {
  if (process.env.NODE_ENV === 'production') return;
  const existing = await User.findOne({ email: adminCredentials.email });
  if (!existing) {
    if (!adminCredentials.password) {
      console.warn(
        'Local admin was not created. Set SEED_ADMIN_PASSWORD to configure one.',
      );
      return;
    }
    await User.create({
      name: adminCredentials.name,
      email: adminCredentials.email,
      password: await bcrypt.hash(adminCredentials.password, 12),
      role: 'admin',
      is_active: true,
      is_super_admin: true,
    });
  } else if (existing.role !== 'admin' || !existing.is_super_admin) {
    await User.findByIdAndUpdate(existing._id, {
      role: 'admin',
      is_active: true,
      is_super_admin: true,
    });
  }
  console.log(`Local admin account is ready: ${adminCredentials.email}`);
};

const port = process.env.PORT || 2000;
// Bind explicitly to 0.0.0.0 so the server is reachable from other devices
// on the same local network (LAN), not just from localhost.
const host = process.env.HOST || '0.0.0.0';

const startServer = async () => {
  await ensureLocalAdmin();
  app.listen(port, host, () => {
    console.log(`App running on port ${port}...`);
    console.log(`Bound to host: ${host}`);

    const interfaces = os.networkInterfaces();
    const printed = new Set();
    console.log('\nLocal network URLs (open from any device on the same Wi-Fi/LAN):');
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.internal || iface.family !== 'IPv4') continue;
        if (printed.has(iface.address)) continue;
        printed.add(iface.address);
        console.log(`  http://${iface.address}:${port}`);
      }
    }
    console.log(`  http://localhost:${port}  (this machine only)\n`);
  });
};

startServer().catch((error) => {
  console.error('Backend startup failed:', error.message);
  process.exit(1);
});