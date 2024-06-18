import React from 'react'
import { useNavigate } from "react-router-dom";
import Nav from './Nav.js'


function Home() {
  const navigate = useNavigate();
    
    
    const handelbuzzer=()=>{
      navigate("/buzzer")
  }

  const handeladminebuzzer=()=>{
    navigate("/adminebuzzer")
}

  return (
    <div>
    <Nav />
      <button onClick={handelbuzzer}>buzzer</button><br></br>
    </div>
  )
}

export default Home