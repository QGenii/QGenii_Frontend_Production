import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import toast from "react-hot-toast";
import CodeEditor from "../Compiler/CodeEditor";
import { runCode as runContestCode, submitCode as submitContestCode } from "../../lib/codeSubmissionApi";
import { submitContest } from "../../lib/contestApi";
import {ArrowLeft} from 'lucide-react'

const ContestAssessmentPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [submissionResults, setSubmissionResults] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Coding editor state (per-question)
  const [codingState, setCodingState] = useState({});
  
  // Selected test case index for detailed view
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  const getQuestionId = (q, fallbackIdx) => q?.id || q?._id || String(fallbackIdx ?? 0);

  // Comprehensive input parser for various formats
  const parseInput = (input) => {
    if (!input || input === '***' || input === undefined) return null;
    
    const inputStr = String(input).trim();
    if (!inputStr) return null;
    
    // Helper function to extract balanced brackets/braces
    const extractBalanced = (str, startIdx, openChar, closeChar) => {
      if (str[startIdx] !== openChar) return null;
      let depth = 0;
      let endIdx = startIdx;
      for (let i = startIdx; i < str.length; i++) {
        if (str[i] === openChar) depth++;
        if (str[i] === closeChar) depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
      return depth === 0 ? str.substring(startIdx, endIdx + 1) : null;
    };
    
    // Parse key-value pairs
    const parseKeyValuePairs = (str) => {
      const result = {};
      let i = 0;
      
      while (i < str.length) {
        // Skip whitespace and commas
        while (i < str.length && /[\s,]/.test(str[i])) i++;
        if (i >= str.length) break;
        
        // Extract variable name
        const nameMatch = str.substring(i).match(/^(\w+)\s*=\s*/);
        if (!nameMatch) break;
        
        const varName = nameMatch[1];
        i += nameMatch[0].length;
        
        // Extract value (handle arrays, objects, strings, numbers)
        let valueStr = null;
        
        // Check for array
        if (str[i] === '[') {
          valueStr = extractBalanced(str, i, '[', ']');
          if (valueStr) {
            i += valueStr.length;
            try {
              const parsed = JSON.parse(valueStr);
              result[varName] = parsed;
            } catch {
              // Manual parsing for nested arrays
              result[varName] = valueStr;
            }
          }
        }
        // Check for object
        else if (str[i] === '{') {
          valueStr = extractBalanced(str, i, '{', '}');
          if (valueStr) {
            i += valueStr.length;
            try {
              result[varName] = JSON.parse(valueStr);
            } catch {
              result[varName] = valueStr;
            }
          }
        }
        // Check for string
        else if (str[i] === '"' || str[i] === "'") {
          const quote = str[i];
          let endQuote = str.indexOf(quote, i + 1);
          while (endQuote > 0 && str[endQuote - 1] === '\\') {
            endQuote = str.indexOf(quote, endQuote + 1);
          }
          if (endQuote > 0) {
            valueStr = str.substring(i, endQuote + 1);
            i = endQuote + 1;
            try {
              result[varName] = JSON.parse(valueStr);
            } catch {
              result[varName] = valueStr.slice(1, -1);
            }
          }
        }
        // Try to extract number, boolean, or null
        else {
          const rest = str.substring(i);
          const numberMatch = rest.match(/^(-?\d+\.?\d*)/);
          const boolMatch = rest.match(/^(true|false|null)/);
          
          if (numberMatch) {
            valueStr = numberMatch[1];
            result[varName] = valueStr.includes('.') ? parseFloat(valueStr) : parseInt(valueStr, 10);
            i += valueStr.length;
          } else if (boolMatch) {
            valueStr = boolMatch[1];
            result[varName] = valueStr === 'true' ? true : valueStr === 'false' ? false : null;
            i += valueStr.length;
          } else {
            // Extract until comma or end
            const untilComma = rest.match(/^([^,]+)/);
            if (untilComma) {
              valueStr = untilComma[1].trim();
              result[varName] = valueStr;
              i += valueStr.length;
            } else {
              break;
            }
          }
        }
      }
      
      if (Object.keys(result).length > 0) {
        return Object.keys(result).map(key => {
          const val = result[key];
          if (Array.isArray(val)) {
            // Handle nested arrays
            if (val.some(item => Array.isArray(item))) {
              return `${key} = ${JSON.stringify(val).replace(/\s+/g, ' ')}`;
            }
            return `${key} = [${val.join(',')}]`;
          } else if (typeof val === 'object' && val !== null) {
            return `${key} = ${JSON.stringify(val)}`;
          } else if (typeof val === 'string') {
            return `${key} = "${val}"`;
          } else {
            return `${key} = ${val}`;
          }
        });
      }
      
      return null;
    };
    
    // Try key-value format first
    if (inputStr.includes('=')) {
      const kvResult = parseKeyValuePairs(inputStr);
      if (kvResult) return kvResult;
    }
    
    // Try to parse as complete JSON
    try {
      const parsed = JSON.parse(inputStr);
      if (typeof parsed === 'object' && parsed !== null) {
        if (Array.isArray(parsed)) {
          // Single array
          return [`input = [${parsed.join(',')}]`];
        } else {
          // Object with multiple keys
          return Object.keys(parsed).map(key => {
            const val = parsed[key];
            if (Array.isArray(val)) {
              if (val.some(item => Array.isArray(item))) {
                return `${key} = ${JSON.stringify(val).replace(/\s+/g, ' ')}`;
              }
              return `${key} = [${val.join(',')}]`;
            } else if (typeof val === 'object' && val !== null) {
              return `${key} = ${JSON.stringify(val)}`;
            } else if (typeof val === 'string') {
              return `${key} = "${val}"`;
            } else {
              return `${key} = ${val}`;
            }
          });
        }
      }
    } catch (e) {
      // Not valid JSON, continue
    }
    
    // Try line-based format: "4\n2 7 11 15\n9"
    const lines = inputStr.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length >= 2 && !lines[0].includes('=')) {
      const parts = [];
      lines.forEach((line, idx) => {
        // Try to parse as array of numbers
        const nums = line.split(/\s+/).map(Number).filter(n => !isNaN(n));
        if (nums.length > 1 || (nums.length === 1 && line.trim() === String(nums[0]))) {
          parts.push(`line${idx + 1} = [${nums.join(',')}]`);
        } else if (line) {
          parts.push(`line${idx + 1} = ${line}`);
        }
      });
      if (parts.length > 0) {
        return parts;
      }
    }
    
    // Single array format: "[0,1,0,3,12]"
    if (inputStr.startsWith('[') && inputStr.endsWith(']')) {
      try {
        const parsed = JSON.parse(inputStr);
        if (Array.isArray(parsed)) {
          return [`input = [${parsed.join(',')}]`];
        }
      } catch {
        // Not valid JSON array, try manual extraction
        const content = inputStr.slice(1, -1).trim();
        if (content) {
          const items = content.split(',').map(item => item.trim()).filter(item => item);
          if (items.length > 0) {
            return [`input = [${items.join(',')}]`];
          }
        }
      }
    }
    
    // If nothing matches, return null to show raw input
    return null;
  };

  const normalizeStarterCode = (starterCode) => {
    if (!starterCode) return {};
    if (typeof starterCode === "object" && !Array.isArray(starterCode)) return starterCode;
    if (Array.isArray(starterCode)) {
      try {
        return Object.fromEntries(starterCode);
      } catch {
        return {};
      }
    }
    return {};
  };

  const supportedLanguages = useMemo(() => ["javascript", "python", "java", "cpp", "c"], []);

  // Get current question index from URL
  const questionIndex = parseInt(searchParams.get("q") || "0", 10);

  // Fetch contest data and questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch contest details
        const contestRes = await api.get(`/contests/${contestId}`);
        const contestData = contestRes.data?.contest || contestRes.data;
        setContest(contestData);
        
        // Calculate time remaining
        if (contestData?.endTime) {
          const endTime = new Date(contestData.endTime);
          const now = new Date();
          const remaining = Math.max(0, endTime - now);
          setTimeRemaining(remaining);
        } else if (contestData?.duration) {
          // If duration is in minutes, calculate from start time or use duration
          const durationMs = parseInt(contestData.duration) * 60 * 1000;
          if (contestData?.startTime) {
            const startTime = new Date(contestData.startTime);
            const endTime = new Date(startTime.getTime() + durationMs);
            const now = new Date();
            const remaining = Math.max(0, endTime - now);
            setTimeRemaining(remaining);
          } else {
            // Fallback: use duration as remaining time
            setTimeRemaining(durationMs);
          }
        }

        // Try to join/participate in contest first (ignore if already joined)
        try {
          await api.post(`/contests/${contestId}/participate`);
        } catch (joinErr) {
          // Ignore "Already participating" error, it's expected
          if (!joinErr.response?.data?.message?.includes('Already participating')) {
            console.log('Join error (may be expected):', joinErr.response?.data?.message);
          }
        }

        // Fetch contest questions using playable-questions endpoint
        const questionsRes = await api.get(`/contests/${contestId}/playable-questions`);
        const fetchedQuestions = questionsRes.data?.questions || questionsRes.data?.data?.questions || [];
        
        // Debug: Log coding_mcq questions
        const codingMcqQuestions = fetchedQuestions.filter(q => (q.type || '').toLowerCase() === 'coding_mcq');
        if (codingMcqQuestions.length > 0) {
          console.log('CODING_MCQ Questions found:', codingMcqQuestions);
          codingMcqQuestions.forEach((q, idx) => {
            console.log(`CODING_MCQ ${idx + 1}:`, {
              title: q.title,
              description: q.description,
              codeSnippet: q.codeSnippet,
              options: q.options,
              type: q.type
            });
          });
        }
        
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error("Error fetching contest data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load assessment questions");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Format time remaining
  const formatTimeRemaining = (ms) => {
    if (!ms || ms <= 0) return "00 Min : 00 Sec";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')} Min : ${String(seconds).padStart(2, '0')} Sec`;
  };

  // Set default question index
  useEffect(() => {
    if (searchParams.get("q") === null) {
      setSearchParams({ q: "0" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const currentQuestion = questions[questionIndex] || null;
  const totalSteps = questions.length;
  const difficulty = currentQuestion?.difficulty || currentQuestion?.points || 100;

  const currentQuestionId = getQuestionId(currentQuestion, questionIndex);
  const currentCoding = codingState[currentQuestionId] || {};
  const starterCodeObj = normalizeStarterCode(currentQuestion?.starterCode);
  const availableLanguages = useMemo(() => {
    const keys = Object.keys(starterCodeObj || {});
    const preferred = supportedLanguages.filter((l) => keys.includes(l));
    const extras = keys.filter((k) => !preferred.includes(k));
    return [...preferred, ...extras, ...supportedLanguages.filter((l) => !keys.includes(l))];
  }, [starterCodeObj, supportedLanguages]);

  const updateCoding = (qid, patch) => {
    setCodingState((prev) => ({
      ...prev,
      [qid]: { ...(prev[qid] || {}), ...patch },
    }));
  };

  // Initialize coding state when entering a CODING question
  useEffect(() => {
    if (!currentQuestion) return;
    if ((currentQuestion.type || "").toLowerCase() !== "coding") return;

    const qid = getQuestionId(currentQuestion, questionIndex);
    setCodingState((prev) => {
      if (prev[qid]?.initialized) return prev;

      const starter = normalizeStarterCode(currentQuestion.starterCode);
      const starterKeys = Object.keys(starter || {});
      const defaultLang = starterKeys.includes("javascript")
        ? "javascript"
        : starterKeys[0] || "javascript";

      const initialCode =
        (starter && starter[defaultLang]) ||
        (typeof currentQuestion.starterCode === "string" ? currentQuestion.starterCode : "") ||
        "// Write your code here\n";

      return {
        ...prev,
        [qid]: {
          initialized: true,
          language: defaultLang,
          code: initialCode,
          runResult: null,
          submitResult: null,
          isRunning: false,
          isSubmitting: false,
          error: null,
        },
      };
    });
  }, [currentQuestion, questionIndex]);

  // Reset selected test case index when question changes or when new results come in
  useEffect(() => {
    setSelectedTestCaseIndex(0);
  }, [questionIndex, currentCoding.runResult, currentCoding.submitResult]);

  const handleRunCoding = async () => {
    if (!currentQuestion) return;
    const qid = currentQuestionId;
    const language = currentCoding.language;
    const code = currentCoding.code;

    if (!language || !code) {
      toast.error("Language and code are required");
      return;
    }

    try {
      updateCoding(qid, { isRunning: true, error: null, runResult: null });
      const result = await runContestCode(contestId, qid, { language, code });
      // result comes from codeSubmissionApi and has shape { success, message, data }
      updateCoding(qid, { runResult: result.data || result, isRunning: false });
      toast.success("Run complete");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to run code";
      updateCoding(qid, { error: msg, isRunning: false });
      toast.error(msg);
    }
  };

  const handleSubmitCoding = async () => {
    if (!currentQuestion) return;
    const qid = currentQuestionId;
    const language = currentCoding.language;
    const code = currentCoding.code;

    if (!language || !code) {
      toast.error("Language and code are required");
      return;
    }

    try {
      updateCoding(qid, { isSubmitting: true, error: null, submitResult: null });
      const result = await submitContestCode(contestId, qid, { language, code });
      // result has shape { success, message, data }
      updateCoding(qid, { submitResult: result.data || result, isSubmitting: false });
      
      // Mark this question as submitted/saved
      const questionId = currentQuestion?.id || currentQuestion?._id || questionIndex;
      setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
      
      toast.success("Code submitted and saved!");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to submit code";
      updateCoding(qid, { error: msg, isSubmitting: false });
      toast.error(msg);
    }
  };
  
  // Helper to check question type (case-insensitive)
  const isQuestionType = (type) => {
    const qType = (currentQuestion?.type || "").toLowerCase();
    return qType === type.toLowerCase();
  };

  // Helper to extract code from description (markdown code blocks)
  const extractCodeFromDescription = (description) => {
    if (!description) return { text: '', code: null };
    
    // Match ```language\ncode\n``` or ```\ncode\n```
    const codeBlockRegex = /```(?:\w+)?\n?([\s\S]*?)```/g;
    const matches = [...description.matchAll(codeBlockRegex)];
    
    if (matches.length > 0) {
      // Extract code blocks
      const code = matches.map(m => m[1].trim()).join('\n');
      // Remove code blocks from text
      const text = description.replace(codeBlockRegex, '').trim();
      return { text, code };
    }
    
    // Also check for inline code with backticks that looks like a code snippet
    const inlineCodeRegex = /`([^`]+)`/g;
    const inlineMatches = [...description.matchAll(inlineCodeRegex)];
    
    // If there's a substantial inline code (likely a code example), extract it
    const largeInlineCode = inlineMatches.find(m => m[1].includes('(') || m[1].includes('print') || m[1].length > 20);
    if (largeInlineCode) {
      return { text: description, code: largeInlineCode[1] };
    }
    
    return { text: description, code: null };
  };

  // Get parsed description for current question
  const parsedDescription = currentQuestion ? extractCodeFromDescription(currentQuestion.description || currentQuestion.question || '') : { text: '', code: null };

  // Navigation handlers
  const handlePrev = () => {
    if (questionIndex > 0) {
      setSearchParams({ q: (questionIndex - 1).toString() });
      setShowAnswer(false);
    }
  };

  const handleNext = () => {
    if (questionIndex < totalSteps - 1) {
      setSearchParams({ q: (questionIndex + 1).toString() });
      setShowAnswer(false);
    }
  };

  // Option click handler
  const handleOptionClick = (optionIndex) => {
    const questionId = currentQuestion?.id || currentQuestion?._id || questionIndex;
    if (submittedQuestions[questionId]) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Submit handler - silently save answer without showing correct/wrong
  const handleSubmit = () => {
    if (!currentQuestion) return;

    const questionId = currentQuestion?.id || currentQuestion?._id || questionIndex;
    const selectedIndex = selectedOptions[questionId];

    if (selectedIndex === undefined) {
      toast.error("Please select an answer first!", {
        duration: 2000,
        style: { background: "#f44336", color: "#fff" },
      });
      return;
    }

    // Silently save the answer - don't show if it's correct or wrong
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    toast.success("Answer saved!", {
      duration: 1500,
    });
  };

  // Check if all questions have been answered
  const allQuestionsAnswered = useMemo(() => {
    if (questions.length === 0) return false;
    return questions.every((q, idx) => {
      const qid = getQuestionId(q, idx);
      const qType = (q.type || "").toLowerCase();
      
      if (qType === "coding") {
        // For coding questions, check if they have a submitResult
        const codingStateForQ = codingState[qid] || {};
        return !!codingStateForQ.submitResult || submittedQuestions[qid] === true;
      } else if (qType === "mcq" || qType === "coding_mcq") {
        // For MCQ questions, check if they're in submittedQuestions
        return submittedQuestions[qid] === true;
      }
      // For other question types, consider them answered if they're in submittedQuestions
      return submittedQuestions[qid] === true;
    });
  }, [questions, submittedQuestions, codingState]);

  // Save state to localStorage for summary page
  useEffect(() => {
    const stateToSave = {
      submittedQuestions,
      selectedOptions,
      codingState,
    };
    localStorage.setItem(`contest_${contestId}_state`, JSON.stringify(stateToSave));
  }, [contestId, submittedQuestions, selectedOptions, codingState]);

  // Handle final contest submission - navigate to summary page
  const handleFinalSubmit = () => {
    if (finalSubmitted) {
      toast.info("Contest already submitted!");
      return;
    }

    // Navigate to summary page and trigger confirmation popup there
    navigate(`/contest/ongoing/${contestId}/summary`, {
      state: { autoConfirm: true },
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-lg text-gray-600">Loading assessment questions...</div>
        <p className="text-sm text-gray-400 mt-2">Please wait while we fetch the contest questions</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <div className="text-xl text-gray-700 font-semibold mb-2">Unable to Load Assessment</div>
        <p className="text-gray-500 mb-6">{error}</p>
        <button
          onClick={() => navigate(`/contest/ongoing/${contestId}`)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Contest
        </button>
      </div>
    );
  }

  // No questions available state
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <div className="text-xl text-gray-700 font-semibold mb-2">No Questions Available</div>
        <p className="text-gray-500 mb-2">The contest organizer has not uploaded any questions yet.</p>
        <p className="text-gray-400 text-sm mb-6">Please check back later or contact the contest administrator.</p>
        <button
          onClick={() => navigate(`/contest/ongoing/${contestId}`)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Contest
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left - Back and Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  navigate(`/contest/ongoing/${contestId}/summary`, {
                    state: { autoConfirm: true },
                  })
                }
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft />
              </button>
              
              <button
                onClick={handlePrev}
                disabled={questionIndex === 0}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  questionIndex === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                ‹ Prev {isQuestionType("content") || isQuestionType("text") ? "Chapter" : "Question"}
              </button>

              {/* Progress indicator */}
              <div className="flex items-center gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 w-8 rounded ${
                      idx === questionIndex
                        ? "bg-blue-600"
                        : idx < questionIndex
                        ? "bg-blue-400"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={questionIndex === totalSteps - 1}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Next {isQuestionType("content") || isQuestionType("text") ? "Chapter" : "Question"} ›
              </button>
            </div>

            {/* Right - Difficulty, Bookmark, and Submit Contest Button */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">‹ Difficulty: {difficulty}</span>
              <button className="text-gray-400 hover:text-gray-600">🔖</button>
              
              {finalSubmitted && (
                <span className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-semibold">
                  Contest Submitted
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statement Tab Bar */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex">
              <button className="px-6 py-3 bg-gray-700 text-white font-medium">
                Statement
              </button>
              {(isQuestionType("mcq") || isQuestionType("coding_mcq")) && (
                <>
                  {/* <button className="px-6 py-3 text-gray-300 hover:text-white">
                    Submissions
                  </button>
                  <button className="px-6 py-3 text-gray-300 hover:text-white">
                    Solutions
                  </button>
                  <button className="px-6 py-3 text-gray-300 hover:text-white">
                    AI Help
                  </button> */}
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {(isQuestionType("mcq") || isQuestionType("coding_mcq")) && (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={submittedQuestions[currentQuestion?.id || currentQuestion?._id || questionIndex]}
                    className={`px-6 py-2 rounded text-sm font-medium ${
                      submittedQuestions[currentQuestion?.id || currentQuestion?._id || questionIndex]
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Save Answer
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={questionIndex === totalSteps - 1}
                    className="px-6 py-2 bg-white text-gray-800 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    Next {questionIndex === totalSteps - 1 ? "" : "Question"}
                  </button>
                </>
              )}
              {!finalSubmitted && (
                <button
                  onClick={handleFinalSubmit}
                  className="px-6 py-2 rounded text-sm font-semibold transition-colors shadow-sm bg-red-600 text-white hover:bg-red-700"
                >
                  ✓ Submit Contest
                </button>
              )}
              {finalSubmitted && (
                <span className="px-4 py-2 bg-gray-500 text-white rounded text-sm font-semibold">
                  Contest Submitted
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Content Type - Theory/Content/TEXT */}
        {(isQuestionType("content") || isQuestionType("text")) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Content */}
            <div className="bg-white rounded-lg border p-6">
              <h1 className="text-xl font-semibold italic text-gray-800 mb-4">
                {currentQuestion.title}
              </h1>
              {currentQuestion.subtitle && (
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {currentQuestion.subtitle}
                </h2>
              )}
              <div 
                className="text-gray-600 whitespace-pre-wrap leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentQuestion.description || currentQuestion.content || '' }}
              />
            </div>

            {/* Right - Code Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <select className="border rounded px-3 py-1 text-sm">
                    <option>Search language...</option>
                  </select>
                  <span className="text-sm text-gray-600">
                    Selected: {currentQuestion.language || "python"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-1 bg-green-500 text-white rounded text-sm flex items-center gap-1">
                    ▶ Run
                  </button>
                  <button className="text-gray-500">⬇</button>
                  <button className="text-gray-500">♥</button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 min-h-[200px]">
                <pre className="text-green-400 font-mono text-sm">
                  {currentQuestion.starterCode || currentQuestion.code || "# Write your code here"}
                </pre>
              </div>

              <div className="mt-4">
                <h3 className="text-gray-700 font-medium mb-2">Output</h3>
                <div className="bg-gray-900 rounded-lg p-4 min-h-[100px]">
                  <p className="text-gray-400 font-mono text-sm">
                    Run your code to see output
                  </p>
                  <p className="text-green-400 font-mono text-sm mt-2">
                    &gt; Type input here and press Enter to run...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MCQ Type - Clean UI matching design */}
        {isQuestionType("mcq") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Question */}
            <div className="bg-white rounded-lg border p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                MCQ
              </span>
              <h1 className="text-xl font-semibold  text-black mb-3">
                {currentQuestion.title}
              </h1>
              <p className="text-gray-700 text-base leading-relaxed">
                {parsedDescription.text || currentQuestion.description || currentQuestion.question || ''}
              </p>
            </div>

            {/* Right - Options */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-blue-600 font-medium mb-4">
                Select one of the following options:
              </h3>
              <div className="space-y-3">
                {currentQuestion.options?.map((option, idx) => {
                  const questionId = currentQuestion?.id || currentQuestion?._id || questionIndex;
                  const isSelected = selectedOptions[questionId] === idx;
                  const isSubmitted = submittedQuestions[questionId];
                  const isCorrect = option?.isCorrect;

                  let optionClasses = "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ";
                  
                  // Don't show correct/wrong - just show selected state
                  if (isSelected) {
                    optionClasses += "bg-blue-50 border-blue-400";
                  } else {
                    optionClasses += "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50";
                  }
                  
                  // Disable if already submitted
                  if (isSubmitted) {
                    optionClasses += " opacity-75 cursor-not-allowed";
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !isSubmitted && handleOptionClick(idx)}
                      className={optionClasses}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "border-blue-600" : "border-gray-300"
                      }`}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <span className="text-gray-700">
                        {typeof option === "string" ? option : option.text}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* CODING_MCQ Type - MCQ with Code Snippet - Clean UI matching design */}
        {isQuestionType("coding_mcq") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Question with Code */}
            <div className="bg-white rounded-lg border p-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                MCQ CODING
              </span>
              <h1 className="text-xl font-semibold  text-black mb-3">
                {currentQuestion.title}
              </h1>
             
              <div 
                className="text-gray-700 text-base leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: parsedDescription.text || currentQuestion.description || currentQuestion.question || '' }}
              />
              
              {/* Code Snippet */}
              {(currentQuestion.codeSnippet || parsedDescription.code) && (
                <div className="bg-gray-900 rounded-lg p-4 mt-4">
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                    {currentQuestion.codeSnippet || parsedDescription.code}
                  </pre>
                </div>
              )}
            </div>

            {/* Right - Options */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-blue-600 font-medium mb-4">
                Select one of the following options:
              </h3>
              {currentQuestion.options && Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0 ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const questionId = currentQuestion?.id || currentQuestion?._id || questionIndex;
                    const isSelected = selectedOptions[questionId] === idx;
                    const isSubmitted = submittedQuestions[questionId];
                    const optionText = typeof option === "string" ? option : (option?.text || `Option ${idx + 1}`);

                    let optionClasses = "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ";
                    
                    // Don't show correct/wrong - just show selected state
                    if (isSelected) {
                      optionClasses += "bg-blue-50 border-blue-400";
                    } else {
                      optionClasses += "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50";
                    }
                    
                    // Disable if already submitted
                    if (isSubmitted) {
                      optionClasses += " opacity-75 cursor-not-allowed";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => !isSubmitted && handleOptionClick(idx)}
                        className={optionClasses}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "border-blue-600" : "border-gray-300"
                        }`}>
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className="text-gray-700">
                          {optionText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-500 text-sm p-4 bg-gray-50 rounded border border-gray-200">
                  <p className="font-medium mb-2">No options available</p>
                  <p className="text-xs">Please check the backend data. Question type: {currentQuestion?.type}</p>
                  <p className="text-xs mt-1">Options data: {JSON.stringify(currentQuestion?.options || 'undefined')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Coding Type */}
        {isQuestionType("coding") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left - Problem Statement */}
            <div className="bg-white rounded-lg border p-6 overflow-auto max-h-[80vh]">
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                {currentQuestion.title}
              </h1>
              <div 
                className="text-gray-700 mb-4 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentQuestion.description || currentQuestion.problemStatement || '' }}
              />

              {currentQuestion.inputFormat && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Input Format:</h3>
                  <p className="text-gray-600 text-sm">{currentQuestion.inputFormat}</p>
                </div>
              )}

              {currentQuestion.outputFormat && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Output Format:</h3>
                  <p className="text-gray-600 text-sm">{currentQuestion.outputFormat}</p>
                </div>
              )}

              {currentQuestion.constraints && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Constraints:</h3>
                  <p className="text-gray-600 text-sm">{currentQuestion.constraints}</p>
                </div>
              )}

              {/* Show Examples - Only show public examples */}
              {currentQuestion.examples && currentQuestion.examples.filter(ex => ex.isPublic !== false).length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Examples:</h3>
                  {currentQuestion.examples
                    .filter(example => example.isPublic !== false) // Only show public examples
                    .map((example, idx) => (
                    <div key={idx} className="bg-gray-100 p-3 rounded mb-2">
                      <p className="text-sm font-medium mb-2">Example {idx + 1}:</p>
                      <p className="text-sm">
                        <strong>Input:</strong>
                        <pre className="bg-gray-200 p-2 rounded mt-1 text-xs">{example.input}</pre>
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Output:</strong>
                        <pre className="bg-gray-200 p-2 rounded mt-1 text-xs">{example.output}</pre>
                      </p>
                      {example.explanation && (
                        <p className="text-sm mt-2">
                          <strong>Explanation:</strong>
                          <span className="text-gray-600 ml-1">{example.explanation}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Code Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded px-3 py-1 text-sm"
                    value={currentCoding.language || "javascript"}
                    onChange={(e) => {
                      const nextLang = e.target.value;
                      const prevLang = currentCoding.language;
                      const starter = normalizeStarterCode(currentQuestion?.starterCode);
                      const prevStarter = starter?.[prevLang] || "";
                      const nextStarter = starter?.[nextLang] || "";

                      const shouldSwapToStarter =
                        !currentCoding.code ||
                        currentCoding.code === prevStarter ||
                        currentCoding.code.trim() === "// Write your code here";

                      updateCoding(currentQuestionId, {
                        language: nextLang,
                        code: shouldSwapToStarter && nextStarter ? nextStarter : currentCoding.code,
                      });
                    }}
                  >
                    {availableLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunCoding}
                    disabled={!!currentCoding.isRunning}
                    className={`px-4 py-1 rounded text-sm flex items-center gap-1 ${
                      currentCoding.isRunning
                        ? "bg-green-300 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    ▶ {currentCoding.isRunning ? "Running..." : "Run"}
                  </button>
                  <button
                    onClick={handleSubmitCoding}
                    disabled={!!currentCoding.isSubmitting}
                    className={`px-4 py-1 rounded text-sm flex items-center gap-1 ${
                      currentCoding.isSubmitting
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    ✓ {currentCoding.isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-2 min-h-[250px] border">
                <CodeEditor
                  code={currentCoding.code || ""}
                  language={currentCoding.language || "javascript"}
                  onChange={(e) => updateCoding(currentQuestionId, { code: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 min-h-[300px]">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-700">
                    <h3 className="text-gray-200 font-medium text-sm">Testcase &gt; Test Result</h3>
                  </div>

                  <div className="p-4">
                    {currentCoding.error ? (
                      <div className="p-4">
                        <pre className="whitespace-pre-wrap text-sm text-red-300">{currentCoding.error}</pre>
                      </div>
                    ) : null}

                    {currentCoding.submitResult ? (
                      <div>
                        {/* Status Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-green-400 text-lg font-medium">
                            {currentCoding.submitResult.status === 'ACCEPTED' ? 'Accepted' : 
                             currentCoding.submitResult.status === 'WRONG_ANSWER' ? 'Wrong Answer' :
                             currentCoding.submitResult.status === 'TIME_LIMIT_EXCEEDED' ? 'Time Limit Exceeded' :
                             currentCoding.submitResult.status === 'MEMORY_LIMIT_EXCEEDED' ? 'Memory Limit Exceeded' :
                             currentCoding.submitResult.status || 'Pending'}
                          </span>
                          {currentCoding.submitResult.executionTime !== undefined && (
                            <span className="text-gray-400 text-sm">
                              Runtime: {typeof currentCoding.submitResult.executionTime === 'number' 
                                ? `${Math.round(currentCoding.submitResult.executionTime)}ms` 
                                : currentCoding.submitResult.executionTime}
                            </span>
                          )}
                        </div>

                        {/* Test Case Selector - Filter out hidden test cases */}
                        {Array.isArray(currentCoding.submitResult.testResults) && currentCoding.submitResult.testResults.filter(tr => {
                          // Only show public test cases (isPublic !== false and input/output are not hidden)
                          const isPublic = tr.isPublic !== false;
                          const isNotHidden = tr.input !== '***' && tr.input !== undefined && tr.expectedOutput !== '***' && tr.expectedOutput !== undefined;
                          return isPublic && isNotHidden;
                        }).length > 0 && (
                          <>
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
                              {currentCoding.submitResult.testResults
                                .filter(tr => {
                                  // Only show public test cases
                                  const isPublic = tr.isPublic !== false;
                                  const isNotHidden = tr.input !== '***' && tr.input !== undefined && tr.expectedOutput !== '***' && tr.expectedOutput !== undefined;
                                  return isPublic && isNotHidden;
                                })
                                .map((tr, publicIdx) => {
                                  // Get the original index for accessing the full test results array
                                  const originalIdx = currentCoding.submitResult.testResults.indexOf(tr);
                                  return (
                                <button
                                  key={originalIdx}
                                  onClick={() => setSelectedTestCaseIndex(originalIdx)}
                                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
                                    selectedTestCaseIndex === originalIdx
                                      ? 'bg-gray-700 text-white'
                                      : 'text-gray-400 hover:text-gray-300'
                                  }`}
                                >
                                  {tr.passed ? (
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                  <span>Case {publicIdx + 1}</span>
                                </button>
                              );
                              })}
                            </div>

                            {/* Selected Test Case Details - Only show if selected test case is public */}
                            {(() => {
                              // Find the public test cases
                              const publicTestResults = currentCoding.submitResult.testResults.filter(tr => {
                                const isPublic = tr.isPublic !== false;
                                const isNotHidden = tr.input !== '***' && tr.input !== undefined && tr.expectedOutput !== '***' && tr.expectedOutput !== undefined;
                                return isPublic && isNotHidden;
                              });
                              
                              // Check if the selected test case is public
                              const selectedTr = currentCoding.submitResult.testResults[selectedTestCaseIndex];
                              if (!selectedTr) return null;
                              
                              const isPublic = selectedTr.isPublic !== false;
                              const isNotHidden = selectedTr.input !== '***' && selectedTr.input !== undefined && selectedTr.expectedOutput !== '***' && selectedTr.expectedOutput !== undefined;
                              
                              let tr = selectedTr;
                              
                              // If selected test case is hidden, use the first public one
                              if (!isPublic || !isNotHidden) {
                                if (publicTestResults.length === 0) {
                                  return null;
                                }
                                tr = publicTestResults[0];
                              }
                              
                              // Parse input using comprehensive parser
                              const parsedInput = parseInput(tr.input);
                              
                              return (
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block font-medium">Input:</label>
                                    {parsedInput && Array.isArray(parsedInput) && parsedInput.length > 0 ? (
                                      <div className="space-y-2">
                                        {parsedInput.map((line, idx) => (
                                          <pre key={idx} className="bg-[#252526] p-3 rounded text-gray-300 text-sm font-mono">
                                            {line}
                                          </pre>
                                        ))}
                                      </div>
                                    ) : (
                                      <pre className="bg-[#252526] p-3 rounded text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                        {tr.input === '***' || tr.input === undefined ? '(Hidden)' : tr.input}
                                      </pre>
                                    )}
                                  </div>
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block font-medium">Output:</label>
                                    <pre className="bg-[#252526] p-3 rounded text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                      {tr.actualOutput || tr.output || '(empty)'}
                                    </pre>
                                  </div>
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block font-medium">Expected:</label>
                                    <pre className="bg-[#252526] p-3 rounded text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                      {tr.expectedOutput === '***' || tr.expectedOutput === undefined ? '(Hidden)' : tr.expectedOutput}
                                    </pre>
                                  </div>
                                  {tr.error && (
                                    <div>
                                      <label className="text-red-400 text-sm mb-2 block font-medium">Error:</label>
                                      <pre className="bg-red-900/20 border border-red-800 p-3 rounded text-red-300 text-sm whitespace-pre-wrap">
                                        {tr.error}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    ) : currentCoding.runResult ? (
                      <div>
                        {/* Status Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-lg font-medium ${
                            currentCoding.runResult.status === 'ACCEPTED' 
                              ? 'text-green-400' 
                              : currentCoding.runResult.status === 'WRONG_ANSWER'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}>
                            {currentCoding.runResult.status === 'ACCEPTED' ? 'Accepted' : 
                             currentCoding.runResult.status === 'WRONG_ANSWER' ? 'Wrong Answer' :
                             currentCoding.runResult.status === 'TIME_LIMIT_EXCEEDED' ? 'Time Limit Exceeded' :
                             currentCoding.runResult.status === 'MEMORY_LIMIT_EXCEEDED' ? 'Memory Limit Exceeded' :
                             currentCoding.runResult.status || 'Pending'}
                          </span>
                          {currentCoding.runResult.executionTime !== undefined && (
                            <span className="text-gray-400 text-sm">
                              Runtime: {typeof currentCoding.runResult.executionTime === 'number' 
                                ? `${Math.round(currentCoding.runResult.executionTime)}ms` 
                                : currentCoding.runResult.executionTime}
                            </span>
                          )}
                        </div>

                        {/* Test Case Selector - LeetCode style with checkboxes */}
                        {Array.isArray(currentCoding.runResult.testResults) && currentCoding.runResult.testResults.length > 0 ? (
                          <>
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
                              {currentCoding.runResult.testResults.map((tr, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedTestCaseIndex(idx)}
                                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
                                    selectedTestCaseIndex === idx
                                      ? 'bg-gray-700 text-white'
                                      : 'text-gray-400 hover:text-gray-300'
                                  }`}
                                >
                                  {tr.passed ? (
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                  <span>Case {idx + 1}</span>
                                </button>
                              ))}
                            </div>

                            {/* Selected Test Case Details - LeetCode style */}
                            {currentCoding.runResult.testResults[selectedTestCaseIndex] && selectedTestCaseIndex < currentCoding.runResult.testResults.length && (() => {
                              const tr = currentCoding.runResult.testResults[selectedTestCaseIndex];
                              // Parse input using comprehensive parser
                              const parsedInput = parseInput(tr.input);
                              
                              return (
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block font-medium">Input:</label>
                                    {parsedInput && Array.isArray(parsedInput) && parsedInput.length > 0 ? (
                                      <div className="space-y-2">
                                        {parsedInput.map((line, idx) => (
                                          <pre key={idx} className="bg-[#252526] p-3 rounded text-gray-300 text-sm font-mono">
                                            {line}
                                          </pre>
                                        ))}
                                      </div>
                                    ) : (
                                      <pre className="bg-[#252526] p-3 rounded text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                        {tr.input || '(empty)'}
                                      </pre>
                                    )}
                                  </div>
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block font-medium">Output:</label>
                                    <pre className="bg-[#252526] p-3 rounded text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                      {tr.actualOutput || tr.output || '(empty)'}
                                    </pre>
                                  </div>
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block font-medium">Expected:</label>
                                    <pre className="bg-[#252526] p-3 rounded text-gray-300 text-sm whitespace-pre-wrap font-mono">
                                      {tr.expectedOutput || '(empty)'}
                                    </pre>
                                  </div>
                                  {tr.error && (
                                    <div>
                                      <label className="text-red-400 text-sm mb-2 block font-medium">Error:</label>
                                      <pre className="bg-red-900/20 border border-red-800 p-3 rounded text-red-300 text-sm whitespace-pre-wrap">
                                        {tr.error}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </>
                        ) : (
                          <div className="p-4 text-gray-400 text-sm">
                            <p>No test results available. Make sure the backend server is running and test cases are configured.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4">
                        <p className="text-gray-400 font-mono text-sm">Run your code to see output</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestAssessmentPage;

