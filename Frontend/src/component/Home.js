import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Nav.js';
import clubimg from '../image/st.png';
import Footer from './footer.js';

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/readtoken', { withCredentials: true });
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
      <div className="container mx-20 flex flex-col lg:flex-row items-center text-center lg:text-left py-10 px-4 lg:px-6">
        <div className="lg:w-1/2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-teal-400">
            Welcome to <br /> Inquizitive Club
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            A place to challenge your knowledge and have fun. Join us to explore more!
          </p>
          <div className="space-x-4">
            <button onClick={() => handleNavigation('/buzzer')} className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-400">
              Buzzer Room
            </button>
            <button onClick={() => handleNavigation('/classroom')} className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-300">
              Class Room
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img src={clubimg} alt="Inquizitive Club" className="rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="flex justify-center mt-12 space-x-4 overflow-x-auto px-2 my-5">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Gallery image ${index + 1}`} className="w-60 h-65 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105" />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
