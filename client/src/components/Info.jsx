import React from 'react';
import PropTypes from 'prop-types';
import css from '../../../public/dist/App.css';

const Info = (props) => {
  const { price, ratings, reviews } = props;

  return (
    <div className={css.roomInfo}>
      <div className={css.firstLine}>
        <div className={css.price}>
          $
          {price}
        </div>
        {' '}
        <span className={css.per}>  per night</span>
      </div>
      <div className={css.secondLine}>
        <div className={
          css.ratings}
        >
          <span className={css.outerStar}>
            <span className={css.innerStar} style={{ width: `${ratings}px` }} />
          </span>
          {' '}
        </div>
        {' '}
        <div className={
          css.reviews}
        >
          {reviews}

        </div>
      </div>
      <div className={css.thirdLine} />
    </div>
  );
};

Info.propTypes = {
  price: PropTypes.number,
  ratings: PropTypes.number,
  reviews: PropTypes.number,
};

Info.defaultProps = {
  price: 0,
  ratings: 0,
  reviews: 0,
};


export default Info;
