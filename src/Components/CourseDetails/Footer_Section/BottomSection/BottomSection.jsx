import React from 'react';
import './BottomSection.css';
import globe from '../../../../assets/global.png';
const BottomSection = () => {
  return (
    <div className="bottom-section">
      <div className="footer-bot-row">

        {/* Column 1: ROADMAPS */}
        <div>
          <a className="footer-bot-title" href="#">ROADMAPS</a>
          <div className="bot-list">
            <a href="#">Learn Python</a>
            <a href="#">Learn Java</a>
            <a href="#">Learn C</a>
            <a href="#">Learn C++</a>
            <a href="#">Data structures and Algorithms</a>
            <a href="#">Competitive Programming</a>
            <a className="see-all" href="#">More Roadmaps</a>
          </div>
        </div>

        {/* Column 2: CAREER PATHS */}
        <div>
          <a className="footer-bot-title2" href="#">CAREER PATHS</a>
          <div className="bot-list2">
            <a href="#">React JS Developer</a>
            <a href="#">SQL for Data Analysis</a>
            <a href="#">Frontend Developer</a>
            <a href="#">Java Backend Developer</a>
            <a href="#">Data Analysis using Python</a>
            <a href="#">Python Backend Developer</a>
            <a href="#">C++ Developer</a>
          </div>
        </div>

        {/* Column 3: COMPILERS */}
        <div>
          <a className="footer-bot-title3" href="#">COMPILERS</a>
          <div className="bot-list3">
            <a href="#">HTML online compiler</a>
            <a href="#">Java online compiler</a>
            <a href="#">C online compiler</a>
            <a href="#">C++ online compiler</a>
            <a href="#">SQL online compiler</a>
            <a href="#">Python online compiler</a>
            <a href="#">Javascript online compiler</a>
            <a href="#">React online compiler</a>
            <a href="#">More compiler</a>
          </div>
        </div>
      </div>
      <div className="bot-divider"></div>
      <div className="footer-bottom-bar">
        <span className="footer-copy">© 2025 CODEIQGENIUS, INC.</span>
        <a className="footer-cookie" href="#">Cookie settings</a>
        <div className="footer-language">
          <img src={globe} alt="Globe Icon" className="global-icon" /><span>English</span>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
