import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(2);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    let intervalId;  

    if (isActive) {
      intervalId = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          navigate("/showquestion")
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours(hours - 1);
              setMinutes(59);
            } else {
              setMinutes(minutes - 1);
            }
            setSeconds(59);
          } else {
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
    }

  }, [isActive, seconds, minutes, hours]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="h-screen flex items-center justify-center text-white">
      <div className='formwapper'>
        <p>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </p>
      </div>
    </div>
  );
}

export default Timer;
