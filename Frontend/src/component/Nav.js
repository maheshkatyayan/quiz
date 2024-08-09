import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/Club_logo.JPG.png';

const NavBar = () => {
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

  const handleNavigation = (path) => {
    navigate(path);
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
          <li><button onClick={() => handleNavigation('/Timer')} className="text-gray-200 hover:text-white">Quiz Room</button></li>
          <li><button onClick={() => handleNavigation('/Adminlogin')} className="text-gray-200 hover:text-white">Admin</button></li>
          <li><button onClick={() => handleNavigation('/event')} className="text-gray-200 hover:text-white">Event</button></li>
          <li><button onClick={() => handleNavigation('/About_us')} className="text-gray-200 hover:text-white">About us</button></li>
          <li><button onClick={() => window.location.href = '#myprofile'} className="text-gray-200 hover:text-white">My Profile</button></li>
        </ul>
      </div>
      <div className="space-x-2">
        {user ? (
          <ul>
            <li className="flex items-center space-x-2">
              <span>{user.email}</span>
              <button onClick={() => handleNavigation('/logout')} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">Logout</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li><button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800" onClick={() => handleNavigation('/Clientlogin')}>Login/SignUp</button></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
