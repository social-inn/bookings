DROP KEYSPACE IF EXISTS Bookings;

CREATE KEYSPACE Bookings
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

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


COPY bookings.rooms(id,roomname,price,cleaningFee,serviceFee,maxAdults,maxChildren,maxInfants,minNights,maxNights,ratings,numReviews,tax) FROM '/Users/eugenia/Documents/HR/sdc-socialinn/socialinn-bookings/db_eugenia/psql/psql_rooms.csv' WITH DELIMITER=',' AND HEADER=TRUE;
COPY bookings.rooms(id, bookings) FROM '/Users/eugenia/Documents/HR/sdc-socialinn/socialinn-bookings/db_eugenia/cass/cass_bookings.csv' WITH DELIMITER=',' AND HEADER=TRUE;

CREATE TABLE roomInfoByName (
  roomname text,
  id int,
  PRIMARY KEY (roomname, id)
) WITH CLUSTERING ORDER BY (id ASC);