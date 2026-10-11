// One-time import of the legacy SQLite database (data/database.sqlite) into MongoDB.
// Usage: npm run migrate:sqlite   (existing MongoDB records are kept; duplicates skipped)
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', 'config.env') });

const { DatabaseSync } = require('node:sqlite');
const mongoose = require('../utils/mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Message = require('../models/Message');
const ContentSection = require('../models/ContentSection');
const { COLLECTION_SECTIONS, syncCollection } = require('../Controllers/contentController');

const dbPath = path.resolve(__dirname, '..', process.env.DB_PATH || 'data/database.sqlite');

const tableRows = (db, table) => {
  const exists = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(table);
  return exists ? db.prepare(`SELECT * FROM "${table}"`).all() : [];
};

const dates = (row) => ({ createdAt: new Date(row.createdAt), updatedAt: new Date(row.updatedAt) });

const run = async () => {
  if (!fs.existsSync(dbPath)) throw new Error(`SQLite file not found: ${dbPath}`);
  const sqlite = new DatabaseSync(dbPath, { readOnly: true });
  await connectDB();

  let users = 0;
  for (const row of tableRows(sqlite, 'users')) {
    if (await User.exists({ email: row.email })) continue;
    await User.collection.insertOne({
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role || 'admin',
      tokenVersion: row.tokenVersion || '0',
      is_active: Boolean(row.is_active),
      is_super_admin: Boolean(row.is_super_admin),
      ...dates(row),
    });
    users += 1;
  }

  let sections = 0;
  for (const row of tableRows(sqlite, 'content_sections')) {
    const value = row.value == null ? null : JSON.parse(row.value);
    const Model = COLLECTION_SECTIONS[row.name];
    if (Model && Array.isArray(value)) {
      if (await Model.estimatedDocumentCount()) continue;
      await syncCollection(Model, value);
    } else {
      if (await ContentSection.exists({ name: row.name })) continue;
      await ContentSection.create({ name: row.name, value });
    }
    sections += 1;
  }

  let messages = 0;
  if (!(await Message.estimatedDocumentCount())) {
    const docs = tableRows(sqlite, 'messages').map((row) => ({
      firstName: row.firstName,
      lastName: row.lastName || '',
      company: row.company || '',
      email: row.email,
      phone: row.phone || '',
      description: row.description,
      websiteId: row.websiteId,
      isRead: Boolean(row.isRead),
      ...dates(row),
    }));
    if (docs.length) await Message.collection.insertMany(docs);
    messages = docs.length;
  }

  console.log(`Imported ${users} admin(s), ${sections} content section(s), ${messages} message(s).`);
  sqlite.close();
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error('Migration failed:', err.message);
  await mongoose.disconnect();
  process.exit(1);
});
