import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="header">
    <div className="nav">
      <h1>Space Travelers' Hub</h1>
      <ul>
        <li>
          <Link to="/">Rockets</Link>
        </li>
        <li>
          <Link to="/missions">Missions |</Link>
        </li>
        <li>
          <Link to="/my profile">My profile</Link>
        </li>
      </ul>
    </div>
    <p />
  </div>
);

export default Navbar;
