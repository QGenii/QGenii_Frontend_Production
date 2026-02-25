import React from 'react';
import { useNavigate } from 'react-router-dom';
const CompanyBasedCard = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/other-learning-paths/${card.id}`);
  };

  return (
    <div className="col">
      <div className="card company-based-card shadow-sm h-100 border-0" onClick={handleCardClick}>
        <div className={`card-header ${card.color} py-3 text-white border-0 rounded-top`}>
          <h5 className="card-title mb-0 font-bold">{card.title}</h5>
        </div>
        <div className="card-body p-4">
          <p className="card-text text-gray-600 text-sm mb-4">{card.description}</p>
              <div style={{ background: '#4F4C4C', height: '2px', borderRadius: '2px', marginBottom: '3px' }}></div>
          <span className="text-sm font-medium">{card.problems} Problems</span>
          <span className="text-sm text-gray-500">{card.level}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyBasedCard;