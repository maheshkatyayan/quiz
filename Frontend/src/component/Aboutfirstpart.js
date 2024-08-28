import React, { useState, useEffect } from "react";
import { useGlobalcontext } from "./contex.js";
import Nav from "./Nav.js";


const Aboutfirstpart = () => {
  const [activeCard, setActiveCard] = useState(0);
  const { members } = useGlobalcontext();


  return (
    <div>
      <Nav />
      <div className="bg-gradient-to-r from-[#2e1a47] to-[#624a82] container mx-auto px-4 pt-8 pb-40 min-h-screen">
        <div className="text-white ml-10 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-black animate-fadeInLeft">
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
        </div>

        <div className="relative py-12 px-10 mx-5 mt-4 h-800 shadow-xl rounded-lg overflow-hidden">
          <h2 className="text-3xl mb-4 ">
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

export default Aboutfirstpart;