/* eslint-disable prefer-template */
/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const generateRooms = (stream, callback) => {
  const adjectives = ['\'s Cosy', '\'s Lovely', '\'s Awesome', '\'s Big', '\'s Pretty', '\'s City', '\'s Country', '\'s Beautiful', '\'s Gorgeous', '\'s Town', '\'s Stylish', '\'s Unique', '\'s Cute', '\'s Lovely', '\'s Dreamy', '\'s Cool', '\'s Luxury'];
  const roomNamesSuffix = [' Apartment ', ' House ', ' Loft ', ' Condo ', ' Quarter ', ' Home ', ' Lodge ', ' Cottage ', ' Flat ', ' Terrace ', ' Villa ', ' Suite ', ' Penthouse ', ' Crib ', ' Studio ', ' Place ', ' Residence '];
  const createRoom = (i) => {
    const room = [
      i,
      faker.name.findName() + faker.random.arrayElement(adjectives) + faker.random.arrayElement(roomNamesSuffix) + faker.address.stateAbbr() + ' ' + faker.address.zipCode('#####'),
      faker.random.number({ min: 30, max: 800 }),
      faker.random.number({ min: 20, max: 40 }),
      null,
      faker.random.number({ min: 2, max: 12 }),
      faker.random.number({ min: 2, max: 4 }),
      5,
      faker.random.number({ min: 2, max: 7 }),
      faker.random.number({ min: 20, max: 30 }),
      faker.random.number({ min: 20, max: 50 }),
      faker.random.number({ min: 0, max: 300 }),
    ];
    room[4] = Math.round(faker.random.number({ min: 105, max: 110 }) * room[2] / 100) - room[2];
    room[12] = Math.round(room[2] * 0.1);
    // room[13] = JSON.stringify((createBookings(i)));
    return room.join(',');
  };

  const headers = [
    'id', 'roomname', 'price', 'cleaningFee', 'serviceFee', 'maxAdults',
    'maxChildren', 'maxInfants', 'minNights', 'maxNights', 'ratings', 'numReviews', 'tax', 'bookings'];
  let i = 0;
  const n = 5;
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
  let bookingId = 1;
  const createBookings = (i) => {
    const bookings = {};
    const bookingsPerRoom = faker.random.number({ min: 3, max: 6 });
    let start = '2019-06-20';
    const end = '2019-12-31';
    for (let j = 0; j < bookingsPerRoom; j += 1) {
      const numOfDays = faker.random.number({ min: 2, max: 10 });
      const checkIn = faker.date.between(start, end).setHours(0, 0, 0, 0);
      const checkOut = moment(checkIn).clone().add(numOfDays, 'days').toDate();
      const booking = {
        roomId: i,
        email: faker.internet.email(),
        adults: faker.random.number({ min: 1, max: 4 }),
        children: faker.random.number({ min: 0, max: 2 }),
        infants: faker.random.number({ min: 0, max: 2 }),
        checkIn: moment(checkIn).format('YYYY-MM-DD'),
        checkOut: moment(checkOut).format('YYYY-MM-DD'),
      };
      bookings[bookingId] = booking;
      bookingId += 1;
      start = moment(checkOut).format('YYYY-MM-DD');
      if ((moment(end)).diff(moment(start), 'days') <= 10) {
        break;
      }
    }
    return JSON.stringify(bookings);
  };

  let i = 0;
  const n = 5;
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
  stream.write('bookings\n');
  write(callback);
};

// const rStream = fs.createWriteStream('db_eugenia/cass/cass_rooms.csv');
// generateRooms(rStream, () => {
//   console.log('done generating data for rooms!');
//   rStream.end();
// });

// change n to 10
// const rTestStream = fs.createWriteStream('db_eugenia/cass/cass_rooms_test.csv');
// generateRooms(rTestStream, () => {
//   rTestStream.end();
// });

// change n to 10
const bTestStream = fs.createWriteStream('db_eugenia/cass/cass_bookings_test.csv');
generateBookings(bTestStream, () => {
  bTestStream.end();
});
