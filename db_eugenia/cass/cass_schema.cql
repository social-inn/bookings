DROP KEYSPACE IF EXISTS Bookings;

CREATE KEYSPACE Bookings
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE Bookings;

CREATE TYPE booking (
  roomId INT,
  email TEXT,
  adults INT,
  children INT,
  infants INT,
  checkIn DATE,
  checkOut DATE
);

CREATE TABLE IF NOT EXISTS Rooms (
  id INT,
  roomname TEXT,
  price INT,
  cleaningFee INT,
  serviceFee INT,
  maxAdults INT,
  maxChildren INT,
  maxInfants INT,
  minNights INT,
  maxNights INT,
  ratings INT,
  numReviews INT,
  tax INT,
  bookings map<text, frozen<booking>>,
  PRIMARY KEY (id)
);

COPY bookings.rooms(id,roomname,price,cleaningFee,serviceFee,maxAdults,maxChildren,maxInfants,minNights,maxNights,ratings,numReviews,tax) FROM '/Users/eugenia/Documents/HR/sdc-socialinn/socialinn-bookings/db_eugenia/cass/cass_rooms_test.csv' WITH DELIMITER=',' AND HEADER=TRUE;
COPY bookings.rooms(bookings) FROM '/Users/eugenia/Documents/HR/sdc-socialinn/socialinn-bookings/db_eugenia/cass/cass_bookings_test.csv' WITH DELIMITER=',' AND HEADER=TRUE;