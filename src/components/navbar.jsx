import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import myImage from '../assets/Capture.PNG';

import './navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="header">
      <nav className="nav">
        <div className="logo">
          <img src={myImage} alt="loading..." />
          <h1>Space Travelers Hub</h1>
        </div>
        <ul>
          <li>
            <Link
              className={`link ${activeLink === '/' ? 'active' : ''}`}
              to="/"
              onClick={() => handleLinkClick('/')}
            >
              Rockets
            </Link>
          </li>

          <li>
            <Link
              className={`link ${activeLink === '/missions' ? 'active' : ''}`}
              to="/missions"
              onClick={() => handleLinkClick('/missions')}
            >
              Missions
            </Link>
          </li>
          <li className="line">|</li>

          <li>
            <Link
              className={`link ${activeLink === '/profile' ? 'active' : ''}`}
              to="/profile"
              onClick={() => handleLinkClick('/profile')}
            >
              My profile
            </Link>
          </li>

          <li>
            <Link
              className={`link ${activeLink === '/calender' ? 'active' : ''}`}
              to="/calender"
              onClick={() => handleLinkClick('/calender')}
            >
              Calender
            </Link>
          </li>

          <li>
            <Link
              className={`link ${activeLink === '/count' ? 'active' : ''}`}
              to="/count"
              onClick={() => handleLinkClick('/count')}
            >
              Qrcode
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
