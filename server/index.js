const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const rooms = require('./controllers/rooms.js');
const bookings = require('./controllers/bookings.js');

const app = express();
const port = process.env.port || 3000;

app.use('/', express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/rooms/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

app.get('/api/rooms/:id/basicinfo', rooms.getRooms);
app.get('/api/rooms/:id/bookings', bookings.getAllBookings);
app.get('/api/rooms/:id', rooms.getAll);

app.post('/api/rooms', rooms.addRoom);
app.post('/api/bookings', bookings.addBooking);
app.put('/api/rooms', rooms.updateRoom);
app.put('/api/bookings', bookings.updateBooking);
app.delete('/api/rooms/:id', rooms.deleteRoom);
app.delete('api//bookings/:id', bookings.deleteBooking);

app.listen(port, () => {
  console.log(`Bookings server listening on port: ${port}`);
});
