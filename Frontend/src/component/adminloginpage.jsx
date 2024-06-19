import { v4 } from 'uuid';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Adminlogin = () => {
  const [roomId, setRoomId] = useState('');
  const [Username,setUsername]=useState('')
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = 9199081035;
    setRoomId(id); // Update the roomId state with the newly created ID
    toast.success('welcome to your room');
    setUsername('')
  };

  const Join=(e)=>{
    if(!roomId || !Username){
      toast.error("pls enter username")
    }
    else if(roomId && Username){
      if(Username==='mahesh' && roomId==='91990')
      navigate(`/Dashboard`,
        {
          state:{
            Username
          },
        })
      }
      else{
        toast.error("pls enter right username and key ")
      }
    }

  const handelkey=(e)=>{
    if(e.code==="Enter"){
      Join()
    }
  }

  return (
    <div className='homepage'>

      <div className="formwapper">
        {/* <img className='logo' src="/EAGLE-logos_black.png" alt="Logo"/> */}
        <h3>Admin page</h3>

        <div className='inputgroup'>

          <input
            type='text' 
            className='inputbox'
            placeholder='Enter the Room Key'
            value={roomId} // Bind the input value to the roomId state
            onKeyUp={handelkey}
            onChange={(e) => setRoomId(e.target.value)} // Update roomId state on change
          />
          <input
            type='text' 
            className='inputbox'
            placeholder='Username' 
            value={Username}
            onKeyUp={handelkey}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button className='btn' id='Join' onClick={Join}>Join</button>

          <span className='span'>If you don't have an Key, create &nbsp;
          <Toaster />
            <a href='#' className='createnewbtn' onClick={createNewRoom}>new room Key</a>
          </span>


        </div>
      </div>
      <footer>Created with <a href='https://github.com/maheshkatyayan'>codecraftmen</a></footer>
     
    </div>
  );
};
export default Adminlogin;
