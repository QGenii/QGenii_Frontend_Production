import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('programming');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  // Add scroll event listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'programming', 'projects', 'beginner-dsa', 'algorithms', 'data-structures',
        'star-wise-path', 'difficulty-rating', 'interview-questions', 'company-questions', 'advanced-challenges'
      ];
      
      // Find the section that is most in view
      const current = sections.reduce((acc, section) => {
        const element = document.getElementById(section);
        if (!element) return acc;
        
        const rect = element.getBoundingClientRect();
        // Check if the section is visible and closer to the top than the current section
        if (rect.top <= 100 && rect.bottom >= 100) {
          return section;
        }
        return acc;
      }, activeSection);
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <header className="custom-navbar">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <div className="navbar-container">
        <div className="navbar-brand">CodeIQGenius</div>
        
        <div className={`mobile-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a 
            className={activeSection === 'programming' ? 'active' : ''} 
            href="#programming" 
            onClick={(e) => { e.preventDefault(); scrollToSection('programming'); }}
          >
            Programming Language
          </a>
          <a 
            className={activeSection === 'projects' ? 'active' : ''} 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
          >
            Projects
          </a>
          <a 
            className={activeSection === 'beginner-dsa' ? 'active' : ''} 
            href="#beginner-dsa" 
            onClick={(e) => { e.preventDefault(); scrollToSection('beginner-dsa'); }}
          >
            Beginner DSA
          </a>
          <a 
            className={activeSection === 'algorithms' ? 'active' : ''} 
            href="#algorithms" 
            onClick={(e) => { e.preventDefault(); scrollToSection('algorithms'); }}
          >
            Algorithms
          </a>
          <a 
            className={activeSection === 'data-structures' ? 'active' : ''} 
            href="#data-structures" 
            onClick={(e) => { e.preventDefault(); scrollToSection('data-structures'); }}
          >
            Data Structures
          </a>
          <a 
            className={activeSection === 'star-wise-path' ? 'active' : ''} 
            href="#star-wise-path" 
            onClick={(e) => { e.preventDefault(); scrollToSection('star-wise-path'); }}
          >
            Star wise path
          </a>
          <a 
            className={activeSection === 'difficulty-rating' ? 'active' : ''} 
            href="#difficulty-rating" 
            onClick={(e) => { e.preventDefault(); scrollToSection('difficulty-rating'); }}
          >
            Difficulty rating
          </a>
          <a 
            className={activeSection === 'interview-questions' ? 'active' : ''} 
            href="#interview-questions" 
            onClick={(e) => { e.preventDefault(); scrollToSection('interview-questions'); }}
          >
            Interview Questions
          </a>
          <a 
            className={activeSection === 'company-questions' ? 'active' : ''} 
            href="#company-questions" 
            onClick={(e) => { e.preventDefault(); scrollToSection('company-questions'); }}
          >
            Company Questions
          </a>
          <a 
            className={activeSection === 'advanced-challenges' ? 'active' : ''} 
            href="#advanced-challenges" 
            onClick={(e) => { e.preventDefault(); scrollToSection('advanced-challenges'); }}
          >
            Advanced Challenges
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;