import React from 'react';

const features = [
  {
    title: 'Your Personal AI Tutor : Solve Problems Instantly',
    description:
      'Get step-by-step explanations, debugging hints, and personalized learning guidance from our AI-powered assistant.',
    bullets: [
      'Ask coding-related questions.',
      'Get instant solutions & explanations.',
      'Debug and optimize your code in real time.',
    ],
    buttonText: 'Ask AI Mentor',
    image: '/img1.png',
    badge: 'AI Mentor',
    badgeColor: 'text-[#FFA400]',
  },
  {
    title: 'Practice to Solve Real World Problems',
    description: 'There are challenges that truly matter.',
    bullets: [
      'Choose any difficulty level.',
      'Explore 30+ languages and technologies.',
      'Use AI Tutor for smart tips.',
    ],
    buttonText: 'Start Practice',
    image: '/img2.jpg',
    badge: 'Real World Problem',
    badgeColor: 'text-[#00C896]',
  },
  {
    title: 'Build Real World Projects',
    description: 'Solve real problems with projects.',
    bullets: [
      'Explore projects in full stack development and data science.',
      'Gain practical, job-ready skills.',
    ],
    buttonText: 'Start Practice',
    image: '/img3.png',
    badge: 'Real World Projects',
    badgeColor: 'text-[#FF6D6D]',
    isLargeText: true,
  },
  {
    title: 'Show off what you’ve got and learn from top coders worldwide.',
    description: 'Join contests at global, national, and even college levels.',
    bullets: [
      'Climb our leaderboards and showcase your success.',
      'Win rewards, certificates, and internship opportunities.',
    ],
    buttonText: 'Start Practice',
    image: '/img4.jpg',
    badge: 'Coding Contests',
    badgeColor: 'text-[#00C896]',
  },
  {
    title: 'Your Interactive Coding Playground',
    description: 'Code, Test & Debug Instantly in any Language.',
    bullets: [
      'Build web applications with our HTML and React online compilers.',
      'Gain practical, job-ready skills.',
    ],
    buttonText: 'Explore Compiler',
    image: '/Frame.png',
    badge: '',
    badgeColor: 'text-[#00C896]',
  },
];

export default function Section4() {
  return (
    <div className="py-16 px-4 md:px-10 lg:px-20 space-y-24">
      {features.map((feature, index) => {
        const isReversed = index % 2 !== 0;
        return (
          <div
            key={index}
            className={`flex flex-col ${
              isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center justify-between gap-10`}
          >
            {/* Image */}
            <div className="w-full md:max-w-2/3 flex justify-center bg-white">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-[360px] h-[240px] object-contain rounded"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2">
              {feature.badge && (
                <p className={`text-sm font-semibold mb-1 ${feature.badgeColor}`}>
                  {feature.badge}
                </p>
              )}
              <h3
                className={`text-xl ${
                  feature.isLargeText ? 'md:text-2xl' : ''
                } font-bold mb-2 text-gray-900`}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 mb-3">{feature.description}</p>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-4">
                {feature.bullets.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
                {feature.buttonText}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
