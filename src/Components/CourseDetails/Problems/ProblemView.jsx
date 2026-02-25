import React, { useState, useEffect } from "react";
import { useParams, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import ProblemNavbar from "./ProblemsNavbar";
import RightCodePanel from "./RightCodePanel";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import UpperNavbar from "./UpperNavbar";
// Example problem data (replace with props or API as needed)


const ProblemView = () => {
  const { contentId,id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize lesson from location state if available
  const [lesson, setLesson] = useState(() => location.state?.lesson || null);
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(() => !location.state?.lesson);
  const [error, setError] = useState(null);

  // active tab in ProblemNavbar
  const [activeTab,setActiveTab] = useState('Statement')

  const fetchedLessonIdRef = React.useRef(null);

  // Get current question index from URL query param, default to 0
  // This will automatically update when searchParams change
  const questionIndexParam = searchParams.get('q');
  const questionIndex = React.useMemo(() => {
    const index = questionIndexParam !== null ? parseInt(questionIndexParam, 10) : 0;
    return isNaN(index) ? 0 : index;
  }, [questionIndexParam]);

  // Set default question index if not present in URL
  useEffect(() => {
    if (questionIndexParam === null) {
      setSearchParams({ q: '0' }, { replace: true });
    }
  }, [questionIndexParam, setSearchParams]);

  // Fetch modules for navigation (always fetch, even if lesson is from state)
  useEffect(() => {
    if (!contentId) return;
    
    const fetchModules = async () => {
      try {
        const response = await api.get(`/courses/${contentId}/modules`);
        const modulesData = response.data?.data || [];
        setModules(Array.isArray(modulesData) ? modulesData : []);
        console.log('Modules fetched:', modulesData.length, 'modules');
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };

    fetchModules();
  }, [contentId]);

  // Fetch lesson data only when id changes and we don't have the lesson
  useEffect(() => {
    // Skip if we already have the lesson for this id
    if (lesson && (lesson._id === id || lesson._id?.toString() === id)) {
      setLoading(false);
      fetchedLessonIdRef.current = id;
      return;
    }

    // Skip if we already fetched for this id
    if (fetchedLessonIdRef.current === id) {
      return;
    }

    // Use lesson from location state if available, but always fetch full content to get welcomeContent
    if (location.state?.lesson && (location.state.lesson._id === id || location.state.lesson._id?.toString() === id)) {
      console.log('Using lesson from location state');
      console.log('Lesson from state welcomeContent:', location.state.lesson.welcomeContent);
      setLesson(location.state.lesson);
      setLoading(false);
      fetchedLessonIdRef.current = id;
      
      // Always fetch full content to ensure we have welcomeContent
      if (id) {
        api.get(`/content/${id}`)
          .then(contentResponse => {
            console.log('=== CONTENT API RESPONSE (from location state) ===');
            console.log('Full response:', contentResponse);
            console.log('Response data:', contentResponse.data);
            console.log('Response data.data:', contentResponse.data?.data);
            console.log('Response data.data.content:', contentResponse.data?.data?.content);
            
            // Try multiple response structures
            let fullContent = null;
            if (contentResponse.data?.data?.content) {
              fullContent = contentResponse.data.data.content;
              console.log('Using contentResponse.data.data.content');
            } else if (contentResponse.data?.data) {
              fullContent = contentResponse.data.data;
              console.log('Using contentResponse.data.data');
            } else if (contentResponse.data) {
              fullContent = contentResponse.data;
              console.log('Using contentResponse.data');
            }
            
            if (fullContent) {
              console.log('=== FETCHED FULL CONTENT (from location state) ===');
              console.log('Full content:', fullContent);
              console.log('welcomeContent:', fullContent.welcomeContent);
              console.log('welcomeContent type:', typeof fullContent.welcomeContent);
              console.log('welcomeContent value:', fullContent.welcomeContent);
              console.log('All fields:', Object.keys(fullContent));
              
              // Update lesson with full content including welcomeContent, prioritizing fullContent
              const updatedLesson = { ...location.state.lesson, ...fullContent };
              // Ensure welcomeContent is set from fullContent if it exists
              if (fullContent.welcomeContent) {
                updatedLesson.welcomeContent = fullContent.welcomeContent;
                console.log('✓ Set welcomeContent from fullContent:', updatedLesson.welcomeContent);
              }
              console.log('Updated lesson:', updatedLesson);
              console.log('Updated welcomeContent:', updatedLesson.welcomeContent);
              console.log('Updated welcomeContent type:', typeof updatedLesson.welcomeContent);
              setLesson(updatedLesson);
            } else {
              console.log('No fullContent found in response');
            }
          })
          .catch(err => {
            console.log('Could not fetch full content:', err);
            console.log('Error details:', err.response?.data);
            console.log('Error status:', err.response?.status);
          });
      }
      return;
    }

    // Only fetch if id is available and we don't have the lesson yet (e.g. page refresh)
    if (id && !lesson) {
      const fetchLesson = async () => {
        try {
          setLoading(true);
          setError(null);
          fetchedLessonIdRef.current = id;

          // Fetch modules for this course, then find the content (lesson) by its _id
          const response = await api.get(`/courses/${contentId}/modules`);
          const modulesData = response.data?.data || [];
          setModules(Array.isArray(modulesData) ? modulesData : []);

          let foundContent = null;
          for (const module of modulesData || []) {
            if (Array.isArray(module.contents)) {
              const match = module.contents.find(
                (item) => item._id === id || item._id?.toString() === id
              );
              if (match) {
                foundContent = match;
                break;
              }
            }
          }

          // If found in modules, also fetch directly from content endpoint to get full data including welcomeContent
          if (foundContent) {
            try {
              const contentResponse = await api.get(`/content/${id}`);
              console.log('=== CONTENT API RESPONSE ===');
              console.log('Full response:', contentResponse);
              console.log('Response data:', contentResponse.data);
              console.log('Response data.data:', contentResponse.data?.data);
              console.log('Response data.data.content:', contentResponse.data?.data?.content);
              
              // Try multiple response structures
              let fullContent = null;
              if (contentResponse.data?.data?.content) {
                fullContent = contentResponse.data.data.content;
                console.log('Using contentResponse.data.data.content');
              } else if (contentResponse.data?.data) {
                fullContent = contentResponse.data.data;
                console.log('Using contentResponse.data.data');
              } else if (contentResponse.data) {
                fullContent = contentResponse.data;
                console.log('Using contentResponse.data');
              }
              
              if (fullContent) {
                console.log('=== FETCHED FULL CONTENT DATA ===');
                console.log('Full content from API:', fullContent);
                console.log('welcomeContent field:', fullContent.welcomeContent);
                console.log('welcomeContent type:', typeof fullContent.welcomeContent);
                console.log('welcomeContent value:', fullContent.welcomeContent);
                console.log('All fields:', Object.keys(fullContent));
                
                // Merge with foundContent to ensure we have all fields, prioritizing fullContent
                const mergedContent = { ...foundContent, ...fullContent };
                console.log('Merged content:', mergedContent);
                console.log('Merged welcomeContent:', mergedContent.welcomeContent);
                console.log('Merged welcomeContent type:', typeof mergedContent.welcomeContent);
                
                // If welcomeContent exists in fullContent, ensure it's in mergedContent
                if (fullContent.welcomeContent) {
                  mergedContent.welcomeContent = fullContent.welcomeContent;
                  console.log('✓ Set welcomeContent from fullContent:', mergedContent.welcomeContent);
                }
                
                setLesson(mergedContent);
              } else {
                console.log('=== USING LESSON FROM MODULES ===');
                console.log('Full lesson from modules:', foundContent);
                console.log('welcomeContent field:', foundContent.welcomeContent);
            setLesson(foundContent);
              }
            } catch (contentErr) {
              console.log('Could not fetch full content, using from modules:', contentErr);
              console.log('Error details:', contentErr.response?.data);
              console.log('Error status:', contentErr.response?.status);
              console.log('=== USING LESSON FROM MODULES ===');
              console.log('Full lesson from modules:', foundContent);
              console.log('welcomeContent field:', foundContent.welcomeContent);
              setLesson(foundContent);
            }
          } else {
            setError("Lesson not found");
          }
        } catch (err) {
          console.error("Error fetching lesson:", err);
          // If enrollment error, try to use lesson from state if available
          if (err.response?.status === 403 && location.state?.lesson) {
            console.log('Enrollment error, using lesson from state');
            setLesson(location.state.lesson);
            setError(null);
          } else {
            setError(err.response?.data?.message || "Failed to load lesson");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchLesson();
    }
  }, [id, contentId, lesson, location.state?.lesson]); // Include all dependencies


  // Removed unused effect
  

	  // Get questions only for question/quiz type lessons; otherwise empty array
	  const questions = React.useMemo(
	    () =>
	      lesson && (lesson.type === "question" || lesson.type === "quiz")
	        ? lesson.questions || []
	        : [],
	    [lesson]
	  );

	  // Split textContent into logical sections so we can show them one-by-one.
	  // For multi-part lessons created from the mentor UI, text parts are joined
	  // with blank lines; here we reconstruct them into an array for the
	  // learner view. Each section may have a title in format "1. Title\n\nContent"
	  const textSections = React.useMemo(
	    () => {
	      if (!lesson?.textContent) return [];
	      const raw = lesson.textContent.split(/\n{3,}/);
	      return raw
	        .map((section) => {
	          const trimmed = section.trim();
	          if (trimmed.length === 0) return null;
	          
	          // Try to extract title if format is "1. Title\n\nContent"
	          const titleMatch = trimmed.match(/^\d+\.\s+(.+?)\n\n(.+)$/s);
	          if (titleMatch) {
	            return {
	              title: titleMatch[1].trim(),
	              content: titleMatch[2].trim(),
	              full: trimmed
	            };
	          }
	          
	          // No title, just return content
	          return {
	            title: null,
	            content: trimmed,
	            full: trimmed
	          };
	        })
	        .filter((section) => section !== null && section.content.length > 0);
	    },
	    [lesson?.textContent]
	  );

	  // Check if this is the first chapter (first content in first module)
	  // Must be defined before navItems since navItems uses it
	  const isFirstChapter = React.useMemo(() => {
	    if (!modules.length || !lesson || !id) return false;
	    const firstModule = modules[0];
	    if (firstModule && Array.isArray(firstModule.contents) && firstModule.contents.length > 0) {
	      const firstContent = firstModule.contents[0];
	      return (firstContent._id === id || firstContent._id?.toString() === id);
	    }
	    return false;
	  }, [modules, lesson, id]);

	  // Build navigation steps for the top Prev/Next buttons. We treat each
	  // text section as a step, followed by each question (for question/quiz
	  // lessons). The `q` query param indexes into this combined sequence.
	  // For first chapter: q=0 is welcome page, then text sections start at q=1
	  const navItems = React.useMemo(() => {
	    if (!lesson) return [];
	    const items = [];

	    // If first chapter, add welcome page as first step (q=0)
	    if (isFirstChapter) {
	      items.push({ id: 'welcome', type: 'welcome' });
	    }

	    // One step per text section
	    for (let i = 0; i < textSections.length; i += 1) {
	      items.push({ id: `text-${i}` });
	    }

	    // For question/quiz lessons, append each question as a step
	    if (lesson.type === "question" || lesson.type === "quiz") {
	      (questions || []).forEach((q, idx) => {
	        items.push(q || { id: `q-${idx}` });
	      });
	    }

	    return items;
	  }, [lesson, textSections.length, questions, isFirstChapter]);

	  // Calculate question start index accounting for welcome page on first chapter
	  const welcomeOffset = isFirstChapter ? 1 : 0;
	  const questionStartIndex = textSections.length + welcomeOffset;
	  const totalSteps = navItems.length;

	  // Map the navigation index (q) to the actual question index inside the
	  // questions array. When `questionIndex` is within the text section range,
	  // there is no active question yet.
	  let questionArrayIndex = -1;
	  if (
	    lesson &&
	    (lesson.type === "question" || lesson.type === "quiz") &&
	    questions.length > 0
	  ) {
	    if (questionIndex >= questionStartIndex) {
	      questionArrayIndex = Math.min(
	        questionIndex - questionStartIndex,
	        questions.length - 1
	      );
	    }
	  }

	  const currentQuestion =
	    questionArrayIndex >= 0 ? questions[questionArrayIndex] : null;

  // Track selected option for current question
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({}); // Track submitted questions
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  // Module test mode: Track answers and saved answers (for practice test functionality)
  // A module test is identified by the title containing "Module test:" (case insensitive)
  // Regular questions/quizzes should show immediate feedback, only module tests save answers
  const isModuleTest = React.useMemo(() => {
    if (!lesson) return false;
    // Check if title contains "Module test:" (case insensitive)
    const title = lesson.title || '';
    return title.toLowerCase().includes('module test:');
  }, [lesson]);
  const [moduleTestAnswers, setModuleTestAnswers] = useState({}); // Track selected answers for module tests
  const [savedModuleTestAnswers, setSavedModuleTestAnswers] = useState({}); // Track which questions have been saved
  const [showModuleTestResults, setShowModuleTestResults] = useState(false); // Show results after submitting all
  const [showModuleTestSummary, setShowModuleTestSummary] = useState(false); // Show summary screen before final submit
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Show confirmation modal
  const [testStartTime, setTestStartTime] = useState(null); // Track when test started for timer
  
  // Reset selected option when question changes
  useEffect(() => {
    // Keep selected options but don't reset when navigating between questions
    // This allows users to see their previous selections
    setShowAnswer(false);
    setShowSolution(false);
    
    // For module tests, restore selected option from saved answers
    if (isModuleTest && currentQuestion) {
      const questionId = currentQuestion._id || currentQuestion.id || questionIndex;
      const savedAnswer = moduleTestAnswers[questionId];
      if (savedAnswer && currentQuestion.options) {
        const optionIndex = currentQuestion.options.findIndex(opt => opt.text === savedAnswer || opt === savedAnswer);
        if (optionIndex !== -1) {
          setSelectedOptions(prev => ({
            ...prev,
            [questionId]: optionIndex
          }));
        }
      }
    }
  }, [questionIndex, currentQuestion, isModuleTest, moduleTestAnswers]);
  
  // Load saved module test answers from localStorage on mount
  useEffect(() => {
    if (isModuleTest && lesson?._id) {
      const savedAnswersData = localStorage.getItem(`module_test_answers_${lesson._id}`);
      const savedAnswersState = localStorage.getItem(`module_test_saved_${lesson._id}`);
      if (savedAnswersData) {
        try {
          setModuleTestAnswers(JSON.parse(savedAnswersData));
        } catch (e) {
          console.error('Error parsing saved module test answers:', e);
        }
      }
      if (savedAnswersState) {
        try {
          setSavedModuleTestAnswers(JSON.parse(savedAnswersState));
        } catch (e) {
          console.error('Error parsing saved module test state:', e);
        }
      }
    }
  }, [isModuleTest, lesson?._id]);
  
  // Handle submit button click - check if answer is correct/wrong
  // For module tests, this saves the answer without showing feedback
  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    
    const questionId = currentQuestion?._id || currentQuestion?.id || questionIndex;
    
    // For module tests, save answer without showing feedback
    if (isModuleTest) {
      const selectedIndex = selectedOptions[questionId];
      if (selectedIndex === undefined) {
        toast.error("Please select an answer first!", {
          duration: 2000,
          style: {
            background: "#f44336",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 16px",
          },
        });
        return;
      }
      
      // Save the answer
      const selectedOption = currentQuestion.options?.[selectedIndex];
      const answerText = selectedOption?.text || selectedOption;
      
      setModuleTestAnswers(prev => {
        const newAnswers = {
          ...prev,
          [questionId]: answerText
        };
        // Save to localStorage
        if (lesson?._id) {
          localStorage.setItem(`module_test_answers_${lesson._id}`, JSON.stringify(newAnswers));
        }
        return newAnswers;
      });
      
      // Mark as saved
      setSavedModuleTestAnswers(prev => {
        const newSaved = {
          ...prev,
          [questionId]: true
        };
        // Save to localStorage
        if (lesson?._id) {
          localStorage.setItem(`module_test_saved_${lesson._id}`, JSON.stringify(newSaved));
        }
        return newSaved;
      });
      
      toast.success("Answer saved!", {
        duration: 2000,
        style: {
          background: "#28a745",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
          padding: "12px 16px",
        },
      });
      return;
    }
    
    // Original behavior for non-module tests - show answer immediately with feedback
    const selectedIndex = selectedOptions[questionId];
    
    // Check if user has selected an option
    if (selectedIndex === undefined) {
      toast.error("Please select an answer first!", {
        duration: 2000,
        style: {
          background: "#f44336",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
          padding: "12px 16px",
        },
      });
      return;
    }
    
    // Mark this question as submitted (for non-module tests, this triggers immediate feedback)
    setSubmittedQuestions(prev => ({
      ...prev,
      [questionId]: true
    }));
    
    // Show answer immediately (this triggers correct/wrong feedback display)
    setShowAnswer(true);
    
    // Check if the selected option is correct
    const selectedOption = currentQuestion.options?.[selectedIndex];
    const isCorrect = selectedOption?.isCorrect === true;
    
    // Show toast notification with immediate feedback
    if (isCorrect) {
      toast.success("Correct Answer! ✓", {
        duration: 3000,
        style: {
          background: "linear-gradient(135deg, #28a745, #4ece69)",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          padding: "16px 20px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#28a745",
        },
      });
    } else {
      toast.error("Wrong Answer! ✗", {
        duration: 3000,
        style: {
          background: "linear-gradient(135deg, #d9534f, #f44336)",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          padding: "16px 20px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#d9534f",
        },
      });
    }
  };

  // Helper function to extract code from question text or question object
  const extractCodeFromQuestion = (question) => {
    // First check if question has a codeSnippet field
    if (question?.codeSnippet) {
      return { 
        text: question.question || question.text || '', 
        code: question.codeSnippet,
        language: question.codeLanguage || 'cpp'
      };
    }
    
    const questionText = typeof question === 'string' ? question : (question?.question || question?.text || '');
    if (!questionText) return { text: questionText, code: null };
    
    // Check for code blocks (```language\ncode\n```)
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
    const match = questionText.match(codeBlockRegex);
    
    if (match) {
      const code = match[2].trim();
      const text = questionText.replace(codeBlockRegex, '').trim();
      return { text, code, language: match[1] || 'cpp' };
    }
    
    // Check for inline code with <code> tags or other patterns
    const inlineCodeRegex = /<code>([\s\S]*?)<\/code>/;
    const inlineMatch = questionText.match(inlineCodeRegex);
    
    if (inlineMatch) {
      const code = inlineMatch[1].trim();
      const text = questionText.replace(inlineCodeRegex, '').trim();
      return { text, code, language: 'cpp' };
    }
    
    return { text: questionText, code: null };
  };
  
  // Handle option click - only allow selection, don't show result yet
  const handleOptionClick = (optionIndex) => {
    const questionId = currentQuestion?._id || currentQuestion?.id || questionIndex;
    
    // For module tests, don't allow clicking if already saved
    if (isModuleTest && savedModuleTestAnswers[questionId]) {
      return;
    }
    
    // For non-module tests, don't allow clicking if already submitted
    if (!isModuleTest && submittedQuestions[questionId]) {
      return;
    }
    
    // Mark option as selected
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  // Check if all module test questions are answered
  const allModuleTestQuestionsAnswered = () => {
    if (!isModuleTest || !questions || questions.length === 0) return false;
    return questions.every(q => {
      const questionId = q._id || q.id;
      return savedModuleTestAnswers[questionId] === true;
    });
  };
  
  // Initialize test start time when module test starts
  useEffect(() => {
    if (isModuleTest && !testStartTime) {
      const savedStartTime = localStorage.getItem(`module_test_start_${lesson?._id}`);
      if (savedStartTime) {
        setTestStartTime(parseInt(savedStartTime, 10));
      } else {
        const now = Date.now();
        setTestStartTime(now);
        if (lesson?._id) {
          localStorage.setItem(`module_test_start_${lesson._id}`, now.toString());
        }
      }
    }
  }, [isModuleTest, lesson?._id, testStartTime]);
  
  // Calculate elapsed time for timer
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (isModuleTest && testStartTime && !showModuleTestSummary && !showModuleTestResults) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - testStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isModuleTest, testStartTime, showModuleTestSummary, showModuleTestResults]);
  
  // Handle submit all answers for module test - show summary screen first
  const handleSubmitAllModuleTest = () => {
    if (!isModuleTest || !questions || questions.length === 0) return;
    setShowModuleTestSummary(true);
  };
  
  // Handle back to assessment from summary
  const handleBackToAssessment = () => {
    setShowModuleTestSummary(false);
    setShowConfirmModal(false);
  };
  
  // Handle submit and finish - show confirmation modal
  const handleSubmitAndFinish = () => {
    setShowConfirmModal(true);
  };
  
  // Handle cancel submit confirmation - go back to summary
  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };
  
  // Handle confirm submit - actually submit the test and show results
  const handleConfirmSubmit = async () => {
    if (!isModuleTest || !questions || questions.length === 0) return;
    
    // Calculate score
    let correctCount = 0;
    let totalQuestions = questions.length;
    
    questions.forEach(q => {
      const questionId = q._id || q.id;
      const userAnswer = moduleTestAnswers[questionId];
      if (userAnswer) {
        // Check if the selected option is correct
        const selectedOption = q.options?.find(opt => opt.text === userAnswer || opt === userAnswer);
        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
          correctCount++;
        }
      }
    });
    
    // Show results page - close summary and modal
    setShowModuleTestResults(true);
    setShowModuleTestSummary(false);
    setShowConfirmModal(false);
    
    // Clear localStorage
    if (lesson?._id) {
      localStorage.removeItem(`module_test_answers_${lesson._id}`);
      localStorage.removeItem(`module_test_saved_${lesson._id}`);
      localStorage.removeItem(`module_test_start_${lesson._id}`);
    }
    
    // TODO: You can add API call here to save the test results to backend
    // try {
    //   await api.post(`/content/${lesson._id}/submit-test`, {
    //     answers: questions.map(q => ({
    //       questionId: q._id || q.id,
    //       answer: moduleTestAnswers[q._id || q.id] || null
    //     })),
    //     score: correctCount,
    //     totalQuestions: totalQuestions
    //   });
    // } catch (error) {
    //   console.error('Error submitting test:', error);
    // }
  };
  
  
  // Get selected option for current question
  const currentQuestionId = currentQuestion?._id || currentQuestion?.id || questionIndex;
  // For module tests, also check moduleTestAnswers to restore selected option
  const selectedOptionIndex = isModuleTest && moduleTestAnswers[currentQuestionId]
    ? currentQuestion?.options?.findIndex(opt => opt.text === moduleTestAnswers[currentQuestionId] || opt === moduleTestAnswers[currentQuestionId])
    : selectedOptions[currentQuestionId];
  
	  // Validate navigation index (q) - reset to 0 if out of bounds
	  useEffect(() => {
	    if (totalSteps > 0 && (questionIndex < 0 || questionIndex >= totalSteps)) {
	      setSearchParams({ q: "0" }, { replace: true });
	    }
	  }, [questionIndex, totalSteps, setSearchParams]);
  
  // Get difficulty from lesson or question, fallback to default
  const difficulty = currentQuestion?.difficulty || lesson?.difficulty || 173;

  // Check if we should show welcome screen (only on first chapter at q=0)
  // Note: isFirstChapter is already defined above (before navItems)
  const showWelcomeScreen = React.useMemo(() => {
    return isFirstChapter && questionIndex === 0;
  }, [isFirstChapter, questionIndex]);

  // Log data for debugging when on first chapter
  useEffect(() => {
    if (showWelcomeScreen && lesson) {
      console.log('=== FIRST CHAPTER WELCOME SCREEN (q=0) ===');
      console.log('Lesson Object:', lesson);
      console.log('Lesson Title:', lesson.title);
      console.log('Lesson Description:', lesson.description);
      console.log('Lesson TextContent:', lesson.textContent);
      console.log('Lesson WelcomeContent:', lesson.welcomeContent);
      console.log('Lesson WelcomeContent type:', typeof lesson.welcomeContent);
      console.log('Lesson WelcomeContent === null:', lesson.welcomeContent === null);
      console.log('Lesson WelcomeContent === undefined:', lesson.welcomeContent === undefined);
      console.log('All Lesson Keys:', Object.keys(lesson));
      console.log('Full Lesson JSON:', JSON.stringify(lesson, null, 2));
      console.log('Modules:', modules);
      console.log('Current ID:', id);
      console.log('Question Index:', questionIndex);
      console.log('========================');
    }
  }, [showWelcomeScreen, lesson, modules, id, questionIndex]);

  // Additional effect to log lesson changes
  useEffect(() => {
    if (lesson) {
      console.log('=== LESSON UPDATED ===');
      console.log('Lesson welcomeContent:', lesson.welcomeContent);
      console.log('Has welcomeContent:', 'welcomeContent' in lesson);
      console.log('welcomeContent value:', lesson.welcomeContent);
    }
  }, [lesson]);

  // Parse welcome content from lesson data
  const welcomeContent = React.useMemo(() => {
    if (!lesson) {
      console.log('Welcome Content: No lesson data available');
      return null;
    }
    
    console.log('=== WELCOME CONTENT PARSING ===');
    console.log('Full Lesson Object:', lesson);
    console.log('Lesson welcomeContent:', lesson.welcomeContent);
    console.log('Lesson welcomeContent type:', typeof lesson.welcomeContent);
    console.log('Lesson welcomeContent === null:', lesson.welcomeContent === null);
    console.log('Lesson welcomeContent === undefined:', lesson.welcomeContent === undefined);
    console.log('Lesson welcomeContent === "":', lesson.welcomeContent === '');
    console.log('Lesson textContent:', lesson.textContent);
    console.log('Lesson textContent type:', typeof lesson.textContent);
    console.log('Lesson description:', lesson.description);
    console.log('Lesson title:', lesson.title);
    console.log('All Lesson Keys:', Object.keys(lesson));
    
    // Check if welcomeContent exists in any nested structure
    if (lesson.content && lesson.content.welcomeContent) {
      console.log('Found welcomeContent in lesson.content:', lesson.content.welcomeContent);
    }
    if (lesson.data && lesson.data.welcomeContent) {
      console.log('Found welcomeContent in lesson.data:', lesson.data.welcomeContent);
    }
    
    // Priority 1: Try to parse welcomeContent from lesson if it exists
    if (lesson.welcomeContent !== undefined && lesson.welcomeContent !== null && lesson.welcomeContent !== '') {
      console.log('Found welcomeContent field:', lesson.welcomeContent);
      console.log('welcomeContent type:', typeof lesson.welcomeContent);
      if (typeof lesson.welcomeContent === 'string') {
        // If it's an empty string, return null
        if (lesson.welcomeContent.trim() === '') {
          console.log('welcomeContent is empty string');
          return null;
        }
        try {
          const parsed = JSON.parse(lesson.welcomeContent);
          console.log('✓ Parsed welcomeContent from string:', parsed);
          if (parsed && (parsed.welcomeTitle || parsed.welcomeMessage || parsed.learningObjectives)) {
            return parsed;
          }
          // Even if it doesn't have expected keys, return it if it's a valid object
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        } catch (e) {
          console.log('✗ Failed to parse welcomeContent as JSON:', e);
          // If not JSON, check if it's a plain text that should be used as welcomeMessage
          if (lesson.welcomeContent.trim()) {
            console.log('Using welcomeContent as plain text welcomeMessage');
            return {
              welcomeMessage: lesson.welcomeContent
            };
          }
        }
      } else if (typeof lesson.welcomeContent === 'object') {
        console.log('✓ Using welcomeContent as object:', lesson.welcomeContent);
        return lesson.welcomeContent;
      }
    } else {
      console.log('✗ welcomeContent field is undefined or null');
    }
    
    // Priority 2: Try to extract from textContent if it's JSON
    if (lesson.textContent && typeof lesson.textContent === 'string') {
      try {
        const parsed = JSON.parse(lesson.textContent);
        console.log('✓ Parsed textContent as JSON:', parsed);
        // Check if it looks like welcome content structure
        if (parsed && (parsed.welcomeTitle || parsed.welcomeMessage || parsed.learningObjectives)) {
          console.log('✓ Using textContent as welcomeContent');
          return parsed;
        }
        // Check if textContent starts with JSON-like structure
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {
        console.log('✗ textContent is not JSON:', e.message);
      }
    }
    
    // Priority 3: If textContent exists but is not JSON, use it as welcome message
    if (lesson.textContent && typeof lesson.textContent === 'string' && lesson.textContent.trim()) {
      // Check if it's a simple text (not structured content)
      const trimmedText = lesson.textContent.trim();
      // If it's short and doesn't look like structured content, use as welcome message
      if (trimmedText.length < 500 && !trimmedText.includes('\n\n\n')) {
        console.log('✓ Using textContent as simple welcome message');
        return {
          welcomeMessage: trimmedText
        };
      }
    }
    
    // Priority 4: Use description as welcome message if available
    if (lesson.description && lesson.description.trim()) {
      console.log('✓ Using description as welcome message');
      return {
        welcomeTitle: lesson.title || 'Welcome!',
        welcomeMessage: lesson.description
      };
    }
    
    // Return null to use lesson fields as fallback
    console.log('✗ No welcomeContent found, will use lesson fields as fallback');
    return null;
  }, [lesson]);

  // Find current module, next/previous content in same module, and next/previous modules
  const moduleNavigation = React.useMemo(() => {
    if (!modules.length || !lesson || !id) {
      console.log('Module navigation: Missing data', { modulesLength: modules.length, hasLesson: !!lesson, hasId: !!id });
      return { 
        currentModule: null, 
        currentModuleIndex: -1, 
        nextContentInModule: null,
        prevContentInModule: null,
        nextModule: null, 
        prevModule: null,
        isFirstChapter: false,
        isLastChapter: false
      };
    }

    let foundModule = null;
    let foundModuleIndex = -1;
    let foundContentIndex = -1;

    // Find which module contains the current lesson
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      if (Array.isArray(module.contents)) {
        const contentIndex = module.contents.findIndex(
          (item) => item._id === id || item._id?.toString() === id
        );
        if (contentIndex !== -1) {
          foundModule = module;
          foundModuleIndex = i;
          foundContentIndex = contentIndex;
          console.log('Found current module:', { moduleTitle: module.title, moduleIndex: i, contentIndex });
          break;
        }
      }
    }

    // Find next content in the SAME module
    let nextContent = null;
    if (foundModule && Array.isArray(foundModule.contents) && foundContentIndex >= 0) {
      if (foundContentIndex < foundModule.contents.length - 1) {
        nextContent = foundModule.contents[foundContentIndex + 1];
      }
    }

    // Find previous content in the SAME module
    let prevContent = null;
    if (foundModule && Array.isArray(foundModule.contents) && foundContentIndex > 0) {
      prevContent = foundModule.contents[foundContentIndex - 1];
    }

    // Find next module (next module after current one)
    const nextMod = foundModuleIndex >= 0 && foundModuleIndex < modules.length - 1
      ? modules[foundModuleIndex + 1]
      : null;

    // Find previous module (previous module before current one)
    const prevMod = foundModuleIndex > 0
      ? modules[foundModuleIndex - 1]
      : null;

    console.log('Module navigation:', {
      currentModule: foundModule?.title,
      currentModuleIndex: foundModuleIndex,
      currentContentIndex: foundContentIndex,
      nextContentInModule: nextContent?.title,
      prevContentInModule: prevContent?.title,
      nextModule: nextMod?.title,
      prevModule: prevMod?.title,
      totalModules: modules.length
    });

    // Determine if we're on the first chapter (first content in first module)
    const isFirstChapter = foundModuleIndex === 0 && foundContentIndex === 0;
    
    // Determine if we're on the last chapter (last content in last module)
    const isLastChapter = foundModuleIndex === modules.length - 1 && 
      foundModule && 
      Array.isArray(foundModule.contents) && 
      foundContentIndex === foundModule.contents.length - 1;

    return {
      currentModule: foundModule,
      currentModuleIndex: foundModuleIndex,
      nextContentInModule: nextContent,
      prevContentInModule: prevContent,
      nextModule: nextMod,
      prevModule: prevMod,
      isFirstChapter,
      isLastChapter,
    };
  }, [modules, lesson, id]);

  // Destructure module navigation
  const { 
    currentModule, 
    currentModuleIndex, 
    nextContentInModule, 
    prevContentInModule, 
    nextModule, 
    prevModule, 
    isFirstChapter: isFirstChapterInModule, 
    isLastChapter: isLastChapterInModule 
  } = moduleNavigation;

  // Loading state
  if (loading) {
    return (
      <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, color: "#23406e", marginBottom: 12 }}>Loading lesson...</div>
          <div style={{ fontSize: 14, color: "#666" }}>Please wait</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, color: "#d32f2f", marginBottom: 12 }}>Error</div>
          <div style={{ fontSize: 14, color: "#666" }}>{error}</div>
        </div>
      </div>
    );
  }

  // Module Test Summary Screen (First Image - shown when Submit All is clicked)
  if (showModuleTestSummary && isModuleTest) {
    const questionCount = questions.length;
    const attemptedCount = Object.keys(savedModuleTestAnswers).filter(qId => savedModuleTestAnswers[qId] === true).length;
    const unattemptedCount = questionCount - attemptedCount;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

  return (
      <div style={{ background: "#fff", minHeight: "100vh", position: "relative" }}>
        {/* Confirmation Modal - Overlay on summary screen (Second Image) */}
        {showConfirmModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50
          }}>
            <div style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              padding: "32px",
              maxWidth: "448px",
              width: "100%",
              margin: "0 16px"
            }}>
              {/* Warning Icon */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "#fee2e2",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg style={{ width: "40px", height: "40px", color: "#dc2626" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Modal Text */}
              <h2 style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#111827",
                textAlign: "center",
                marginBottom: "24px"
              }}>
                Are you sure, You want to end the Assessment?
              </h2>
              
              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <button
                  onClick={handleConfirmSubmit}
                  style={{
                    padding: "8px 32px",
                    background: "#2800AE",
                    color: "#fff",
                    borderRadius: "6px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#1f0088"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#2800AE"}
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelSubmit}
                  style={{
                    padding: "8px 32px",
                    background: "#6b7280",
                    color: "#fff",
                    borderRadius: "6px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#4b5563"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#6b7280"}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dark Purple Header Bar */}
        <div style={{ background: "#2800AE", height: "8px" }}></div>
        
        {/* Dark Grey Vertical Bar (Left Side) */}
        <div style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          background: "#1f2937"
        }}></div>

        {/* Main Content */}
        <div style={{ maxWidth: "896px", margin: "0 auto", padding: "48px 32px" }}>
          {/* Header with Module Title and Timer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827" }}>
              Module test: {lesson?.title || 'Python test'}
            </h1>
            
            {/* Timer Box */}
            <div style={{
              border: "2px solid #93c5fd",
              borderRadius: "8px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <svg style={{ width: "20px", height: "20px", color: "#2563eb" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>
                {minutes.toString().padStart(2, '0')} Min : {seconds.toString().padStart(2, '0')} Sec
              </span>
            </div>
          </div>
            
          {/* Total Questions */}
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontSize: "18px", color: "#374151" }}>
              Total Questions: <span style={{ fontWeight: 600 }}>{questionCount}/{questionCount}</span>
            </p>
          </div>

          {/* Question Status Summary */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", marginBottom: "48px" }}>
            {/* Total Attempted */}
            <div style={{
              border: "2px solid #86efac",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              minWidth: "200px"
            }}>
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#16a34a", marginBottom: "8px" }}>{attemptedCount}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Total Attempted</div>
            </div>

            {/* Total Unattempted */}
            <div style={{
              border: "2px solid #fca5a5",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              minWidth: "200px"
            }}>
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#dc2626", marginBottom: "8px" }}>{unattemptedCount}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Total Unattempted</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <button
              onClick={handleBackToAssessment}
              style={{
                padding: "12px 32px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: "6px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
            >
              Back To Assessment
            </button>
            <button
              onClick={handleSubmitAndFinish}
              style={{
                padding: "12px 32px",
                background: "#fff",
                border: "2px solid #2563eb",
                color: "#2563eb",
                borderRadius: "6px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#eff6ff"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
            >
              Submit and Finish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Module Test Results Screen (shown after confirmation)
  if (showModuleTestResults && isModuleTest) {
    const questionCount = questions.length;
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;
    
    questions.forEach(q => {
      const questionId = q._id || q.id;
      const userAnswer = moduleTestAnswers[questionId];
      if (userAnswer) {
        attemptedCount++;
        const selectedOption = q.options?.find(opt => opt.text === userAnswer || opt === userAnswer);
        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });
    
    const unattemptedCount = questionCount - attemptedCount;
    const percentage = questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0;
    const totalPoints = correctCount * 100;
    const maxPoints = questionCount * 100;
    
    // Get current date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    
    // Find the current module that contains this test
    let currentModuleForTest = null;
    if (modules.length > 0 && lesson && id) {
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        if (Array.isArray(module.contents)) {
          const contentIndex = module.contents.findIndex(
            (item) => item._id === id || item._id?.toString() === id
          );
          if (contentIndex !== -1) {
            currentModuleForTest = module;
            break;
          }
        }
      }
    }
    
    // Get first content of current module for navigation
    const firstContentOfCurrentModule = currentModuleForTest && Array.isArray(currentModuleForTest.contents) && currentModuleForTest.contents.length > 0
      ? currentModuleForTest.contents[0]
      : null;
    
    // Calculate topic-wise summary
    const topicSummary = [{
      name: lesson?.title || "Python test",
      correct: correctCount,
      total: questionCount,
      remarks: percentage < 50 ? "Weak" : percentage < 70 ? "Average" : "Good",
      resourceLink: "Learn",
      firstContent: firstContentOfCurrentModule // Pass first content for navigation
    }];
    
    // Calculate problem type summary
    const mcqCount = questions.filter(q => q.type === 'mcq' || !q.type).length;
    const codingCount = questions.filter(q => q.type === 'mcq-coding' || q.type === 'content').length;
    
    let mcqCorrect = 0;
    let codingCorrect = 0;
    questions.forEach(q => {
      const questionId = q._id || q.id;
      const userAnswer = moduleTestAnswers[questionId];
      if (userAnswer) {
        const selectedOption = q.options?.find(opt => opt.text === userAnswer || opt === userAnswer);
        const isCorrect = selectedOption?.isCorrect || userAnswer === q.correctAnswer;
        if (q.type === 'mcq' || !q.type) {
          if (isCorrect) mcqCorrect++;
        } else if (q.type === 'mcq-coding' || q.type === 'content') {
          if (isCorrect) codingCorrect++;
        }
      }
    });
    
    const problemTypes = [
      { name: "MCQs", correct: mcqCorrect, total: mcqCount },
      { name: "Coding problems", correct: codingCorrect, total: codingCount }
    ];
    
    // User position in distribution
    let userPosition = "0";
    if (percentage >= 91) userPosition = "91-100";
    else if (percentage >= 81) userPosition = "81-90";
    else if (percentage >= 71) userPosition = "71-80";
    else if (percentage >= 61) userPosition = "61-70";
    else if (percentage >= 51) userPosition = "51-60";
    else if (percentage >= 41) userPosition = "41-50";
    else if (percentage >= 31) userPosition = "31-40";
    else if (percentage >= 21) userPosition = "21-30";
    else if (percentage >= 11) userPosition = "11-20";
    else if (percentage >= 1) userPosition = "1-10";
    
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
    
    const maxCount = 5000;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    // Circular Progress Component
    const CircularProgress = ({ percentage }) => {
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;
      
      return (
        <div style={{ position: "relative", height: "112px", width: "112px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg style={{ height: "100%", width: "100%" }} viewBox="0 0 120 120">
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
          <div style={{ position: "absolute", fontSize: "24px", fontWeight: 600 }}>{percentage}%</div>
        </div>
      );
    };
    
    return (
      <div style={{ background: "#fff", minHeight: "100vh" }}>
        {/* Main Content */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 32px" }}>
          {/* Title Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#111827" }}>
                Report-Module test: {lesson?.title || 'Python test'}
              </h1>
              <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Attempted Date: {formattedDate}</p>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>Total Score: {totalPoints.toString().padStart(2, '0')} Points</p>
            </div>

            {/* Right Side - Timer, Score, Skill Score, View Solutions */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
              {/* Timer */}
              <div style={{
                border: "2px solid #93c5fd",
                borderRadius: "8px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <svg style={{ width: "20px", height: "20px", color: "#2563eb" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>
                  {minutes.toString().padStart(2, '0')} Min : {seconds.toString().padStart(2, '0')} Sec
                </span>
              </div>
              
              {/* Score Display */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "30px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
                  {totalPoints}/{maxPoints} Points
                </div>
              </div>

              {/* Skill Score */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>Skill Score</p>
                <CircularProgress percentage={percentage} />
              </div>
              
              {/* View Solutions Button */}
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button style={{
                  background: "#2800AE",
                  color: "#fff",
                  fontWeight: 500,
                  padding: "8px 24px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#1f0088"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#2800AE"}
                >
                  View Solutions
                </button>
              </div>
            </div>
          </div>

          {/* Summary of Attempts */}
          <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Answers Attempted */}
            <div style={{
              border: "2px solid #86efac",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              minWidth: "180px"
            }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#16a34a", marginBottom: "8px" }}>{attemptedCount.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Answers Attempted</div>
            </div>

            {/* Wrong Answers */}
            <div style={{
              border: "2px solid #fca5a5",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              minWidth: "180px"
            }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#dc2626", marginBottom: "8px" }}>{wrongCount.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Wrong Answers Attempted</div>
            </div>

            {/* Total Unattempted */}
            <div style={{
              border: "2px solid #d1d5db",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              minWidth: "180px"
            }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "#6b7280", marginBottom: "8px" }}>{unattemptedCount.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Total Unattempted</div>
            </div>
          </div>

          {/* Topic Wise Summary Table */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>Topic Wise Summary</h2>
            <div style={{ background: "#eff6ff", borderRadius: "6px", overflow: "hidden" }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr style={{ textAlign: "left", background: "#dbeafe" }}>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Topic</th>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Correct</th>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Total</th>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Remarks</th>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {topicSummary.map((topic, index) => (
                    <tr key={index} style={{ borderTop: "1px solid #bfdbfe", background: "#fff" }}>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>{topic.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>{topic.correct}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>{topic.total}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: "#ef4444", fontWeight: 500 }}>{topic.remarks}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            // Navigate to first content of current module (the module containing this test)
                            if (topic.firstContent) {
                              navigate(`/coursecatalog/${contentId}/problems/${topic.firstContent._id}?q=0`, {
                                state: { lesson: topic.firstContent }
                              });
                            } else if (modules.length > 0 && modules[0]?.contents && modules[0].contents.length > 0) {
                              // Fallback: navigate to first content of first module
                              const firstContent = modules[0].contents[0];
                              navigate(`/coursecatalog/${contentId}/problems/${firstContent._id}?q=0`, {
                                state: { lesson: firstContent }
                              });
                            } else if (contentId) {
                              // Final fallback: navigate to course catalog
                              navigate(`/coursecatalog/${contentId}`);
                            }
                          }}
                          style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}
                        >
                          {topic.resourceLink}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Problem Type Table */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>Problem type</h2>
            <div style={{ background: "#eff6ff", borderRadius: "6px", overflow: "hidden" }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr style={{ textAlign: "left", background: "#dbeafe" }}>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Topic</th>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Correct</th>
                    <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {problemTypes.map((type, index) => (
                    <tr key={index} style={{ borderTop: "1px solid #bfdbfe", background: "#fff" }}>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>{type.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>{type.correct}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px" }}>{type.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Summary Chart */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>User Summary Chart</h2>
            <div style={{ marginTop: "24px", position: "relative", height: "340px" }}>
              {/* Chart Container */}
              <div style={{ height: "270px", position: "relative", borderLeft: "1px solid #d1d5db", borderBottom: "1px solid #d1d5db" }}>
                {/* Y-axis labels */}
                <div style={{
                  position: "absolute",
                  left: "-48px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "right"
                }}>
                  <span style={{ fontSize: "14px", color: "#6b7280", transform: "translateY(-8px)" }}>5000</span>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>4000</span>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>3000</span>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>2000</span>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>1000</span>
                  <span style={{ fontSize: "14px", color: "#6b7280", transform: "translateY(8px)" }}>0</span>
                </div>
                
                {/* Horizontal grid lines */}
                <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "1px", background: "#e5e7eb" }}></div>
                  <div style={{ position: "absolute", left: 0, top: "20%", width: "100%", height: "1px", background: "#e5e7eb" }}></div>
                  <div style={{ position: "absolute", left: 0, top: "40%", width: "100%", height: "1px", background: "#e5e7eb" }}></div>
                  <div style={{ position: "absolute", left: 0, top: "60%", width: "100%", height: "1px", background: "#e5e7eb" }}></div>
                  <div style={{ position: "absolute", left: 0, top: "80%", width: "100%", height: "1px", background: "#e5e7eb" }}></div>
                  <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "1px", background: "#e5e7eb" }}></div>
                </div>

                {/* Bars */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  padding: "0 12px"
                }}>
                  {distribution.map((item, index) => {
                    const height = (item.count / maxCount) * 100;
                    const isUserPosition = item.range === userPosition;
                    
                    return (
                      <div 
                        key={index} 
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "8%"
                        }}
                      >
                        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                          {/* Bar */}
                          {item.count > 0 && (
                            <div 
                              style={{
                                width: "100%",
                                background: "#1e40af",
                                borderRadius: "4px 4px 0 0",
                                height: `${height}%`
                              }}
                            ></div>
                          )}
                          
                          {/* User Position Indicator */}
                          {isUserPosition && (
                            <div style={{ position: "absolute", top: "-40px" }}>
                              <div style={{
                                background: "#1e40af",
                                color: "#fff",
                                fontSize: "12px",
                                padding: "4px 12px",
                                borderRadius: "6px",
                                whiteSpace: "nowrap"
                              }}>
                                You are here
                              </div>
                              <div style={{
                                width: 0,
                                height: 0,
                                margin: "0 auto",
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderTop: "6px solid #1e40af"
                              }}></div>
                              <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
                                <div style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  background: "#fb923c",
                                  border: "2px solid #fff"
                                }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* X-axis Label */}
                        <span style={{ fontSize: "12px", marginTop: "12px", color: "#6b7280" }}>{item.range}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X & Y Axis Labels */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>Percentage</span>
              </div>
              <div style={{
                position: "absolute",
                left: "-96px",
                top: "50%",
                transform: "translateY(-50%) rotate(-90deg)"
              }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>Students Count</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: 0, position: "relative" }}>

	      {/* Top navigation bar */}
		      <UpperNavbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          contentId={contentId}
		        difficulty={difficulty} 
		        lesson={lesson} 
		        questions={questions}
		        currentQuestionIndex={questionIndex}
		        totalSteps={totalSteps}
		        textSectionCount={textSections.length}
		        isOnQuestion={currentQuestion !== null}
		        onSubmit={handleSubmitAnswer}
		        onSubmitDisabled={isModuleTest 
		          ? (currentQuestion ? (savedModuleTestAnswers[currentQuestion?._id || currentQuestion?.id || questionIndex] || selectedOptions[currentQuestion?._id || currentQuestion?.id || questionIndex] === undefined) : true)
		          : (currentQuestion ? (submittedQuestions[currentQuestion?._id || currentQuestion?.id || questionIndex] || selectedOptions[currentQuestion?._id || currentQuestion?.id || questionIndex] === undefined) : true)
		        }
		        onSubmitAll={isModuleTest ? handleSubmitAllModuleTest : null}
		        showSubmitAll={isModuleTest && allModuleTestQuestionsAnswered()}
		        isModuleTest={isModuleTest}
		        nextContentInModule={nextContentInModule}
		        prevContentInModule={prevContentInModule}
		        nextModule={nextModule}
		        prevModule={prevModule}
		        isLastQuestion={questionIndex >= totalSteps - 1}
		        isFirstQuestion={questionIndex === 0}
		      />

      {/* Main Content: Left (Statement), Right (Code Panel) */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        padding: showWelcomeScreen ? "0" : "0 32px",
        marginTop: 0,
        minHeight: "calc(100vh - 60px)"
      }}>
        {/* Left: Problem Statement */}
        <div style={{
          flex: showWelcomeScreen ? 1 : 1.1,
          background: "#fff",
          borderRadius: showWelcomeScreen ? "0" : "0 0 0 8px",
          marginTop: 0,
          marginRight: showWelcomeScreen ? 0 : 12,
          padding: "32px 32px 32px 32px",
          minHeight: 600,
          boxShadow: showWelcomeScreen ? "none" : "0 2px 8px rgba(33, 150, 243, 0.08)",
          overflowY: "auto",
          width: showWelcomeScreen ? "100%" : "auto"
        }}>
          {/* Welcome Screen for First Chapter (only at q=0) */}
          {showWelcomeScreen ? (
            <div style={{ maxWidth: "900px", margin: "0 auto", color: "#333" }}>
              {console.log('Rendering welcome screen with:', { welcomeContent, lesson, showWelcomeScreen, questionIndex })}
              
              {/* Always show welcome screen for first chapter, even if no content */}
              <>
                {/* Welcome Heading */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <h1 style={{ fontWeight: 700, fontSize: 36, color: "#23406e", margin: 0 }}>
                    {(() => {
                      // If welcomeTitle exists, use it
                      if (welcomeContent?.welcomeTitle) {
                        return welcomeContent.welcomeTitle;
                      }
                      // If lesson title exists and doesn't contain "introducing output" or "printing", use it
                      if (lesson?.title) {
                        const titleLower = lesson.title.toLowerCase();
                        if (!titleLower.includes('introducing output') && 
                            !titleLower.includes('printing') &&
                            !titleLower.includes('introducing output / printing')) {
                          return lesson.title;
                        }
                      }
                      // Default fallback
                      return "Welcome!";
                    })()}
                  </h1>
                  {(welcomeContent?.showListenButton !== false) && (
                    <button
                      style={{
                        background: "#7b2cbf",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#6a1b9a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#7b2cbf";
                      }}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                      Listen
                    </button>
                  )}
                </div>

                {/* Welcome Text */}
                {(welcomeContent?.welcomeMessage || lesson?.description) && (
                  <p style={{ fontSize: 18, color: "#333", marginBottom: 32, lineHeight: 1.6 }}>
                    {welcomeContent?.welcomeMessage || lesson?.description}
                  </p>
                )}

                  {/* What will you learn section - Only show if data exists */}
                  {welcomeContent?.learningObjectives && welcomeContent.learningObjectives.length > 0 && (
                    <div style={{ marginBottom: 32 }}>
                      <h2 style={{ fontSize: 20, fontWeight: 600, color: "#23406e", marginBottom: 16 }}>
                        {welcomeContent?.learningTitle || "What will you learn here?"}
                      </h2>
                      <ul style={{ paddingLeft: 20, fontSize: 16, color: "#555", lineHeight: 1.8 }}>
                        {welcomeContent.learningObjectives.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: 12 }}>
                            {typeof item === 'string' ? item : item.text || item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Call to Action - Only show if data exists */}
                  {(welcomeContent?.callToActionTitle || welcomeContent?.callToActionText) && (
                    <div style={{ marginBottom: 32 }}>
                      {welcomeContent?.callToActionTitle && (
                        <p style={{ fontSize: 18, fontWeight: 500, color: "#333", marginBottom: 8 }}>
                          {welcomeContent.callToActionTitle}
                        </p>
                      )}
                      {welcomeContent?.callToActionText && (
                        <p style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
                          {welcomeContent.callToActionText}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Divider - Only show if there's content below */}
                  {(welcomeContent?.alternativeCourse || (welcomeContent?.commonDoubts && welcomeContent.commonDoubts.length > 0)) && (
                    <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "32px 0" }} />
                  )}

                  {/* Alternative Course Suggestion - Only show if data exists */}
                  {welcomeContent?.alternativeCourse && (
                    <div style={{ marginBottom: 40 }}>
                      <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>
                        {welcomeContent.alternativeCourse.text || welcomeContent.alternativeCourse}{" "}
                        {welcomeContent.alternativeCourse.linkText && (
                          <a
                            href={welcomeContent.alternativeCourse.linkUrl || "#"}
                            style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
                            onClick={(e) => {
                              if (welcomeContent.alternativeCourse.linkUrl && welcomeContent.alternativeCourse.linkUrl !== "#") {
                                e.preventDefault();
                                // Navigate to alternative course if available
                              }
                            }}
                          >
                            {welcomeContent.alternativeCourse.linkText}
                          </a>
                        )}
                        {" "}{welcomeContent.alternativeCourse.textAfter || ""}
                      </p>
                    </div>
                  )}

                  {/* Common Doubts Section - Only show if data exists */}
                  {welcomeContent?.commonDoubts && Array.isArray(welcomeContent.commonDoubts) && welcomeContent.commonDoubts.length > 0 && (
                    <div style={{ marginTop: 48 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                        <svg width="20" height="20" fill="#ffc107" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#23406e", margin: 0 }}>
                          {welcomeContent?.commonDoubtsTitle || "Common doubts"}
                        </h3>
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {welcomeContent.commonDoubts.map((question, idx) => (
                          <button
                            key={idx}
                            style={{
                              background: "#fff",
                              border: "1px solid #e0e0e0",
                              borderRadius: "8px",
                              padding: "12px 20px",
                              fontSize: 14,
                              color: "#333",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#7b2cbf";
                              e.currentTarget.style.color = "#7b2cbf";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#e0e0e0";
                              e.currentTarget.style.color = "#333";
                            }}
                          >
                            {typeof question === 'string' ? question : question.text || question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
            

              {/* On first chapter, do NOT show textContent sections - only show welcome content */}
              {/* If no welcomeContent and no description, show a message */}
              {!welcomeContent && !lesson?.description && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#666" }}>
                  <p style={{ fontSize: 16 }}>
                    No welcome content available. Please add welcome content in the edit page.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
	          {/* Lesson Title */}
	          {lesson?.title && (
	            <h1 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16, color: "#23406e" } } >
	              {lesson.title}
	            </h1>
	          )}

	          {/* Optional description for any lesson */}
	          {lesson?.description && (
	            <p style={{ marginBottom: 24, fontSize: 14, color: "#555" }} >
	              {lesson.description}
	            </p>
	          )}
	          
	          {/* LESSON BODY */}
	          {lesson && lesson.type !== "question" && lesson.type !== "quiz" ? (
	            // Text-only or other simple lesson types: show text sections.
	            // Navigation between sections is controlled only by the
	            // Prev/Next buttons in the UpperNavbar (via the `q` param).
	            // For first chapter: q=0 is welcome, q>=1 shows text sections (offset by 1)
	            <div style={{ fontSize: 15, lineHeight: 1.6, color: "#222" }}>
	              {textSections.length > 0 ? (() => {
	                // If first chapter, offset questionIndex by 1 (since q=0 is welcome page)
	                const sectionIndex = isFirstChapter 
	                  ? Math.max(questionIndex - 1, 0)
	                  : questionIndex;
	                const currentSection = textSections[
	                  Math.min(
	                    Math.max(sectionIndex, 0),
	                    textSections.length - 1
	                  )
	                ];
	                return (
	                  <div>
	                    {currentSection.title && (
	                      <h2 style={{ 
	                        fontWeight: 600, 
	                        fontSize: 20, 
	                        marginBottom: 16, 
	                        color: "#23406e" 
	                      }}>
	                        {currentSection.title}
	                      </h2>
	                    )}
	                    <p style={{ whiteSpace: "pre-wrap" }}>
	                      {currentSection.content}
	                    </p>
	                  </div>
	                );
	              })() : (
	                <p>No text content available for this lesson.</p>
	              )}
	            </div>
	          ) : (
	            /* QUESTION / QUIZ LESSONS */
	            <>
	              {lesson &&
	              (lesson.type === "question" || lesson.type === "quiz") &&
	              textSections.length > 0 &&
			      (isFirstChapter ? questionIndex > 0 && questionIndex <= textSections.length : questionIndex < textSections.length) ? (
	                // We are on one of the text-section steps before questions.
	                // Navigation between sections is controlled only by the
	                // Prev/Next buttons in the UpperNavbar (via the `q` param).
	                // For first chapter: q=0 is welcome, q>=1 shows text sections (offset by 1)
	                <div style={{ fontSize: 15, lineHeight: 1.6, color: "#222" }}>
	                  {(() => {
	                    // If first chapter, offset questionIndex by 1 (since q=0 is welcome page)
	                    const sectionIndex = isFirstChapter 
	                      ? Math.max(questionIndex - 1, 0)
	                      : questionIndex;
	                    const currentSection = textSections[
	                      Math.min(
	                        Math.max(sectionIndex, 0),
	                        textSections.length - 1
	                      )
	                    ];
	                    return (
	                      <div>
	                        {currentSection.title && (
	                          <h2 style={{ 
	                            fontWeight: 600, 
	                            fontSize: 20, 
	                            marginBottom: 16, 
	                            color: "#23406e" 
	                          }}>
	                            {currentSection.title}
	                          </h2>
	                        )}
	                        <p style={{ whiteSpace: "pre-wrap" }}>
	                          {currentSection.content}
	                        </p>
	                      </div>
	                    );
	                  })()}
	                </div>
			        ) : currentQuestion ? (
		                // Left Side: Question Title and Code only
		                <div>
		                  {/* Question Type Badge */}
		                  {(() => {
		                    const qType = currentQuestion.type || (currentQuestion.codingContent ? 'mcq-coding' : (currentQuestion.content ? 'content' : 'mcq'));
		                    return (
		                      <div
		                        style={{
		                          display: 'inline-block',
		                          padding: '4px 12px',
		                          borderRadius: '12px',
		                          fontSize: 12,
		                          fontWeight: 600,
		                          marginBottom: 16,
		                          background: qType === 'mcq' ? '#e3f2fd' : qType === 'content' ? '#f3e5f5' : '#e8f5e9',
		                          color: qType === 'mcq' ? '#1976d2' : qType === 'content' ? '#7b1fa2' : '#2e7d32',
		                        }}
		                      >
		                        {qType === 'mcq' ? 'MCQ' : qType === 'content' ? 'Content' : 'MCQ + Coding'}
		                      </div>
		                    );
		                  })()}

		                  {/* MCQ and MCQ-Coding: Show Question Text */}
		                  {(currentQuestion.type === 'mcq' || currentQuestion.type === 'mcq-coding' || !currentQuestion.type) && (
		                    <>
		                      {(() => {
		                        const { text, code } = extractCodeFromQuestion(currentQuestion);
		                        return (
		                          <>
		                            <h2
		                              style={{
		                                fontWeight: 500,
		                                fontSize: 18,
		                                marginBottom: 20,
		                                color: "#222",
		                                lineHeight: 1.5,
		                              }}
		                            >
		                              {text || currentQuestion.question}
		                            </h2>
		                            {/* Show coding content for MCQ-Coding type */}
		                            {currentQuestion.type === 'mcq-coding' && currentQuestion.codingContent && (
		                              <div
		                                style={{
		                                  background: "#1e1e1e",
		                                  borderRadius: 8,
		                                  padding: "20px",
		                                  marginBottom: 24,
		                                  fontFamily: "'Fira Code', 'Courier New', monospace",
		                                  fontSize: 14,
		                                  color: "#d4d4d4",
		                                  whiteSpace: "pre-wrap",
		                                  overflowX: "auto",
		                                  border: "1px solid #333",
		                                }}
		                              >
		                                <div style={{ fontSize: 11, color: '#888', marginBottom: 8, textTransform: 'uppercase' }}>Code</div>
		                                <pre style={{ margin: 0, fontFamily: "inherit" }}>{currentQuestion.codingContent}</pre>
		                              </div>
		                            )}
		                            {/* Legacy code extraction for backward compatibility */}
		                            {code && !currentQuestion.codingContent && (
		                              <div
		                                style={{
		                                  background: "#1e1e1e",
		                                  borderRadius: 8,
		                                  padding: "20px",
		                                  marginBottom: 24,
		                                  fontFamily: "'Fira Code', 'Courier New', monospace",
		                                  fontSize: 14,
		                                  color: "#d4d4d4",
		                                  whiteSpace: "pre-wrap",
		                                  overflowX: "auto",
		                                  border: "1px solid #333",
		                                }}
		                              >
		                                <pre style={{ margin: 0, fontFamily: "inherit" }}>{code}</pre>
		                              </div>
		                            )}
		                          </>
		                        );
		                      })()}
		                    </>
		                  )}

		                  {/* Content Type: Show Content Items */}
		                  {currentQuestion.type === 'content' && currentQuestion.content && Array.isArray(currentQuestion.content) && (
		                    <div style={{ marginTop: 16 }}>
		                      {currentQuestion.content.map((item, idx) => (
		                        <div
		                          key={idx}
		                          style={{
		                            background: '#f5f5f5',
		                            borderRadius: 8,
		                            padding: 16,
		                            marginBottom: 16,
		                            border: '1px solid #e0e0e0',
		                          }}
		                        >
		                          {item.title && (
		                            <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, color: '#23406e' }}>
		                              {item.title}
		                            </h3>
		                          )}
		                          {item.description && (
		                            <div style={{ color: '#222', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
		                              {item.type === 'code' ? (
		                                <pre
		                                  style={{
		                                    background: '#1e1e1e',
		                                    color: '#d4d4d4',
		                                    padding: 12,
		                                    borderRadius: 4,
		                                    fontFamily: "'Fira Code', 'Courier New', monospace",
		                                    fontSize: 13,
		                                    overflowX: 'auto',
		                                    margin: 0,
		                                  }}
		                                >
		                                  <code>{item.description}</code>
		                                </pre>
		                              ) : (
		                                <p style={{ margin: 0 }}>{item.description}</p>
		                              )}
		                            </div>
		                          )}
		                          {item.type && (
		                            <span
		                              style={{
		                                display: 'inline-block',
		                                marginTop: 8,
		                                padding: '2px 8px',
		                                background: '#e3f2fd',
		                                color: '#1976d2',
		                                fontSize: 11,
		                                borderRadius: 4,
		                                textTransform: 'capitalize',
		                              }}
		                            >
		                              {item.type}
		                            </span>
		                          )}
		                        </div>
		                      ))}
		                    </div>
		                  )}
		                </div>
		              ) : questions.length === 0 ? (
		                <div
		                  style={{
		                    textAlign: "center",
		                    padding: 40,
		                    color: "#666",
		                  }}
		                >
		                  <p>No questions available for this lesson.</p>
		                </div>
		              ) : (
		                <div
		                  style={{
		                    textAlign: "center",
		                    padding: 40,
		                    color: "#666",
		                  }}
		                >
		                  <p>Question not found.</p>
		                </div>
		              )}
		            </>
		              )}
		            </>
		          )}
        </div>

        {/* Right: Options for Questions, or Code Editor for Text Content - Hidden on welcome screen (first chapter at q=0) */}
        {!showWelcomeScreen && (
        <div style={{
          flex: 1.3,
          minWidth: 0
        }}>
          {currentQuestion ? (
            // Right Side: Options for Questions (only for MCQ and MCQ-Coding)
            (currentQuestion.type === 'mcq' || currentQuestion.type === 'mcq-coding' || (!currentQuestion.type && currentQuestion.options)) ? (
              <div style={{
                background: "#fff",
                borderRadius: "0 0 8px 0",
                marginTop: 0,
                marginLeft: 12,
                padding: "32px 32px 32px 32px",
                minHeight: 600,
                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
                overflowY: "auto"
              }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#23406e",
                    marginBottom: 20,
                  }}
                >
                  Select one of the following options:
                </div>
              {currentQuestion.options &&
                currentQuestion.options.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    {currentQuestion.options.map((option, optIndex) => {
                      const isSelected = selectedOptionIndex === optIndex;
                      // For module tests, don't show feedback
                      const isModuleTestMode = isModuleTest;
                      const isAnswered = isModuleTestMode 
                        ? savedModuleTestAnswers[currentQuestionId] 
                        : (submittedQuestions[currentQuestionId] || showAnswer);
                      const showCorrect = !isModuleTestMode && isAnswered && option.isCorrect;
                      const showWrong = !isModuleTestMode && isSelected && !option.isCorrect && isAnswered;
                      const isCorrectOption = option.isCorrect;

                      return (
                        <label
                          key={optIndex}
                          onClick={() =>
                            !isAnswered &&
                            handleOptionClick(optIndex)
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 16px",
                            marginBottom: 12,
                            borderRadius: 8,
                            border: showCorrect
                              ? "2px solid #4caf50"
                              : showWrong
                              ? "2px solid #f44336"
                              : isSelected
                              ? "2px solid #2196f3"
                              : !isModuleTestMode && showAnswer && isCorrectOption
                              ? "2px solid #4caf50"
                              : "1px solid #e0e0e0",
                            background: showCorrect
                              ? "#e8f5e9"
                              : showWrong
                              ? "#ffebee"
                              : isSelected
                              ? "#e3f2fd"
                              : !isModuleTestMode && showAnswer && isCorrectOption
                              ? "#e8f5e9"
                              : "#fff",
                            cursor: isAnswered
                              ? "default"
                              : "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            if (!isAnswered) {
                              e.currentTarget.style.background = "#f5f5f5";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isAnswered) {
                              e.currentTarget.style.background = "#fff";
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestionId}`}
                            checked={isSelected}
                            onChange={() =>
                              !isAnswered &&
                              handleOptionClick(optIndex)
                            }
                            style={{
                              marginRight: 12,
                              width: 18,
                              height: 18,
                              cursor: isAnswered ? "default" : "pointer",
                            }}
                            disabled={isAnswered}
                          />
                          <span
                            style={{
                              flex: 1,
                              fontSize: 15,
                              color: "#222",
                              fontWeight: isSelected ? 500 : 400,
                            }}
                          >
                            {option.text}
                          </span>
                          {!isModuleTestMode && (showCorrect || (showAnswer && isCorrectOption)) && (
                            <span
                              style={{
                                marginLeft: 8,
                                color: "#4caf50",
                                fontSize: 18,
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </span>
                          )}
                          {!isModuleTestMode && showWrong && (
                            <span
                              style={{
                                marginLeft: 8,
                                color: "#f44336",
                                fontSize: 18,
                                fontWeight: 700,
                              }}
                            >
                              ✗
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}

              {/* Action Buttons - Only show for non-module tests */}
              {!isModuleTest && (
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    background: "#e3f2fd",
                    border: "1px solid #90caf9",
                    borderRadius: 6,
                    color: "#1976d2",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#bbdefb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#e3f2fd";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  See Answer
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: 6,
                    color: "#666",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f5f5f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  View Solution
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
              </div>
              )}

              {/* Show explanation when answer is revealed or option is selected */}
              {((showAnswer || selectedOptionIndex !== undefined) &&
                currentQuestion.explanation) && (
                  <div
                    style={{
                      marginTop: 24,
                      padding: 16,
                      background: "#e3f2fd",
                      borderRadius: 8,
                      fontSize: 14,
                      color: "#1565c0",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </div>
                )}
              </div>
            ) : currentQuestion.type === 'content' ? (
              // Content type: Show message
              <div style={{
                background: "#fff",
                borderRadius: "0 0 8px 0",
                marginTop: 0,
                marginLeft: 12,
                padding: "32px 32px 32px 32px",
                minHeight: 600,
                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ textAlign: "center", color: "#666" }}>
                  <p>This is a content question. Please review the content on the left.</p>
                </div>
              </div>
            ) : (
              // Right Side: Code Editor for Text Content
              <RightCodePanel />
            )
          ) : (
            // Right Side: Code Editor for Text Content
            <RightCodePanel />
          )}
        </div>
        )}
      </div>
 
    </div>
  );
};

export default ProblemView;