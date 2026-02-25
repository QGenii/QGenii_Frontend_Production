import React, { useState } from 'react';

const CourseContent = () => {
  const [couponCode, setCouponCode] = useState('');

  // Sample data for course sections and lectures
  const courseSections = [
    {
      id: 1,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: true
    },
    {
      id: 2,
      title: 'What Is ChatGPT?',
      duration: '1:30',
      isPreview: false,
      isExpanded: false,
      isCompleted: true
    },
    {
      id: 3,
      title: 'Uses of ChatGPT and AI Power',
      duration: '1:30',
      isPreview: false,
      isExpanded: false
    },
    {
      id: 4,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    },
    {
      id: 5,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    },
    {
      id: 6,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    },
    {
      id: 7,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    },
    {
      id: 8,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    },
    {
      id: 9,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    },
    {
      id: 10,
      title: 'Introduction To Class',
      duration: '2:60',
      isPreview: true,
      isExpanded: false
    }
  ];

  // Learning outcomes for the "What you'll learn" section
  const learningOutcomes = [
    {
      id: 1,
      text: 'Generative AI: Create content, synthesize information, and learn faster than ever with effective prompt engineering!'
    },
    {
      id: 2,
      text: 'Productivity: Achieve goals faster with artificial intelligence, manage time, prioritize tasks, and create an optimized daily schedule!'
    },
    {
      id: 3,
      text: 'ChatGPT: Turn your creativity into paid work, generate fresh ideas, reach new audiences, and scale your projects!'
    },
    {
      id: 4,
      text: 'Marketing: Generate targeted content with generative AI, capitalize on trends, create ads, newsletters, specialized content, and media campaigns!'
    },
    {
      id: 5,
      text: 'Soft Skills: Improve your communication, leadership, problem-solving, and social skills with personalized ChatGPT feedback!'
    },
    {
      id: 6,
      text: 'Generative AI: Create content, synthesize information, and learn faster than ever with effective prompt engineering!'
    }
  ];

  // Course includes features
  const courseIncludes = [
    { id: 1, icon: "🎭", text: "Role Play" },
    { id: 2, icon: "📄", text: "27 articles" },
    { id: 3, icon: "📝", text: "Closed captions" },
    { id: 4, icon: "📱", text: "Access on mobile and TV" },
    { id: 5, icon: "🏆", text: "Certificate of completion" },
    { id: 6, icon: "⏱️", text: "39.5 hours on-demand video" },
    { id: 7, icon: "📂", text: "14 downloadable resources" },
    { id: 8, icon: "🔊", text: "Audio description in existing audio" }
  ];

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    // In a real implementation, this would update state to expand/collapse sections
    console.log(`Toggle section ${sectionId}`);
  };

  // Handle coupon application
  const applyCoupon = () => {
    // In a real implementation, this would validate and apply the coupon
    console.log(`Applying coupon: ${couponCode}`);
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Course content */}
        <div className="lg:w-2/3">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-white p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Course Content</h2>
              <span className="text-sm text-gray-600">Total 54 Sections</span>
            </div>
            
            {/* Course sections list */}
            <div className="bg-white">
              {courseSections.map((section) => (
                <div key={section.id} className="border-b border-gray-300 last:border-b-0">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center">
                      {section.isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      <span>{section.title}</span>
                    </div>
                    <div className="flex items-center">
                      {section.isPreview && (
                        <span className="text-xs text-gray-500 mr-2">Preview</span>
                      )}
                      <span className="text-sm">{section.duration}</span>
                    </div>
                  </div>
                  
                  {/* If section is expanded, show its content */}
                  {section.isExpanded && (
                    <div className="bg-gray-50 pl-10 pr-4 py-2 border-t border-gray-200">
                      <div className="flex items-center">
                        {section.isCompleted ? (
                          <span className="text-blue-500 mr-2">✓</span>
                        ) : (
                          <span className="w-4 h-4 border border-gray-300 rounded-sm mr-2"></span>
                        )}
                        <span className="text-sm">Lecture content would go here</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* See all button */}
            <div className="p-4 bg-white border-t border-gray-300">
              <button className="w-full py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                See all
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Coupon and what you'll learn */}
        <div className="lg:w-1/3">
          {/* Coupon section */}
          <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
            <div className="p-4 bg-white">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015.5-1.65 3 3 0 015.5 1.65V8a1 1 0 01-1 1H6a1 1 0 01-1-1V5z" />
                  <path fillRule="evenodd" d="M2 9.5A1.5 1.5 0 013.5 8H14a1.5 1.5 0 110 3H3.5A1.5 1.5 0 012 9.5z" />
                </svg>
                <h3 className="font-medium">Enter Coupon</h3>
              </div>
              
              <div className="flex mb-4">
                <input 
                  type="text" 
                  className="flex-grow border border-gray-300 rounded-l p-2 text-sm"
                  placeholder=""
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  className="bg-blue-900 text-white px-4 rounded-r"
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              </div>
            </div>
            
            {/* Applied coupon */}
            <div className="bg-gray-200 p-4">
              <div className="text-center">
                <div className="font-medium">Applied Coupon</div>
                <div className="font-bold my-1">MHT10003441TL</div>
                <div className="text-sm text-gray-600">CodeIQGenius Coupon</div>
              </div>
            </div>
          </div>

          {/* What you'll learn section */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 bg-white">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium">What you'll learn</h3>
              </div>
              
              <ul className="space-y-3">
                {learningOutcomes.slice(0, 5).map((outcome) => (
                  <li key={outcome.id} className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{outcome.text}</span>
                  </li>
                ))}
              </ul>

              {/* View more button */}
              <button className="text-sm text-blue-600 mt-3">View more</button>
            </div>
            
            {/* Course includes section */}
            <div className="border-t border-gray-300 p-4 bg-white">
              <h3 className="font-medium mb-4">This course includes</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {courseIncludes.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
