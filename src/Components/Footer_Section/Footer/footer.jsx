import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-box">
      <div className="footer-content">
        <div className="footer-header-row">
          <div className="footer-text-group">
            <Link to="/" className="footer-title footer-link">Teach the world online</Link>
            <Link to="/" className="footer-subtitle footer-link">
              Create an online video course, reach students across the globe, and earn money
            </Link>
          </div>
          <button className="teach-button">Teach on CodeIQ</button>
        </div>

        <p className="footer-highlight">
          Top companies choose <span className="highlight-blue">CodeIQGenius Business</span> to build in-demand career skills.
        </p>
      </div>

      <div className="footer-divider"></div>
      <p className="footer-section-title">Explore top skills and certifications</p>
      <div className="footer-divider1"></div>
      <div className="footer-careers-row">
        <div>
          <Link to="/jobs" className="footer-career-title footer-link">In-demand Careers</Link>
          <div className="career-list">
            <Link to="/jobs" className="footer-link">Data Scientist</Link>
            <Link to="/jobs" className="footer-link">Full Stack Web Developer</Link>
            <Link to="/jobs" className="footer-link">Cloud Engineer</Link>
            <Link to="/jobs" className="footer-link">Project Manager</Link>
            <Link to="/jobs" className="footer-link">Game Developer</Link>
            <Link to="/jobs" className="see-all footer-link">See all Career Accelerators</Link>
          </div>
        </div>

        <div>
          <Link to="/coursecatalog" className="footer-career-title2 footer-link">Web Development</Link>
          <div className="career-list2">
            <Link to="/coursecatalog" className="footer-link">Web Development</Link>
            <Link to="/coursecatalog" className="footer-link">JavaScript</Link>
            <Link to="/coursecatalog" className="footer-link">React JS</Link>
            <Link to="/coursecatalog" className="footer-link">Angular</Link>
            <Link to="/coursecatalog" className="footer-link">Java</Link>
          </div>
        </div>
        <div>
          <Link to="/coursecatalog" className="footer-career-title3 footer-link">IT Certifications</Link>
          <div className="career-list3">
            <Link to="/coursecatalog" className="footer-link">Amazon AWS</Link>
            <Link to="/coursecatalog" className="footer-link">AWS Certified Cloud Practitioner</Link>
            <Link to="/coursecatalog" className="footer-link">AZ-900: Microsoft Azure Fundamentals</Link>
            <Link to="/coursecatalog" className="footer-link">AWS Certified Solutions Architech- Associate</Link>
            <Link to="/coursecatalog" className="footer-link">Kubernetes</Link>
          </div>
        </div>
        <div>
          <Link to="/coursecatalog" className="footer-career-title4 footer-link">In-demand Careers</Link>
          <div className="career-list4">
            <Link to="/coursecatalog" className="footer-link">Leadership</Link>
            <Link to="/coursecatalog" className="footer-link">Management Skills</Link>
            <Link to="/coursecatalog" className="footer-link">Project Management</Link>
            <Link to="/coursecatalog" className="footer-link">Personal Productivity</Link>
            <Link to="/coursecatalog" className="footer-link">Emotional Intelligence</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom-row">
        <div>
          <Link to="/coursecatalog" className="footer-career-title5 footer-link">Communication</Link>
          <div className="career-list5">
            <Link to="/coursecatalog" className="footer-link">Communication Skills</Link>
            <Link to="/coursecatalog" className="footer-link">Presentation Skills</Link>
            <Link to="/coursecatalog" className="footer-link">Public Speaking</Link>
            <Link to="/coursecatalog" className="footer-link">Writing</Link>
            <Link to="/coursecatalog" className="footer-link">PowerPoint</Link>
          </div>
        </div>

        <div>
          <Link to="/coursecatalog" className="footer-career-title6 footer-link">Data Science</Link>
          <div className="career-list6">
            <Link to="/coursecatalog" className="footer-link">Data Science</Link>
            <Link to="/coursecatalog" className="footer-link">Python</Link>
            <Link to="/coursecatalog" className="footer-link">Machine Learning</Link>
            <Link to="/coursecatalog" className="footer-link">ChatGPT</Link>
            <Link to="/coursecatalog" className="footer-link">Deep Learning</Link>
          </div>
        </div>

        <div>
          <Link to="/coursecatalog" className="footer-career-title7 footer-link">Certifications by Skills</Link>
          <div className="career-list7">
            <Link to="/coursecatalog" className="footer-link">Cybersecurity Certification</Link>
            <Link to="/coursecatalog" className="footer-link">Project Management Certification</Link>
            <Link to="/coursecatalog" className="footer-link">Cloud Certification</Link>
            <Link to="/coursecatalog" className="footer-link">Data Analytics Certification</Link>
            <Link to="/coursecatalog" className="footer-link">HR Management Certification</Link>
            <Link to="/coursecatalog" className="see-all footer-link">See all Certifications</Link>
          </div>
        </div>

        <div>
          <Link to="/coursecatalog" className="footer-career-title8 footer-link">Business Analytics & Intelligence</Link>
          <div className="career-list8">
            <Link to="/coursecatalog" className="footer-link">Microsoft Excel</Link>
            <Link to="/coursecatalog" className="footer-link">SQL</Link>
            <Link to="/coursecatalog" className="footer-link">Microsoft Power BI</Link>
            <Link to="/coursecatalog" className="footer-link">Data Analytics</Link>
            <Link to="/coursecatalog" className="footer-link">Business Analytics</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom-row">
        <div>
          <Link to="/aboutus" className="footer-career-title9 footer-link">About</Link>
          <div className="career-list9">
            <Link to="/aboutus" className="footer-link">About us</Link>
            <Link to="/contactus" className="footer-link">Contact us</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
            <Link to="/" className="footer-link">Partnership</Link>
          </div>
        </div>

        <div>
          <Link to="/" className="footer-career-title10 footer-link">CodeIQ for Business</Link>
          <div className="career-list10">
            <Link to="/" className="footer-link">CodeIQGenius Business</Link>
          </div>
        </div>

        <div>
          <Link to="/" className="footer-career-title11 footer-link">Discover CodeIQGenius</Link>
          <div className="career-list11">
            <Link to="/" className="footer-link">Teach on CodeIQ</Link>
            <Link to="/" className="footer-link">Plans and Pricing</Link>
            <Link to="/" className="footer-link">Affiliate</Link>
            <Link to="/contactus" className="footer-link">Help & support</Link>
          </div>
        </div>

        <div>
          <Link to="/" className="footer-career-title12 footer-link">Legal & Accessbility</Link>
          <div className="career-list12">
            <Link to="/" className="footer-link">Accebility statement</Link>
            <Link to="/" className="footer-link">Privacy policy</Link>
            <Link to="/" className="footer-link">Sitemap</Link>
            <Link to="/" className="footer-link">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;