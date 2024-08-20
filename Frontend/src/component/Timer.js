import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Timer() {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [roomKey, setRoomKey] = useState(''); // State for the room key input
  const navigate = useNavigate();

  // Mock timer data
  const timer = {
    id: 62,
    name: "Quiz1",
    time: "13:37:00",
    date: "2024-08-20T18:30:00.000Z"
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetDateTime = new Date(timer.date);
      const targetTime = timer.time.split(':').map(Number);

      // Adjust targetDateTime to match the exact target time
      targetDateTime.setHours(targetTime[0]);
      targetDateTime.setMinutes(targetTime[1]);
      targetDateTime.setSeconds(targetTime[2]);

      const timeDifference = targetDateTime - now;

      if (timeDifference <= 0) {
        // Time has reached, navigate to the showquestion page
        navigate("/showquestion");
      } else {
        const hrs = Math.floor(timeDifference / (1000 * 60 * 60));
        const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setHours(hrs);
        setMinutes(mins);
        setSeconds(secs);
      }
    };

    updateCountdown(); // Initialize the countdown
    const intervalId = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [navigate, timer.date, timer.time]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleKeySubmit = async () => {
    // Add your key submission logic here
  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
        <div className="text-5xl font-mono text-gray-800 mb-6">
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
        <input
          type="text"
          placeholder="Enter Room Key"
          value={roomKey}
          onChange={(e) => setRoomKey(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleKeySubmit}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enter Room
        </button>
      </div>
    </div>
  );
}

export default Timer;
