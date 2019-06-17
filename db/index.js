const pg = require('pg');

const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'ENTER HOST',
  database: 'bookings',
  port: 5432,
});

module.exports = { pool };
