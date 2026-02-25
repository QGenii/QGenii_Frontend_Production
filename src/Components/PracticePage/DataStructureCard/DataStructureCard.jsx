import React from 'react';
import { useNavigate } from 'react-router-dom';

const DataStructureCard = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/data-structures/${card.id}`);
  };

  return (
    <div className="col">
      <div className="card data-structure-card shadow-sm h-100 border-0" onClick={handleCardClick}>
        <div className={`card-header ${card.color} py-3 text-white border-0 rounded-top`}>
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

export default DataStructureCard;