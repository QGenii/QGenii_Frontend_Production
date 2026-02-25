import React from 'react';
import InterviewQuestionCard from './InterviewQuestionCard';

const InterviewQuestionsSection = () => {
  const interviewCards = [
    {
      id: 'python-interview',
      title: 'Python Interview Questions',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'java-interview',
      title: 'Java Interview Questions for Freshers',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'cpp-interview',
      title: 'C++ Interviews Questions and Answers',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'sql-interview',
      title: 'Top SQL Interview Questions',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'js-interview',
      title: 'Top JavaScript Interview Questions',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'react-interview',
      title: 'React Interview Questions',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'ds-interview',
      title: 'Data Structures Interview Questions',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'dbms-interview',
      title: 'Top DBMS Interview Questions',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'os-interview',
      title: 'Operating Systems Interview Questions',
      description: 'Practice String problems in C, C++, Python, Java and 10+ other languages. Solve these questions...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'react-advanced',
      title: 'React Advanced Interview Preparation',
      description: 'Solve Arrays coding problems to start learning data structures and algorithms. This curated set of 23 s...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'python-dev',
      title: 'Python Developer Interview Preparation',
      description: 'Basic Math includes problems on topics like arithmetic, sequences, and counting, which are fundame...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    },
    {
      id: 'java-dev',
      title: 'Java Developer Interview Preparation',
      description: 'Practice problems which require you to use sorting algorithms to solve the task at hand. These...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-interview-orange'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {interviewCards.map((card) => (
          <InterviewQuestionCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default InterviewQuestionsSection;