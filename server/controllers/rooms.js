const db = require('../../db/index');

const getRooms = (req, res) => {
  const query = `SELECT * FROM rooms WHERE id = ${req.params.id}`;
  db.pool.query(query, (err, result) => {
    if (err) {
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
  for (let i = 0; i < cols.length; i += 1) {
    if (cols[i] !== 'id') {
      updates.push(`${cols[i]} = ${i + 1}`);
    }
  }
  const query = `UPDATE rooms
                 SET ${updates.join(',')}
                 WHERE id = ${req.body.id}`;
  db.pool.query(query, (err) => {
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
};
