import React, { useEffect, useState } from 'react';

import './App.css';

const Timer = () => {
  const [time, setTime] = useState('');
  const timeDate = (time) => {
    const prop = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return time.toLocaleString('en-US', prop);
  };
  useEffect(() => {
    setInterval(() => {
      const d = new Date();
      setTime(() => timeDate(d));
    });
  }, []);
  return (
    <div className="time-date">
      <h3>{time}</h3>
    </div>
  );
};

export default Timer;
