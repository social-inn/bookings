const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db_eugenia/sequelize');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());

// app.get('*.js', (req, res, next) => {
//   req.url = `${req.url}.gz`;
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// GET
app.get('/rooms/:id/basicinfo', (req, res) => {
  db.Room.findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get('/rooms/:id/bookings', (req, res) => {
  db.Booking.findAll({ where: { roomId: req.params.id } })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});


// POST

app.post('/rooms', (req, res) => {
  db.Room.create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post('/bookings', (req, res) => {
  const data = req.body;
  data.checkIn = new Date(data.checkIn);
  data.checkOut = new Date(data.checkOut);

  db.Booking.findAll({
    where: {
      roomId: req.body.roomId,
      checkIn: { [db.Op.lt]: data.checkOut },
      checkOut: { [db.Op.gt]: data.checkIn },
    },
  })
    .then((result) => {
      if (!result[0]) {
        return db.Booking.create(data);
      }
      return undefined;
    })
    .then((result) => {
      if (result === undefined) {
        res.sendStatus(403);
      } else {
        res.sendStatus(201);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// PUT
app.put('/rooms', (req, res) => {
  db.Room.update(req.body, { where: { id: req.body.id } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.put('/bookings', (req, res) => {
  const data = req.body;
  data.checkIn = new Date(data.checkIn);
  data.checkOut = new Date(data.checkOut);

  db.Booking.findAll({
    where: {
      roomId: req.body.roomId,
      checkIn: { [db.Op.lt]: data.checkOut },
      checkOut: { [db.Op.gt]: data.checkIn },
    },
  })
    .then((result) => {
      if (!result[0]) {
        return db.Booking.update(data, { where: { id: data.id } });
      }
      return undefined;
    })
    .then((result) => {
      if (result === undefined) {
        res.sendStatus(403);
      } else {
        res.sendStatus(201);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// DELETE
app.delete('/rooms/:id', (req, res) => {
  db.Room.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.delete('/bookings/:id', (req, res) => {
  db.Booking.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
