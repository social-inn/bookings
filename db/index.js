const pg = require('pg');

const { Pool } = pg;
const pool = new Pool({
  user: 'eugenia',
  host: 'localhost',
  database: 'bookings',
  port: 5432,
});

module.exports = { pool };
