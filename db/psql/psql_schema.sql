DROP DATABASE IF EXISTS bookings;

CREATE DATABASE bookings;

\c bookings;

CREATE TABLE rooms
(
  id SERIAL PRIMARY KEY UNIQUE,
  roomname VARCHAR(60) NOT NULL,
  price INTEGER DEFAULT 0,
  cleaningFee INTEGER DEFAULT 0,
  serviceFee INTEGER DEFAULT 0,
  maxAdults INTEGER DEFAULT 2,
  maxChildren INTEGER DEFAULT 2,
  maxInfants INTEGER DEFAULT 2,
  minNights INTEGER DEFAULT 1,
  maxNights INTEGER DEFAULT 7,
  ratings INTEGER DEFAULT 30,
  numReviews INTEGER DEFAULT 0,
  tax INTEGER DEFAULT 0
);

CREATE TABLE bookings
(
  id SERIAL PRIMARY KEY UNIQUE,
  roomId INTEGER NOT NULL,
  email VARCHAR(100) NOT NULL,
  adults INTEGER,
  children INTEGER,
  infants INTEGER,
  checkIn DATE,
  checkOut DATE,
  FOREIGN KEY (roomId) REFERENCES rooms (id) ON DELETE CASCADE
);

CREATE INDEX idx_roomname ON rooms(roomname);
CREATE INDEX idx_roomid ON bookings(roomid);
CREATE INDEX idx_email ON bookings(email);

COPY rooms FROM '/Users/eugenia/Documents/HR/sdc-socialinn/socialinn-bookings/db_eugenia/psql/psql_rooms.csv' DELIMITER ',' CSV HEADER;
COPY bookings FROM '/Users/eugenia/Documents/HR/sdc-socialinn/socialinn-bookings/db_eugenia/psql/psql_bookings.csv' DELIMITER ',' CSV HEADER;