import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import backgroundvideo from '../image/video1.mp4';

const Resetpassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  

  const verify = async () => {
    console.log(email)
    if (!email) {
      toast.error("Please enter both email");
    } else if (email) {
      try {
        const data = { email: email };
        console.log(data);
        const response = await axios.post("http://localhost:5000/users/forgot_password", { data }, { withCredentials: true });
        console.log(response)
        console.log(response.data);
        if (response.data) {
          toast.success("Verification successfully!");
         // navigate('/enternewpassword');
        } else {
          setEmail('');
          toast.error("Failed to verify");
        }
      } catch (error) {
        console.error("Error verify :", error);
        toast.error("Failed to verify. Please try again.");
      }
    }
  };

 

  return (
    <>
      <video autoPlay muted loop className="fixed right-0 left-0 min-w-full min-h-full -z-1 ">
        <source src="https://firebasestorage.googleapis.com/v0/b/quizmaster-b0faf.appspot.com/o/video%2F5453622-uhd_3840_2160_24fps.mp4?alt=media&token=c71e9ee2-8b59-4e79-bf9c-050c88a49032" type="video/mp4" />
      </video>
      <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] flex items-center justify-center h-screen text-white">
        <div className="bg-transparent p-8 rounded-lg shadow-lg w-96 max-w-full z-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Client Page</h3>
          <h4 className="text-lg mb-4 text-center">Enter your email id</h4>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg text-black font-bold"
              placeholder="Enter the Email ID"
              value={email}
            //   onKeyUp={handleKey}
              onChange={(e) => setEmail(e.target.value)}
            />
           
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-bold transition duration-300 ease-in-out hover:bg-green-600"
              id="Join"
              onClick={verify}
            >
              Verify
            </button>
          </div>
        </div>
        <footer className="fixed bottom-0 w-full text-center mt-4 z-10">
          Created with <a href="https://github.com/maheshkatyayan" className="text-green-400 font-bold">codecraftmen</a>
        </footer>
      </div>
    </>
  );
};

export default Resetpassword;