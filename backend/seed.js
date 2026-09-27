const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, 'config.env') });

const User = require('./models/User');
const Category = require('./models/Category');
const Province = require('./models/Province');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding...');

    // Check if admin user exists
    const adminExists = await User.findOne({ email: 'admin@sparktrust.tech' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('pass123', 12);
      await User.create({
        name: 'Admin User',
        email: 'admin@sparktrust.tech',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Default admin user created: admin@sparktrust.tech / pass123');
    } else {
      console.log('Admin user already exists.');
    }

    // Seed sample categories if empty
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany([
        { name: 'Earthmoving & Heavy Equipment', slug: 'earthmoving', description: 'Excavators, bulldozers, wheel loaders' },
        { name: 'Concrete & Roads', slug: 'concrete-roads', description: 'Concrete mixers, pavers, compactors' },
        { name: 'Material Handling', slug: 'material-handling', description: 'Cranes, forklifts, telehandlers' },
        { name: 'Finishing & Power Tools', slug: 'finishing-tools', description: 'Compressors, generators, hand tools' },
      ]);
      console.log('Default categories created.');
    }

    // Seed sample provinces if empty
    const provinceCount = await Province.countDocuments();
    if (provinceCount === 0) {
      await Province.insertMany([
        { name: 'Kabul', code: 'KBL', description: 'Capital Province' },
        { name: 'Herat', code: 'HRT', description: 'Western Province' },
        { name: 'Mazar-i-Sharif', code: 'MZR', description: 'Northern Province' },
        { name: 'Kandahar', code: 'KDH', description: 'Southern Province' },
      ]);
      console.log('Default provinces created.');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedData();
