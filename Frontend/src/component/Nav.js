import React, { useState } from 'react';


const NavBar = () => {
  const [showQuizDropdown, setShowQuizDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);

  const toggleQuizDropdown = () => {
    setShowQuizDropdown(!showQuizDropdown);
  };

  const toggleoption = () => {
    setSelectedOption(!selectedOption);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(`Navigate to ${event.target.value}`);
  };

  return (
    <>
    <nav className="bg-gray-800" id='nav'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        <div className=''>
            <h6 className="font-lulo text-base">INQUIZITIVE</h6>
          </div>
          <div className="flex items-center">
            <button className="text-white hover:text-gray-300" onClick={() => console.log("Navigate to Home")}>Home</button>
            <div className="relative ml-4">
            <button className="text-white hover:text-gray-300" onMouseEnter={toggleoption}>Event</button>
            {selectedOption && (
                <ul className="absolute z-10 mt-2 py-1 bg-gray-800 rounded-md shadow-lg">
                  <li><button className="text-white hover:text-gray-300" onClick={() => console.log("Navigate to Buzzer Room")}>upcomming</button></li>
                  <li><button className="text-white hover:text-gray-300" onClick={() => console.log("Navigate to MCQ Quiz")}>past</button></li>
                </ul>
              )}
              </div>
            <button className="ml-4 text-white hover:text-gray-300" onClick={() => console.log("Navigate to Members")}>Members</button>
            <button className="ml-4 text-white hover:text-gray-300" onClick={() => console.log("Navigate to Posts")}>Posts</button>
            <div className="relative ml-4">
              <button className="text-white hover:text-gray-300" onMouseEnter={toggleQuizDropdown}>Quiz</button>
              {showQuizDropdown && (
                <ul className="absolute z-10 mt-2 py-1 bg-gray-800 rounded-md shadow-lg">
                  <li><button className="text-white hover:text-gray-300" onClick={() => console.log("Navigate to Buzzer Room")}>Buzzer</button></li>
                  <li><button className="text-white hover:text-gray-300" onClick={() => console.log("Navigate to MCQ Quiz")}>MCQ</button></li>
                </ul>
              )}
            </div>
            <button className="ml-4 text-white hover:text-gray-300" onClick={() => console.log("Navigate to Guide")}>Guide</button>
            <button className="ml-4 text-white hover:text-gray-300" onClick={() => console.log("Navigate to About Us")}>About Us</button>
          </div>
        </div>
      </div>
      
    </nav>
    </>
  );
}

export default NavBar;
