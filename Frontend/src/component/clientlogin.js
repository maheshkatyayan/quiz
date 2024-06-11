import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Clientlogin = () => {
  const [email, setemail] = useState('');
  const [password,setpassword]=useState('');
  
  const navigate = useNavigate();

  const createNewSignIn = (e) => {
    navigate(`/sign`)
  };

  const LogIn=async (e)=>{
    if(!email || !password){
      toast.error("nikal  password  nahi diya hai")
    }
    else if(email && password){
      try {
        // Send the password and email to the server
       var data={email:email,password:password}
       console.log(data)
      const t1=  await axios.post("http://localhost:5000/loginpassword", { data },{ withCredentials: true });
      //{ withCredentials: true } i spend whole day to resolve this thing
      console.log(t1.data)
      if(t1.data){
        toast.success("Signed in successfully!");
        navigate(`/home`,
          {
            state:{
              password
            },
          })
      }
      else{
        setemail('')
        setpassword('')
        toast.error("fail to login")
      }
       
      } catch (error) {
        console.error("Error Loging in:", error);
        toast.error("Failed to Log in. Please try again.");
      }
      }
    }

  const handelkey=(e)=>{
    if(e.code==="Enter"){
      LogIn()
    }
  }

  return (
    <div className='homepage'>

      <div className="formwapper">
        {/* <img className='logo' src="/EAGLE-logos_black.png" alt="Logo"/> */}
        <h3>Client page</h3>
        <h4 className='paste'>Enter your email id</h4>

        <div className='inputgroup'>

          <input
            type='text' 
            className='inputbox1'
            placeholder='Enter the Email ID'
            value={email} // Bind the input value to the email state
            onKeyUp={handelkey}
            onChange={(e) => setemail(e.target.value)} // Update email state on change
          />
          <input
            type='text' 
            className='inputbox'
            placeholder='Password' 
            value={password}
            onKeyUp={handelkey}
            onChange={(e) => setpassword(e.target.value)}
          />

          <button className='btn' id='Join' onClick={LogIn}>Login</button>

          <span className='span'>If you don't have an id, click &nbsp;
          <Toaster />
            <a href='#' className='createnewbtn' onClick={createNewSignIn}>sign in</a>
          </span>


        </div>
      </div>
      <footer>Created with <a href='https://github.com/maheshkatyayan'>codecraftmen</a></footer>
     
    </div>
  );
};
export default Clientlogin;