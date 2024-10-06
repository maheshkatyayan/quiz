import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Timer() {
  const [roomKey, setRoomKey] = useState(''); // State for the room key input
  const [timeLeft, setTimeLeft] = useState(0); // Total time left in seconds
  const [isActive, setIsActive] = useState(false); // Initially set to false
  const [Timer, setTimer] = useState(null); // Initialize timer as null
  const navigate = useNavigate();

  // Fetch timer data from the API
  useEffect(() => {
    async function fetchTimer() {
      try {
        const response = await axios.get("http://localhost:5000/QuizSetUp/getSaveTimer");
        console.log("response", response.data[0]);
        setTimer(response.data[0]); // Set the first timer data
      } catch (error) {
        console.error("Error fetching timer:", error);
      }
    }

    fetchTimer();
  }, []);

  // Time calculation logic after the Timer state is set
  useEffect(() => {
    if (!Timer) return; // If Timer is not yet set, don't run this logic

    const d = new Date();
    const currentDateTime = d.toISOString();
    const currentDate = currentDateTime.slice(0, 10);
    const targetDate = Timer.date1.slice(0, 10);
    console.log("current dare",currentDate,targetDate)
    if (currentDate === targetDate) {
      setIsActive(true);

      const currentHours = d.getHours();
      const currentMinutes = d.getMinutes();
      const currentSeconds = d.getSeconds();

      const [targetHours, targetMinutes, targetSeconds] = Timer.time1.split(':').map(Number);

      const hoursDiff = targetHours - currentHours;
      const minutesDiff = targetMinutes - currentMinutes;
      const secondsDiff = targetSeconds - currentSeconds;

      // Convert the total time remaining into seconds
      const totalTimeLeft = (hoursDiff * 3600) + (minutesDiff * 60) + secondsDiff;
      setTimeLeft(totalTimeLeft);

      // Start countdown
      let interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    } else {
      console.log("Quiz is not scheduled for today.");
      setIsActive(false);
    }
  }, [Timer]); // Run this effect when Timer is set

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleKeySubmit = async () => {
    // Add your key submission logic here
  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
      { isActive ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Time Left to Quiz</h1>
          <div className="text-5xl font-mono text-gray-800 mb-6">
            {formatTime(timeLeft)}
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
      ) : (
        <div>
          <h1>Too soon</h1>
        </div>
      )}
    </div>
  );
}

export default Timer;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// const Counter = () => {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [roomKey, setRoomKey] = useState("");
  // const [timer, setTimer] = useState([
  //   { id: 0,value: " --- Select a State ---" }]);
//   const navigate = useNavigate();

//   useEffect(() => {
    // async function fetchTimer() {
    //   try {
    //     const response = await axios.get("http://localhost:5000/QuizSetUp/getSaveTimer");
    //     console.log("response",response.data[0])
    //     setTimer(response.data);
    //     console.log("timer->",timer[0])
    //     calculateTimeLeft()
    //   } catch (error) {
    //     console.error("Error fetching timer:", error);
    //   }
    // }

    // fetchTimer();
//   }, []);

 

//   useEffect(() => {
//     let interval = null;
//     if (timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timeLeft]);

//   const calculateTimeLeft = () => {
//     const currentDate = new Date();
//     console.log("timer[0]", timer)
//     const [targetHour, targetMinute,targetsecond] = timer[0].time.split(":").map(Number);
//     console.log(targetHour,targetMinute,targetsecond,"nrj")
//     const targetDate = new Date(timer.date);
//     targetDate.setHours(targetHour, targetMinute);

//     const timeDifference = Math.floor((targetDate - currentDate) / 1000);

//     if (timeDifference > 0) {
//       const hrs = Math.floor(timeDifference / 3600);
//       const mins = Math.floor((timeDifference % 3600) / 60);
//       const secs = timeDifference % 60;
//       setHours(hrs);
//       setMinutes(mins);
//       setSeconds(secs);
//       setTimeLeft(timeDifference);
//     } else {
//       console.log("The event time has already passed!");
//       setTimeLeft(0);
//     }
//   };
//   const formatTime = (time) => {
//     const hrs = Math.floor(time / 3600);
//     const mins = Math.floor((time % 3600) / 60);
//     const secs = time % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };
//   // calculateTimeLeft();

//   const handleKeySubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/events/accessingquizroombykey", { key: roomKey });

//       if (response.status === 200 && timeLeft <= 0) {
//         toast.success("Quiz room accessed successfully.");
//         navigate("/showquestion", { state: { roomKey } });
//       } else {
//         toast.error("Key not found or quiz not started yet.");
//       }
//     } catch (error) {
//       console.error("Error accessing quiz room:", error);
//       toast.error("An error occurred while accessing the room.");
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
//         <div className="text-5xl font-mono text-gray-800 mb-6">{formatTime(timeLeft)}</div>
//         <input
//           type="text"
//           placeholder="Enter Room Key"
//           value={roomKey}
//           onChange={(e) => setRoomKey(e.target.value)}
//           className="w-full p-2 mb-4 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleKeySubmit}
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Enter Room
//         </button>
//         <Toaster />
//       </div>
//     </div>
//   );
// };

// export default Counter;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

