const faker = require('faker');
const moment = require('moment');
const sequelize = require('./sequelize');

// generate Rooms
const roomNamesSuffix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

const generateRooms = (n) => {
  const allRooms = [];
  for (let i = 1; i <= n; i += 1) {
    const room = {
      id: 1,
      roomname: faker.name.findName() + faker.random.arrayElement(roomNamesSuffix),
      price: faker.random.number({ min: 30, max: 1200 }),
      cleaningFee: faker.random.number({ min: 20, max: 100 }),
      maxAdults: faker.random.number({ min: 2, max: 12 }),
      maxChildren: faker.random.number({ min: 2, max: 4 }),
      maxInfants: 5,
      ratings: faker.random.number({ min: 0, max: 50 }),
      minNights: faker.random.number({ min: 2, max: 7 }),
      maxNights: faker.random.number({ min: 30, max: 60 }),
      numReviews: faker.random.number({ min: 0, max: 300 }),
    };
    room.serviceFee = Math.round(faker.random.number({ min: 105, max: 110 }) * room.price / 100);
    room.tax = Math.round(room.price * 0.1);
    allRooms.push(room);
  }
  return allRooms;
};

const generateBookings = (n) => {
  const allBookings = [];
  for (let i = 1; i <= n; i += 1) {
    const bookingsPerRoom = faker.random.number({ min: 3, max: 6 });
    let start = '2019-06-20';
    const end = '2019-12-31';
    for (let j = 0; j < bookingsPerRoom; j += 1) {
      const numOfDays = faker.random.number({ min: 2, max: 10 });
      const checkIn = faker.date.between(start, end);
      const checkOut = moment(checkIn).clone().add(numOfDays, 'days').toDate();
      const booking = {
        roomId: i,
        email: faker.internet.email(),
        adults: faker.random.number({ min: 1, max: 4 }),
        children: faker.random.number({ min: 0, max: 2 }),
        infants: faker.random.number({ min: 0, max: 2 }),
        checkIn,
        checkOut,
      };
      allBookings.push(booking);
      start = moment(checkOut).format('YYYY-MM-DD');
      if ((moment(end)).diff(moment(start), 'days') <= 10) {
        break;
      }
    }
  }
  return allBookings;
};

const start = Date.now();
const nRoomRecords = generateRooms(100000);
const mid = Date.now();
const nBookingRecords = generateBookings(100000);
const end = Date.now();
console.log('room records took', mid - start);
console.log('booking records took', end - mid);