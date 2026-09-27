const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Janzaki007',
  database: process.env.DB_NAME || 'SparkTrust',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool
  .getConnection()
  .then(() => console.log('Connected to MySQL database (SparkTrust)'))
  .catch(err => console.error('Error connecting to MySQL:', err))

module.exports = pool