// function Timer() {
//   const [hours, setHours] = useState('00');
//   const [minutes, setMinutes] = useState('10');
//   const [seconds, setSeconds] = useState('59');
//   const [roomKey, setRoomKey] = useState(''); // State for the room key input
//   const navigate = useNavigate();

//   // Mock timer data
//   const timer = {
//     id: 62,
//     name: "Quiz1",
//     time: "13:37:00",
//     date: "2024-08-20T18:30:00.000Z"
//   };

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = new Date();
//       const targetDateTime = new Date(timer.date);
//       const targetTime = timer.time.split(':').map(Number);

//       // Adjust targetDateTime to match the exact target time
//       targetDateTime.setHours(targetTime[0]);
//       targetDateTime.setMinutes(targetTime[1]);
//       targetDateTime.setSeconds(targetTime[2]);

//       const timeDifference = targetDateTime - now;

//       if (timeDifference <= 0) {
//         // Time has reached, navigate to the showquestion page
//         //navigate("/showquestion");
//       } else {
//         const hrs = Math.floor(timeDifference / (1000 * 60 * 60));
//         const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//         const secs = Math.floor((timeDifference % (1000 * 60)) / 1000);
//         setHours(hrs);
//         setMinutes(mins);
//         setSeconds(secs);
//       }
//     };

//     updateCountdown(); // Initialize the countdown
//     const intervalId = setInterval(updateCountdown, 1000); // Update every second

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, [navigate, timer.date, timer.time]);

//   const formatTime = (time) => {
//     return time < 10 ? `0${time}` : time;
//   };

//   const handleKeySubmit = async () => {
//     // Add your key submission logic here
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
//         <div className="text-5xl font-mono text-gray-800 mb-6">
//           {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
//         </div>
//         <input
//           type="text"
//           placeholder="Enter Room Key"
//           value={roomKey}
//           onChange={(e) => setRoomKey(e.target.value)}
//           className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleKeySubmit}
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Enter Room
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Timer;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';


// function Timer() {
//   const [hours, setHours] = useState('00');
//   const [minutes, setMinutes] = useState('00');
//   const [seconds, setSeconds] = useState('10');
//   const [roomKey, setRoomKey] = useState(''); // State for the room key input
//   const navigate = useNavigate();

//   // Mock timer data
  // const timer = {
  //   id: 62,
  //   name: "Quiz1",
  //   time: "13:37:00",
  //   date: "2024-08-25T18:30:00.000Z"
  // };
      // const d = new Date();
      // const ate= d.toISOString();
      // const currentDate=ate.slice(0,10)
      // //console.log("currentDate",currentDate);
      // const targetDate=timer.date.slice(0,10)
      // //console.log("targetDate",targetDate)

      // let hourcurr = d.getHours();
      // let minutecurr=d.getMinutes();
      // let secondcurr=d.getSeconds();
      
      // const targettime = timer.time.split(':').map(Number);
      // console.log("targettime",targettime[1])
      // if(currentDate==targetDate){
      //   console.log("consolen hello")
      //   const hr=targettime[0]-hourcurr;
      //   const min=targettime[1]-minutecurr;
      //   const sec=targettime[2]-secondcurr;
      //   setHours(hr);
      //   setMinutes(min);
      //   setSeconds(sec);
      // }

//       const handleKeySubmit = async () => {
//         try {
//             // Show loading or disable the button to prevent multiple submissions
//             const response = await axios.post('http://localhost:5000/events/accessingquizroombykey', { key: roomKey });
            
//             if (response.status === 200) {
//                 navigate('/showquestion', { state: { roomKey } });
//             } else {
//                 console.log('Key not found or other error');
//                 // Display error message to the user
//             }
//         } catch (error) {
//             console.error('Error accessing quiz room:', error);
//             // Optionally, display error message to the user
//         }
//     };



//       const formatTime = (time) => {
//         return time < 10 ? `0${time}` : time;
//       };
    
//       return (
//         <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
//             <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
//             <div className="text-5xl font-mono text-gray-800 mb-6">
//               {hours}:{minutes}:{seconds}
//             </div>
//             <input
//               type="text"
//               placeholder="Enter Room Key"
//               value={roomKey}
//               onChange={(e) => setRoomKey(e.target.value)}
//               className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               onClick={handleKeySubmit}
//             >
//               Enter Room
//             </button>
//           </div>
//         </div>
//       );
//     }

// export default Timer;

{/* <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
        <div className="text-5xl font-mono text-gray-800 mb-6">
          {hours}:{minutes}:{seconds}
        </div>
        <input
          type="text"
          placeholder="Enter Room Key"
          value={roomKey}
          onChange={(e) => setRoomKey(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleKeySubmit}
        >
          Enter Room
        </button>
      </div>
    </div> */}
      // const handleKeySubmit = async () => {
  //   try {
  //     // Show loading or disable the button to prevent multiple submissions
  //     const response = await axios.post('http://localhost:5000/events/accessingquizroombykey', { key: roomKey });

  //     if (response.status === 200) {
  //       navigate('/showquestion', { state: { roomKey } });
  //     } else {
  //       console.log('Key not found or other error');
  //       // Display error message to the user
  //     }
  //   } catch (error) {
  //     console.error('Error accessing quiz room:', error);
  //     // Optionally, display error message to the user
  //   }
  // };