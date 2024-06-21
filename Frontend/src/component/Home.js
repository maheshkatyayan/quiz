// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import NavBar from './Nav.js';
// import logo2 from '../image/th-removebg-preview.png';

// const Home = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/readtoken', { withCredentials: true });
//         if (response.data.success) {
//           setUser(response.data.user);
//         }
//       } catch (error) {
//         console.error('Error checking auth:', error);
//       }
//     };
//     checkAuth();
//   }, []);

//   const About_us = () => {
//     navigate('/About_us');
//   };

//   const handleClientLogin = () => {
//     navigate('/Clientlogin');
//   };

//   const handleAdminLogin = () => {
//     navigate('/Adminlogin');
//   };


//   const handleQuizroom = () => {
//     if (user) {
//       navigate('/Timer');
//     } else {
//       navigate('/notlogin');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
//       setUser(null);
//       navigate('/home');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleBuzzer = () => {
//     navigate('/buzzer');
//   };



//   return (
//     <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] text-white min-h-screen flex flex-col justify-between relative">
//           <NavBar />
//       {/* Hero Section */}
//       <div className='flex flex-row'>
//       <div className="container mx-auto flex flex-col items-center text-center py-24 px-6">
//         <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 ">
//           Welcome to <br /> Inquizitive Club
//         </h1>
//         <p className="text-lg md:text-xl lg:text-2xl mb-8">
//           A new Pantone color whose courageous presence encourages <br /> personal inventiveness and creativity.
//         </p>
//         <div className="space-x-4">
//           <button onClick={handleBuzzer} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
//             Buzzer Room
//           </button>
//           <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-500">
//             Class Room
//           </button>
//         </div>
//       </div>
//         <div >
//           <img src="https://tse1.mm.bing.net/th?id=OIP.9FTbTOvgjccAz3rOCepNxwHaGM&pid=Api&P=0&h=180"  />
//         </div>
//     </div>
//     </div>
//   );
// };

// export default Home;

// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import axios from 'axios';


// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5000/readtoken", { withCredentials: true });
// //         if (response.data.success) {
// //           setUser(true);
// //         }
// //       } catch (error) {
// //         console.error("Error checking auth:", error);
// //       }
// //     };
// //     checkAuth();
// //   }, []);

// //   const About_us = () => {
// //     navigate("/About_us");
// //   };

// //   const handleClientLogin = () => {
// //     navigate("/Clientlogin");
// //   };

// //   const handleAdminLogin = () => {
// //     navigate("/Adminlogin");
// //   };

// //   const handleQuizroom = () => {
// //     if (user) {
// //       navigate("/Timer");
// //     } else {
// //       navigate("/notlogin")
// //     }
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
// //       setUser(null);
// //       navigate("/home");
// //     } catch (error) {
// //       console.error("Error logging out:", error);
// //     }
// //   };

// //   const handelbuzzer = () => {
// //     navigate("/buzzer")
// //   }

// //   const handeladminebuzzer = () => {
// //     navigate("/adminebuzzer")
// //   }

// //   return (
// //     <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white min-h-screen flex flex-col justify-between relative">
// //       {/* Navigation */}
// //       <nav className="container mx-auto p-6 flex justify-between items-center">
// //         <div className="text-xl font-bold">COLORCODE</div>
// //         <div className="space-x-6 flex">
// //           <a href="#" className="text-white">Home</a>
// //           <a href="#" className="text-gray-300 hover:text-white">Color Systems</a>
// //           <a href="#" className="text-gray-300 hover:text-white">Shop</a>
// //           <a href="#" className="text-gray-300 hover:text-white">About</a>
// //         </div>
// //         <div className="space-x-4 flex">
// //           <a href="#" className="text-gray-300 hover:text-white">Log in</a>
// //           <a href="#" className="bg-black text-white px-4 py-2 rounded">Try for free</a>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <div className="container mx-auto flex flex-col items-center text-center py-24 px-6">
// //         <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
// //           The new <br /> Color Theme
// //         </h1>
// //         <p className="text-lg md:text-xl lg:text-2xl mb-8">
// //           A new Pantone color whose courageous presence encourages <br /> personal inventiveness and creativity.
// //         </p>
// //         <div className="space-x-4">
// //           <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
// //             Start Learning
// //           </button>
// //           <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200">
// //             Watch Video
// //           </button>
// //         </div>
// //       </div>

// //       {/* Decorative Elements */}
// //       <div className="absolute inset-0 flex items-center justify-center -z-10">
// //         <div className="w-full h-full relative">
// //           {/* Replace with actual images */}
// //           <img src="https://tse3.mm.bing.net/th?id=OIP.QrXqKG_hGsR9qOSODO8m2QHaGw&pid=Api&P=0&h=180"  className="absolute top-1/4 left-1/4 w-64 h-64 opacity-50" /> {/* Image 1 */}
// //           <img src="https://tse1.mm.bing.net/th?id=OIP.JgZTixgY5htCWowt6_mr1QHaFj&pid=Api&P=0&h=180" alt="Decorative" className="absolute bottom-1/3 right-1/3 w-48 h-48 opacity-50" /> {/* Image 2 */}
// //           <img src="https://tse1.mm.bing.net/th?id=OIP.9FTbTOvgjccAz3rOCepNxwHaGM&pid=Api&P=0&h=180" alt="Decorative" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-50 rounded-full" /> {/* Image 3 */}
// //           <img src="https://tse2.mm.bing.net/th?id=OIP.FkiVjtnWyR3oTTgs6ZKOQgHaDt&pid=Api&P=0&h=180" alt="Decorative" className="absolute bottom-1/4 right-1/4 w-32 h-32 opacity-50 rounded-full" /> {/* Image 4 */}
// //           <img src="https://tse1.mm.bing.net/th?id=OIP.g_uHI2whr5Mp-UELG2hUfAHaEo&pid=Api&P=0&h=180" alt="Decorative" className="absolute bottom-1/2 left-1/3 w-40 h-40 opacity-50 rounded-full" /> {/* Image 5 */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Nav.js';
import logo2 from '../image/th-removebg-preview.png';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/readtoken', { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };
    checkAuth();
  }, []);

  const About_us = () => {
    navigate('/About_us');
  };

  const handleClientLogin = () => {
    navigate('/Clientlogin');
  };

  const handleAdminLogin = () => {
    navigate('/Adminlogin');
  };

  const handleQuizroom = () => {
    if (user) {
      navigate('/Timer');
    } else {
      navigate('/notlogin');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleBuzzer = () => {
    navigate('/buzzer');
  };

  return (
    <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] text-white min-h-screen flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col items-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
          Welcome to <br /> Inquizitive Club
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          A new Pantone color whose courageous presence encourages <br /> personal inventiveness and creativity.
        </p>
        <div className="space-x-4">
          <button onClick={handleBuzzer} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
            Buzzer Room
          </button>
          <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-500">
            Class Room
          </button>
        </div>
      </div>
      {/* Decorative Image */}
      <div className=" inset-0 flex items-center justify-center -z-10">
        <img src={logo2} alt="Decorative" className="w-96 h-96 opacity-50 rounded-full" />
      </div>
    </div>
  );
};

export default Home;

