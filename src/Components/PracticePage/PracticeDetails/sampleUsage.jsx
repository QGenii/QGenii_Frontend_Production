import React from 'react';
import NextLanguageCards from './NextLanguageCards';

// Sample data for the cards
const sampleCards = [
  {
    id: 'cpp-problem-solving',
    type: 'learn',
    title: 'C++ Problem Solving',
    problems: '5 Problems',
    learners: '255.3k Learners',
    description: 'Learn problem solving in C++ from our online course and tutorial. You will learn basic math, conditionals and step by step logic building to solve problems.',
    rating: '4.6',
    reviews: '1890',
    level: 'Beginner Level'
  },
  {
    id: 'basic-math',
    type: 'practice',
    title: 'Practice Basic Math',
    problems: '8 Problems',
    learners: '255.3k Learners',
    description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundamental to proper understanding of algorithmic thinking.',
    rating: '4.6',
    reviews: '1890',
    level: 'Beginner Level'
  },
  {
    id: 'strings',
    type: 'practice',
    title: 'Practice Strings',
    problems: '8 Problems',
    learners: '255.3k Learners',
    description: 'Practice String problems in C++, Python, Java and 10+ other languages. Solve these questions on Strings and prepare yourself for handling text-based data.',
    rating: '4.6',
    reviews: '1890',
    level: 'Beginner Level'
  }
];

const SampleUsage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Related Courses and Practice</h2>
      <NextLanguageCards cards={sampleCards} />
    </div>
  );
};

export default SampleUsage;