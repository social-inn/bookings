const db = require('../../db/index');

const getAllBookings = (req, res) => {
  const query = `SELECT * FROM bookings where roomid = ${req.params.id}`;
  db.pool.query(query, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result.rows);
    }
  });
};

const addBooking = (req, res) => {
  const headers = Object.keys(req.body);
  const values = headers.map(header => (req.body[header]));
  const query = `INSERT INTO bookings (${[...headers]})
                 SELECT $1, $2, $3, $4, $5, $6, $7
                 WHERE NOT EXISTS (
                   SELECT * FROM bookings WHERE roomid = $1
                   AND checkout::date > $6
                   AND checkin::date < $7
                 )`;
  db.pool.query(query, values, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result.rowCount !== 1) {
      res.sendStatus(409);
    } else {
      res.sendStatus(201);
    }
  });
};

const updateBooking = (req, res) => {

};

module.exports = {
  getAllBookings,
  addBooking,
};
