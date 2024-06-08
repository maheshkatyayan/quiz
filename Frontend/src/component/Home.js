import React from 'react'
import { useNavigate } from "react-router-dom";
import Nav from './Nav.js'


function Home() {
  const navigate = useNavigate();
    const handelAdmin=()=>{
        navigate("/Adminlogin")
    }
    const handelClient=()=>{
        navigate("/Clientlogin")
    }
    const handelbuzzer=()=>{
      navigate("/buzzer")
  }

  const handeladminebuzzer=()=>{
    navigate("/adminebuzzer")
}

  return (
    <div>
    <Nav />
      <button onClick={handelAdmin}>Admin</button><br></br>
      <button onClick={handelClient}>Client</button><br></br>
      <button onClick={handelbuzzer}>buzzer</button><br></br>
      <button onClick={handeladminebuzzer}>Admine-buzzer</button>
    </div>
  )
}

export default Home