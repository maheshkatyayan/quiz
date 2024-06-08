import React, { useState } from 'react';
import { IoMdAddCircle, IoMdAdd  } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"

const Question = () => {
  const [question, setQuestion] = useState(''); // State for the question input
  const [questionType, setQuestionType] = useState(''); // State for the question type select
  const [options, setOptions] = useState(['']); // State for the options array
  const [showImageInput, setShowImageInput] = useState(false); // State to track whether to display image input
  const [Discription, setDiscription] = useState(false); // State to track whether to display description input
  const [Answer,setAnswer]=useState('')
  const [dis,setdis]=useState('')
  const [imgsrc,setimgsrc]=useState('')

 
  // Handler for question input change
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Handler for question type select change
  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  // Handler for option input change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handler for adding a new option
  const handleAddOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
  };

  // Handler for removing an option
  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  // Handler for finalizing and submitting the question
  const handeleFinalquestion = () => {
    const data = { question, options,dis,imgsrc };
    console.log(data);
    try {
      axios.post("http://localhost:5000/addquestion", { data });
    } catch (e) {
      console.log(e);
    }
  };

  // Handler for clicking the "Add Image" button
  const handleAddImageClick = () => {
    setShowImageInput(true); // Show image input when add image button is clicked
  };

  // Handler for removing the image input
  const handleRemoveimage = () => {
    setShowImageInput(false); // Hide image input when delete image button is clicked
  };

  // Handler for clicking the "Add Description" button
  const handleDiscription = () => {
    setDiscription(true); // Show description input when add description button is clicked
  };

  // Handler for removing the description input
  const handleRemoveDiscription = () => {
    setDiscription(false); // Hide description input when delete description button is clicked
  };

  const handleimgsrc=(e)=>{
    setimgsrc(e.target.value)
  }

  const handledis=(e)=>{
    setdis(e.target.value)
  }

  const handleAnswer=(e)=>{
    setAnswer(e.target.value)
  }

  return (
    <div className="card">
      <div className="">
        <div className="flex-direction: column">
          <div>
            {/* Input field for the question */}
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              className="form-control"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div>
            {/* Button to add image */}
            <button onClick={handleAddImageClick}>click here to add image<IoMdAdd /></button>
            {/* Conditionally render image input if showImageInput state is true */}
            {showImageInput && (
              <> 
                <input type="text" id="imgsrc" value={imgsrc} onChange={handleimgsrc}/>
                {/* Button to remove image input */}
                <button onClick={handleRemoveimage}><FaDeleteLeft /></button>
              </>
            )}
          </div>
          <div>
            {/* Button to add description */}
            <button onClick={handleDiscription}>click here to add Description<IoMdAdd /></button>
            {/* Conditionally render description input if Discription state is true */}
            {Discription && (
              <> 
              <input type="text" id="dis" value={dis} onChange={handledis}/>
                {/* Button to remove description input */}
                <button onClick={handleRemoveDiscription}><FaDeleteLeft /></button>
              </>
            )}
          </div>
        </div>

        {/* Dropdown for selecting question type */}
        <div className="form-group">
          <label htmlFor="questionType">Question Type:</label>
          <select
            id="questionType"
            className="form-control"
            value={questionType}
            onChange={handleQuestionTypeChange}
          >
            <option value="">Select Question Type</option>
            <option value="single-line">Single Line</option>
            <option value="short-answer">Short Answer</option>
            <option value="option">Option</option>
          </select>
        </div>

        {/* Conditionally render options input if question type is 'option' */}
        {questionType === 'option' && (
          <div className="form-group">
            <label htmlFor="options">Options:</label>
            <div>
              {options.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  {/* Button to remove option */}
                  <button onClick={() => handleRemoveOption(index)}><FaDeleteLeft /></button>
                </div>
              ))}
              {/* Button to add new option */}
              <button onClick={handleAddOption}><IoMdAddCircle /></button>
            </div>
          </div>
        )}

        {/* Conditionally render input fields for short answer type */}
        {questionType === 'short-answer' && (
          <div>
            <div className="form-group">
              <label htmlFor="shortAnswer1">Short Answer 1:</label>
              <input type="text" id="shortAnswer1" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="shortAnswer2">Short Answer 2:</label>
              <input type="text" id="shortAnswer2" className="form-control" />
            </div>
          </div>
        )}

        {/* Conditionally render input field for single-line answer type */}
        {questionType === 'single-line' && (
          <div className="form-group">
            <label htmlFor="singleLineAnswer">Single Line Answer:</label>
            <input type="text" id="singleLineAnswer" className="form-control" />
          </div>
        )}
      </div>
      <input type="text" id="answer" value={Answer} onChange={handleAnswer}/>
      {/* Button to finalize and submit the question */}
      <button onClick={handeleFinalquestion}>ADD question</button>
    </div>
  );
};

export default Question;