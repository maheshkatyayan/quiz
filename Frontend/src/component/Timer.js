import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const Counter = () => {
  const [hours, setHours] = useState('1');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [roomKey, setRoomKey] = useState('');
  const navigate = useNavigate();

  const timer = {
    id: 62,
    name: "Quiz1",
    time: "00:20:00",
    date: "2024-08-28T18:30:00.000Z"
  };
  const showmesomething=()=>{
  const d = new Date();
  const ate= d.toISOString()
  const currentDate=ate.slice(0,10)
  const targetDate=timer.date.slice(0,10)
  console.log(d)
 
  let hourcurr = d.getHours();
  let minutecurr=d.getMinutes();
  let secondcurr=d.getSeconds();
  console.log(hourcurr,minutecurr,secondcurr,ate)
  
  const targettime = timer.time.split(':').map(Number);
  console.log("targettime",targettime[0],targettime[1],targettime[2],currentDate,targetDate)
  if(currentDate===targetDate){
    console.log("consolen hello")
    const hr=targettime[0]-hourcurr;
    const min=targettime[1]-minutecurr;
    const sec=targettime[2]-secondcurr;
    console.log("time",hr,min,sec)
    setHours(hr);
    setMinutes(min);
    setSeconds(sec);
    console.log("totalTime",totalTime)
    const totalTime =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setTimeLeft(totalTime);
  }
}
  

  useEffect(() => {
    showmesomething()
    let interval = null;
    if ( timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    else if(timeLeft<0){
      setIsActive(false)
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);



  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleKeySubmit = async () => {
    try {
      // Show loading or disable the button to prevent multiple submissions
      const response = await axios.post('http://localhost:5000/events/accessingquizroombykey', { key: roomKey });
      
      if (response.status === 200 && timeLeft<=0) {
        toast.success('just give me one minute')
        setIsActive(false)
        navigate('/showquestion', { state: { roomKey } });
      } else {
          console.log('Key not found or other error');
        toast.error('Key not found or other error')
      }
  } catch (error) {
      console.error('Error accessing quiz room:', error);
  }

  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
      {isActive && (<div className="text-5xl font-mono text-gray-800 mb-6">
      {formatTime(timeLeft)}
      </div>)}
      <input
        type="text"
        placeholder="Enter Room Key"
        value={roomKey}
        onChange={(e) => setRoomKey(e.target.value)}
        className="w-full p-2 mb-4 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleKeySubmit}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Enter Room
      </button>
      <Toaster />
    </div>
  </div>
  );
};

export default Counter;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

// function Timer() {
//   const [hours, setHours] = useState('00');
//   const [minutes, setMinutes] = useState('00');
//   const [seconds, setSeconds] = useState('00');
//   const [roomKey, setRoomKey] = useState(''); // State for the room key input
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isActive, setIsActive] = useState(true);
//   const navigate = useNavigate();

//   // Mock timer data
  // const timer = {
  //   id: 62,
  //   name: "Quiz1",
  //   time: "13:37:00",
  //   date: "2024-08-20T18:30:00.000Z"
  // };
  

//   useEffect(() => {
    // const d = new Date();
    // const ate= d.toISOString();
    // const currentDate=ate.slice(0,10)
    // const targetDate=timer.date.slice(0,10)
   
  
    // let hourcurr = d.getHours();
    // let minutecurr=d.getMinutes();
    // let secondcurr=d.getSeconds();
    
    // const targettime = timer.time.split(':').map(Number);
    // console.log("targettime",targettime[1])
    // if(currentDate===targetDate){
    //   console.log("consolen hello")
    //   const hr=targettime[0]-hourcurr;
    //   const min=targettime[1]-minutecurr;
    //   const sec=targettime[2]-secondcurr;
    //   setHours(hr);
    //   setMinutes(min);
    //   setSeconds(sec);

//     let interval = null;
//     if (isActive && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((timeLeft) => timeLeft - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       clearInterval(interval);
//       setIsActive(false);
//     }
//     return () => clearInterval(interval);
//     } 
//   }, []);

  

//   const formatTime = (time) => {
//     const hrs = Math.floor(time / 3600);
//     const mins = Math.floor((time % 3600) / 60);
//     const secs = time % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

  // const handleKeySubmit = async () => {
  //   // Add your key submission logic here
  // };

//   return (
    // <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
    //   <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
    //     <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
    //     <div className="text-5xl font-mono text-gray-800 mb-6">
    //     {formatTime(timeLeft)}
    //     </div>
    //     <input
    //       type="text"
    //       placeholder="Enter Room Key"
    //       value={roomKey}
    //       onChange={(e) => setRoomKey(e.target.value)}
    //       className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <button
    //       onClick={handleKeySubmit}
    //       className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //     >
    //       Enter Room
    //     </button>
    //   </div>
    // </div>
//   );
// }

// export default Timer;


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from "react-router-dom";

// // function Timer() {
// //   const [hours, setHours] = useState('00');
// //   const [minutes, setMinutes] = useState('10');
// //   const [seconds, setSeconds] = useState('59');
// //   const [roomKey, setRoomKey] = useState(''); // State for the room key input
// //   const navigate = useNavigate();

// //   // Mock timer data
//   // const timer = {
//   //   id: 62,
//   //   name: "Quiz1",
//   //   time: "13:37:00",
//   //   date: "2024-08-20T18:30:00.000Z"
//   // };

// //   useEffect(() => {
// //     const updateCountdown = () => {
// //       const now = new Date();
// //       const targetDateTime = new Date(timer.date);
// //       const targetTime = timer.time.split(':').map(Number);

// //       // Adjust targetDateTime to match the exact target time
// //       targetDateTime.setHours(targetTime[0]);
// //       targetDateTime.setMinutes(targetTime[1]);
// //       targetDateTime.setSeconds(targetTime[2]);

// //       const timeDifference = targetDateTime - now;

// //       if (timeDifference <= 0) {
// //         // Time has reached, navigate to the showquestion page
// //         //navigate("/showquestion");
// //       } else {
// //         const hrs = Math.floor(timeDifference / (1000 * 60 * 60));
// //         const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
// //         const secs = Math.floor((timeDifference % (1000 * 60)) / 1000);
// //         setHours(hrs);
// //         setMinutes(mins);
// //         setSeconds(secs);
// //       }
// //     };

// //     updateCountdown(); // Initialize the countdown
// //     const intervalId = setInterval(updateCountdown, 1000); // Update every second

// //     return () => clearInterval(intervalId); // Cleanup interval on component unmount
// //   }, [navigate, timer.date, timer.time]);

// //   const formatTime = (time) => {
// //     return time < 10 ? `0${time}` : time;
// //   };

  // const handleKeySubmit = async () => {
  //   // Add your key submission logic here
  // };

// //   return (
// //     <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
// //       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
// //         <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
// //         <div className="text-5xl font-mono text-gray-800 mb-6">
// //           {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
// //         </div>
// //         <input
// //           type="text"
// //           placeholder="Enter Room Key"
// //           value={roomKey}
// //           onChange={(e) => setRoomKey(e.target.value)}
// //           className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <button
// //           onClick={handleKeySubmit}
// //           className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         >
// //           Enter Room
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Timer;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import axios from 'axios';


// // function Timer() {
// //   const [hours, setHours] = useState('00');
// //   const [minutes, setMinutes] = useState('00');
// //   const [seconds, setSeconds] = useState('10');
// //   const [roomKey, setRoomKey] = useState(''); // State for the room key input
// //   const navigate = useNavigate();

// //   // Mock timer data
//   // const timer = {
//   //   id: 62,
//   //   name: "Quiz1",
//   //   time: "13:37:00",
//   //   date: "2024-08-25T18:30:00.000Z"
//   // };
//       // const d = new Date();
//       // const ate= d.toISOString();
//       // const currentDate=ate.slice(0,10)
//       // //console.log("currentDate",currentDate);
//       // const targetDate=timer.date.slice(0,10)
//       // //console.log("targetDate",targetDate)

//       // let hourcurr = d.getHours();
//       // let minutecurr=d.getMinutes();
//       // let secondcurr=d.getSeconds();
      
//       // const targettime = timer.time.split(':').map(Number);
//       // console.log("targettime",targettime[1])
//       // if(currentDate==targetDate){
//       //   console.log("consolen hello")
//       //   const hr=targettime[0]-hourcurr;
//       //   const min=targettime[1]-minutecurr;
//       //   const sec=targettime[2]-secondcurr;
//       //   setHours(hr);
//       //   setMinutes(min);
//       //   setSeconds(sec);
//       // }

// //       const handleKeySubmit = async () => {
// //         try {
// //             // Show loading or disable the button to prevent multiple submissions
// //             const response = await axios.post('http://localhost:5000/events/accessingquizroombykey', { key: roomKey });
            
// //             if (response.status === 200) {
// //                 navigate('/showquestion', { state: { roomKey } });
// //             } else {
// //                 console.log('Key not found or other error');
// //                 // Display error message to the user
// //             }
// //         } catch (error) {
// //             console.error('Error accessing quiz room:', error);
// //             // Optionally, display error message to the user
// //         }
// //     };



// //       const formatTime = (time) => {
// //         return time < 10 ? `0${time}` : time;
// //       };
    
// //       return (
// //         <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
// //           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
// //             <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
// //             <div className="text-5xl font-mono text-gray-800 mb-6">
// //               {hours}:{minutes}:{seconds}
// //             </div>
// //             <input
// //               type="text"
// //               placeholder="Enter Room Key"
// //               value={roomKey}
// //               onChange={(e) => setRoomKey(e.target.value)}
// //               className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             <button
// //               className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //               onClick={handleKeySubmit}
// //             >
// //               Enter Room
// //             </button>
// //           </div>
// //         </div>
// //       );
// //     }

// // export default Timer;

// {/* <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] h-screen flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Quiz Timer</h1>
//         <div className="text-5xl font-mono text-gray-800 mb-6">
//           {hours}:{minutes}:{seconds}
//         </div>
//         <input
//           type="text"
//           placeholder="Enter Room Key"
//           value={roomKey}
//           onChange={(e) => setRoomKey(e.target.value)}
//           className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={handleKeySubmit}
//         >
//           Enter Room
//         </button>
//       </div>
//     </div> */}
//       // const handleKeySubmit = async () => {
//   //   try {
//   //     // Show loading or disable the button to prevent multiple submissions
//   //     const response = await axios.post('http://localhost:5000/events/accessingquizroombykey', { key: roomKey });

//   //     if (response.status === 200) {
//   //       navigate('/showquestion', { state: { roomKey } });
//   //     } else {
//   //       console.log('Key not found or other error');
//   //       // Display error message to the user
//   //     }
//   //   } catch (error) {
//   //     console.error('Error accessing quiz room:', error);
//   //     // Optionally, display error message to the user
//   //   }
//   // };