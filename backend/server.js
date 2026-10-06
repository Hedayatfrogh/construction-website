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

// Keep the hardcoded local admin (config/adminCredentials.js) in sync.
const ensureLocalAdmin = async () => {
  if (process.env.NODE_ENV === 'production') return;
  const existing = await User.findOne({ email: adminCredentials.email }).select('+password');
  if (!existing) {
    await User.create({
      name: adminCredentials.name,
      email: adminCredentials.email,
      password: await bcrypt.hash(adminCredentials.password, 12),
      role: 'admin',
    });
  } else if (
    existing.role !== 'admin' ||
    !(await bcrypt.compare(adminCredentials.password, existing.password))
  ) {
    await User.findByIdAndUpdate(existing._id, {
      password: await bcrypt.hash(adminCredentials.password, 12),
      role: 'admin',
    });
  }
  console.log(`Local admin login: ${adminCredentials.email} / ${adminCredentials.password}`);
};

ensureLocalAdmin().catch((err) => console.error('Failed to create local admin:', err.message));

const port = process.env.PORT || 2000;
// Bind explicitly to 0.0.0.0 so the server is reachable from other devices
// on the same local network (LAN), not just from localhost.
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`App running on port ${port}...`);
  console.log(`Bound to host: ${host}`);

  // Print every LAN URL the server is reachable at so users on the
  // same Wi-Fi can open it directly from their phone / other PC.
  const interfaces = os.networkInterfaces();
  const printed = new Set();
  console.log('\nLocal network URLs (open from any device on the same Wi-Fi/LAN):');
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.internal || iface.family !== 'IPv4') continue;
      if (printed.has(iface.address)) continue;
      printed.add(iface.address);
      console.log(`  http://${iface.address}:${port}`);
    }
  }
  console.log(`  http://localhost:${port}  (this machine only)\n`);
});