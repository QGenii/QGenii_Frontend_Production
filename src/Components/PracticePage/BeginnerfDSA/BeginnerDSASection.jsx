import React from 'react';
import DSACard from './DSACard';

const BeginnerDSASection = () => {
  const dsaCards = [
    {
      id: 'strings',
      title: 'Practice Strings',
      description: 'Practice String problems in C, C++, Python, Java and other programming languages. Solve these questions...',
      problems: 32,
      level: 'Beginner Level',
      color: 'bg-dsa-yellow'
    },
    {
      id: 'arrays',
      title: 'Practice Arrays',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-dsa-yellow'
    },
    {
      id: 'basic-math',
      title: 'Practice Basic Math',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-dsa-yellow'
    },
    {
      id: 'sorting',
      title: 'Practice Sorting',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-dsa-yellow'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Beginner DSA</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {dsaCards.map((card) => (
          <DSACard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default BeginnerDSASection;