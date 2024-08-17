import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Clientlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createNewSignIn = (e) => {
    navigate(`/sign`);
  };
  const forgot_password=async ()=>{
    const response= await axios.post("http://localhost:5000/users/forgot_password", { withCredentials: true });
  }
  const LogIn = async (e) => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
    } else if (email && password) {
      try {
        const data = { email: email, password: password };
        console.log(data);
        const response = await axios.post("http://localhost:5000/users/login", { data }, { withCredentials: true });
        console.log("res",response.data);
        if (response.data) {
          toast.success("Signed in successfully!");
          navigate(`/`, {
            state: {
              password
            },
          });
        } else {
          setEmail();
          setPassword('');
          toast.error("Failed to login");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("Failed to log in. Please try again.");
      }
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      LogIn();
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen text-white bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 max-w-full">
        <h3 className="text-2xl font-bold mb-6 text-center">Client Page</h3>
        <h4 className="text-lg mb-4 text-center">Enter your college email id</h4>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg text-black font-bold"
            placeholder="Enter the Email ID"
            value={email}
            onKeyUp={handleKey}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg text-black font-bold"
            placeholder="Password"
            value={password}
            onKeyUp={handleKey}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-teal-800"
            id="Join"
            onClick={LogIn}
          >
            Login
          </button>

          <span className="text-center">
            If you don't have an ID, click &nbsp;
            <Toaster />
            <a href="#" className="text-teal-400 font-bold hover:text-teal-800" onClick={createNewSignIn}>sign in</a>
          </span>
          <span className="text-center">
            &nbsp;
            <a href="#" className="text-teal-400 font-bold hover:text-teal-800" onClick={forgot_password}>forgot password</a>
          </span>
        </div>
      </div>
      <footer className="fixed bottom-0 w-full text-center mt-4">
        Created with <a href="https://github.com/maheshkatyayan" className="text-teal-400 font-bold hover:text-teal-800">codecraftmen</a>
      </footer>
    </div>
  );
};

export default Clientlogin;
