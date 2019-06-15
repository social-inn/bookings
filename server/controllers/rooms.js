const db = require('../../db/index');

const getRooms = (req, res) => {
  const query = 'SELECT * FROM rooms WHERE id = $1';
  db.pool.query(query, [req.params.id], (err, result) => {
    if (err || result.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result.rows[0]);
    }
  });
};

const addRoom = (req, res) => {
  let headers = Object.keys(req.body);
  const values = headers.map(header => (req.body[header]));
  headers = headers.map(header => header.toLowerCase());
  const query = `INSERT INTO rooms(${[...headers]})
                values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
                RETURNING id`;
  db.pool.query(query, values, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(result);
    }
  });
};

const updateRoom = (req, res) => {
  const cols = Object.keys(req.body);
  const updates = [];
  const values = [];
  let count = 1;
  cols.forEach((header) => {
    if (header !== 'id') {
      updates.push(`${header.toLowerCase()} = $${count}`);
      values.push(req.body[header]);
      count += 1;
    }
  });
  const query = `UPDATE rooms
                 SET ${updates.join(', ')}
                 WHERE id = ${req.body.id}`;
  db.pool.query(query, values, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteRoom = (req, res) => {
  const query = 'DELETE FROM rooms WHERE id = $1';
  db.pool.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
};
