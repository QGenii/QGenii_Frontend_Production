import React from 'react';
import Header from '../HomeAfterLogin/Header';
import { Link } from 'react-router-dom';

// Component for the circular progress indicator
const CircularProgress = ({ percentage }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative h-28 w-28 flex items-center justify-center">
      <svg className="h-full w-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#0288E7"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute text-2xl font-semibold">{percentage}%</div>
    </div>
  );
};

export default function PythonTestReport() {
  // Module test data
  const testData = {
    title: "Report-Module test: Output / print in python",
    date: "13-05-2023",
    score: {
      total: 0,
      outOf: 8,
      percentage: 0
    },
    attemptStats: {
      correct: 0,
      incorrect: 0,
      unattempted: 8
    },
    topics: [
      {
        name: "Printing in python",
        correct: 0,
        total: 8,
        remarks: "Weak",
        resourceLink: "Learn"
      }
    ],
    problemTypes: [
      {
        name: "MCQs",
        correct: 0,
        total: 5
      },
      {
        name: "Coding problems",
        correct: 0,
        total: 3
      }
    ],
    // Updated distribution to match chart in new image
    distribution: [
      { range: "0", count: 1700 },
      { range: "1-10", count: 1200 },
      { range: "11-20", count: 2000 },
      { range: "21-30", count: 2200 },
      { range: "31-40", count: 2400 },
      { range: "41-50", count: 2900 },
      { range: "51-60", count: 0 },  // No bar shown in image
      { range: "61-70", count: 3900 },
      { range: "71-80", count: 4100 },
      { range: "81-90", count: 2900 },
      { range: "91-100", count: 2000 }
    ],
    userPosition: "21-30"
  };

  // Calculate the max value for the chart
  const maxCount = Math.max(...testData.distribution.map(item => item.count));

  return (
    <div className="bg-white min-h-screen">
      {/* <Header /> */}

     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-5">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-medium text-gray-900">{testData.title}</h1>
            <p className="text-sm text-gray-600 mt-1">Attempted Date: {testData.date}</p>
            <p className="text-sm text-gray-600">Total Score: 00 Points</p>
          </div>

          {/* Skill Score */}
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Skill Score</p>
            <CircularProgress percentage={testData.score.percentage} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-6 flex items-center gap-16">
          <div className="flex items-center">
            <div className="text-3xl font-bold pr-2">0</div>
            <div className="text-sm text-gray-500">/8</div>
          </div>

          {/* Legend */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-sm">Correct Ans Attempted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span className="text-sm">Incorrect Answers Attempted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
              <span className="text-sm">Total Unattempted</span>
            </div>
          </div>
        </div>

        {/* Topic Wise Summary Table */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Topic Wise Summary</h2>
          <div className="bg-blue-50 rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-blue-100">
                  <th className="py-3 px-4 text-sm">Topic</th>
                  <th className="py-3 px-4 text-sm">Correct</th>
                  <th className="py-3 px-4 text-sm">Total</th>
                  <th className="py-3 px-4 text-sm">Remarks</th>
                  <th className="py-3 px-4 text-sm">Resources</th>
                </tr>
              </thead>
              <tbody>
                {testData.topics.map((topic, index) => (
                  <tr key={index} className="border-t border-blue-100">
                    <td className="py-3 px-4 text-sm">{topic.name}</td>
                    <td className="py-3 px-4 text-sm">{topic.correct}</td>
                    <td className="py-3 px-4 text-sm">{topic.total}</td>
                    <td className="py-3 px-4 text-sm text-red-500 font-medium">{topic.remarks}</td>
                    <td className="py-3 px-4 text-sm">
                      <a href="#" className="text-blue-600 hover:underline">{topic.resourceLink}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Problem Type Section */}
        <div className="mb-10">
          <h2 className="text-lg font-medium mb-3">Problem type</h2>
          <div className="bg-blue-50 rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-blue-100">
                  <th className="py-3 px-4 text-sm">Topic</th>
                  <th className="py-3 px-4 text-sm">Correct</th>
                  <th className="py-3 px-4 text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {testData.problemTypes.map((type, index) => (
                  <tr key={index} className="border-t border-blue-100">
                    <td className="py-3 px-4 text-sm">{type.name}</td>
                    <td className="py-3 px-4 text-sm">{type.correct}</td>
                    <td className="py-3 px-4 text-sm">{type.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Summary Chart - Completely updated to match new image */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">User Summary Chart</h2>
          <div className="mt-6 relative" style={{ height: "340px" }}>
            {/* Chart Container */}
            <div className="h-[270px] relative border-l border-b border-gray-300">
              {/* Y-axis labels */}
              <div className="absolute -left-12 h-full flex flex-col justify-between text-right">
                <span className="text-sm text-gray-600 -translate-y-2">5000</span>
                <span className="text-sm text-gray-600">4000</span>
                <span className="text-sm text-gray-600">3000</span>
                <span className="text-sm text-gray-600">2000</span>
                <span className="text-sm text-gray-600">1000</span>
                <span className="text-sm text-gray-600 translate-y-2">0</span>
              </div>
              
              {/* Horizontal grid lines */}
              <div className="absolute left-0 top-0 w-full h-full">
                <div className="absolute left-0 top-0 w-full h-px bg-gray-200"></div>
                <div className="absolute left-0 top-1/5 w-full h-px bg-gray-200"></div>
                <div className="absolute left-0 top-2/5 w-full h-px bg-gray-200"></div>
                <div className="absolute left-0 top-3/5 w-full h-px bg-gray-200"></div>
                <div className="absolute left-0 top-4/5 w-full h-px bg-gray-200"></div>
                <div className="absolute left-0 bottom-0 w-full h-px bg-gray-200"></div>
              </div>
              
              {/* Bars */}
              <div className="absolute inset-0 flex items-end justify-between px-3">
                {testData.distribution.map((item, index) => {
                  const height = (item.count / 5000) * 100;
                  const isUserPosition = item.range === testData.userPosition;
                  
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center"
                      style={{ width: '8%' }}
                    >
                      <div className="relative w-full flex flex-col items-center">
                        {/* Bar */}
                        <div 
                          className="w-full bg-blue-700 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                        
                        {/* User Position Indicator */}
                        {isUserPosition && (
                          <div className="absolute -top-10">
                            <div className="bg-blue-700 text-white text-xs py-1 px-3 rounded-md whitespace-nowrap">
                              You are here
                            </div>
                            <div className="w-0 h-0 mx-auto border-l-[6px] border-r-[6px] border-t-[6px] border-t-blue-700 border-l-transparent border-r-transparent"></div>
                            <div className="flex justify-center mt-1">
                              <div className="w-3 h-3 rounded-full bg-orange-400 border-2 border-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* X-axis Label */}
                      <span className="text-xs mt-3 text-gray-600">{item.range}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* X & Y Axis Labels */}
            <div className="flex justify-center mt-8">
              <span className="text-sm font-medium">Percentage</span>
            </div>
            <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 -rotate-90">
              <span className="text-sm font-medium">Students Count</span>
            </div>
          </div>
        </div>

        {/* Solutions Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded">
            View Solutions
          </button>
        </div>
      </div>
    </div>
  );
}

