const dns = require('dns');
const mongoose = require('mongoose');

// Use explicit public DNS servers to resolve MongoDB Atlas SRV records on Windows environments
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    const errorMsg =
      'FATAL ERROR: MONGODB_URI environment variable is missing. Please set MONGODB_URI in your .env or environment configuration.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB database (${conn.connection.name})`);
    return conn;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    console.log('Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
