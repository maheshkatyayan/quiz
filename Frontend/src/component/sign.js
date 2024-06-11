import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Sign = () => {
  // State variables for email, password, and confirm password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  // Function to navigate to the login page
  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate("/Clientlogin");
  };

  // Function to handle sign-in action
  const handleSignIn = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Data to send to the server
    const data = { email, password };
    console.log("Signing in with data:", data);

    try {
      // Send the data to the server
      await axios.post("http://localhost:5000/addpassword", { data });
      toast.success("Signed in successfully!");
      // Navigate to the next page if needed
      // navigate("/nextPage");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  // Function to handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className='homepage'>
      <div className="formwapper">
        <h3>Client Page</h3>
        <h4 className='paste'>Enter Your Details</h4>

        <div className='inputgroup'>
          <input
            type='text'
            className='inputbox'
            placeholder='Enter your Email id'
            value={email}
            onKeyUp={handleKeyPress}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='inputbox'
            placeholder='Password'
            value={password}
            onKeyUp={handleKeyPress}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            className='inputbox'
            placeholder='Confirm Password'
            value={confirmPassword}
            onKeyUp={handleKeyPress}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className='btn' id='Join' onClick={handleSignIn}>Join</button>

          <span className='span'>
            If you have an ID? Click &nbsp;
            <Toaster />
            <a href='#' className='createnewbtn' onClick={navigateToLogin}>Login</a>
          </span>
        </div>
      </div>
      <footer>
        Created with <a href='https://github.com/maheshkatyayan'>mahesh</a>
      </footer>
    </div>
  );
};

export default Sign;
