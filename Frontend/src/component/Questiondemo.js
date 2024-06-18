import React, { useState } from 'react';
import { IoMdAddCircle, IoMdAdd } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import Nav from './Nav.js';
import toast, { Toaster } from 'react-hot-toast';
import Createquizquestion from "./createquizquestion.js";

const Questiondemo = () => {
  const [question, setQuestion] = useState('');
  const [questionId, setQuestionID] = useState('');
  const [questionType, setQuestionType] = useState('Multiple choice');
  const [options, setOptions] = useState(['']);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [answer, setAnswer] = useState('');
  const [description, setDescription] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadsection, setUploadsection] = useState(true);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleFinalQuestion = async () => {
    if(questionId){
    const data = { questionId, question, options, description, imgSrc, answer };
    console.log(data);
    try {
      const responsesend = await axios.post("http://localhost:5000/addquestion", { data });
      //response galat aaya to kuch display kara do
      console.log("resadd", responsesend.status);
      if (responsesend.status === 200) {
        // Clear all inputs if the response is successful
        setQuestion('');
        setQuestionID('');
        setOptions(['']);
        setDescription('');
        setImgSrc('');
        setAnswer('');
        setShowImageInput(false);
        setShowDescriptionInput(false);
        toast.success("Question added successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to add question!");
    }
  }
  else{
    toast.error("pls enter question id!");
  }
  };

  const handleAddImageClick = () => {
    setShowImageInput(true);
  };

  const handleRemoveImage = () => {
    setShowImageInput(false);
  };

  const handleAddDescriptionClick = () => {
    setShowDescriptionInput(true);
  };

  const handleRemoveDescription = () => {
    setShowDescriptionInput(false);
  };

  const handleImgSrcChange = (e) => {
    setImgSrc(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleTypeSelect = (type) => {
    setQuestionType(type);
    setDropdownVisible(false);
  };

  const handleMediaTypeChange = (e) => {
    setSelectedMediaType(e.target.value);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleQuestionIdChange = (e) => {
    setQuestionID(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('mediaType', selectedMediaType);
      formData.append('file', selectedFile);
      formData.append('questionId', questionId);

      try {
        const responsesend = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        console.log("res", responsesend.status);
        if (responsesend.status === 200) {
          setUploadsection(false)
          toast.success("File uploaded successfully!");
        } else {
          toast.error("Something went wrong!");
        }
        console.log("Upload successful", formData);
      } catch (error) {
        console.log("Error uploading file:", error);
        toast.error("Failed to upload file!");
      }
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <>
      <Nav />
      <div className="card p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8">
        <div>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="questionId" className="block text-gray-700 font-semibold mb-2">Question ID:</label>
              <input
                type="text"
                id="questionId"
                className="form-control border border-gray-300 p-2 rounded-md w-full"
                value={questionId}
                onChange={handleQuestionIdChange}
              />
            </div>
            <div>
              <label htmlFor="question" className="block text-gray-700 font-semibold mb-2">Question:</label>
              <input
                type="text"
                id="question"
                className="form-control border border-gray-300 p-2 rounded-md w-full"
                value={question}
                onChange={handleQuestionChange}
              />
            </div>
            <div>
              <button onClick={handleAddImageClick} className="flex items-center text-blue-500">
                Click here to add image <IoMdAdd className="ml-1" />
              </button>
              {showImageInput && (
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    id="imgSrc"
                    placeholder='Enter image address'
                    value={imgSrc}
                    onChange={handleImgSrcChange}
                    className="form-control border border-gray-300 p-2 rounded-md w-full"
                  />
                  <button onClick={handleRemoveImage} className="text-red-500"><FaDeleteLeft /></button>
                </div>
              )}
            </div>

       {uploadsection && <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md mt-8 w-full">
              <label htmlFor="mediaType" className="text-lg font-semibold mb-2">Select Media Type:</label>
              <select
                id="mediaType"
                value={selectedMediaType}
                onChange={handleMediaTypeChange}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">-- Select --</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>

              {selectedMediaType && (
                <div className="mb-4 w-full">
                  <form>
                    <label htmlFor="mediaFile" className="text-lg font-semibold mb-2">Upload {selectedMediaType}:</label>
                    <input
                      type="file"
                      id="mediaFile"
                      accept={`${selectedMediaType}/*`}
                      onChange={handleFileChange}
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </form>
                </div>
              )}

              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
       }
            <div>
              <button onClick={handleAddDescriptionClick} className="flex items-center text-blue-500 mt-4">
                Click here to add Description <IoMdAdd className="ml-1" />
              </button>
              {showDescriptionInput && (
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="form-control border border-gray-300 p-2 rounded-md w-full"
                  />
                  <button onClick={handleRemoveDescription} className="text-red-500"><FaDeleteLeft /></button>
                </div>
              )}
            </div>
          </div>

          <div className="relative mt-4">
            <label htmlFor="questionType" className="block text-gray-700 font-semibold mb-2">Question Type:</label>
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="form-control border border-gray-300 p-2 rounded-md w-full text-left flex justify-between items-center"
            >
              {questionType}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownVisible && (
              <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full z-10">
                <div
                  onClick={() => handleTypeSelect('Single line')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Single Line
                </div>
                <div
                  onClick={() => handleTypeSelect('Short answer')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Short Answer
                </div>
                <div
                  onClick={() => handleTypeSelect('Multiple choice')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Multiple Choice
                </div>
                <div
                  onClick={() => handleTypeSelect('File upload')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  File Upload
                </div>
              </div>
            )}
          </div>

          {questionType === 'Multiple choice' && (
            <div className="form-group mt-4">
              <label htmlFor="options" className="block text-gray-700 font-semibold mb-2">Options:</label>
              <div>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="form-control border border-gray-300 p-2 rounded-md w-full"
                    />
                    <button onClick={() => handleRemoveOption(index)} className="text-red-500"><FaDeleteLeft /></button>
                  </div>
                ))}
                <button onClick={handleAddOption} className="flex items-center text-blue-500 mt-2">
                  Add Option <IoMdAddCircle className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {questionType === 'Short answer' && (
            <div className="form-group mt-4">
              <label htmlFor="shortAnswer2" className="block text-gray-700 font-semibold mb-2">Short Answer:</label>
              <input type="text" id="shortAnswer2" className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" />
            </div>
          )}

          {questionType === 'Single line' && (
            <div className="form-group mt-4">
              <label htmlFor="singleLineAnswer" className="block text-gray-700 font-semibold mb-2">Single Line Answer:</label>
              <input type="text" id="singleLineAnswer" className="form-control border border-gray-300 p-2 rounded-md w-full" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="answer" className="block text-gray-700 font-semibold mb-2">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={handleAnswerChange}
            className="form-control border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <button onClick={handleFinalQuestion} className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-full">
          ADD question
        </button>
      </div>
      <Toaster />
      <Createquizquestion />
    </>
  );
};

export default Questiondemo;
