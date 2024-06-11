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

    const handleClientLogin = () => {
         navigate("/Clientlogin");
    };

    const handleAdminLogin = () => {
        navigate("/Adminlogin");
    };

    const handleQuizroom = () => {
        navigate("/Timer");
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
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="InQuizitive Logo" />
                <div className="logo-text">
                    <span className="main-title">InQuizitive</span>
                    <span className="subtitle">IIIT Dharwad</span>
                </div>
            </div>
            <ul className="navbar-links">
                <li><button onClick={() => window.location.href = '#gettoknowus'}>Get To Know Us</button></li>
                <li><button onClick={() => window.location.href = '#halloffame'}>Hall Of Fame</button></li>
                <li><button onClick={handleQuizroom}>Quiz room</button></li>
                <li><button onClick={handleAdminLogin}>Admin</button></li>
                <li><button onClick={() => window.location.href = '#myprofile'}>My Profile</button></li>
                {user ? (
                    <li className="profile-section">
                        <span>{user.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li><button className="login-btn" onClick={handleClientLogin}>Login/SignUp</button></li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
