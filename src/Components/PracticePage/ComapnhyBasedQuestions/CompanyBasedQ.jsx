import React from 'react';
import CompanyBasedCard from './CompanyBasedCard';

const CompanyBasedQ = () => {
  const companyCards = [
    // Second set with pink background
    {
      id: 'sql-case-studies',
      title: 'SQL Case Studies',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-r',
      title: 'Practice R Program',
      description: 'Solve Arrays coding problems to start...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-rust',
      title: 'Practice Rust',
      description: 'Basic Math includes problems on...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-cp',
      title: 'Practice C#',
      description: 'Practice problems which require you to...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-go',
      title: 'Practice Go',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-ds-rdbms',
      title: 'Practice for DSA - Past Year Problems',
      description: 'Solve Arrays coding problems to start...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-dsa-past',
      title: 'Practice for DSA - Past Year Problems',
      description: 'Basic Math includes problems on...',
      problems: 23,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'practice-mongodb',
      title: 'Practice MongiDB - Coding Problems and Challenges',
      description: 'Practice problems which require you to...',
      problems: 13,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    },
    {
      id: 'polish-practice',
      title: 'Polish - practice Problems',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      color: 'bg-language-pink',
      group: 'other'
    }
  ];

  // Split company cards into tech companies and others
  const otherCompanies = companyCards.filter(card => card.group === 'other');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Other learning paths</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {otherCompanies.map((card) => (
          <CompanyBasedCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CompanyBasedQ;