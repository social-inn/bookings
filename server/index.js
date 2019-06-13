const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const rooms = require('./controllers/rooms.js');
const bookings = require('./controllers/bookings.js');

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/rooms/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
})

app.get('/rooms/:id/basicinfo', rooms.getRooms);
app.get('/rooms/:id/bookings', bookings.getAllBookings);
app.post('/rooms', rooms.addRoom);
app.post('/bookings', bookings.addBooking);
app.put('/rooms', rooms.updateRoom);
app.put('/bookings', bookings.updateBooking);
app.delete('/rooms/:id', rooms.deleteRoom);
app.delete('/bookings/:id', bookings.deleteBooking);

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
