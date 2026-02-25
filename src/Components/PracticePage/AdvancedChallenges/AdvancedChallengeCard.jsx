import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvancedChallengeCard = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/advanced-challenges/${card.id}`);
  };

  return (
    <div className="col">
      <div className="card advanced-challenge-card shadow-sm h-100 border-0" onClick={handleCardClick}>
        <div className="card-header bg-advanced-blue py-3 text-white border-0 rounded-top" style={{ borderRadius: '6px 6px 0 0' }}>
          <h5 className="card-title mb-0 font-bold">{card.title}</h5>
        </div>
        <div className="card-body p-4">
          <p className="card-text text-gray-600 text-sm mb-4">{card.description}</p>
          <div className="practice-divider"></div>
          <span className="text-sm font-medium me-2">{card.problems} Problems</span>
          <span className="text-sm text-gray-500">{card.level}</span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedChallengeCard;