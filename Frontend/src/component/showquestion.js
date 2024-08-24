// import React, { useState, useEffect } from 'react';
// import { useGlobalcontext } from '../component/contex.js';
// import { useLocation } from 'react-router-dom';

// function Showquestion() {
//   const { questions } = useGlobalcontext();
//   const [myArray, setMyArray] = useState([]);
//   const [marks, setMarks] = useState(0);
//   const location = useLocation();
//   const { roomKey } = location.state || {};

//   const handleOptionChange = (id, optionValue, answer) => {
//     // Find the question object by id
//     const selectedQuestion = questions.find(q => q.id === id);
//     console.log("Answer of the question:", answer, optionValue);

//     if (answer === optionValue) {
//       setMarks(prevMarks => prevMarks + 1);
//     }

//     // Update myArray with the selected option value
//     setMyArray(prevArray => [...prevArray, { id, selectedOption: optionValue }]);
//   };

//   const handleFinalSubmit = () => {
//     console.log('Final submit', myArray);
//     console.log("Marks:", marks);
//     console.log("roomkey",roomKey)
//   };
// console.log(questions)
//   return (
//     <>
//       <div className='bg-gradient-to-r from-[#2e1a47] to-[#624a82]'>
//         {questions.map((item) => {
//           const { id, question, options1, options2, options3, options4, answer, discription, image,file_type,file_url } = item;
//           return (
//             <div key={id} className='question-container'>
//               <h2>{id}. {question}</h2>
//               { file_type==='image' && (<img src= {file_url} className="w-full h-auto max-w-md mb-4 border rounded shadow-md" />) }
//               { file_type==='audio' && <audio  src={file_url} controls autoPlay/> }
//               {file_type==='video' && <video width="750" height="500" controls > <source src={file_url} type="video/mp4"/></video>}
//               {image && <img src={image}  className="w-full h-auto max-w-md  mb-4 border rounded shadow-md" />}
//               {discription && <p>{discription}</p>}
//               {options1 && (
//                 <>
//                   <input type="radio" id={`options1_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options1, answer)} />
//                   <label htmlFor={`options1_${id}`}>{options1}</label><br />
//                 </>
//               )}
//               {options2 && (
//                 <>
//                   <input type="radio" id={`options2_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options2, answer)} />
//                   <label htmlFor={`options2_${id}`}>{options2}</label><br />
//                 </>
//               )}
//               {options3 && (
//                 <>
//                   <input type="radio" id={`options3_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options3, answer)} />
//                   <label htmlFor={`options3_${id}`}>{options3}</label><br />
//                 </>
//               )}
//               {options4 && (
//                 <>
//                   <input type="radio" id={`options4_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options4, answer)} />
//                   <label htmlFor={`options4_${id}`}>{options4}</label><br />
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       <button onClick={handleFinalSubmit}>Submit</button>
//     </>
//   );
// }

// export default Showquestion;
// import React,{useState} from "react";

// // import { useGlobalcontext } from '../component/contex.js';

// const Showquestion =()=>{

//     const [currentQuestion,setCurrentQuestion]= useState(0);
//     const [selectedOptions,setSelectedOptions] = useState({});
//     const [marks,setMarks] =useState(0);

//     const questions = [
//         {id:1,question:"Capital of India",options1:"Delhi",options2:"Mumbai",options3:"Agra",options4:"Chennai",answer:"Delhi"},
//         {id:2,question:"Capital of Andhra Pradesh",options1:"Delhi",options2:"Amaravathi",options3:"Agra",options4:"Chennai",answer:"Amaravathi"},
//         {id:3,question:"Capital of Telangana",options1:"Delhi",options2:"Mumbai",options3:"Hyderabad",options4:"Chennai",answer:"Hyderabad"},
//         {id:4,question:"Capital of Tamil Nadu",options1:"Kolkata",options2:"Mumbai",options3:"Agra",options4:"Chennai",answer:"Chennai"},
//         {id:5,question:"Capital of Karnataka",options1:"Bengaluru",options2:"Mumbai",options3:"Agra",options4:"Chennai",answer:"Bengaluru"},
//     ]

//     console.log(questions);
//     console.log(questions[0].question);

