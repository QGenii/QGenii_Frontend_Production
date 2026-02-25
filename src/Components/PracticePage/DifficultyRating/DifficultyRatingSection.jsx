import React from 'react';
import DifficultyRatingCard from './DifficultyRatingCard';

const DifficultyRatingSection = () => {
  const difficultyCards = [
    {
      id: '500-difficulty',
      title: '500 difficultiy rating',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    },
    {
      id: '500-1000-difficulty',
      title: '500 to 1000 difficultiy problems',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    },
    {
      id: '1000-1400-difficulty',
      title: '1000 to 1400 difficulty problems',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    },
    {
      id: '1400-1800-difficulty',
      title: '1400 to 1800 difficultiy problems',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    },
    {
      id: '1600-1800-rating',
      title: '1600 to 1800 difficultiy rating',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    },
    {
      id: '1800-2000-difficulty',
      title: '1800 to 2000 difficultiy problems',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    },
    {
      id: '2000-2500-difficulty',
      title: '2000 to 2500 difficulty problems',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-difficulty-magenta'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Difficulty rating wise</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {difficultyCards.map((card) => (
          <DifficultyRatingCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default DifficultyRatingSection;