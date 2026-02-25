import React from "react";
import { FaGraduationCap, FaCode, FaUsers } from "react-icons/fa";

const PracticeHeroCard = ({
  title = "Practice Title",
  description = "Practice description goes here.",
  courses = 0,
  duration = "0 months",
  problems = 0,
  level = "All Levels",
  learners = "0",
  progress = 0,
  onStart = () => {},
  languageIcon = null,  // New prop for the icon
  languageName = "Language" // Optional language name
}) => {
  return (
    <div
      style={{
        backgroundColor: '#6B7CD1',
        borderRadius: '12px',
        padding: '30px',
        color: 'white',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1000px',
        margin: '0 auto'
      }}
    >
      {/* Left side content */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
        {/* Top section with logo and title */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {/* Icon box */}
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '15px'
          }}>
            <div style={{
              color: '#0078d7',
              fontSize: '30px'
            }}>
              {languageIcon ? languageIcon : languageName}
            </div>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{title}</h2>
        </div>

        {/* Stats section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', marginBottom: '10px' }}>
            <FaGraduationCap size={16} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>{courses} Courses</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', marginBottom: '10px' }}>
            <FaCode size={16} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>{problems} Problems</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', marginRight: '8px' }}>🕒</span>
            <span style={{ fontSize: '14px' }}>{duration}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', marginRight: '8px' }}>📘</span>
            <span style={{ fontSize: '14px' }}>{level}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FaUsers size={16} style={{ marginRight: '8px' }} />
            <span style={{ fontSize: '14px' }}>{learners} Learners</span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '15px', lineHeight: '1.5', marginBottom: '25px' }}>
          {description}
        </p>

        {/* Start button */}
        <div>
          <button
            onClick={onStart}
            style={{
              backgroundColor: '#0E2C63',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Start Practicing
          </button>
        </div>
      </div>

      {/* Right side progress */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Your Progress</div>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default PracticeHeroCard;
