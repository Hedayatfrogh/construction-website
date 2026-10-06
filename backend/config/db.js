const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

let db = null;
const models = [];

const resolveDbPath = () =>
  path.resolve(__dirname, '..', process.env.DB_PATH || 'data/database.sqlite');

// Opens the SQLite file (creating it and its folder if missing).
const getDb = () => {
  if (db) return db;
  const dbPath = resolveDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode = WAL;');
  return db;
};

const registerModel = (model) => {
  models.push(model);
};

// Opens the database and creates/migrates every registered model's table.
const connectDB = () => {
  const conn = getDb();
  models.forEach((model) => model.ensureTable());
  console.log(`Connected to SQLite database (${resolveDbPath()})`);
  return conn;
};

module.exports = connectDB;
module.exports.getDb = getDb;
module.exports.registerModel = registerModel;
module.exports.resolveDbPath = resolveDbPath;
