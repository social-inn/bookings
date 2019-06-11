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
    return room.join(',');
  };

  const headers = [
    'id', 'roomname', 'price', 'cleaningFee', 'serviceFee', 'maxAdults',
    'maxChildren', 'maxInfants', 'minNights', 'maxNights', 'ratings', 'numReviews', 'tax', 'bookings'];
  let i = 0;
  const n = 50;
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

const replaceQuotes = str => str.replace(/"/g, '\'');

const generateBookings = (stream, callback) => {
  let bookingId = 1;
  const createBookings = (i) => {
    const bookings = {};
    const bookingsPerRoom = faker.random.number({ min: 3, max: 6 });
    let start = '2019-06-20';
    const end = '2019-12-31';
    for (let j = 0; j < bookingsPerRoom; j += 1) {
      const numOfDays = faker.random.number({ min: 2, max: 10 });
      const checkin = faker.date.between(start, end).setHours(0, 0, 0, 0);
      const checkout = moment(checkin).clone().add(numOfDays, 'days').toDate();
      const booking = {
        roomid: i,
        email: faker.internet.email(),
        adults: faker.random.number({ min: 1, max: 4 }),
        children: faker.random.number({ min: 0, max: 2 }),
        infants: faker.random.number({ min: 0, max: 2 }),
        checkin: moment(checkin).format('YYYY-MM-DD'),
        checkout: moment(checkout).format('YYYY-MM-DD'),
      };
      bookings[bookingId] = booking;
      bookingId += 1;
      start = moment(checkout).format('YYYY-MM-DD');
      if ((moment(end)).diff(moment(start), 'days') <= 10) {
        break;
      }
    }
    return replaceQuotes(JSON.stringify(bookings));
  };

  let i = 0;
  const n = 10000000;
  const write = (cb) => {
    let ok = true;
    do {
      i += 1;
      if (i === n) {
        stream.write(`${i},"${createBookings(i)}"\n`, 'utf8', cb);
      } else {
        ok = stream.write(`${i},"${createBookings(i)}"\n`);
      }
    } while (i < n && ok);
    if (i < n) {
      stream.once('drain', write);
    }
  };
  stream.write('id,bookings\n');
  write(callback);
};

// const roomStr = fs.createWriteStream('db_eugenia/cass/cass_rooms_test.csv');
// generateRooms(roomStr, () => {
//   console.log('done generating data for rooms!');
//   roomStr.end();
// });

const bookingStr = fs.createWriteStream('db_eugenia/cass/cass_bookings.csv');
generateBookings(bookingStr, () => {
  console.log('done generating data for bookings!');
  bookingStr.end();
});
