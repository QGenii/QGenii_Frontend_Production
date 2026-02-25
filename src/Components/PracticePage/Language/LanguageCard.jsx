import React from 'react';
import { useNavigate } from 'react-router-dom';

const LanguageCard = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/practice/${card.id}`);
  };

  return (
    <div className="col">
      <div
        className={`card language-card shadow-sm border-0 ${card.id === 'c' ? 'c-card-border' : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={handleCardClick}
        tabIndex={0}
        role="button"
        aria-label={`Go to ${card.title} details`}
      >
        <div className={`card-top-gradient ${card.className}`}>
          <div className={`language-icon text-white`}>
            {/* Icon would go here - using first letter as placeholder */}
            {card.title.charAt(card.title.indexOf(' ') + 1)}
          </div>
        </div>
        <div className="card-body p-4">
          <h5 className="card-title font-bold text-lg">{card.title}</h5>
          <p className="card-text text-gray-600 text-sm mb-4">{card.description}</p>
          <div className="practice-divider"></div>
          <span className="text-sm font-medium me-2">{card.problems} Problems</span>
          <span className="text-sm text-gray-500">{card.level}</span>
          {/* <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-sm font-medium">{card.problems} Problems</span>
            <span className="text-sm text-gray-500">{card.level}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;