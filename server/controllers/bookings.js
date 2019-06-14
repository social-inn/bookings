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
                 )
                 RETURNING id`;
  db.pool.query(query, values, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result.rowCount !== 1) {
      res.sendStatus(202);
    } else {
      res.status(201).send(result.rows);
    }
  });
};

const updateBooking = (req, res) => {
  const cols = Object.keys(req.body);
  const updates = [];
  const values = [];
  let count = 1;
  for (const header of cols) {
    if (header !== 'id' && header !== 'roomid') {
      updates.push(`${header.toLowerCase()} = $${count}`);
      values.push(req.body[header]);
      count += 1;
    }
  }
  values.push(req.body.roomid, req.body.checkin, req.body.checkout);
  const query = `UPDATE bookings
                 SET ${updates.join(', ')}
                 WHERE NOT EXISTS (
                   SELECT * from bookings where roomid = $${count++}
                   AND checkout::date > $${count++}
                   AND checkin::date < $${count++}
                   AND id != ${req.body.id}
                 )
                 AND id = ${req.body.id}`;
  db.pool.query(query, values, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result.rowCount !== 1) {
      res.sendStatus(202);
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteBooking = (req, res) => {
  const query = `DELETE FROM bookings WHERE id = ${req.params.id}`;
  db.pool.query(query, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  getAllBookings,
  addBooking,
  updateBooking,
  deleteBooking,
};
