import React from 'react';
import AdvancedChallengeCard from './AdvancedChallengeCard';

const AdvancedChallengesSection = () => {
  const challengeCards = [
    {
      id: 'system-coding',
      title: 'System Coding Challenges',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Advanced Level',
      color: 'bg-advanced-blue'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Advanced Coding Challenges</h2>
      
      <div className="row">
        {challengeCards.map((card) => (
          <div className="col-12" key={card.id}>
            <AdvancedChallengeCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedChallengesSection;