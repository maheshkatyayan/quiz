import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const [Quizname,setQuizname]=useState()

    const handleadminebuzzer=()=>{
        navigate("/adminebuzzer")
    }

    const handlequizname=async(e)=>{
      setQuizname(e.target.value)
    }
    const sendquizname =async(e)=>{
      if(Quizname){
      const data =Quizname;
      const response =await axios.post("http://localhost:5000/addquizname",{data})
      if(response.status===200){
        toast.success("save Successfully")
      navigate("/Questiondemo");
    }
    }else{
      toast.error("Please fill in Quiz name");
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SectionCard title="Add Member">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberName">Member Name</label>
                <input className="w-full px-4 py-2 bg-gray-800 rounded" type="text" id="memberName" placeholder="Enter member name"/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberEmail">Email</label>
                <input className="w-full px-4 py-2 bg-gray-800 rounded" type="email" id="memberEmail" placeholder="Enter member email"/>
              </div>
              <button className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700">Add Member</button>
            </form>
          </SectionCard>

          <SectionCard title="Buzzer Room">
            <p>Manage buzzer room settings and participants here.</p>
            <button className="mt-4 w-full py-2 bg-green-600 rounded hover:bg-green-700" onClick={handleadminebuzzer}>Enter Buzzer Room</button>
          </SectionCard>

          <SectionCard title="Create Quiz">
            <p>Create new quizzes and manage existing ones.</p>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="QuizName">Quiz Name</label>
                <input className="w-full px-4 py-2 bg-gray-800 rounded" type="text" id="QuizName" placeholder="Enter Quiz name" value={Quizname} onChange={handlequizname}/>
              </div>
            <button className="mt-4 w-full py-2 bg-purple-600 rounded hover:bg-purple-700" onClick={sendquizname} >Create Quiz</button>
          </SectionCard>

          <SectionCard title="Update Key">
            <p>Update keys for different services or rooms.</p>
            <button className="mt-4 w-full py-2 bg-yellow-600 rounded hover:bg-yellow-700">Update Key</button>
          </SectionCard>

          <SectionCard title="Add Events">
            <p>Schedule and manage upcoming events.</p>
            <button className="mt-4 w-full py-2 bg-red-600 rounded hover:bg-red-700">Add Event</button>
          </SectionCard>

          <SectionCard title="Block User">
            <p>Block users from accessing the platform.</p>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="userEmail">User Email</label>
                <input className="w-full px-4 py-2 bg-gray-800 rounded" type="email" id="userEmail" placeholder="Enter user email"/>
              </div>
              <button className="w-full py-2 bg-red-600 rounded hover:bg-red-700">Block User</button>
            </form>
          </SectionCard>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Dashboard;
