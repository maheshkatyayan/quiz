
import React, { useState,useEffect } from "react";
import { useGlobalcontext } from "../component/contex.js";
import { useLocation } from 'react-router-dom';

const QuizBank = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answers, setAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { questions } = useGlobalcontext();
  const location = useLocation();
  const [aisehi,setaisehi]=useState('')
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
      {index + 1}
    </span>
  ));

  const answersArray = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer
    }));
    console.log(answers);
  };

  const questionOptClicked = (optionID, ans) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: optionID
    }));
    let n = document.getElementsByClassName('qno')[currentQuestion];
    answersArray(ans);
    n.style.backgroundColor = 'green';
  };

  const evaluate = () => {
    let marks = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answer) {
        console.log(answers[i], questions[i].answer);
        marks += 1;
      }
    }
    console.log(marks);
  };

  return (
    <>
      <div className="body">
        <h2>Inquiztive Trivia Nights</h2>
        <div className="quiz">
          <div className='question-numbers'>
            {spans}
          </div>
          <div className="question-card">
            <div className="question-text">
              <h3 className='quiz-question'>{questions[currentQuestion].question}</h3>
            </div>

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
            

            <div className="options">
              <ul className="list-options">
                {questions[currentQuestion].options1 &&
                  <li id={`options1_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options1)}
                    className='option'
                    style={{
                      backgroundColor: selectedOptions[currentQuestion] === `options1_${questions[currentQuestion].id}` ? 'green' : 'initial',
                    }}
                  >
                    {questions[currentQuestion].options1}
                  </li>
                }

              {questions[currentQuestion].options2 &&
                  <li id={`options2_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options2)}
                    className='option'
                    style={{
                      backgroundColor: selectedOptions[currentQuestion] === `options2_${questions[currentQuestion].id}` ? 'green' : 'initial',
                    }}
                  >
                    {questions[currentQuestion].options2}
                  </li>
                }
                {questions[currentQuestion].options3 &&
                  <li id={`options3_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options3)}
                    className='option'
                    style={{
                      backgroundColor: selectedOptions[currentQuestion] === `options1_${questions[currentQuestion].id}` ? 'green' : 'initial',
                    }}
                  >
                    {questions[currentQuestion].options3}
                  </li>
                }
                {questions[currentQuestion].options4 &&
                  <li id={`options4_${questions[currentQuestion].id}`}
                    onClick={(e) => questionOptClicked(e.target.id, questions[currentQuestion].options1)}
                    className='option'
                    style={{
                      backgroundColor: selectedOptions[currentQuestion] === `options4_${questions[currentQuestion].id}` ? 'green' : 'initial',
                    }}
                  >
                    {questions[currentQuestion].options1}
                  </li>
                }
                
              </ul>
            </div>

            <div className="buttons">
              <button id='prev-question' onClick={previousQuestion}>
                {"<"}
              </button>
              <button id='next-question' onClick={nextQuestion}>
                {">"}
              </button>
            </div>
          </div>
          <button id="submit" type="button" onClick={evaluate}>
            SUBMIT
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
          </div>
        </div>
      )}
    </>
  );
};

export default QuizBank;
