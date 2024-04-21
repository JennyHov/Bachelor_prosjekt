import React, { useState, useEffect } from 'react';
import '../../css/countdown.css'; // Import the CSS file

const Countdown = () => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`2024-05-23`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, i) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span key={i}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="countdown-container d-flex justify-content-center align-items-center">
      <p className="countdown-content">Next deadline in: {timerComponents.length ? timerComponents : <span>Time's up!</span>} </p>
    </div>
  );
};

export default Countdown;