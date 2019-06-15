import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 600,
  duration: '30s',
  rps: 600,
};

const getRooms = id => http.get(`http://localhost:3000/api/rooms/${id}/basicinfo`);

const getBookings = id => http.get(`http://localhost:3000/api/rooms/${id}/bookings`);

const postBooking = (roomId) => {
  const url = 'http://localhost:3000/api/bookings';
  const payload = JSON.stringify({
    roomId,
    email: 'k6@gmail.com',
    adults: 2,
    children: 0,
    infants: 0,
    checkin: '2019-06-12',
    checkout: '2019-06-13',
  });
  const params = { headers: { 'Content-Type': 'application/json' } };
  return http.post(url, payload, params);
};

export default function () {
  let res;
  const num = Math.random();
  const id = Math.ceil(Math.random() * 10000000);
  if (num < 0.475) {
    res = getRooms(id);
  } else if (num < 0.95) {
    res = getBookings(id);
  } else {
    res = postBooking(id);
  }

  check(res, {
    'is status 200, 201, 202': r => (r.status === 200 || r.status === 201 || r.status === 202),
    'is status 404': r => r.status === 404,
    'is status 500': r => r.status === 500,
    'transaction time OK': r => r.timings.duration < 2000,
  });
}

// 200 get request successful
// 201 post request successful
// 202 post request conflict
// 500 server error
