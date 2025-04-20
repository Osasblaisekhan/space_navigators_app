import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Missions from './missions';
import Rockets from './rocketList';
import Myprofile from './profile';
import Navbar from './navbar';
import './App.css';
import Timer from './time';

const App = () => (
  <div className="container">
    <Router>
      <Navbar />
      <h2 className="time"><Timer /></h2>
      <Routes>
        <Route path="/" exact element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/profile" element={<Myprofile />} />
      </Routes>
    </Router>
  </div>
);

export default App;
