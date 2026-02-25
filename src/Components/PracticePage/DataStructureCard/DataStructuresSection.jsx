import React from 'react';
import DataStructureCard from './DataStructureCard';

const DataStructuresSection = () => {
  const dataStructureCards = [
    {
      id: 'linked-lists',
      title: 'Linked lists',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-datastructure-purple'
    },
    {
      id: 'stacks-queues',
      title: 'Stacks and Queues',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-datastructure-purple'
    },
    {
      id: '2d-arrays',
      title: '2D Array/ Matrices',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-datastructure-purple'
    },
    {
      id: 'heaps',
      title: 'Heaps',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-datastructure-purple'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Structures</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {dataStructureCards.map((card) => (
          <DataStructureCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default DataStructuresSection;