import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../imageeee/Club logo.JPG.png'; // Adjust the path according to your project structure

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

    const handlecreatequizquestion = () => {
        navigate("/CreatequizQuestiondemo");
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
        <nav className="bg-gray-100 border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="InQuizitive Logo" className="w-12 h-12 mr-2" />
                <div>
                    <span className="text-xl font-bold">InQuizitive</span>
                    <span className="text-sm text-gray-500 ml-1">IIIT Dharwad</span>
                </div>
            </div>
            <ul className="flex space-x-4">
                <li><button onClick={handlecreatequizquestion} className="text-black">Create Quiz</button></li>
                <li><button onClick={handleQuizroom} className="text-black">Quiz Room</button></li>
                <li><button onClick={handleAdminLogin} className="text-black">Admin</button></li>
                <li><button onClick={() => window.location.href = '#myprofile'} className="text-black">My Profile</button></li>
                {user ? (
                    <li className="flex items-center space-x-2">
                        <span>{user.email}</span>
                        <button onClick={handleLogout} className="bg-gray-800 text-white px-3 py-1 rounded">Logout</button>
                    </li>
                ) : (
                    <li><button className="bg-gray-800 text-white px-3 py-1 rounded" onClick={handleClientLogin}>Login/SignUp</button></li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
