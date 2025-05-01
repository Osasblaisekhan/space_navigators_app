import React, { useState } from 'react';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

const Calender = () => {
  const [date, setDate] = useState(new Date());
  //   console.log(date);
  const handleDisplay = () => {
    setDate(date);
  };
  return (
    <div className="calender-box">
      <div>
        <Calendar onChange={() => handleDisplay()} value={date} />
        {/* {console.log('yooooo', date)} */}
      </div>

    </div>
  );
};

export default Calender;
