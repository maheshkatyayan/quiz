import React from 'react'
import { useNavigate } from "react-router-dom";
import { AppProvider } from './contex.js';

function Home() {
  const navigate = useNavigate();
    const handelAdmin=()=>{
        navigate("/Adminlogin")
    }
    const handelClient=()=>{
        navigate("/Clientlogin")
    }
  return (
    <div>
      <button onClick={handelAdmin}>Admin</button><br></br>
      <button onClick={handelClient}>Client</button>
      <AppProvider />
    </div>
  )
}

export default Home