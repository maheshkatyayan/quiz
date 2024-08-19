import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/Club_logo.JPG.png';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [showVerification, setShowVerification] = useState(false); // state to control popup

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/readtoken', { withCredentials: true });
        if (response.data.success) {
          setUser(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };
    checkAuth();
  }, []);

  const handleNavigation = async (path) => {
    setUser(true);
    navigate(path);
  };

  const handleQuizRoomClick = () => {
    setShowVerification(true); // show the verification popup
  };

  const handleNavigation2 = async (path) => {
    await axios.get('http://localhost:5000/users/logout', { withCredentials: true });
    setUser(false);
    navigate(path);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    navigate('/Timer'); // navigate to Timer page
  };

  const togglePopup = () => {
    setShowVerification(!showVerification);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-teal-500 p-6 flex justify-between items-center">
      <div className="flex items-center space-x-4 text-white">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <img src={logo} alt="InQuizitive Logo" className="w-full h-full object-cover" />
        </div>
        <div className="border-l-2 border-white pl-4">
          <span className="block font-bold text-3xl">InQuizitive</span>
          <span className="block text-xl">IIIT Dharwad</span>
        </div>
      </div>
      <div className="space-x-6">
        <ul className="flex space-x-10">
          <li><button onClick={handleQuizRoomClick} className="text-gray-200 hover:text-white">Quiz Room</button></li>
          <li><button onClick={() => handleNavigation('/Adminlogin')} className="text-gray-200 hover:text-white">Admin</button></li>
          <li><button onClick={() => handleNavigation('/EventRegistration')} className="text-gray-200 hover:text-white">Event</button></li>
          <li><button onClick={() => handleNavigation('/About_us')} className="text-gray-200 hover:text-white">About us</button></li>
          <li><button onClick={() => window.location.href = '#myprofile'} className="text-gray-200 hover:text-white">My Profile</button></li>
        </ul>
      </div>
      <div className="space-x-2">
        {user ? (
          <ul>
            <li className="flex items-center space-x-2">
              <span>{user.email}</span>
              <button onClick={() => handleNavigation2('/')} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">Logout</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li><button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800" onClick={() => handleNavigation('/Clientlogin')}>Login/SignUp</button></li>
          </ul>
        )}
      </div>

      {/* Render the verification popup if needed */}
      {showVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700"
              onClick={togglePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form className="space-y-4" onSubmit={handleVerificationSubmit}>
              <div>
                <label className="block font-semibold mb-2">Team Name</label>
                <input
                  type="text"
                  className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className=" block font-semibold mb-2">Enter Team lead_Mail_Id</label>
                <input
                  type="text"
                  className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your class"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
