import React from 'react';
import LanguageCard from './LanguageCard';

const ProgrammingLanguageSection = () => {
  const languageCards = [
    {
      id: 'cpp',
      title: 'Practice C++',
      description: 'Solve C++ Practice problems online with the Practice C++ path on CodeIQgenius. Answer MCQs exercises developed by experts.',
      problems: 206,
      level: 'Beginner Level',
      color: 'bg-indigo-600',
      className: 'card-cpp'
    },
    {
      id: 'python',
      title: 'Practice Python',
      description: 'Solve Python coding problems online with Practice Python on CodeIQgenius. Write code for over its...',
      problems: 192,
      level: 'Beginner Level',
      color: 'bg-green-600',
      className: 'card-python'
    },
    {
      id: 'java',
      title: 'Practice Java',
      description: 'Complete your Java coding practice with our online Java programming course on CodeIQgenius. Solve over 180...',
      problems: 181,
      level: 'Beginner Level',
      color: 'bg-orange-500',
      className: 'card-java'
    },
    {
      id: 'c',
      title: 'Practice C',
      description: 'Improve your C programming skills with over 200 coding practice problems. Solve these beginner...',
      problems: 222,
      level: 'Beginner Level',
      color: 'bg-blue-500',
      className: 'card-c'
    },
    {
      id: 'javascript',
      title: 'Practice JavaScript',
      description: 'Practice Javascript online with our set of coding problems selected for beginners. Solve these javascript...',
      problems: 168,
      level: 'Beginner Level',
      color: 'bg-yellow-500',
      className: 'card-js'
    },
    {
      id: 'html-css',
      title: 'Projects using HTML / CSS',
      description: 'Practice HTML and CSS with our on site editor. Code / guided projects to build sites. Solve MCQ exercise...',
      problems: 183,
      level: 'Beginner Level',
      color: 'bg-pink-500',
      className: 'card-html'
    },
    {
      id: 'sql',
      title: 'SQL Practice Queries',
      description: 'Practice queries on Select, Where, Limit, Order by, Aggregates, Group by, Joins, Subqueries and Case...',
      problems: 93,
      level: 'Beginner Level',
      color: 'bg-green-700',
      className: 'card-sql'
    },
    {
      id: 'php',
      title: 'Practice PHP',
      description: 'Enhance your PHP skills with our hands-on practice course. Master PHP syntax and real-world problems...',
      problems: 122,
      level: 'Beginner Level',
      color: 'bg-purple-600',
      className: 'card-php'
    }
  ];

  return (
    <div>
      <div className="language-header mb-4 d-flex justify-content-between align-items-center flex-wrap">
        <h2 className="text-2xl font-bold">Programming Language</h2>
        <div className="language-nav">
          <a href="/recent-context/contest" className="language-link me-4">Recent Context Problems</a>
          <a href="/past/problems" className="language-link">Old practice page</a>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {languageCards.map((card) => (
          <LanguageCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default ProgrammingLanguageSection;