const Sequelize = require('sequelize');

const { Op } = Sequelize;
const sequelize = new Sequelize('booking', 'root', 'eugenia', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Room = sequelize.define('room', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomname: Sequelize.STRING,
  price: Sequelize.INTEGER,
  cleaningFee: Sequelize.INTEGER,
  serviceFee: Sequelize.INTEGER,
  maxAdults: Sequelize.INTEGER,
  maxChildren: Sequelize.INTEGER,
  maxInfants: Sequelize.INTEGER,
  minNights: Sequelize.INTEGER,
  maxNights: Sequelize.INTEGER,
  ratings: Sequelize.INTEGER,
  numReviews: Sequelize.INTEGER,
  tax: Sequelize.INTEGER,
});

const Booking = sequelize.define('booking', {
  email: Sequelize.STRING,
  adults: Sequelize.INTEGER,
  children: Sequelize.INTEGER,
  infants: Sequelize.INTEGER,
  checkIn: Sequelize.DATE,
  checkOut: Sequelize.DATE,
  createdAt: Sequelize.DATE,
});


Room.hasMany(Booking);

module.exports = {
  sequelize,
  Room,
  Booking,
  Op,
};
