const dns = require("dns");
const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

// Use explicit public DNS servers to resolve MongoDB Atlas SRV records on Windows environments.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "SparkTrust",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then(() => console.log("Connected to MySQL database (SparkTrust)"))
  .catch((err) =>
    console.error("Error connecting to MySQL:", err.message || err),
  );

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    const errorMsg =
      "MONGODB_URI environment variable is missing. MongoDB-backed routes will remain unavailable until it is configured.";
    console.warn(errorMsg);
    return null;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB database (${conn.connection.name})`);
    return conn;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    console.log("Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectDB, 5000);
    return null;
  }
};

module.exports = pool;
module.exports.connectDB = connectDB;