//     const previousQuestion = (e)=>{
//       console.log(questions.length)
//         if(currentQuestion>0 && currentQuestion < questions.length ){
//           setCurrentQuestion(currentQuestion-1);
//         }

//      }

//      const nextQuestion =(e) =>{
//       if(currentQuestion>=0 && currentQuestion < questions.length-1){
//         setCurrentQuestion(currentQuestion+1);
//       }
//      }

// const x= questions.length;

// const spans = [];

// const numberClicked =(i) =>{
//   setCurrentQuestion(i-1);
// }

// const addMarks= (ans)=>{
//   if(ans===questions[currentQuestion].answer){

//     console.log("nfdj",ans);
//     setMarks(marks+1);
//   }
// }

// // Use a for loop to generate the span elements
// for (let i = 1; i <= x; i++) {
//   spans.push(
//     <span className='qno' key={i} onClick= {()=>numberClicked(i)}>
//       {i}
//     </span>
//   );
// }

// const questionOptClicked = (optionId) => {
//   setSelectedOptions((prev) => ({
//     ...prev,
//     [currentQuestion]: optionId,
//   }));
//   let n= document.getElementsByClassName('qno');
//   n=n[currentQuestion];

//   n.style.backgroundColor='green';

//   // if(questions[currentQuestion])

//   console.log(marks);
// };

//     return(
// <>
// <div className="body">
//         <h2 >Inquiztive Trivia Nights</h2 >
//         <div className='particpant-details'>
//             <div className='participants-names'>
//               <ul>
//                 <li>Particpant I</li>
//                 <li>Participant II</li>
//                 <li>email</li>
//                 </ul>
//             </div>
//         </div>

//         <div className="quiz">
//             <div className='question-numbers'>
//                       {spans}
//             </div>
//             <div class=""></div>
//             <div className="question-card">
//                 <div className="question-text">
//                     <h3 className='quiz-question'>{questions[currentQuestion].question}</h3>
//                 </div>

//             <div className="options">
//                 <ul className="list-options">
//               {  questions[currentQuestion].options1 &&
//          <>
//                 <li id ={`options1_${questions[currentQuestion].id}`}
//                    onClick={(e)=>questionOptClicked(e.target.id,questions[currentQuestion].options1)}
//                    className='option'
//                    style={{
//                      backgroundColor: selectedOptions[currentQuestion] === `options1_${questions[currentQuestion].id}` ? 'green' : 'initial',
//                         }}
//                 >

//                 {questions[currentQuestion].options1}

//                </li>
//         </>
//         }

//        { questions[currentQuestion].options2 &&
//          <>
//                 <li id ={`options2_${questions[currentQuestion].id}`}
//                    onClick={(e)=>questionOptClicked(e.target.id, questions[currentQuestion].options2)}
//                    className='option'
//                    style={{
//                      backgroundColor: selectedOptions[currentQuestion] === `options2_${questions[currentQuestion].id}` ? 'green' : 'initial',
//                         }}
//                 >

//                 {questions[currentQuestion].options2}

//                </li>
//         </>}

//         {questions[currentQuestion].options3 &&
//          <>
//                 <li id ={`options3_${questions[currentQuestion].id}`}
//                    onClick={(e)=>questionOptClicked(e.target.id,questions[currentQuestion].options3)}
//                    className='option'
//                    style={{
//                      backgroundColor: selectedOptions[currentQuestion] === `options3_${questions[currentQuestion].id}` ? 'green' : 'initial',
//                         }}
//                 >

//                 {questions[currentQuestion].options3}

//                </li>
//         </>}

//         {    questions[currentQuestion].options4 &&
//          <>
//                 <li id ={`options4_${questions[currentQuestion].id}`}
//                    onClick={(e)=>questionOptClicked(e.target.id,questions[currentQuestion].options4)}
//                    className='option'
//                    style={{
//                      backgroundColor: selectedOptions[currentQuestion] === `options4_${questions[currentQuestion].id}` ? 'green' : 'initial',
//                         }}
//                 >

//                 {questions[currentQuestion].options4}

//                </li>
//         </>
//         }

//                 </ul>
//             </div>

