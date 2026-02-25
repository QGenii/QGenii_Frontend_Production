import React from 'react';
import AlgorithmCard from './AlgorithmCard';

const AlgorithmsSection = () => {
  const algorithmCards = [
    {
      id: 'array-string-sorting',
      title: 'Array,String & Sorting',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'greedy-algorithms',
      title: 'Greedy Algorithms',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'binary-search',
      title: 'Binary search',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'dynamic-programming',
      title: 'Dynamic Programming',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'number-theory',
      title: 'Number theory',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'two-pointers',
      title: 'TwO Pointers and Slinding Window Algorithms',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'bit-manipulation',
      title: 'Bit manipulation',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    },
    {
      id: 'prefix-sum',
      title: 'Prefix Sum Problems',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-algorithm-red'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Algorithms</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {algorithmCards.map((card) => (
          <AlgorithmCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default AlgorithmsSection;
