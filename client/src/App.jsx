/* eslint-disable import/extensions */
import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import Info from './components/Info.jsx';
import Form from './components/Form.jsx';
import css from '../../public/dist/App.css';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 1,
      roomInfo: {
        roomname: '',
        price: 0,
        cleaningFee: 0,
        serviceFee: 0,
        tax: 0,
        maxAdults: 0,
        maxChildren: 0,
        maxInfants: 0,
        minNights: 0,
        maxNights: 0,
        ratings: 0,
        numReviews: 0,
      },
      bookedDates: [],
      rendering: true,
    };

    this.getRoomData = this.getRoomData.bind(this);
    this.getBookingData = this.getBookingData.bind(this);
    this.updateRoomState = this.updateRoomState.bind(this);
    this.updateBookedDates = this.updateBookedDates.bind(this);
    this.handleRendering = this.handleRendering.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    const roomId = Number(window.location.pathname.split('/')[2]) || 1;
    this.setState({
      roomId,
    }, this.initialize);
  }

  getRoomData() {
    const { roomId } = this.state;
    axios.get(`/rooms/${roomId}/basicinfo`)
    .then(result => this.updateRoomState(result.data))
    .catch(err => console.log(err));
  }

  getBookingData() {
    const { roomId } = this.state;
    axios.get(`/rooms/${roomId}/bookings`)
    .then(result => this.updateBookedDates(result.data))
    .catch(err => console.log(err));
  }

  initialize() {
    this.getRoomData();
    this.getBookingData();
  }

  handleRendering() {
    this.setState({
      rendering: false,
    });
  }

  updateBookedDates(results) {
    const bookedDates = [];
    results.forEach((data) => {
      const nights = moment(data.checkout).diff(data.checkin, 'd');
      for (let i = 0; i < nights; i += 1) {
        bookedDates.push(moment(data.checkin, 'YYYY-MM-DD').add(i, 'd'));
      }
    });
    this.setState({
      bookedDates,
    });
  }

  updateRoomState(result) {
    this.setState({
      roomInfo: result,
    });
  }


  render() {
    const {
      roomId, roomInfo, bookedDates, rendering,
    } = this.state;
    const divStyle = {
      height: '16px', width: '16px', display: 'block', fill: 'rgb(118, 118, 118)',
    };
    const app = (
      <div className={css.app}>
        <button type="submit" className={css.xbutton} onClick={this.handleRendering}>
          <svg viewBox="0 0 24 24" role="img" aria-label="Close" focusable="false" style={divStyle}>
            <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fillRule="evenodd" />
          </svg>
        </button>
        <div>
          <Info
            price={roomInfo.price}
            reviews={roomInfo.numreviews}
            ratings={roomInfo.ratings}
          />
        </div>
        <div className={css.dividingSection} />
        <div>
          <Form
            maxAdults={roomInfo.maxadults}
            maxChildren={roomInfo.maxchildren}
            maxInfants={roomInfo.maxinfants}
            price={roomInfo.price}
            cleaningFee={roomInfo.cleaningfee}
            serviceFee={roomInfo.servicefee}
            tax={roomInfo.tax}
            minNights={roomInfo.minnights}
            maxNights={roomInfo.maxnights}
            bookedDates={bookedDates}
            roomId={roomId}
            roomname={roomInfo.roomname}
            reviews={roomInfo.numreviews}
            ratings={roomInfo.ratings}
            getBookingData={this.getBookingData}
          />
        </div>

        <div className={css.notYet}>You won’t be charged yet</div>
        <div className={css.dividingSection} />
        <div className={css.image}>
          <div className={css.lower}>New lower price</div>
          <div className={css.lowerPrice}>Price for your trip dates was just lowered by $71.</div>
        </div>
      </div>
    );

    return (
      <div style={{ float: 'right', display: 'stikcy' }}>
        {rendering ? app : null}
      </div>
    );
  }
}
