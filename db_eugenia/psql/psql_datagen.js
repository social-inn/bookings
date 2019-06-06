/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const generateRooms = (stream, callback) => {
  const roomNamesSuffix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];
  const createRoom = (i) => {
    const room = [
      i,
      faker.name.findName() + faker.random.arrayElement(roomNamesSuffix),
      faker.random.number({ min: 30, max: 1200 }),
      faker.random.number({ min: 20, max: 100 }),
      null,
      faker.random.number({ min: 2, max: 12 }),
      faker.random.number({ min: 2, max: 4 }),
      5,
      faker.random.number({ min: 2, max: 7 }),
      faker.random.number({ min: 30, max: 60 }),
      faker.random.number({ min: 0, max: 50 }),
      faker.random.number({ min: 0, max: 300 }),
    ];
    room[4] = Math.round(faker.random.number({ min: 105, max: 110 }) * room[2] / 100);
    room[12] = Math.round(room[2] * 0.1);
    return room.join(',');
  };

  const headers = [
    'id', 'roomname', 'price', 'cleaningFee', 'serviceFee', 'maxAdults',
    'maxChildren', 'maxInfants', 'minNights', 'maxNights', 'ratings', 'numReviews', 'tax'];
  let i = 0;
  const n = 10;
  const write = (cb) => {
    let ok = true;
    do {
      i += 1;
      if (i === n) {
        stream.write(`${createRoom(i)}\n`, 'utf8', cb);
      } else {
        ok = stream.write(`${createRoom(i)}\n`);
      }
    } while (i < n && ok);
    if (i < n) {
      stream.once('drain', write);
    }
  };
  stream.write(`${headers.join(',')}\n`);
  write(callback);
};

const generateBookings = (stream, callback) => {
  // inner function to create multiple bookings per room
  let bookingId = 1;
  const createBookings = (i) => {
    const bookings = [];
    const bookingsPerRoom = faker.random.number({ min: 3, max: 6 });
    let start = '2019-06-20';
    const end = '2019-12-31';
    for (let j = 0; j < bookingsPerRoom; j += 1) {
      const numOfDays = faker.random.number({ min: 2, max: 10 });
      const checkIn = faker.date.between(start, end).setHours(0, 0, 0, 0);
      const checkOut = moment(checkIn).clone().add(numOfDays, 'days').toDate();
      const booking = [
        bookingId,
        i,
        faker.internet.email(),
        faker.random.number({ min: 1, max: 4 }),
        faker.random.number({ min: 0, max: 2 }),
        faker.random.number({ min: 0, max: 2 }),
        moment(checkIn).format('YYYY-MM-DD'),
        moment(checkOut).format('YYYY-MM-DD'),
      ];
      bookings.push(booking.join(','));
      bookingId += 1;
      start = moment(checkOut).format('YYYY-MM-DD');
      if ((moment(end)).diff(moment(start), 'days') <= 10) {
        break;
      }
    }
    return bookings.join('\n');
  };

  const headers = ['id', 'roomId', 'email', 'adults', 'children', 'infants', 'checkIn', 'checkOut'];
  let i = 0;
  const n = 10;
  const write = (cb) => {
    let ok = true;
    do {
      i += 1;
      if (i === n) {
        stream.write(`${createBookings(i)}\n`, 'utf8', cb);
      } else {
        ok = stream.write(`${createBookings(i)}\n`);
      }
    } while (i < n && ok);
    if (i < n) {
      stream.once('drain', write);
    }
  };
  stream.write(`${headers.join(',')}\n`);
  write(callback);
};

const rStream = fs.createWriteStream('db_eugenia/psql/psql_rooms.csv');
generateBookings(rStream, () => {
  rStream.end();
});

const bStream = fs.createWriteStream('db_eugenia/psql/psql_bookings.csv');
generateBookings(bStream, () => {
  bStream.end();
});

// const bTestStream = fs.createWriteStream('db_eugenia/psql/psql_bookings_test.csv');
// generateBookings(bTestStream, () => {
//   bTestStream.end();
// });

// const rTestStream = fs.createWriteStream('db_eugenia/psql/psql_rooms_test.csv');
// generateBookings(rTestStream, () => {
//   rTestStream.end();
// });
