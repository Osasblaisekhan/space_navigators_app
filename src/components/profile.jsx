import React from 'react';

import { useSelector } from 'react-redux';

import './profile.css';

const Myprofile = () => {
  // const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rocket.rockets);
  // console.log('this are rocket', rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  // console.log('this are reserved rocket from profile', reservedRockets);

  // const handleCancelReservation = (id) => {
  //   dispatch(cancelReservation(id)); //
  // };

  return (
    <div className="container">
      <div className="reserved-rockets">
        <h2>My Rockets</h2>
        {/* {reservedRockets.length > 0 ? ( */}
        <ul className="reserved-list">
          {reservedRockets.map((rocket) => (
            <li key={rocket.id}>
              <h3>{rocket.name}</h3>
              {/* <p>{rocket.description}</p>
              <button type="button"
              onClick={() => handleCancelReservation(rocket.id)}>Cancel Reservation</button> */}
            </li>
          ))}
        </ul>
        {/* )
      : (
        <p>No reserved rockets please try to reserved a rocket.</p>
      )} */}

      </div>
    </div>
  );
};

export default Myprofile;
