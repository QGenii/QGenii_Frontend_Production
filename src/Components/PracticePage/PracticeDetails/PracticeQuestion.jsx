import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import QuestionNavbar from "./QuestionNavbar";

// Local fallback question list (MCQ examples). The component will use these
// when backend is not reachable or to support quick local navigation/tests.
export const LOCAL_QUESTIONS = [
  {
    id: 'local-1',
    slug: 'code-output-mcq',
    title: 'Code Output - MCQ',
    description: 'What does the following C++ code snippet print?',
    code: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    cout << 21 + 40;\n    return 0;\n}`,
    options: [
      'Reads two numbers from the console',
      'Adds two numbers and prints the result',
      'Multiplies two numbers and prints the result',
      'None of the above'
    ],
    answer: 1,
    solution: { explanation: 'The code outputs 61 because it prints 21 + 40.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-2',
    slug: 'simple-math',
    title: 'Simple Math MCQ',
    description: 'Which option equals 2 + 2?',
    options: ['3', '4', '5', '22'],
    answer: 1,
    solution: { explanation: '2 + 2 = 4' },
    category: { slug: 'local-category' }
  },
  {
    id: 'print-difference-of-10-and-3',
    slug: 'string-length',
    title: 'String Length',
    description: 'What is the length of the string "hello"?',
    options: ['4', '5', '6', 'Undefined'],
    answer: 1,
    solution: { explanation: 'The string "hello" has 5 characters.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-4',
    slug: 'array-indexing',
    title: 'Array Indexing',
    description: 'Given array [10,20,30], what is element at index 1?',
    options: ['10', '20', '30', 'Index out of bounds'],
    answer: 1,
    solution: { explanation: 'Indexing is zero-based; index 1 refers to the second element 20.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-5',
    slug: 'boolean-logic',
    title: 'Boolean Logic',
    description: 'Evaluate: true && false',
    options: ['true', 'false', 'null', 'undefined'],
    answer: 1,
    solution: { explanation: 'true AND false evaluates to false.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-6',
    slug: 'loop-count',
    title: 'Loop Count',
    description: 'How many times will this loop run? for(int i=0;i<3;i++){}',
    options: ['2', '3', '4', 'Infinite'],
    answer: 1,
    solution: { explanation: 'The loop runs for i = 0,1,2 → 3 iterations.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-7',
    slug: 'zero-division',
    title: 'Zero Division',
    description: 'What happens when you divide an integer by zero in most languages?',
    options: ['Returns 0', 'Throws an error/exception', 'Returns Infinity', 'Undefined behavior always safe'],
    answer: 1,
    solution: { explanation: 'Dividing by zero typically raises an error/exception or causes undefined behavior.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-8',
    slug: 'recursion-base',
    title: 'Recursion Base Case',
    description: 'Why is a base case required in recursion?',
    options: ['To stop recursion', 'To speed up code', 'To allocate memory', 'Not required'],
    answer: 0,
    solution: { explanation: 'A base case stops further recursive calls to avoid infinite recursion.' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-9',
    slug: 'sort-order',
    title: 'Sort Order',
    description: 'What is the result of sorting [3,1,2] ascending?',
    options: ['[1,2,3]', '[3,2,1]', '[2,3,1]', 'Error'],
    answer: 0,
    solution: { explanation: 'Ascending sort arranges numbers as [1,2,3].' },
    category: { slug: 'local-category' }
  },
  {
    id: 'local-10',
    slug: 'modulus',
    title: 'Modulus Operator',
    description: 'What is 7 % 3?',
    options: ['1', '2', '0', '3'],
    answer: 0,
    solution: { explanation: '7 divided by 3 leaves remainder 1, so 7 % 3 = 1.' },
    category: { slug: 'local-category' }
  }
];

const PracticeQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("statement"); // "statement" or "aiHelp"
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  // New state for coding questions
  const [isCodingQuestion, setIsCodingQuestion] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript"); // Default language
  const [runOutput, setRunOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    let isMounted = true;
    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);
      setQuestion(null);
      setSelected(null);
      setSubmitResult(null);
      setRunOutput(null);
      setIsCodingQuestion(false);
      setCode("");

      // Try fetching from backend first
      try {
        const response = await fetch(`/practice/questions/${id}`);
        if (response.ok) {
          const result = await response.json();
          if (isMounted && result.success && result.data) {
            // API returns { success: true, data: { question: {...}, userAttempts: [], ... } }
            const questionData = result.data.question || result.data;
            setQuestion(questionData);
            // Check if it's a coding question (e.g. no options or strict type check if available)
            if (!questionData.options || questionData.options.length === 0 || questionData.type === 'coding') {
              setIsCodingQuestion(true);
              // Handle starterCode which might be an object with language keys
              if (questionData.starterCode) {
                if (typeof questionData.starterCode === 'object') {
                  setCode(questionData.starterCode.javascript || questionData.starterCode.python || Object.values(questionData.starterCode)[0] || "// Write your code here");
                } else {
                  setCode(questionData.starterCode);
                }
              } else {
                setCode("// Write your code here");
              }
            } else {
              // Restore saved answer for MCQ
              try {
                const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '{}');
                if (userAnswers[questionData.slug || questionData.id] !== undefined) {
                  setSelected(userAnswers[questionData.slug || questionData.id]);
                }
              } catch (e) { }
            }
          }
          return;
        }
      } catch (err) {
        // Backend fetch failed, fall through to local
        console.warn("Backend fetch failed, using local questions", err);
      }

      // Fallback to local questions
      const local = LOCAL_QUESTIONS.find(q => String(q.id) === String(id) || q.slug === id || String(q.id) === String(Number(id))) ||
        (Number.isFinite(Number(id)) && LOCAL_QUESTIONS[Number(id) - 1]);
      const q = local || LOCAL_QUESTIONS[0] || null;

      if (isMounted) {
        if (q) {
          setQuestion({ ...q, _source: 'local' });
          // Restore saved answer for MCQ
          try {
            const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '{}');
            if (userAnswers[q.slug || q.id] !== undefined) {
              setSelected(userAnswers[q.slug || q.id]);
            }
          } catch (e) { }
        } else {
          setError('Question not found');
        }
      }
      setLoading(false);
    };

    fetchQuestion();
    return () => { isMounted = false; };
  }, [id]);

  // Handle Run Code
  const handleRun = async () => {
    if (!question) return;
    setIsRunning(true);
    setRunOutput(null);
    const slug = question.slug || question.id;

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        // Trim token in case there's any whitespace
        const cleanToken = token.trim();
        headers['Authorization'] = `Bearer ${cleanToken}`;
      }

      const response = await fetch(`/practice/questions/${slug}/run`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ code, language })
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        setRunOutput({ success: false, error: "Unauthorized: Please log in to run code. Your session may have expired." });
        console.error("401 Unauthorized - Token may be invalid or expired");
        return;
      }

      // Handle other error statuses
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `HTTP ${response.status}: ${response.statusText}` };
        }
        setRunOutput({ success: false, error: errorData.message || errorData.error || `HTTP ${response.status}` });
        return;
      }

      const result = await response.json();
      console.log("Run API Result:", result); // Debugging log
      setRunOutput(result);
    } catch (err) {
      setRunOutput({ success: false, error: "Network error or server unavailable." });
    } finally {
      setIsRunning(false);
    }
  };

  // Handle Submit Code
  const handleCodeSubmit = async () => {
    if (!question) return;
    setIsSubmitting(true);
    setSubmitResult(null);
    const slug = question.slug || question.id;

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        // Trim token in case there's any whitespace
        const cleanToken = token.trim();
        headers['Authorization'] = `Bearer ${cleanToken}`;
      }

      const response = await fetch(`/practice/questions/${slug}/submit`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ code, language })
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        setSubmitResult({ success: false, message: "Unauthorized: Please log in to submit code. Your session may have expired." });
        return;
      }

      // Handle other error statuses
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || `HTTP ${response.status}: ${response.statusText}` };
        }
        setSubmitResult({ success: false, message: errorData.message || errorData.error || `HTTP ${response.status}` });
        return;
      }

      const result = await response.json();
      setSubmitResult(result);

      // If solved, mark as completed
      if (result.success && result.data && result.data.isSolved) {
        markAsCompleted(slug);
      }

    } catch (err) {
      setSubmitResult({ success: false, error: "Network error or server unavailable." });
    } finally {
      setIsSubmitting(false);
    }
  };


  // Submit handler for MCQ-style questions (local check when `answer` present)
  const handleMCQSubmit = async () => {
    setSubmitResult(null);
    if (!question) return;

    // Define slug for use throughout this function (avoid repeated `const slug = ...` blocks)
    const slug = question.slug || question.id;

    if (!Array.isArray(question.options) || question.options.length === 0) {
      setSubmitResult({ correct: false, message: 'No options available to submit.' });
      return;
    }
    if (selected === null) {
      setSubmitResult({ correct: false, message: 'Please select an option before submitting.' });
      return;
    }

    // If backend provided an `answer` index, check locally
    if (typeof question.answer !== 'undefined' && question.answer !== null) {
      const correct = Number(question.answer) === Number(selected);
      setSubmitResult({ correct, message: correct ? 'Correct answer 🎉' : 'Incorrect answer. Try again.' });

      if (correct) {
        markAsCompleted(slug);
      }

      // Persist user answer
      try {
        const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '{}');
        userAnswers[slug] = selected;
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      } catch (e) { }

      return;
    }

    // No authoritative answer available; just echo selection
    setSubmitResult({ correct: false, message: `You selected option ${selected + 1}.` });
    markAsCompleted(slug);

    // Persist user answer
    try {
      const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '{}');
      userAnswers[slug] = selected;
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    } catch (e) { }
  };

  const markAsCompleted = (slug) => {
    try {
      let stored = [];
      try { const parsed = JSON.parse(localStorage.getItem('completedQuestions') || '[]'); stored = Array.isArray(parsed) ? parsed : []; } catch { stored = []; }
      if (!stored.includes(slug)) {
        stored.push(slug);
        localStorage.setItem('completedQuestions', JSON.stringify(stored));
      }
      // Also store current question slug for active highlight
      localStorage.setItem('currentQuestion', slug);
      // Notify other components in same window with detail payload for immediate updates
      try { window.dispatchEvent(new CustomEvent('syllabus:update', { detail: { completed: stored, current: slug } })); } catch (_) { }
    } catch (e) {
      // ignore storage errors
    }
  }


  // Navigate to next question (local only for now, logic can be expanded)
  const handleNext = () => {
    // For local questions
    if (question._source === 'local') {
      const idx = LOCAL_QUESTIONS.findIndex(q => String(q.id) === String(question?.id) || q.slug === question?.slug);
      const next = LOCAL_QUESTIONS[idx + 1];
      if (next) {
        navigate(`/question/${next.id}`);
      } else {
        // maybe try to navigate to next id blindly if local list exhausted?
        // for now just show message
        setSubmitResult({ correct: false, message: 'This is the last local question.' });
      }
    } else {
      // For backend questions, we might rely on the sidebar or a known ID sequence
      // Ideally backend provides 'nextQuestionId'
      // Just purely numeric increment as a simple guess:
      /*
      const currId = Number(id);
      if (Number.isFinite(currId)) {
           navigate(`/question/${currId + 1}`);
      }
      */
      // Without backend next pointer, leaving as is or maybe implementing simple ID increment
      setSubmitResult({ message: 'Next button functionality for backend questions depends on API data.' });
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#333" }}>
      <QuestionNavbar />
      {loading && <div style={{ padding: 16 }}>Loading question...</div>}
      {error && (
        <div style={{ padding: 16, color: 'red' }}>
          <div style={{ marginBottom: 8 }}>Error: {error}</div>
          <div style={{ fontSize: 13, color: '#660000' }}>
            Common causes: the backend expects a question <strong>slug</strong> (e.g. <em>two-sum</em>),
            or the backend isn't running. If you intended to open a numeric id (like <em>101</em>),
            check that the question slug exists on the server.
          </div>
          {LOCAL_QUESTIONS.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Quick local test:</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {LOCAL_QUESTIONS.map(q => (
                  <button
                    key={q.id}
                    onClick={() => { setQuestion({ ...q, _source: 'local' }); setError(null); setLoading(false); }}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                  >
                    {q.slug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {!loading && !error && !question && <div style={{ padding: 16 }}>Question not found.</div>}

      {/* Top Navigation with Tabs and Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#e9f2fd",
        borderBottom: "1px solid #e0e0e0"
      }}>
        {/* Tabs */}
        <div style={{ display: "flex" }}>
          <div
            onClick={() => setActiveTab("statement")}
            style={{
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 20px",
              backgroundColor: activeTab === "statement" ? "#002856" : "#e9f2fd",
              color: activeTab === "statement" ? "#fff" : "#333",
              cursor: "pointer",
              textAlign: "center",
              minWidth: "120px"
            }}
          >
            Statement
          </div>
          <div
            onClick={() => setActiveTab("aiHelp")}
            style={{
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 20px",
              backgroundColor: activeTab === "aiHelp" ? "#002856" : "#e9f2fd",
              color: activeTab === "aiHelp" ? "#fff" : "#333",
              cursor: "pointer",
              textAlign: "center",
              minWidth: "120px"
            }}
          >
            AI Help
          </div>
        </div>

        {/* Submit/Next Buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "0 15px"
        }}>
          {isCodingQuestion ? (
            <>
              <button
                className="btn"
                style={{
                  background: "#28a745",
                  color: "#fff",
                  borderRadius: "4px",
                  padding: "8px 20px",
                  fontWeight: 500,
                  border: "none",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginRight: "10px",
                  opacity: isRunning ? 0.7 : 1
                }}
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button
                className="btn"
                style={{
                  background: "#002856",
                  color: "#fff",
                  borderRadius: "4px",
                  padding: "8px 20px",
                  fontWeight: 500,
                  border: "none",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginRight: "10px",
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onClick={handleCodeSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </>
          ) : (
            <button
              className="btn"
              style={{
                background: "#002856",
                color: "#fff",
                borderRadius: "4px",
                padding: "8px 20px",
                fontWeight: 500,
                border: "none",
                fontSize: "14px",
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={handleMCQSubmit}
              disabled={!question || !(question.options && question.options.length) || selected === null}
            >
              Submit
            </button>
          )}

          <button
            className="btn"
            style={{
              background: "#fff",
              color: "#333",
              borderRadius: "4px",
              padding: "8px 20px",
              fontWeight: 500,
              border: "1px solid #ddd",
              fontSize: "14px",
              cursor: "pointer"
            }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: "flex",
        minHeight: "calc(100vh - 130px)",
        borderBottom: "1px solid #e0e0e0"
      }}>
        {/* Left: Statement or AI Help */}
        <div style={{
          width: "50%",
          borderRight: "1px solid #e0e0e0",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "calc(100vh - 130px)"
        }}>
          {question && activeTab === "statement" ? (
            <>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 10, color: "#333" }}>
                {question.title || question.slug}
              </div>
              <div style={{ marginBottom: 15, color: "#555", fontSize: "14px" }}>
                {question.description || question.statement}
              </div>
              {question.code && !isCodingQuestion && (
                <div style={{
                  background: "#1e1e1e",
                  borderRadius: "4px",
                  padding: "15px",
                  marginBottom: 0,
                  fontFamily: "monospace",
                  color: "#e3eafc",
                  fontSize: "14px",
                  marginTop: "10px"
                }}>
                  <pre style={{ margin: 0, background: "none", color: "inherit", overflow: "auto" }}>
                    {question.code}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div style={{ height: "100%", position: "relative" }}>
              {/* AI Help Placeholder - kept same as before */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px"
              }}>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#333" }}>
                  Discussion with AI
                </div>
                <button style={{
                  background: "#f0f2f5",
                  border: "none",
                  color: "#1976d2",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer"
                }}>
                  Logout
                </button>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60%"
              }}>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <div style={{
                    background: "white",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <div style={{
                      background: "#1976d2",
                      width: 30,
                      height: 30,
                      borderRadius: "50%"
                    }}></div>
                  </div>

                  {/* Speech bubble */}
                  <div style={{
                    position: "absolute",
                    top: 10,
                    right: -20,
                    background: "#fff",
                    padding: "8px 16px",
                    borderRadius: 20,
                    fontSize: "16px",
                    color: "#333",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}>
                    Hi!
                  </div>
                </div>
              </div>

              <div style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <input
                  type="text"
                  placeholder="How can I help you via existing?"
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    borderRadius: "4px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    color: "#333",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
                <button style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#1976d2",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Options (MCQ) or Code Editor (Coding) */}
        <div style={{
          width: "50%",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#1e1e1e",
          height: "calc(100vh - 130px)",
        }}>
          {isCodingQuestion ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Editor Header */}
              <div style={{ padding: '8px 15px', background: '#252526', color: '#ccc', fontSize: '12px', borderBottom: '1px solid #333' }}>
                <span>Language: </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ background: '#333', color: '#fff', border: 'none', marginLeft: '5px', padding: '2px 5px', borderRadius: '3px' }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>
              {/* Simple Text Area Editor */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  flex: 1,
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  border: 'none',
                  padding: '15px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  resize: 'none',
                  outline: 'none'
                }}
                spellCheck="false"
              />

              {/* Output / Result Console */}
              <div style={{ height: '30%', borderTop: '1px solid #333', background: '#1e1e1e', overflowY: 'auto', padding: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#888', marginBottom: '5px' }}>OUTPUT / CONSOLE</div>
                {/* DEBUG: Show raw output */}
                {runOutput && (
                  <pre style={{ color: 'yellow', fontSize: '10px' }}>{JSON.stringify(runOutput, null, 2)}</pre>
                )}

                {/* Run Output */}
                {runOutput && (
                  <div style={{ fontSize: '13px', fontFamily: 'monospace' }}>
                    {runOutput.success ? (
                      <>
                        <div style={{ color: '#4caf50' }}>Run Successful</div>
                        {runOutput.results && runOutput.results.map((res, i) => (
                          <div key={i} style={{ marginTop: '5px', borderLeft: res.passed ? '3px solid #4caf50' : '3px solid #f44336', paddingLeft: '8px' }}>
                            <div style={{ color: '#ccc' }}>Input: {res.input}</div>
                            <div style={{ color: '#ccc' }}>Expected: {res.expectedOutput}</div>
                            <div style={{ color: res.passed ? '#4caf50' : '#f44336' }}>Actual: {res.actualOutput}</div>
                            {!res.passed && res.error && <div style={{ color: '#f44336' }}>Error: {res.error}</div>}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: '#f44336' }}>
                        Run Failed: {runOutput.error || "Unknown error"}
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Result */}
                {submitResult && (
                  <div style={{ fontSize: '13px', fontFamily: 'monospace', marginTop: '10px' }}>
                    {submitResult.success && submitResult.data ? (
                      <div style={{ color: submitResult.data.isSolved ? '#4caf50' : '#ff9800' }}>
                        <div>Status: {submitResult.data.status}</div>
                        <div>Test Cases: {submitResult.data.testCasesPassed} / {submitResult.data.totalTestCases}</div>
                        {submitResult.data.isSolved && <div>Points Earned: {submitResult.data.pointsEarned}</div>}
                      </div>
                    ) : (
                      <div style={{ color: '#f44336' }}>
                        Submission Failed: {submitResult.error || submitResult.message || "Unknown Error"}
                      </div>
                    )}
                  </div>
                )}

                {!runOutput && !submitResult && <div style={{ color: '#666', fontSize: '13px' }}>Run code to see output here.</div>}
              </div>
            </div>
          ) : (
            // MCQ Options
            <div style={{ padding: "20px", background: '#fff', height: '100%', overflowY: 'auto' }}>
              <div style={{ fontWeight: 500, fontSize: "14px", marginBottom: 15, color: "#333" }}>
                Select one of the following options:
              </div>
              <div>
                {((question && question.options) || []).map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelected(idx)}
                    style={{
                      border: selected === idx ? "2px solid #1976d2" : "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "12px 14px",
                      marginBottom: 10,
                      background: "white",
                      color: "#333",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      transition: "all 0.2s",
                      boxShadow: selected === idx ? "0 0 0 2px rgba(25, 118, 210, 0.2)" : "none"
                    }}
                  >
                    <input
                      type="radio"
                      checked={selected === idx}
                      onChange={() => setSelected(idx)}
                      style={{
                        marginRight: 10,
                        accentColor: "#1976d2",
                        width: "16px",
                        height: "16px"
                      }}
                    />
                    {opt}
                  </div>
                ))}
              </div>

              {/* See Answer / Solution */}
              <div style={{ margin: "20px 0" }}>
                <div style={{
                  background: "#e3f2fd",
                  borderRadius: "4px",
                  padding: "10px 15px",
                  color: "#1976d2"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <button
                      className="btn"
                      style={{
                        background: "none",
                        color: "#1976d2",
                        padding: 0,
                        fontWeight: 600,
                        border: "none",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                      onClick={() => setShowSolution((s) => !s)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1976d2" style={{ marginRight: "6px" }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                      See Answer
                    </button>
                    <div style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}>
                      View Solution
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#1976d2" style={{ marginLeft: "4px" }}>
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                      </svg>
                    </div>
                  </div>
                  {showSolution && (
                    <div style={{
                      marginTop: 10,
                      color: "#1976d2",
                      fontSize: "14px"
                    }}>
                      {question?.solution?.explanation || question?.solution || 'Solution not available.'}
                    </div>
                  )}
                </div>
              </div>
              {/* Submit result feedback */}
              {submitResult && !isCodingQuestion && (
                <div style={{ marginTop: 8, padding: 10, borderRadius: 6, background: submitResult.correct ? '#e6f4ea' : '#fff1f0', color: submitResult.correct ? '#166534' : '#9f1239' }}>
                  {submitResult.message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Button handlers placed after component so they can access state via closures
export default PracticeQuestion;