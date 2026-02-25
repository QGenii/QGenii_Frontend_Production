import React from 'react';
import StarWisePathCard from './StarWisePathCard';

const StarWisePathsSection = () => {
  const starWisePaths = [
    {
      id: 'jump-2-to-3',
      title: 'Jump from 2* to 3*',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-starwise-green'
    },
    {
      id: 'level-1-to-2',
      title: 'Level up from 1* to 2*',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-starwise-green'
    },
    {
      id: 'raise-3-to-4',
      title: 'Raise from 3* to 4*',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-starwise-green'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Star wise Paths</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {starWisePaths.map((path) => (
          <StarWisePathCard key={path.id} card={path} />
        ))}
      </div>
    </div>
  );
};

export default StarWisePathsSection;