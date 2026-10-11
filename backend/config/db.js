const mongoose = require('../utils/mongoose');

// Connects to MongoDB Atlas using MONGODB_URI from the environment.
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Set it in backend/config.env or the host environment.');
  }
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected.');
  });
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || undefined,
    serverSelectionTimeoutMS: 10000,
  });
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
  console.log(`Connected to MongoDB (${mongoose.connection.name})`);
  return mongoose.connection;
};

module.exports = connectDB;
