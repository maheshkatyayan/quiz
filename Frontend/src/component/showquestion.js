import React, { useState } from 'react';
import { useGlobalcontext } from '../component/contex.js';

function Showquestion() {
  const { question } = useGlobalcontext();
  const [myArray, setMyArray] = useState([]);
  const [AnswerArray, setAnswerArray] = useState([]);
  const [marks,setmarks]=useState()

  const handleOptionChange = (id, optionValue,answer) => {
    // Find the question object by id
    const selectedQuestion = question.find(q => q.id === id);
    console.log("answer of the questio :" ,answer ,optionValue)
    if(answer===optionValue){
      console.log(marks)
      setmarks(marks+1);
    }
    // Update myArray with the selected option value
    setMyArray(prevArray => [...prevArray, { id,  selectedOption: optionValue }]);
  };

  const handlefinalsubmit=()=>{
    console.log('final submit',myArray)
    console.log("marks:",marks)
  }

  return (
    <>
    <div className=''>
      {question.map((item) => {
        const { id, question, options1, options2, options3, options4,answer,disvription,image} = item;
       // console.log(image)
        return (
          <div key={id} className='flex-direction: column;'>
            <h2>{id}. {question}</h2><br />
            <img src={image} />
            <input type="radio" id={`options1_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options1, answer)} />
            <label htmlFor={`options1_${id}`}>{options1}</label><br />
            <input type="radio" id={`options2_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options2, answer)} />
            <label htmlFor={`options2_${id}`}>{options2}</label><br />
            <input type="radio" id={`options3_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options3, answer)} />
            <label htmlFor={`options3_${id}`}>{options3}</label><br />
            <input type="radio" id={`options4_${id}`} name={`${id}`} onChange={() => handleOptionChange(id, options4, answer)} />
            <label htmlFor={`options4_${id}`}>{options4}</label><br />
          </div>
        );
      })}
    </div>
    <button onClick={handlefinalsubmit}>submit</button>
    </>
  );
}

export default Showquestion;