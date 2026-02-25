import React from 'react';
import './BottomSection.css';
import globe from '../../../assets/global.png';
import { Link } from 'react-router-dom';

const BottomSection = () => {
  return (
    <div className="bottom-section">
      <div className="footer-bot-row">

        {/* Column 1: ROADMAPS */}
        <div>
          <Link className="footer-bot-title" to="/roadmaps/python">ROADMAPS</Link>
          <div className="bot-list">
            <Link to="/roadmaps/python">Learn Python</Link>
            <Link to="/roadmaps/javaroadmap">Learn Java</Link>
            <Link to="/roadmaps/cplusroadmap">Learn C++</Link>
            <Link to="/roadmaps/croadmap">Learn C</Link>
            <Link to="/roadmaps/dsa">Data structures and Algorithms</Link>
            <Link to="/roadmaps/cp">Competitive Programming</Link>
            <Link className="see-all" to="/roadmaps/all">More Roadmaps</Link>
          </div>
        </div>

        {/* Column 2: CAREER PATHS */}
        <div>
          <Link className="footer-bot-title2" to="/jobs">CAREER PATHS</Link>
          <div className="bot-list2">
            <Link to="/jobs">React JS Developer</Link>
            <Link to="/jobs">SQL for Data Analysis</Link>
            <Link to="/jobs">Frontend Developer</Link>
            <Link to="/jobs">Java Backend Developer</Link>
            <Link to="/jobs">Data Analysis using Python</Link>
            <Link to="/jobs">Python Backend Developer</Link>
            <Link to="/jobs">C++ Developer</Link>
          </div>
        </div>

        {/* Column 3: COMPILERS */}
        <div>
          <Link className="footer-bot-title3" to="/compiler">COMPILERS</Link>
          <div className="bot-list3">
            <Link to="/compiler">HTML online compiler</Link>
            <Link to="/compiler">Java online compiler</Link>
            <Link to="/compiler">C online compiler</Link>
            <Link to="/compiler">C++ online compiler</Link>
            <Link to="/compiler">SQL online compiler</Link>
            <Link to="/compiler">Python online compiler</Link>
            <Link to="/compiler">Javascript online compiler</Link>
            <Link to="/compiler">React online compiler</Link>
            <Link to="/compiler">More compiler</Link>
          </div>
        </div>
      </div>
      <div className="bot-divider"></div>
      <div className="footer-bottom-bar">
        <span className="footer-copy">© 2025 CODEIQGENIUS, INC.</span>
        <Link className="footer-cookie" to="/">Cookie settings</Link>
        <div className="footer-language">
          <img src={globe} alt="Globe Icon" className="global-icon" /><span>English</span>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
