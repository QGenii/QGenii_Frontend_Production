import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import toast from 'react-hot-toast';

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

const ContestResultsPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [submissionResults, setSubmissionResults] = useState(null);
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [codingState, setCodingState] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contest details
        const contestRes = await api.get(`/contests/${contestId}`);
        setContest(contestRes.data?.contest || contestRes.data);

        // Fetch questions
        const questionsRes = await api.get(`/contests/${contestId}/playable-questions`);
        const fetchedQuestions = questionsRes.data?.questions || questionsRes.data?.data?.questions || [];
        setQuestions(fetchedQuestions);

        // Load saved state from localStorage
        const savedState = localStorage.getItem(`contest_${contestId}_state`);
        if (savedState) {
          const parsed = JSON.parse(savedState);
          setSubmittedQuestions(parsed.submittedQuestions || {});
          setSelectedOptions(parsed.selectedOptions || {});
          setCodingState(parsed.codingState || {});
        }

        // Try to fetch submission results
        try {
          const scoreRes = await api.get(`/contests/${contestId}/my-score`);
          setSubmissionResults(scoreRes.data);
        } catch (e) {
          console.log('No submission results yet');
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load contest results");
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId]);

  const getQuestionId = (q, fallbackIdx) => q?.id || q?._id || String(fallbackIdx ?? 0);

  // Calculate statistics
  let attemptedCount = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let totalScore = 0;
  let maxScore = 0;

  questions.forEach((q, idx) => {
    const qid = getQuestionId(q, idx);
    const qType = (q.type || "").toLowerCase();
    maxScore += q.points || 1;

    if (qType === "coding") {
      const codingStateForQ = codingState[qid] || {};
      if (codingStateForQ.submitResult || submittedQuestions[qid]) {
        attemptedCount++;
        if (codingStateForQ.submitResult?.status === 'ACCEPTED') {
          correctCount++;
          totalScore += q.points || 1;
        } else {
          wrongCount++;
        }
      }
    } else if (qType === "mcq" || qType === "coding_mcq") {
      if (submittedQuestions[qid]) {
        attemptedCount++;
        const selectedIdx = selectedOptions[qid];
        const selectedOption = q.options?.[selectedIdx];
        if (selectedOption?.isCorrect) {
          correctCount++;
          totalScore += q.points || 1;
        } else {
          wrongCount++;
        }
      }
    }
  });

  const unattemptedCount = questions.length - attemptedCount;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Get current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

  // Calculate topic-wise summary with individual coding questions
  const topicSummary = [{
    name: contest?.name || "Contest",
    correct: correctCount,
    total: questions.length,
    remarks: percentage < 50 ? "Weak" : percentage < 70 ? "Average" : "Good",
    resourceLink: "Learn"
  }];

  // Add individual coding questions with test case details
  let codingQuestionNumber = 0;
  const codingQuestionsWithDetails = questions
    .map((q, idx) => {
      const qid = getQuestionId(q, idx);
      const qType = (q.type || "").toLowerCase();
      if (qType === "coding") {
        codingQuestionNumber++;
        const codingStateForQ = codingState[qid] || {};
        const submitResult = codingStateForQ.submitResult;
        
        let passedTests = 0;
        let totalTests = 0;
        let testCaseDetails = [];
        
        if (submitResult && submitResult.testResults && Array.isArray(submitResult.testResults)) {
          // Count ALL test cases (both public and private) for results display
          const allTests = submitResult.testResults;
          
          passedTests = allTests.filter(tr => tr.passed).length;
          totalTests = allTests.length;
          
          // Collect test case details for row-wise display (only public ones for details)
          const publicTests = allTests.filter(tr => {
            const isPublic = tr.isPublic !== false;
            const isNotHidden = tr.input !== '***' && tr.input !== undefined && tr.expectedOutput !== '***' && tr.expectedOutput !== undefined;
            return isPublic && isNotHidden;
          });
          
          testCaseDetails = publicTests.map((tr, testIdx) => ({
            testCaseNumber: testIdx + 1,
            passed: tr.passed,
            input: tr.input,
            expectedOutput: tr.expectedOutput,
            actualOutput: tr.actualOutput
          }));
        }
        
        return {
          name: `Coding question ${codingQuestionNumber}`,
          questionTitle: q.title || `Coding question ${codingQuestionNumber}`,
          passedTests,
          totalTests, // This now includes private test cases
          testCaseDetails,
          remarks: totalTests > 0 ? (passedTests === totalTests ? "Good" : passedTests > 0 ? "Average" : "Weak") : "Not Attempted",
          resourceLink: "Learn"
        };
      }
      return null;
    })
    .filter(item => item !== null);

  // Calculate problem type summary
  const mcqQuestions = questions.filter(q => {
    const qType = (q.type || "").toLowerCase();
    return qType === "mcq" || qType === "coding_mcq";
  });
  const codingQuestions = questions.filter(q => {
    const qType = (q.type || "").toLowerCase();
    return qType === "coding";
  });

  let mcqCorrect = 0;
  let mcqWrong = 0;
  let codingTestCasesPassed = 0;
  let codingTotalTestCases = 0;

  questions.forEach((q, idx) => {
    const qid = getQuestionId(q, idx);
    const qType = (q.type || "").toLowerCase();
    
    if (qType === "mcq" || qType === "coding_mcq") {
      if (submittedQuestions[qid]) {
        const selectedIdx = selectedOptions[qid];
        const selectedOption = q.options?.[selectedIdx];
        if (selectedOption?.isCorrect) {
          mcqCorrect++;
        } else {
          mcqWrong++;
        }
      }
    } else if (qType === "coding") {
      const codingStateForQ = codingState[qid] || {};
      if (codingStateForQ.submitResult && codingStateForQ.submitResult.testResults && Array.isArray(codingStateForQ.submitResult.testResults)) {
        // Count ALL test cases (both public and private) for total statistics
        const allTests = codingStateForQ.submitResult.testResults;
        const passedCount = allTests.filter(tr => tr.passed).length;
        const totalCount = allTests.length;
        codingTestCasesPassed += passedCount;
        codingTotalTestCases += totalCount;
      }
    }
  });

  const problemTypes = [
    {
      name: "MCQs",
      correct: mcqCorrect,
      wrong: mcqWrong,
      total: mcqQuestions.length,
      type: "mcq"
    },
    {
      name: "Coding problems",
      passed: codingTestCasesPassed,
      total: codingTotalTestCases,
      type: "coding"
    }
  ];

  // Distribution data (mock data for chart)
  const distribution = [
    { range: "0", count: 1700 },
    { range: "1-10", count: 1200 },
    { range: "11-20", count: 2000 },
    { range: "21-30", count: 2200 },
    { range: "31-40", count: 2400 },
    { range: "41-50", count: 2900 },
    { range: "51-60", count: 0 },
    { range: "61-70", count: 3900 },
    { range: "71-80", count: 4100 },
    { range: "81-90", count: 2900 },
    { range: "91-100", count: 2000 }
  ];

  const maxCount = Math.max(...distribution.map(item => item.count));
  const userPosition = percentage <= 0 ? "0" : 
                      percentage <= 10 ? "1-10" :
                      percentage <= 20 ? "11-20" :
                      percentage <= 30 ? "21-30" :
                      percentage <= 40 ? "31-40" :
                      percentage <= 50 ? "41-50" :
                      percentage <= 60 ? "51-60" :
                      percentage <= 70 ? "61-70" :
                      percentage <= 80 ? "71-80" :
                      percentage <= 90 ? "81-90" : "91-100";

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-5">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Report-{contest?.name || 'Contest'}</h1>
            <p className="text-sm text-gray-600 mt-1">Attempted Date: {formattedDate}</p>
            <p className="text-sm text-gray-600">Total Score: {totalScore.toString().padStart(2, '0')} Points</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Time and Score */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-600">09 Min : 21 Sec</span>
              </div>
              <div className="text-sm text-gray-600">
                {totalScore}/{maxScore} Points
              </div>
            </div>

            {/* Skill Score */}
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Skill Score</p>
              <CircularProgress percentage={percentage} />
            </div>

            {/* View Solutions Button */}
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              {/* View Solutions */}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{attemptedCount.toString().padStart(2, '0')}</div>
            <div className="text-gray-700 font-medium">Answers Attempted</div>
          </div>
          <div className="bg-white border-2 border-red-500 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">{wrongCount.toString().padStart(2, '0')}</div>
            <div className="text-gray-700 font-medium">Wrong Answers Attempted</div>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-gray-600 mb-2">{unattemptedCount.toString().padStart(2, '0')}</div>
            <div className="text-gray-700 font-medium">Total Unattempted</div>
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
                {topicSummary.map((topic, index) => (
                  <tr key={index} className="border-t border-blue-100">
                    <td className="py-3 px-4 text-sm font-medium">{topic.name}</td>
                    <td className="py-3 px-4 text-sm">{topic.correct}</td>
                    <td className="py-3 px-4 text-sm">{topic.total}</td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      topic.remarks === "Weak" ? "text-red-500" :
                      topic.remarks === "Average" ? "text-yellow-500" :
                      "text-green-500"
                    }`}>{topic.remarks}</td>
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
                  <th className="py-3 px-4 text-sm">Correct / Test Cases Passed</th>
                  <th className="py-3 px-4 text-sm">Wrong</th>
                  <th className="py-3 px-4 text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* MCQ Row */}
                {problemTypes.filter(t => t.type === "mcq").map((type, index) => (
                  <tr key={index} className="border-t border-blue-100">
                    <td className="py-3 px-4 text-sm">{type.name}</td>
                    <td className="py-3 px-4 text-sm">{type.correct}</td>
                    <td className="py-3 px-4 text-sm">{type.wrong}</td>
                    <td className="py-3 px-4 text-sm">{type.total}</td>
                  </tr>
                ))}
                
                {/* Coding Problems Header Row - Highlighted */}
                {problemTypes.filter(t => t.type === "coding").map((type, index) => (
                  <React.Fragment key={`coding-header-${index}`}>
                    <tr className="border-t border-blue-100 bg-blue-200 font-semibold">
                      <td className="py-3 px-4 text-sm">Coding problems</td>
                      <td className="py-3 px-4 text-sm">{type.passed || 0} / {type.total || 0}</td>
                      <td className="py-3 px-4 text-sm">-</td>
                      <td className="py-3 px-4 text-sm">{codingQuestions.length}</td>
                    </tr>
                    
                    {/* Individual Coding Questions */}
                    {codingQuestionsWithDetails.map((codingQ, idx) => (
                      <tr key={`coding-${idx}`} className="border-t border-blue-50 bg-white">
                        <td className="py-3 px-4 text-sm pl-8 font-medium">{codingQ.name}</td>
                        <td className="py-3 px-4 text-sm">
                          {codingQ.passedTests > 0 ? codingQ.passedTests : 0} / {codingQ.totalTests}
                        </td>
                        <td className="py-3 px-4 text-sm">-</td>
                        <td className="py-3 px-4 text-sm">{codingQ.totalTests}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Summary Chart */}
        <div className="mb-10">
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
                {distribution.map((item, index) => {
                  const height = (item.count / 5000) * 100;
                  const isUserPosition = item.range === userPosition;
                  
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center"
                      style={{ width: '8%' }}
                    >
                      <div className="relative w-full flex flex-col items-center">
                        {/* Bar */}
                        <div 
                          className={`w-full rounded-t ${isUserPosition ? 'bg-orange-400' : 'bg-blue-700'}`}
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
      </div>
    </div>
  );
};

export default ContestResultsPage;

