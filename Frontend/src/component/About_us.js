import React, { useState, useEffect } from "react";
import { useGlobalcontext } from "../component/contex.js";
import Nav from "./Nav.js";
import clubimg from "../image/st.png";

const AboutUs = () => {
  const [activeCard, setActiveCard] = useState(0);
  const { members } = useGlobalcontext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const images = [
    'https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180',
    'https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.p7zv9rbBiVUaj_BQQX8C6gHaFx&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180',
    
  ];

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change the image every 5 seconds (increase the interval)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images.length]);


  return (
    <div>
      <Nav />
      <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto px-4 py-8 min-h-screen">
        <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] text-white ml-10 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-teal-400 animate-fadeInLeft">
              What is InQuizitive all about?
            </h2>
            <p className="mb-4 animate-fadeIn">
              Well, your first thoughts might be like, "They are just a bunch of
              geeks who read books and acquire knowledge on some random stuff
              all the time, and some might even think about the Theory of
              Relativity or Thermodynamics and entropy all the time...". You are
              right but not totally. We never take a break from gaining random
              knowledge but, knowing some stuff that no one else does make you
              cool right? Preparing, conducting, and participating in a wide
              range of quizzes gives you exactly what you need to be called a
              "cool university student".
            </p>
            <p className="mb-4 animate-fadeIn">
              Hence, InQuizitive always gives you such great opportunities by
              hosting Trivia nights and other fun quiz competitions, also
              shaping you to compete with other well-rounded bookworms out
              there. So, join us at our events where we will promise to provide
              you a platform for you to shine.
            </p>
          </div>
          <div className="slider-container lg:w-1/2 mt-8 lg:mt-0 lg:ml-20">
      <div
        className={`slide ${slideDirection}`}
        key={currentIndex}
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          boxShadow:
            '0px 10px 20px rgba(0, 0, 0, 0.5), 0px 6px 10px rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
        }}
      />
    </div>
        </div>

        <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] text-white ml-10 mt-12 animate-fadeInRight">
          <h2 className="text-3xl font-bold mb-4 text-teal-400">
            Find your best fit with our College Quiz!
          </h2>
          <p className="mb-4">
            Choosing a college is tough. A lot goes into the decision, and
            everyone has different priorities. You might be looking for a school
            with the best academics and top-notch professors, while your friend
            wants a great party scene in a warm climate.
          </p>
          <p className="mb-4">
            And let's be honest — not everyone knows what they want in a school
            right away. Your parents and teachers want you to get into a “good
            college,” but have you thought about what that means? If the answer
            is no, don't worry — you're not alone.
          </p>
          <p className="mb-4">
            That's why Niche created the College Quiz, a quick and easy survey
            that zeroes in on what matters to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
