/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import css from '../../../public/dist/App.css';

const GuestPicker = (props) => {
  const {
    maxAdults,
    maxChildren,
    maxInfants,
    adults,
    numChildren,
    infants,
    increaseGuest,
    decreaseGuest,
    guestExpandToggle,
  } = props;

  return (
      <div className={css.picker}>
        <div>
          <div className={css.guestType}>
            Adults
            <div className={css.buttonSection}>
              <button type="submit" className={css.adults} id="adults" disabled={adults === 1} onClick={decreaseGuest}>- </button>
              <div className={css.countAdults}>{adults}</div>
              <button type="submit" className={css.adults} id="adults" disabled={adults === maxAdults} onClick={increaseGuest}> + </button>
            </div>
          </div>
          <div />
          <br />
          <br />
          <div className={css.guestType}>
            Children
            <div className={css.buttonSection}>
              <button type="submit" className={css.children} id="children" disabled={numChildren === 0} onClick={decreaseGuest}>-</button>
              <div className={css.count}>{numChildren}</div>
              <button type="submit" className={css.children} id="children" disabled={numChildren === maxChildren} onClick={increaseGuest}>+</button>
            </div>
          </div>
          <div className={css.guestTypeInfo}>Ages 2-12</div>
          <br />
          <div className={css.guestType}>
            Infants
            <div className={css.buttonSection}>
              <button type="submit" className={css.infants} id="infants" disabled={infants === 0} onClick={decreaseGuest}>-</button>
              <div className={css.count}>{infants}</div>
              <button type="submit" className={css.infants} id="infants" disabled={infants === maxInfants} onClick={increaseGuest}>+</button>
            </div>
          </div>
          <div className={css.guestTypeInfo}>Under 2</div>
        </div>
        <br />
        <div>
          {`${maxAdults} guest maximum. `}
          {`${maxChildren} children and ${maxInfants} infants are allowed in this room.`}
        </div>
        <button type="submit" className={css.close} onClick={guestExpandToggle}>Close</button>
      </div>
  );
};

GuestPicker.propTypes = {
  maxAdults: PropTypes.number,
  maxChildren: PropTypes.number,
  maxInfants: PropTypes.number,
  adults: PropTypes.number,
  numChildren: PropTypes.number,
  infants: PropTypes.number,
  increaseGuest: PropTypes.func,
  decreaseGuest: PropTypes.func,
  guestExpandToggle: PropTypes.func,
};

GuestPicker.defaultProps = {
  maxAdults: 1,
  maxChildren: 1,
  maxInfants: 1,
  adults: 0,
  numChildren: 0,
  infants: 0,
  increaseGuest: () => { },
  decreaseGuest: () => { },
  guestExpandToggle: () => { },
};


export default GuestPicker;
