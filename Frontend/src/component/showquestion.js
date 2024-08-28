import React, { useState,useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalcontext } from "../component/contex.js";
import { useLocation } from 'react-router-dom';
import Footer from './footer.js'


const QuizBank = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answers, setAnswers] = useState({});
  const [options,setOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [visibility,setvisibility]=useState('')
  const { questions } = useGlobalcontext();
  const location = useLocation();
  const navigate = useNavigate();
  const { roomKey } = location.state || {};
  console.log("questions", questions,"roomkey",roomKey);

  useEffect(() => {
    const handleVisibilityChange = () => {
        if (document.hidden) {
            console.log('User switched to another tab or window.');
            // Perform any action when the user switches to another tab/window
        } else {
            console.log('User switched back to this tab.');
            // Perform any action when the user switches back to the tab
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup the event listener when the component is unmounted
    return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
}, []);



  const previousQuestion = () => {
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion >= 0 && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const numberClicked = (i) => {
    setCurrentQuestion(i - 1);
  };

  const spans = questions.map((_, index) => (
    <span className="qno" key={index + 1} onClick={() => numberClicked(index + 1)}>
      
    </span>
  ));

  const answersArray = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer
    }));
    console.log(answers);
  };

  const questionOptClicked = (optionID, ans,alphabetID) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: optionID
    }));

    setOptions((prev) => ({
      ...prev,
      [currentQuestion]: alphabetID
    }));

    let n = document.getElementsByClassName('qno')[currentQuestion];
    console.log(n);
    answersArray(ans);
    n.style.background ='linear-gradient(180deg,#87ff00,#0b1e07)';
  };  

  const alphabetClicked = (optionID,alphabetID,ans)=>{
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: optionID
    }));

    setOptions((prev) => ({
      ...prev,
      [currentQuestion]: alphabetID
    }));

    console.log(alphabetID);


    let n = document.getElementsByClassName('qno')[currentQuestion];
    answersArray(ans);
    n.style.background='linear-gradient(180deg,#87ff00,#0b1e07)';
  }

  const evaluate = async () => {
    let marks = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answer) {
        console.log(answers[i], questions[i].answer);
        marks += 1;
      }
    }
    console.log(marks);

    try{
    const data ={marks:marks,roomKey:roomKey};

    const response = await  axios.post("http://localhost:5000/quiz/addMarks",{data},{withCredentials:true});
    console.log("response",response)
    if(response.data.ok){
        toast.success(response.data.remarks);
        navigate('/');

    }
    else{
      toast.success(response.data.remarks);
    }
    }
    catch(error){
      console.log(error);
      toast.error("Invalid Submission");
    }
   
  };

  

  return (
    <>
      <div className="body-showQuestion">
        <h2 className="text-8xl font-extrabold text-center bg-clip-text text-transparent pt-10" 
         style={{ backgroundImage: "url('/images/Trivia NIGHTS (1).png')" }}>Trivia Nights</h2>
        <div className="quiz">
        
          <div className="question-card ">

            <div className="question-text">
              <h3 className='quiz-question'>{questions[currentQuestion].question}</h3>
               {/* Conditional Rendering */}
            {questions[currentQuestion].file_type === "image" && (
              <button onClick={() => {
                setModalContent(
                  <img
                    src={questions[currentQuestion].file_url}
                    className="w-full h-auto max-w-md mb-4 border rounded shadow-md"
                    alt="Question related"
                  />
                );
                setIsModalOpen(true);
              }}>
                View Image
              </button>
            )}

            {questions[currentQuestion].file_type === "audio" && (
              <button onClick={() => {
                setModalContent(
                  <audio src={questions[currentQuestion].file_url} controls autoPlay />
                );
                setIsModalOpen(true);
              }}>
                Play Audio
              </button>
            )}

            {questions[currentQuestion].file_type === "video" && (
              <button onClick={() => {
                setModalContent(
                  <video width="750" height="500" controls>
                    <source src={questions[currentQuestion].file_url} type="video/mp4" />
                  </video>
                );
                setIsModalOpen(true);
              }}>
                Play Video
              </button>
            )}
            </div>

           
            <div className="options">

              <ul className="list-options">
                {questions[currentQuestion].options1 &&
                <div className="option-container">
                  <span id={`optionsA_${questions[currentQuestion].id}`} 
                  className="alphabet w-50 h-50"
                  onClick={
                    (e) => alphabetClicked(`options1_${questions[currentQuestion].id}`,e.target.id,questions[currentQuestion].options1)
                  }
                  style={{
                    border: options[currentQuestion] === `optionsA_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                  }}
                  >A</span>

                  <li id={`options1_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options1,`optionsA_${questions[currentQuestion].id}`)}
                    className='option'
                    style={{
                      border: selectedOptions[currentQuestion] === `options1_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                    }}
                  >
                   {questions[currentQuestion].options1}
                  </li>
                  </div>
                }

              {questions[currentQuestion].options2 &&
                <div className="option-container">
                <span id={`optionsB_${questions[currentQuestion].id}`}
                className="alphabet w-50 h-50"
                onClick={
                  (e) => alphabetClicked(`options2_${questions[currentQuestion].id}`,e.target.id,questions[currentQuestion].options1)
                }
                style={{
                  border: options[currentQuestion] === `optionsB_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                }}
                >B</span>
                  <li id={`options2_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options2,`optionsB_${questions[currentQuestion].id}`)}
                    className='option'
                    style={{
                      border: selectedOptions[currentQuestion] === `options2_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                    }}
                  >  
                    {questions[currentQuestion].options2}
                  </li>
                </div>
                }

                {questions[currentQuestion].options3 &&
                  <div className="option-container">
                  <span id={`optionsC_${questions[currentQuestion].id}`} 
                  className="alphabet w-50 h-50"
                  onClick={
                    (e) => alphabetClicked(`options3_${questions[currentQuestion].id}`,e.target.id,questions[currentQuestion].options3)
                  }
                  style={{
                    border: options[currentQuestion] === `optionsC_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                  }}
                  
                  
                  >C</span>
                  <li id={`options3_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options3,`optionsC_${questions[currentQuestion].id}`)}
                    className='option'
                    style={{
                      border: selectedOptions[currentQuestion] === `options3_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                    }}
                  >
                    {questions[currentQuestion].options3}
                  </li>
                  </div>
                }
                {questions[currentQuestion].options4 &&
                 <div className="option-container">
                  <span id={`optionsD_${questions[currentQuestion].id}`} 
                 className="alphabet w-50 h-50"
                 onClick={
                   (e) => alphabetClicked(`options4_${questions[currentQuestion].id}`,e.target.id,questions[currentQuestion].options1)
                 }
                 style={{
                   border: options[currentQuestion] === `optionsD_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                 }}>D</span>


                  <li id={`options4_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options4,`optionsD_${questions[currentQuestion].id}`)}
                    className='option'
                    style={{
                      border: selectedOptions[currentQuestion] === `options4_${questions[currentQuestion].id}` ? '7px solid green' : '2px solid white',
                    }}
                  >  
                    {questions[currentQuestion].options4}
                  </li>
                  </div>
                }
                
              </ul>
              <div className="buttons">
              
              <button id='prev-question' onClick={previousQuestion}>
                {"<"}
              </button>
              <button id='next-question' onClick={nextQuestion}>
                {">"}
              </button>
             
            </div>
            </div>
          </div>

        </div>
        <div className="question-numbers flex flex-row gap-2.5 h-20 w-24  mx-[30rem] ">
      {spans}
    </div>

      <div className="flex justify-center my-5">
      <button
        onClick={evaluate}
        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Submit
      </button>
    </div>
          
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            {modalContent}
            <Toaster/>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default QuizBank;