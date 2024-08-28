import Aboutfirstpart from './Aboutfirstpart.js'
import Footer from './footer.js';

const MemberBox = ({ name, position, imageUrl, linkedinUrl, style }) => (
  <div className="box" style={style}>
    <div className="box-content">
      <img src={imageUrl} alt={name} />
      <div className="info">
        <p className="name">{name}</p>
        <p className="position">{position}</p>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  </div>
);

const EmptyBox = () => <div className="box disp-none"></div>;

const AboutUsPage = () => {
  const members = [
    { name: "Sai", position: "Club President", imageUrl: "/DSC_0069.JPG", linkedinUrl: "" },
    { name: "John Doe", position: "Club President", imageUrl: "member1.jpg", linkedinUrl: "https://www.linkedin.com/in/johndoe" },
    // Add more members here
  ];

  return (
    <div>
    <Aboutfirstpart/>
      <div className="body1 py-70">
        <div className="question-mark">
          <EmptyBox />
          <EmptyBox />
          {members.map((member, index) => (
            <MemberBox key={index} {...member} />
          ))}
          <EmptyBox />
          <EmptyBox />
          <EmptyBox />
          <EmptyBox />
          <MemberBox {...members[0]} />
          <EmptyBox />
          <EmptyBox />
          <MemberBox {...members[0]} />
          <MemberBox {...members[0]} />
          <MemberBox {...members[0]} />
          <EmptyBox />
          <MemberBox {...members[0]} style={{ margin: '-60px -60px 0px 0px' }} />
          <EmptyBox />
          <EmptyBox />
          <EmptyBox />
          <MemberBox {...members[0]} style={{ margin: '-110px -110px 0px 0px' }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;