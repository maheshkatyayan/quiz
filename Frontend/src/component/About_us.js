import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import axios from 'axios';
const AboutUs = () => {
const [activeCard, setActiveCard] = useState(0);
const [members,setmembers]=useState()
    useEffect(() => {
        const set = async () => {
            try {
                const result=await axios.get("http://localhost:5000/membersDetail")
                setmembers(result.data)
                console.log(result.data)
                // if (response.data.success) {
                // }
            } catch (error) {
                console.error("Error checking auth:", error);
            }
        };
        set()
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalHeight = document.body.scrollHeight - windowHeight;
    const cardIndex = Math.floor((scrollPosition / totalHeight) * (members.length - 1));
    setActiveCard(cardIndex);
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

return (
    <div>
        <header className="bg-teal-500 text-white py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold">About Us</h1>
            </div>
        </header>
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-2xl font-bold mb-4">Welcome to Our Application</h1>
                <p className="mb-4">Our application is designed to help users manage quizzes efficiently. Whether you are a teacher looking to create quizzes for your students or a learner wanting to test your knowledge, our platform has got you covered.</p>
                <p className="mb-4">We aim to provide a seamless and intuitive user experience with a variety of features including:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Easy quiz creation and management</li>
                    <li>Secure user authentication</li>
                    <li>Real-time quiz monitoring</li>
                    <li>Comprehensive result analysis</li>
                    <li>Media file support (images, audio, and video)</li>
                </ul>
                <p className="mb-4">Thank you for choosing our platform. We hope you enjoy using it as much as we enjoyed building it.</p>
            </div>
            <div className="relative">
                {members.map((mem, index) => (
                    <div
                        key={index}
                        className={`transition-transform duration-500 transform ${activeCard === index ? 'translate-x-0' : activeCard > index ? '-translate-x-full' : 'translate-x-full'} w-full md:w-1/2 px-4 absolute top-0 left-1/2 transform -translate-x-1/2`}
                        style={{ top: `${index * 200}px` }} // Adjust spacing between members
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                        <div className="flex justify-center items-center h-screen bg-gray-100">
    
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md flex flex-col items-center">
      <img
        src='https://tse3.mm.bing.net/th?id=OIP.yZ_zkgk-tiPfm8-L8qjnpwHaEM&pid=Api&P=0&h=180'
        alt={mem.name}
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{mem.name}</h2>
      <h3 className="text-red-500 text-lg mb-4">{mem.roll}</h3>
      <p className="text-gray-700 text-center mb-4">
        {mem.about}
      </p>
      <a href={mem.instagram} className="text-blue-500">@_ACTHOMAS</a>
    </div>
  </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};

export default AboutUs;