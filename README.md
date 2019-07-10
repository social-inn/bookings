# Social Inn Bookings

> Bookings module for a short-term housing reservation app

## Table of Contents

* [Stack](#stack)
* [Demo](#demo)
* [How To Use](#how-to-use)
* [Requirements](#requirements)
* [RESTful API routes](#restful-api-routes)
* [Related Projects](#related-projects)

## Stack

Front-end: JavaScript, React, Webpack
<br />
Back-end: Node.js, Express
<br />
Database: PostgreSQL
<br />
Testing: Jest, Enzyme, CirceCI, k6, New Relic 

## Demo

<br />
<p >
    <img src="demo.gif?raw=true" height="400px"/>
</p> 

## How To Use

```bash
# clone this repository
$ git clone https://github.com/social-inn/bookings.git

# install dependencies
$ npm install

# create and seed mysql database
$ mysql -u root < db/schema.sql [-p]

# compile/transpile files with webpack
$ npm run build

# configure postgres connection to local settings >> db/index.js

# run the app!
$ npm run start
```

## Requirements

- [npm](http://npmjs.com)
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com)


## RESTful API Routes

1. [GET](#1-get)
2. [POST](#2-post)
3. [PUT](#3-put)
4. [DELETE](#4-delete)

### 1. GET


#### Rooms and Booking Information

Endpoint: ```/api/rooms/:id```  

**Success Response**:
  * An array of objects containing basic room and booking information with param ```id```
  * Response Code: 200
  * Expected Content:

```
[
    {
        "id": 4,
        "roomname": "Timmy Beatty Jr.'s Cute Flat FL 15270",
        "price": 459,
        "cleaningfee": 28,
        "servicefee": 37,
        "maxadults": 7,
        "maxchildren": 3,
        "maxinfants": 5,
        "minnights": 7,
        "maxnights": 28,
        "ratings": 40,
        "numreviews": 113,
        "tax": 46,
        "checkin": "2019-07-29T07:00:00.000Z",
        "checkout": "2019-08-07T07:00:00.000Z"
    },
    {
        "id": 4,
        "roomname": "Timmy Beatty Jr.'s Cute Flat FL 15270",
        "price": 459,
        "cleaningfee": 28,
        "servicefee": 37,
        "maxadults": 7,
        "maxchildren": 3,
        "maxinfants": 5,
        "minnights": 7,
        "maxnights": 28,
        "ratings": 40,
        "numreviews": 113,
        "tax": 46,
        "checkin": "2019-09-13T07:00:00.000Z",
        "checkout": "2019-09-15T07:00:00.000Z"
    }
]
```

**Error Response**: 
  * Response Code: 404


### 2. POST


#### Creating a room record

Endpoint: ```/rooms```

Expected Input: Object in application/json format

Example: 
```
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



#### Creating a booking

Endpoint: ```/bookings```

Expected Data Input: Object in application/json format

Example: 
```
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
  * Code: 201 (Successful booking made)
  * Code: 202 (Booking Conflict, No bookings made)

**Error Response:**
  * Code: 500 (Server Error)

### 3. PUT


#### Updating a room record

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



#### Updating a booking for a room

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

### 4. DELETE


#### Deleting a room record

Endpoint: ```rooms/:id```

**Success Response:**
  * Code: 200

**Error Response:**
  * Code: 500


#### Deleting a booking record

Endpoint: ```bookings/:id```

**Success Response:**
  * Code: 200

**Error Response:**
  * Code: 500


## Related Projects

- https://github.com/social-inn/proxy
- https://github.com/social-inn/recommended-homes
