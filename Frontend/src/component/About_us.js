import Aboutfirstpart from './Aboutfirstpart.js';
import Footer from './footer.js';

const MemberBox = ({ name, position, imageUrl, linkedinUrl, style }) => (
  <div
    className="box bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
    style={style}
  >
    <div className="box-content">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="info p-5 text-center bg-gray-900">
        <p className="name text-xl font-semibold text-white mb-2">{name}</p>
        <p className="position text-gray-400">{position}</p>
        {/* {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 mt-4 inline-block"
          >
            LinkedIn
          </a>
        )} */}
      </div>
    </div>
  </div>
);

const EmptyBox = () => <div className="box disp-none"></div>;

const AboutUsPage = () => {
  const members = [
    { name: "Aditya Raj", position: "President", imageUrl: "/images/president.jpg", linkedinUrl: "" },
    { name: "Aditya Vikram Singh", position: "Vice-President", imageUrl: "/images/question-numbers2.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Niharika", position: "Core-Quiz-Team Lead", imageUrl: "images/question-numbers4.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Aditya Venkat Raman", position: "Event Management", imageUrl: "images/question-numbers5.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Sai", position: "Quiz Team", imageUrl: "images/question-numbers3.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Swaroop Patil", position: "Social Media Team Lead", imageUrl: "images/question-numbers6.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Sarthak Goyal", position: "Tech Team", imageUrl: "images/sarthark.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Hardhik", position: "Social Media Team", imageUrl: "images/question-numbers8.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Modak", position: "Quiz Team", imageUrl: "images/question-numbers9.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Bhargav Abhilash", position: "Event Management", imageUrl: "images/abhilash.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Sarthak Goyal", position: "Tech Team", imageUrl: "images/sarthark.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Hardhik", position: "Social Media Team", imageUrl: "images/question-numbers8.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Modak", position: "Quiz Team", imageUrl: "images/question-numbers9.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    { name: "Bhargav Abhilash", position: "Event Management", imageUrl: "images/abhilash.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    // Add more members here
  ];

  return (
    <div>
      <Aboutfirstpart />
      <div className="body10 -mt-20 mb-20">
        <div className="question-mark">
          {/* Empty boxes to adjust the pattern */}
          <EmptyBox />
          <EmptyBox />
          {members.map((member, index) => (
            <MemberBox key={index} {...member} />
          ))}
          <EmptyBox />
          <EmptyBox />
          <EmptyBox />
          <EmptyBox />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
