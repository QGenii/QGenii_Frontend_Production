import React from 'react';
import TechCompanyCard from './TechCompanyCard';
import LanguagePracticeCard from './LanguagePracticeCard';

const CompanyBasedQuestionsSection = () => {
  const companyCards = [
    // First set with teal background for tech companies
    {
      id: 'amazon-coding',
      title: 'Amazon Coding Interview Questions',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'microsoft-coding',
      title: 'Microsoft Coding Interview Questions',
      description: 'Solve Arrays coding problems to start...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'google-interview',
      title: 'Google Interview Questions and Answers',
      description: 'Basic Math includes problems on...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'adobe-coding',
      title: 'Adobe Coding Interview Questions',
      description: 'Practice problems which require you to...',
      problems: 13,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'flipkart-coding',
      title: 'Flipkart Coding Interview Questions',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'tcs-codevita',
      title: 'TCS CodeVita Questions',
      description: 'Solve Arrays coding problems to start...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'tcs-nqt',
      title: 'TCS NQT Coding Questions',
      description: 'Basic Math includes problems on...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'accenture-coding',
      title: 'Accenture Coding Interview Questions',
      description: 'Practice problems which require you to...',
      problems: 13,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'infosys-interview',
      title: 'Infosys Interview Questions',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'phonePe-interview',
      title: 'PhonePe Interview Questions',
      description: 'Solve Arrays coding problems to start...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'visa-interview',
      title: 'Visa Interview Questions',
      description: 'Basic Math includes problems on...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'accolite-coding',
      title: 'Accolite Coding Interview Questions',
      description: 'Practice problems which require you to...',
      problems: 13,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'meta-instagram',
      title: 'Meta Instagram Coding Interview Questions',
      description: 'Practice programming in C, C++...',
      problems: 22,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'yahoo-coding',
      title: 'Yahoo Coding Interview Questions',
      description: 'Solve Arrays coding problems to start...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    {
      id: 'goldman-coding',
      title: 'Goldman Sachs Interview Questions',
      description: 'Basic Math includes problems on...',
      problems: 23,
      level: 'Beginner Level',
      group: 'tech'
    },
    // Second set with pink background

  ];

  // Split company cards into tech companies and others
  const techCompanies = companyCards.filter(card => card.group === 'tech');


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Company Based Questions</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-6">
        {techCompanies.map((card) => (
          <TechCompanyCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CompanyBasedQuestionsSection;