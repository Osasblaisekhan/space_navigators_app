import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Missions from './missions';

import Rockets from './rockets';

import Myprofile from './profile';

import Navbar from './navbar';

import './App.css';

const App = () => (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/my profile" element={<Myprofile />} />
      </Routes>
    </Router>
  </>
);

export default App;
