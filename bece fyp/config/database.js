require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234567890#',
  database: process.env.DB_NAME || 'fyp_bece_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};