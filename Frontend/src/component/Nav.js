import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Use null for an unauthenticated user
  const [showVerification, setShowVerification] = useState(false);
  const [teamname, setTeamname] = useState('');
  const [teamleademailid, setTeamleademailid] = useState('');
  var counter=0;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/readtoken', { withCredentials: true });
        if (response.data.success) {
          console.log(response.data.success,response.data.user)
          setUser(response.data.success); // Assuming response.data.user contains the user info
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

  const handleQuizRoomClick = () => {
    setShowVerification(true);
  };

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/users/logout', { withCredentials: true });
    setUser(null);
    navigate('/');
  };


  const togglePopup = () => {
    setShowVerification(!showVerification);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };
 

  const accessingQuizRoom = async (e) => {
    e.preventDefault();
    counter=counter+1
    const data = { teamname, teamleademailid ,counter};
    
    try {
      const response = await axios.post("http://localhost:5000/events/accessingquizroom", { data }, { withCredentials: true });
  
      console.log("Response:", response.data.message, response.status);
  
      if (response.status === 400) {
        toast.error("There was an issue with your request.");
      } else if (response.status === 200) {
        toast.success("Success:", response.data.message);
         navigate(`/Timer?token=${teamleademailid}`);
        // Perform additional actions if needed (e.g., navigate to another page)
      }
    } catch (error) {
      // This will handle network errors or unexpected server responses
      if (error.response && error.response.status === 400) {
        toast.error("There was an issue with your request.");
      } else {
        toast.error("An unexpected error occurred:", error);
      }
    }
  };
  

  return (
    <nav className="bg-transparent container mx-auto p-6 flex justify-between items-center p-6 flex justify-between items-center">
    <div className="flex items-center space-x-4 text-white">
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <img src='/images/Club_logo.JPG.png' alt="InQuizitive Logo" className="w-full h-full object-cover" />
      </div>
      <div className="border-l-2 border-white pl-4">
        <span className="block font-bold text-3xl">InQuizitive</span>
        <span className="block text-xl">IIIT Dharwad</span>
      </div>
    </div>
    <div className="space-x-6">
      <ul className="flex space-x-10">
        <li><button onClick={() => handleNavigation('/')} className="text-gray-200 hover:text-white">Home</button></li>
        <li><button onClick={handleQuizRoomClick} className="text-gray-200 hover:text-white">Quiz Room</button></li>
        <li><button onClick={() => handleNavigation('/Adminlogin')} className="text-gray-200 hover:text-white">Admin</button></li>
        <li><button onClick={() => handleNavigation('/event')} className="text-gray-200 hover:text-white">Event</button></li>
        <li><button onClick={() => handleNavigation('/About_us')} className="text-gray-200 hover:text-white">About us</button></li>
        <li><button onClick={() => window.location.href = '#myprofile'} className="text-gray-200 hover:text-white">My Profile</button></li>
      </ul>
    </div>
    <div className="space-x-2">
        {user ? (
          <ul className="flex items-center space-x-2">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">Logout</button>
          </ul>
        ) : (
          <ul>
            <li><button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800" onClick={() => handleNavigation('/Clientlogin')}>Login/SignUp</button></li>
          </ul>
        )}
      </div>

      {/* Render the verification popup if needed */}
      {showVerification && (
        <div className="bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-transparent  p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700"
              onClick={togglePopup}
            >
              &times;
            </button>
            <h2 className="text-4xl text-white font-bold mb-4 text-center">Quiz Room</h2>
            <form className="space-y-4"  onSubmit={accessingQuizRoom}>
              <div>
                <label className="text-white text-xl block font-semibold mb-2">Team Name</label>
                <input
                  type="text"
                  value={teamname}
                  className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  onChange={handleInputChange(setTeamname)}
                />
              </div>
              <div>
                <label className="text-white text-xl block font-semibold mb-2">Enter Team Lead Email ID</label>
                <input
                  type="text"
                  value={teamleademailid}
                  className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  onChange={handleInputChange(setTeamleademailid)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-gray-300 px-4 py-2 rounded-md hover:text-white"
              >
                Submit
              </button>
            </form>
            <Toaster/>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
