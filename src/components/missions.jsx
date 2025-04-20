import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchMissions, joinedMission, leavedMission } from '../slice';

// import { fetchMissions, joinedMission, leavedMission } from '../missionSlice';

import './missions.css';

const Missions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const missions = useSelector((state) => state.rocketMission.missions);
  const error = useSelector((state) => state.rocketMission.error);

  const handleJoinedMission = (id, isJoined) => {
    if (isJoined) {
      dispatch(leavedMission(id));
    } else {
      dispatch(joinedMission(id));
    }
  };

  if (error) {
    return (
      <>
        <h2>Mission</h2>
        <p>
          Error:
          {error}
        </p>
      </>
    );
  }

  return (
    <div className="mission">
      <h2>Mission List</h2>

      <div className="mission-content">
        <table>
          <thead>
            <tr className="contents">
              <th>Mission</th>
              <th>Description</th>
              <th>Status</th>
              <th>
                <button className="new-btn" type="button" aria-label="Add new mission">+</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
                    missions.map((mission) => (
                      <tr key={mission.id} className="content">
                        <td className="content-name">{mission.name}</td>
                        <td>{mission.description}</td>

                        <td className="button">
                          {
                                mission.joinedMission
                                  ? <button type="button" className="active-member"> A MEMBER</button> : <button type="button" className="not-member">NOT A MEMBER</button>
                            }

                        </td>
                        <td className="button">
                          <button
                            type="button"
                            className={mission.joinedMission ? 'leave-button' : 'join-button'}
                            onClick={() => handleJoinedMission(mission.id, mission.joinedMission)}
                            aria-label={mission.joinedMission ? `Leave mission ${mission.name}` : `Join mission ${mission.name}`}
                          >
                            {
                                mission.joinedMission ? 'LEAVE MISSION' : 'JOINED MISSION'
                            }
                          </button>
                        </td>
                      </tr>
                    ))
                   }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Missions;
