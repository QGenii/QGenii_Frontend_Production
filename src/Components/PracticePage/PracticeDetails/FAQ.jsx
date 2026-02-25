import React, { useState } from 'react';

const FAQ = ({ faqs = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-5">
      <h2 style={{ 
        fontSize: '28px', 
        fontWeight: '600', 
        marginBottom: '24px'
      }}>
        Frequently Asked Questions
      </h2>

      <div>
        {faqs.map((faq, index) => (
          <div 
            key={index}
            style={{
              border: '1px solid #e1e7ef',
              borderRadius: '8px',
              marginBottom: '12px',
              background: '#fff',
              overflow: 'hidden'
            }}
          >
            <div
              onClick={() => toggleQuestion(index)}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              {faq.question}
              <div style={{ transform: expandedIndex === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
            
            {expandedIndex === index && (
              <div style={{
                padding: '0 20px 16px',
                fontSize: '15px',
                lineHeight: '1.5',
                color: '#444'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;