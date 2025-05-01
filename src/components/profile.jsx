import React from 'react';

import { useSelector } from 'react-redux';

import './profile.css';

const Myprofile = () => {
  // const dispatch = useDispatch();
  const missions = useSelector((state) => state.rocketMission.missions);
  // console.log(missions);
  const joinedMission = missions.filter((mission) => mission.joinedMission);
  const rockets = useSelector((state) => state.rocketMission.rockets);
  // console.log('this are rocket', rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  // console.log('this are reserved rocket from profile', reservedRockets);

  // const handleCancelReservation = (id) => {
  //   dispatch(cancelReservation(id)); //
  // };

  return (
    <div className="containers">

      <div className="reservedmision">
        <h1>My Mission</h1>
        <div className="reserved-missions">
          <ul>
            {
        joinedMission.map((reserved) => <li key={reserved.id}><h2>{reserved.name}</h2></li>)
    }
          </ul>
        </div>
      </div>

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
