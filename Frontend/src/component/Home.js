import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Nav.js';
import clubimg from '../image/st.png';
import Footer from './footer.js';
import Eventregistration from './eventRegistration.js'


const images = [
  'https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180',
  'https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180',
  'https://tse2.mm.bing.net/th?id=OIP.p7zv9rbBiVUaj_BQQX8C6gHaFx&pid=Api&P=0&h=180',
  'https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180',
  'https://tse3.mm.bing.net/th?id=OIP.CJeJjqEKLIsbfEc8qxa9YQHaHa&pid=Api&P=0&h=180',
];

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/readtoken', { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };
    checkAuth();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left py-10 px-4 lg:px-6">
        <div className="lg:w-1/2 ml-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-teal-400 animate-fadeIn">
            Welcome to <br /> Inquizitive Club
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fadeIn">
            A place to challenge your knowledge and have fun. Join us to explore more!
          </p>
          <div className="space-x-4">
            <button
              onClick={() => handleNavigation('/buzzer')}
              className="bg-teal-500 text-white px-6 py-3 rounded-lg transition transform duration-300 hover:bg-teal-400 hover:scale-105"
            >
              Buzzer Room
            </button>
            <button
              onClick={() => handleNavigation('/classroom')}
              className="bg-white text-black px-6 py-3 rounded-lg transition transform duration-300 hover:bg-gray-300 hover:scale-105"
            >
              Class Room
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 ml-5">
          <img
            src={clubimg}
            alt="Inquizitive Club"
            className="rounded-lg border border-white shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:translate-y-2"
            style={{
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5), 0px 6px 10px rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
            }}
          />
        </div>
      </div>

      {/* Question of the Week Section */}
      <section className="py-12 bg-gray-700 mx-10 my-8 rounded-lg shadow-lg animate-slideIn">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Question of the Week</h2>
          <p className="text-xl">What is the capital of Australia?</p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section
      className="relative py-12 mx-10 my-8 "
      style={{
        backgroundImage: "url('https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join our upcoming events to engage with like-minded individuals and expand your knowledge.
        </p>
        <button
          className="bg-white text-black px-6 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-gray-300"
          style={{ maxWidth: '200px' }}
        >
          <span className="mr-2" onClick={togglePopup}>Register</span>
          <FaExternalLinkAlt />
        </button>
      </div>
    </section>
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-yellow p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700"
              onClick={togglePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <Eventregistration/>
          </div>
        </div>
      )}

      {/* Image Gallery */}
      <div className="flex justify-center mt-12 space-x-4 overflow-x-auto px-2 mb-12">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="w-60 h-65 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
