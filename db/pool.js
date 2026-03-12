const { Pool } = require("pg");
require('dotenv').config()

module.exports = new Pool({
  connectionString: process.env.INTERNAL_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});