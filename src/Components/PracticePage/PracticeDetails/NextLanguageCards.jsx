import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaUsers, FaLightbulb, FaDumbbell } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { RiGraduationCapLine } from 'react-icons/ri';

const LanguageCard = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/practice/${card.id}`);
  };

  // Determine if the card is a "Learn" or "Practice" card
  const isLearn = card.type === 'learn';

  return (
    <div style={{ width: '100%', maxWidth: 340, margin: '10px' }}>
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e0e0e0",
          background: "white",
          padding: "16px",
          position: "relative",
          transition: "transform 0.2s, box-shadow 0.2s",
          height: "100%"
        }}
        onClick={handleCardClick}
        tabIndex={0}
        role="button"
        aria-label={`Go to ${card.title} details`}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.08)';
        }}
      >
        {/* Badge: Learn/Practice */}
        <div 
          style={{ 
            position: 'absolute', 
            right: '16px', 
            top: '16px',
            backgroundColor: isLearn ? '#7669E6' : '#7669E6',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isLearn ? 
            <><RiGraduationCapLine style={{ marginRight: '4px' }} /> Learn</> : 
            <><FaDumbbell style={{ marginRight: '4px' }} /> Practice</>
          }
        </div>

        {/* Title and icon row */}
        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isLearn ? (
              <div style={{ 
                backgroundColor: '#E8F5FE', 
                borderRadius: '8px',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="#0078D7">
                  <path d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912h2.396v-3.328s-.13-4.013 3.95-4.013h6.83s3.835.033 3.835-3.713v-6.242S23.56 2.1 15.885 2.1zm-3.703 2.05a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7z"/>
                </svg>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#E8F9EF', 
                borderRadius: '8px',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00C853">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM7 14l3 3 7-7-1.4-1.4L10 14.17l-1.6-1.57L7 14z"/>
                </svg>
              </div>
            )}
          </div>

          <h3 style={{ 
            fontWeight: '600', 
            fontSize: '18px', 
            margin: '0', 
            paddingTop: '8px'
          }}>
            {card.title}
          </h3>
        </div>

        {/* Problem count and learners row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '12px', 
          color: '#666',
          marginBottom: '12px' 
        }}>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginRight: '20px' 
          }}>
            <FaLightbulb size={12} style={{ marginRight: '6px' }} /> 
            {card.problems || "8"} Problems
          </span>
          
          <span style={{ 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <FaUsers size={12} style={{ marginRight: '6px' }} /> 
            {card.learners || "255.3k"} Learners
          </span>
        </div>

        {/* Description */}
        <p style={{ 
          color: '#333', 
          fontSize: '14px', 
          lineHeight: '1.5',
          margin: '0 0 16px 0',
          height: '80px',
          overflow: 'hidden'
        }}>
          {card.description}
        </p>

        {/* Rating and level footer */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ color: '#FFB400' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} size={14} style={{ marginRight: '2px' }} />
              ))}
            </div>
            <span style={{ 
              marginLeft: '8px', 
              fontSize: '14px', 
              color: '#666' 
            }}>
              {card.rating || "4.6"} ({card.reviews || "1890"} reviews)
            </span>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '0px solid transparent',
              borderBottom: '24px solid #7669E6',
            }}></div>
            <div style={{
              backgroundColor: '#7669E6',
              color: 'white',
              fontSize: '12px',
              padding: '4px 8px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
            }}>
              {card.level || "Beginner Level"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Container component to display multiple cards
const NextLanguageCards = ({ cards = [] }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '20px', 
      justifyContent: 'flex-start'
    }}>
      {cards.map((card, index) => (
        <LanguageCard key={index} card={card} />
      ))}
    </div>
  );
};

export default NextLanguageCards;