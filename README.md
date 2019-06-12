# Social Inn Bookings

> Module for booking a room on housing reservation website

## Related Projects

- https://github.com/social-inn/Recommeded-homes
- https://github.com/social-inn/socialinn-proxy-eugenia

## Usage

```npm install``` to install necessary dependencies

```npm run build``` to bundle webpack files

run ```mysql -u root < db_eugenia/schema.sql [-p]``` in CLI and enter password to create database

```npm start``` to start server running on port 3000

## RESTful API Routes

1. [GET](#get)
2. [POST](#post)
3. [PUT](#put)
4. [DELETE](#delete)

## GET

### Rooms

Endpoint: ```/rooms/:id/basicinfo```  

**Success Response**:
  * An object containing information about a room with param ```id```
  * Code: 200
  * Expected Content:

```sh
{
    "id": 1,
    "roomname": "Alphonso Fahey's House",
    "price": 1167,
    "cleaningFee": 39,
    "serviceFee": 127,
    "maxAdults": 10,
    "maxChildren": 4,
    "maxInfants": 5,
    "minNights": 7,
    "maxNights": 49,
    "ratings": 32,
    "numReviews": 65,
    "tax": 10,
}

```
**Error Response**: 
  * Code: 500


### Bookings

Endpoint: ```/rooms/:id/bookings```

**Success Response**: 
  * An array of objects containing all the bookings for room with param ```id```. 
  * Each object represents a booking that has been made for that room.
  * Code: 200
  * Expected Content:

 ```sh
[
    {
        "id": 1,
        "email": "Allen.Satterfield16@yahoo.com",
        "adults": 3,
        "children": 1,
        "infants": 0,
        "checkIn": "2019-09-08",
        "checkOut": "2019-09-11",
        "roomId": 1
    },
    {
        "id": 2,
        "email": "Kieran47@hotmail.com",
        "adults": 3,
        "children": 0,
        "infants": 2,
        "checkIn": "2019-09-13",
        "checkOut": "2019-09-19",
        "roomId": 1
    },

``` 
**Error Response**: 
  * Code: 500

## POST

### Creating a room record

Endpoint: ```/rooms```

Expected Data Input: Object in application/json format

Example: 
  ```sh
{ 
  "roomname": 'My Nice Home',
  "price": 30,
  "cleaningFee": 30,
  "serviceFee": 20,
  "maxAdults": 4,
  "maxChildren": 2,
  "maxInfants": 5,
  "minNights": 4,
  "maxNights": 20,
  "ratings": 45,
  "numReviews": 40,
  "tax": 10,
}
  ```

**Success Response:**
  * Code: 201

**Error Response:**
  * Code: 500


### Creating a booking

Endpoint: ```/bookings```

Expected Data Input: Object in application/json format

Example: 
  ```sh
{
  "email": "Marquis_McClure@gmail.com",
  "adults": 2,
  "children": 0,
  "infants": 2,
  "checkin": "2019-08-03",
  "checkout": "2019-08-05",
  "roomId": 1
}
  ```

**Success Response:**
  * Code: 201

**Error Response:**
  * Code: 403 (Booking Conflict)
  * Code: 500 (Server Error)

## PUT

### Updating a room record

Endpoint: ```/rooms```

Expected Data Input: Object with updated information in application/json format 

Example: 
  ```sh
{ 
  "id": 1,
  "roomname": 'My Nice Home',
  "price": 100,
  "cleaningFee": 10,
  "serviceFee": 30,
  "maxAdults": 8,
  "maxChildren": 2,
  "maxInfants": 2,
  "minNights": 4,
  "maxNights": 10,
  "ratings": 10,
  "numReviews": 200,
  "tax": 20,
}
  ```

**Success Response:**
  * Code: 200

**Error Response:**
  * Code: 500


### Updating a booking for a room

Endpoint: ```/bookings```

Expected Data Input: Object with updated information in application/json format

Example: 
  ```sh
{
  "id": 20,
  "email": "Marquis_McClure@gmail.com",
  "adults": 4,
  "children": 0,
  "infants": 2,
  "checkin": "2019-08-03",
  "checkout": "2019-08-05",
  "roomId": 1
}
  ```

**Success Response:**
  * Code: 200

**Error Response:**
  * Code: 409 (Booking Conflict, Cannot be amended)
  * Code: 500 (Server Error)

## DELETE

### Deleting a room record

Endpoint: ```rooms/:id```

**Success Response:**
  * Code: 200

**Error Response:**
  * Code: 500

### Deleting a booking record

Endpoint: ```bookings/:id```

**Success Response:**
  * Code: 200

**Error Response:**
  * Code: 500

