const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

class DB {
  constructor() {
    this.pool = mysql.createPool(dbConfig);
  }

  async query(sql, params) {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }
}

module.exports = new DB();