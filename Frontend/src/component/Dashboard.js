import React, { useEffect,useState  } from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizIndex, setEditingQuizIndex] = useState(null);
  const [quizDate, setQuizDate] = useState('');
  const [quizTime, setQuizTime] = useState('');
  const [saveTimerquizname,setTimerqizname]=useState('')
  

  useEffect(()=>{
    const set = async () => {
        try {
            const result=await axios.get("http://localhost:5000/getSaveTimer")
            setQuizzes(result.data)
            console.log(result.data)
            // if (response.data.success) {
            // }
        } catch (error) {
            console.error("Error checking auth:", error);
        }
    };
    set()
},[])



  const handleAdminBuzzer = () => {
    navigate("/adminebuzzer");
  };

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizDateChange = (e) => {
    setQuizDate(e.target.value);
  };

  const handleQuizTimeChange = (e) => {
    setQuizTime(e.target.value);
  };

  const sendQuizName = async () => {
    if (quizName) {
      toast.success("Quiz saved successfully");
      setQuizzes([...quizzes, { name: quizName, date: '', time: '' }]);
      setTimerqizname(quizName)
      setQuizName('');
      //navigate("/Questiondemo");
      const data = { name: quizName };
      try {
        const response = await axios.post("http://localhost:5000/addquizname", { data });
        if (response.status === 200) {
        }
      } catch (error) {
        toast.error("Error saving quiz");
      }
    }
  };

  const handleDeleteQuiz = async (index,quizname) => {
    console.log("quizname",quizname)
    const newQuizzes = quizzes.filter((_, quizIndex) => quizIndex !== index);
    setQuizzes(newQuizzes);
    try{
      const data=quizname
     const response = await axios.post("http://localhost:5000/delete_quiz_setup", { data });
    }catch (error) {
      toast.error("Error saving quiz");
    }
  };

  const handleSetQuiz = async(index,quizname) => {
    setEditingQuizIndex(index);
    setQuizDate(quizzes[index].date || '');
    setQuizTime(quizzes[index].time || '');
  };

  const handleSave_Timer = async () => {
    const data={saveTimerquizname,quizDate,quizTime}
    console.log(data)
     const response = await axios.post('http://localhost:5000/addSaveTimer',  data );
    const updatedQuizzes = quizzes.map((quiz, index) =>
      index === editingQuizIndex ? { ...quiz, date: quizDate, time: quizTime } : quiz
    );
    setQuizzes(updatedQuizzes);
    setEditingQuizIndex(null);
    setQuizDate('');
    setQuizTime('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        {console.log('quizzes',quizzes)}
        {quizzes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Created Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold mb-4">{quiz.name}</h3>
                  <p>Date: {quiz.date}</p>
                  <p>Time: {quiz.time}</p>
                  {editingQuizIndex === index ? (
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="QuizDate">Quiz Date</label>
                        <input className="w-full px-4 py-2 bg-gray-700 rounded" type="date" id="QuizDate" value={quizDate} onChange={handleQuizDateChange} />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="QuizTime">Quiz Time</label>
                        <input className="w-full px-4 py-2 bg-gray-700 rounded" type="time" id="QuizTime" value={quizTime} onChange={handleQuizTimeChange} />
                      </div>
                      <button className="w-full py-2 bg-green-600 rounded hover:bg-green-700 transition-colors" onClick={handleSave_Timer}>Save Timer</button>
                    </div>
                  ) : (
                    <div>
                      {!quiz.date && !quiz.time && (
                        <button className="mt-4 w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors" onClick={() => handleSetQuiz(index)}>Set Timer</button>
                      )}
                      {quiz.date && quiz.time && (
                        <>
                          <button className="mt-4 w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Set Quiz</button>
                          <button className="mt-4 w-full py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors" onClick={() => handleSetQuiz(index)}>Update</button>
                        </>
                      )}
                      <button className="mt-4 w-full py-2 bg-red-600 rounded hover:bg-red-700 transition-colors" onClick={() => handleDeleteQuiz(index,quiz.name)}>Delete Quiz</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

        <SectionCard title="Create Quiz">
            <p>Create new quizzes and manage existing ones.</p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="QuizName">Quiz Name</label>
              <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="QuizName" placeholder="Enter Quiz name" value={quizName} onChange={handleQuizNameChange} />
            </div>
            <button className="mt-4 w-full py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors" onClick={sendQuizName}>Create Quiz</button>
          </SectionCard>

          <SectionCard title="Buzzer Room">
            <p>Manage buzzer room settings and participants here.</p>
            <button className="mt-4 w-full py-2 bg-green-600 rounded hover:bg-green-700 transition-colors" onClick={handleAdminBuzzer}>Enter Buzzer Room</button>
          </SectionCard>

          <SectionCard title="Add Member">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberName">Member Name</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="text" id="memberName" placeholder="Enter member name" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="memberEmail">Email</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="email" id="memberEmail" placeholder="Enter member email" />
              </div>
              <button className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Add Member</button>
            </form>
          </SectionCard>

          <SectionCard title="Update Key">
            <p>Update keys for different services or rooms.</p>
            <button className="mt-4 w-full py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors">Update Key</button>
          </SectionCard>

          <SectionCard title="Add Events">
            <p>Schedule and manage upcoming events.</p>
            <button className="mt-4 w-full py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">Add Event</button>
          </SectionCard>

          <SectionCard title="Block User">
            <p>Block users from accessing the platform.</p>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="userEmail">User Email</label>
                <input className="w-full px-4 py-2 bg-gray-700 rounded" type="email" id="userEmail" placeholder="Enter user email" />
              </div>
              <button className="w-full py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">Block User</button>
            </form>
          </SectionCard>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Dashboard;
