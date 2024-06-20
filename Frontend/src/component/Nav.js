import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../imageeee/Club_logo.JPG.png'; // Adjust the path according to your project structure

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
        <div className="flex items-center">
        <img src={logo} alt="InQuizitive Logo" className="w-12 h-13 " />
              <span className="ml-4 font-bold text-2xl">InQuizitive</span>
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
