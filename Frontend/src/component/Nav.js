import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../image/Club_logo.JPG.png'; // Adjust the path according to your project structure

const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/readtoken", { withCredentials: true });
                console.log("response",response.data.token)
                if (response.data.success) {
                    setUser(true);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
            }
        };
        checkAuth();
    }, []);

    const About_us = () => {
        navigate("/About_us");
    };

    const handleClientLogin = () => {
         navigate("/Clientlogin");
    };

    const handleAdminLogin = () => {
        navigate("/Adminlogin");
    };

    const handleQuizroom = () => {
        if(user){
            navigate("/Timer");
        }
        else{
            navigate("/notlogin")
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/home");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto p-6 flex justify-between items-center">
       <div className="flex items-center space-x-4  text-white p-4">
      <div className="relative">
        {/* Adding a div around the image for the shadow effect */}
        <div className="w-16 h-16 rounded-full  flex items-center justify-center ">
          <img src={logo} alt="InQuizitive Logo" className="" />
        </div>
        {/* Adding the purple glow effect */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-0 border-transparent border-opacity-75" style={{ boxShadow: '0 0 15px 10px #5a3d78' }}></div>
      </div>
      <div className="border-l-2 border-white pl-4">
        <span className="block font-bold text-3xl">InQuizitive</span>
        <span className="block text-xl">IIIT Dharwad</span>
      </div>
    </div>
          <div className="space-x-6">
            <ul className="flex space-x-4">
              <li><button onClick={About_us} className="mx-5 text-gray-300 hover:text-white ">About us</button></li>
              <li><button onClick={handleQuizroom} className="mx-5 text-gray-300 hover:text-white">Quiz Room</button></li>
              <li><button onClick={handleAdminLogin} className="mx-5 text-gray-300 hover:text-white">Admin</button></li>
              <li><button onClick={() => window.location.href = '#myprofile'} className="mx-5 text-gray-300 hover:text-white">My Profile</button></li>
            </ul>
          </div>
          <div className="space-x-4">
            {user ? (
              <ul>
                <li className="flex items-center space-x-2">
                  <span>{user.email}</span>
                  <button onClick={handleLogout} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Logout</button>
                </li>
              </ul>
            ) : (
              <ul>
                <li><button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800" onClick={handleClientLogin}>Login/SignUp</button></li>
              </ul>
            )}
          </div>
        </nav>
    );
};

export default NavBar;