//         <div className="buttons">
//            <button id='prev-question' onClick={previousQuestion}>
//             previous
//           </button>

//            <button id='next-question' onClick={nextQuestion}>
//             next
//           </button>
//           </div>
//           </div>

//         </div>

//         </div>
//        </>

//     )
// }
// export default Showquestion;

import React, { useState } from "react";
import { useGlobalcontext } from "../component/contex.js";

const Showquestion = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answers, setAnswers] = useState({});
  // const [marks,setMarks] =useState(0);
  const { questions } = useGlobalcontext();
  console.log("questions", questions);

  const previousQuestion = (e) => {
    console.log(questions.length);
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const nextQuestion = (e) => {
    if (currentQuestion >= 0 && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const x = questions.length;

  const spans = [];

  const numberClicked = (i) => {
    setCurrentQuestion(i - 1);
  };

  // Use a for loop to generate the span elements
  for (let i = 1; i <= x; i++) {
    spans.push(
      <span className="qno" key={i} onClick={() => numberClicked(i)}>
        {i}
      </span>
    );
  }

  const answersArray = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
    console.log(answers);
  };

  const questionOptClicked = (optionID, ans) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion]: optionID,
    }));
    let n = document.getElementsByClassName("qno");
    n = n[currentQuestion];
    answersArray(ans);

    n.style.backgroundColor = "green";
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
          <div className="question-numbers">{spans}</div>

          <div className="question-card">
            <div className="question-text">
              <h3 className="quiz-question">
                {questions[currentQuestion].question}
              </h3>
            </div>

            <div className="options">
              <ul className="list-options">
                {questions[currentQuestion].options1 && (
                  <>
                    <li
                      id={`options1_${questions[currentQuestion].id}`}
                      onClick={(e) =>
                        questionOptClicked(
                          e.target.id,
                          questions[currentQuestion].options1
                        )
                      }
                      className="option"
                      style={{
                        backgroundColor:
                          selectedOptions[currentQuestion] ===
                          `options1_${questions[currentQuestion].id}`
                            ? "green"
                            : "initial",
                      }}
                    >
                      {questions[currentQuestion].options1}
                    </li>
                  </>
                )}

                {questions[currentQuestion].options2 && (
                  <>
                    <li
                      id={`options2_${questions[currentQuestion].id}`}
                      onClick={(e) =>
                        questionOptClicked(
                          e.target.id,
                          questions[currentQuestion].options2
                        )
                      }
                      className="option"
                      style={{
                        backgroundColor:
                          selectedOptions[currentQuestion] ===
                          `options2_${questions[currentQuestion].id}`
                            ? "green"
                            : "initial",
                      }}
                    >
                      {questions[currentQuestion].options2}
                    </li>
                  </>
                )}

                {questions[currentQuestion].options3 && (
                  <>
                    <li
                      id={`options3_${questions[currentQuestion].id}`}
                      onClick={(e) =>
                        questionOptClicked(
                          e.target.id,
                          questions[currentQuestion].options3
                        )
                      }
                      className="option"
                      style={{
                        backgroundColor:
                          selectedOptions[currentQuestion] ===
                          `options3_${questions[currentQuestion].id}`
                            ? "green"
                            : "initial",
                      }}
                    >
                      {questions[currentQuestion].options3}
                    </li>
                  </>
                )}

                {questions[currentQuestion].options4 && (
                  <>
                    <li
                      id={`options4_${questions[currentQuestion].id}`}
                      onClick={(e) =>
                        questionOptClicked(
                          e.target.id,
                          questions[currentQuestion].options4
                        )
                      }
                      className="option"
                      style={{
                        backgroundColor:
                          selectedOptions[currentQuestion] ===
                          `options4_${questions[currentQuestion].id}`
                            ? "green"
                            : "initial",
                      }}
                    >
                      {questions[currentQuestion].options4}
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="buttons">
              <button id="prev-question" onClick={previousQuestion}>
                {"<"}
              </button>
              <button id="next-question" onClick={nextQuestion}>
                {">"}
              </button>
            </div>
          </div>

          <button id="submit" type="button" onClick={evaluate}>
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};
export default Showquestion;
