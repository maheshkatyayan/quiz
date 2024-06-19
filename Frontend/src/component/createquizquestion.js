import React, { useState } from 'react';
import { useGlobalcontext } from './contex.js';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const Createquizquestion = () => {
  const { question } = useGlobalcontext();
  const [myArray, setMyArray] = useState([]);
  const [question_id, setquestionid] = useState();

  // Function to handle updates (to be implemented)
  const handelupdate = (question_id) => {
    console.log("Update function not yet implemented.",question_id);
  };

  // Function to handle deletions (to be implemented)
  const handeldelete = async(question_id) => {
    //we can use delete
   const data={question_id}
    await axios.post("http://localhost:5000/delete",data)
    console.log("Delete function not yet implemented.",question_id);
    
  };


  // Function to handle option changes
  const handleOptionChange = (question_id, optionValue, answer) => {
    const selectedQuestion = question.find(q => q.question_id === question_id);
    console.log("Answer of the question:", answer, optionValue);
    setMyArray(prevArray => [...prevArray, { question_id, selectedOption: optionValue }]);
  };

  return (
    <>
      <div className='container mx-auto p-6'>
        {question.map((item) => {
          const { question_id, question, options1, options2, options3, options4, answer, discription, image,file_type,file_url,quizname} = item;
          return (
            <div key={question_id} className='bg-white p-4 rounded-lg shadow-md mb-6'>
            <h4>{quizname}</h4>
              <h2 className='text-xl font-bold mb-2'>{question_id}. {question}</h2>
              {image && (
                <img
                  src={image}
                  alt="question related"
                  className="w-full h-auto max-w-md mb-4 border rounded shadow-md"
                />
              )}
              { file_type==='image' && (<img src= {file_url} className="w-full h-auto max-w-md mb-4 border rounded shadow-md" />) }
              { file_type==='audio' && <audio  src={file_url} controls autoPlay/> }
              {file_type==='video' && <video width="750" height="500" controls > <source src={file_url} type="video/mp4"/></video>}
              {discription && <p className='text-gray-700 mb-4'>{discription}</p>}
              <div className='mb-4'>
                {options1 && (
                  <div className='mb-2'>
                    <input
                      type="radio"
                      question_id={`options1_${question_id}`}
                      name={`${question_id}`}
                      onChange={() => handleOptionChange(question_id, options1, answer)}
                      className='mr-2'
                    />
                    <label htmlFor={`options1_${question_id}`} className='text-gray-800'>{options1}</label>
                  </div>
                )}
                {options2 && (
                  <div className='mb-2'>
                    <input
                      type="radio"
                      question_id={`options2_${question_id}`}
                      name={`${question_id}`}
                      onChange={() => handleOptionChange(question_id, options2, answer)}
                      className='mr-2'
                    />
                    <label htmlFor={`options2_${question_id}`} className='text-gray-800'>{options2}</label>
                  </div>
                )}
                {options3 && (
                  <div className='mb-2'>
                    <input
                      type="radio"
                      question_id={`options3_${question_id}`}
                      name={`${question_id}`}
                      onChange={() => handleOptionChange(question_id, options3, answer)}
                      className='mr-2'
                    />
                    <label htmlFor={`options3_${question_id}`} className='text-gray-800'>{options3}</label>
                  </div>
                )}
                {options4 && (
                  <div className='mb-2'>
                    <input
                      type="radio"
                      question_id={`options4_${question_id}`}
                      name={`${question_id}`}
                      onChange={() => handleOptionChange(question_id, options4, answer)}
                      className='mr-2'
                    />
                    <label htmlFor={`options4_${question_id}`} className='text-gray-800'>{options4}</label>
                  </div>
                )}
              </div>
              <div className='flex justify-end space-x-4'>
                <button onClick={()=>handelupdate(question_id)} className='flex items-center text-blue-500 hover:text-blue-700'>
                  <FaEdit className='mr-1' /> Edit
                </button>
                <button onClick={()=> handeldelete(question_id)} className='flex items-center text-red-500 hover:text-red-700'>
                  <FaTrashAlt className='mr-1' /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Createquizquestion;
