import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContest, getContestQuestions, getParticipantScore } from '../../lib/contestApi';
import { runCode, submitCode } from '../../lib/codeSubmissionApi';
import { useAuth } from '../../hooks/useAuth';
import CodeEditor, { LANGUAGE_CONFIG } from '../../Components/CodeEditor';
import { Spinner } from '../../Components/ui/Spinner';

export default function CodingContestAttempt() {
  const { id: contestId, questionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [myScore, setMyScore] = useState(0);
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);

  // Code editor state
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showHints, setShowHints] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const codingQuestions = questions.filter(q => q.type === 'CODING');

  useEffect(() => {
    loadContestData();
  }, [contestId]);

  useEffect(() => {
    // Reset code when question changes
    if (currentQuestion && currentQuestion.type === 'CODING') {
      const starterCode = currentQuestion.starterCode?.[language] || LANGUAGE_CONFIG[language]?.defaultCode || '';
      setCode(starterCode);
      setTestResults(null);
      setShowHints(false);
    }
  }, [currentQuestionIndex, language, currentQuestion]);

  const loadContestData = async () => {
    try {
      setLoading(true);
      const [contestRes, questionsRes] = await Promise.all([
        getContest(contestId),
        getContestQuestions(contestId),
      ]);

      setContest(contestRes.data?.contest || contestRes.contest);
      const allQuestions = questionsRes.data?.questions || questionsRes.questions || [];
      setQuestions(allQuestions);

      // If questionId is provided, this is single question mode
      if (questionId) {
        setSingleQuestionMode(true);
        const questionIndex = allQuestions.findIndex(q => q._id === questionId);
        if (questionIndex >= 0) {
          setCurrentQuestionIndex(questionIndex);
        } else {
          setError('Question not found');
        }
      } else {
        // Find first coding question
        const firstCodingIndex = allQuestions.findIndex(q => q.type === 'CODING');
        if (firstCodingIndex >= 0) {
          setCurrentQuestionIndex(firstCodingIndex);
        }
      }

      // Load current score
      await loadMyScore();
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load contest');
    } finally {
      setLoading(false);
    }
  };

  const loadMyScore = async () => {
    try {
      const scoreRes = await getParticipantScore(contestId);
      setMyScore(scoreRes.data?.score || scoreRes.score || 0);
    } catch (e) {
      console.error('Failed to load score:', e);
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      alert('Please write some code first');
      return;
    }

    setRunning(true);
    setTestResults(null);

    try {
      const result = await runCode(contestId, currentQuestion._id, {
        language,
        code,
      });

      setTestResults(result.data);
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to run code');
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!code.trim()) {
      alert('Please write some code first');
      return;
    }

    if (!confirm('Are you sure you want to submit? This will be evaluated against all test cases.')) {
      return;
    }

    setSubmitting(true);
    setTestResults(null);

    try {
      const result = await submitCode(contestId, currentQuestion._id, {
        language,
        code,
      });

      setTestResults(result.data);
      alert(`Submission ${result.data.status}! Score: ${result.data.score}/${currentQuestion.points}`);
      
      // Reload score after submission
      await loadMyScore();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to submit code');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Load starter code for new language
    const starterCode = currentQuestion.starterCode?.[newLang] || LANGUAGE_CONFIG[newLang]?.defaultCode || '';
    setCode(starterCode);
  };

  const selectQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!currentQuestion || currentQuestion.type !== 'CODING') {
    return <div className="p-6">No coding questions available in this contest.</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(singleQuestionMode ? `/contests/${contestId}/questions` : `/contests/${contestId}`)}
            className="text-blue-600 hover:underline text-sm"
          >
            ← {singleQuestionMode ? 'Back to Questions' : 'Back to Contest'}
          </button>
          <h1 className="text-lg font-semibold">{contest?.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
            Score: {myScore}
          </div>
          {!singleQuestionMode && (
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {codingQuestions.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Statement */}
        <div className="w-1/2 border-r bg-white flex flex-col overflow-hidden">
          {/* Question Tabs */}
          {!singleQuestionMode && (
            <div className="border-b p-2 flex gap-2 overflow-x-auto">
              {codingQuestions.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => selectQuestion(questions.findIndex(qu => qu._id === q._id))}
                  className={`px-4 py-2 text-sm font-medium rounded whitespace-nowrap ${
                    q._id === currentQuestion._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}. {q.title}
                </button>
              ))}
            </div>
          )}

          {/* Problem Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-2">{currentQuestion.title}</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-2 py-1 text-xs rounded ${
                currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-sm text-gray-600">{currentQuestion.points} points</span>
            </div>

            {/* Problem Statement */}
            {currentQuestion.problemStatement && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Problem Description</h3>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {currentQuestion.problemStatement}
                </div>
              </div>
            )}

            {/* Input Format */}
            {currentQuestion.inputFormat && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Input Format</h3>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap">
                  {currentQuestion.inputFormat}
                </div>
              </div>
            )}

            {/* Output Format */}
            {currentQuestion.outputFormat && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Output Format</h3>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap">
                  {currentQuestion.outputFormat}
                </div>
              </div>
            )}

            {/* Constraints */}
            {currentQuestion.constraints && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Constraints</h3>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {currentQuestion.constraints}
                </div>
              </div>
            )}

            {/* Examples */}
            {currentQuestion.examples && currentQuestion.examples.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Examples</h3>
                {currentQuestion.examples.map((example, idx) => (
                  <div key={idx} className="mb-4 border rounded p-4 bg-gray-50">
                    <div className="font-medium mb-2">Example {idx + 1}:</div>
                    <div className="mb-2">
                      <div className="text-sm font-medium text-gray-600">Input:</div>
                      <pre className="bg-white p-2 rounded text-sm border">{example.input}</pre>
                    </div>
                    <div className="mb-2">
                      <div className="text-sm font-medium text-gray-600">Output:</div>
                      <pre className="bg-white p-2 rounded text-sm border">{example.output}</pre>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-sm font-medium text-gray-600">Explanation:</div>
                        <div className="text-sm text-gray-700">{example.explanation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Hints */}
            {currentQuestion.hints && currentQuestion.hints.length > 0 && (
              <div className="mb-6">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 text-blue-600 hover:underline mb-2"
                >
                  {showHints ? '▼' : '▶'} Hints ({currentQuestion.hints.length})
                </button>
                {showHints && (
                  <div className="space-y-2">
                    {currentQuestion.hints.map((hint, idx) => (
                      <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
                        <span className="font-medium">Hint {idx + 1}:</span> {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor & Results */}
        <div className="w-1/2 flex flex-col bg-gray-100">
          {/* Code Editor */}
          <div className="flex-1 p-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              onLanguageChange={handleLanguageChange}
              supportedLanguages={contest?.supportedLanguages || ['javascript', 'python', 'java', 'cpp']}
              height="calc(100vh - 350px)"
            />
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-2 flex gap-3">
            <button
              onClick={handleRunCode}
              disabled={running || submitting}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? 'Running...' : '▶ Run Code'}
            </button>
            <button
              onClick={handleSubmitCode}
              disabled={running || submitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : '✓ Submit'}
            </button>
          </div>

          {/* Test Results */}
          <div className="p-4 bg-white border-t max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-2">Test Results</h3>
            {!testResults && (
              <p className="text-sm text-gray-500">Run your code to see test results</p>
            )}
            {testResults && (
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    testResults.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                    testResults.status === 'WRONG_ANSWER' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {testResults.status.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {testResults.passedCount} / {testResults.totalCount} passed
                  </span>
                  {testResults.score !== undefined && (
                    <span className="text-sm text-gray-600">
                      Score: {testResults.score}/{currentQuestion.points}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {testResults.testResults?.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border text-sm ${
                        result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          Test Case {idx + 1}: {result.passed ? '✓ Passed' : '✗ Failed'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {result.executionTime}ms
                        </span>
                      </div>
                      {result.input !== '***' && (
                        <div className="text-xs">
                          <span className="font-medium">Input:</span> {result.input || '(empty)'}
                        </div>
                      )}
                      {result.expectedOutput !== '***' && (
                        <div className="text-xs">
                          <span className="font-medium">Expected:</span> {result.expectedOutput}
                        </div>
                      )}
                      {result.actualOutput && (
                        <div className="text-xs">
                          <span className="font-medium">Your Output:</span> {result.actualOutput}
                        </div>
                      )}
                      {result.error && (
                        <div className="text-xs text-red-600 mt-1">
                          <span className="font-medium">Error:</span> {result.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
