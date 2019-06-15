const pg = require('pg');

const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  host: '54.147.79.115',
  database: 'bookings',
  port: 5432,
});

module.exports = { pool };
