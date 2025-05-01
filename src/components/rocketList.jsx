import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchRockets, reserveRocket, cancelReservation } from '../slice';

import './rocketList.css';

const Rockets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const rockets = useSelector((state) => state.rocketMission.rockets);
  // console.log(rockets);
  const loading = useSelector((state) => state.rocketMission.loading);
  // console.log(loading);
  const error = useSelector((state) => state.rocketMission.error);
  // console.log(error);

  const handleToggleReservation = (id, isReserved) => {
    if (isReserved) {
      dispatch(cancelReservation(id));
    } else {
      dispatch(reserveRocket(id));
    }
  };

  if (loading) {
    return <div>task loading...</div>;
  }
  if (error) {
    return (
      <p>
        This page
        {error}
      </p>
    );
  }
  return (
    <div className="general-container">
      <div className="container-one">
        <ul className="item-container">
          {
            rockets.map((rocket) => (
              <li key={rocket.id} className="container-two">

                <div className="content-one">
                  <img src={rocket.flickr_images[0]} alt={rocket.name} />
                </div>

                <div className="content-two">
                  <h2>{rocket.name}</h2>
                  {rocket.reserved
                    ? <button type="button" className="reserved-one">Reserved</button> : ''}
                  <p>{rocket.description}</p>

                  <button className={rocket.reserved ? 'reserved' : 'not-reserved'} type="button" onClick={() => handleToggleReservation(rocket.id, rocket.reserved)}>
                    {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
                  </button>

                </div>

              </li>
            ))
          }

          {
            rockets.map((rocket) => (
              <li key={rocket.id} className="container-two">

                <div className="content-one">
                  <img src={rocket.flickr_images[1]} alt={rocket.name} />
                </div>

                <div className="content-two">
                  <h2>{rocket.name}</h2>
                  {rocket.reserved
                    ? <button type="button" className="reserved-one">Reserved</button> : ''}
                  <p>{rocket.description}</p>

                  <button className={rocket.reserved ? 'reserved' : 'not-reserved'} type="button" onClick={() => handleToggleReservation(rocket.id, rocket.reserved)}>
                    {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
                  </button>

                </div>

              </li>
            ))
          }
        </ul>

      </div>

    </div>
  );
};

export default Rockets;
