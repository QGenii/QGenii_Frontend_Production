import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import pythonlogo from '/cib_python.png'
import { Star, Wifi, FileText, CheckSquare } from "lucide-react";
import api from '../../lib/api';
import ModuleList from '../../Components/PracticeTest/ModuleList';
// import { useAuth } from '../../hooks/useAuth'; // Unused for now

export default function PythonTest() {
  const { skillName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const { user } = useAuth(); // Unused for now
  const [agreed, setAgreed] = useState(false);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [showPrerequisiteReport, setShowPrerequisiteReport] = useState(false);
  const [userHasAttempted, setUserHasAttempted] = useState(false);
  const [testReport, setTestReport] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [testAttempts, setTestAttempts] = useState([]); // Array of all attempts
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0); // Currently selected attempt (0-based)

  // Initialize question index from URL or default to 0
  const questionParam = searchParams.get('question');
  const initialQuestionIndex = questionParam ? parseInt(questionParam, 10) - 1 : 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Math.max(0, initialQuestionIndex));
  const [answers, setAnswers] = useState({});
  const [savedAnswers, setSavedAnswers] = useState({}); // Track which questions have been saved
  const [showResults, setShowResults] = useState(false);
  const [showSummary, setShowSummary] = useState(false); // Show summary screen
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Show confirmation modal
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds - used in timer logic
  const timerIntervalRef = useRef(null);
  const showSummaryRef = useRef(false); // Track summary state for timer callback

  // Fetch course data based on test name
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!skillName) return;
      
      try {
        setCourseLoading(true);
        // Fetch course by test name (e.g., "python test" -> "Learn Python Programming", "java test" -> "Java Programming")
        const courseRes = await api.get(`/courses/practice-test/${skillName}`);
        const fetchedCourse = courseRes.data.data.course;
        
        console.log('Fetched course for test:', skillName, fetchedCourse);
        console.log('Course syllabus:', fetchedCourse.syllabus);
        
        setCourse(fetchedCourse);

        // Fetch modules for the course (with contents)
        if (fetchedCourse._id) {
          try {
            const modulesRes = await api.get(`/courses/${fetchedCourse._id}/modules`);
            const modulesData = modulesRes.data.data || [];
            console.log('Fetched modules:', modulesData);
            
            // Fetch contents for each module if not included
            const modulesWithContents = await Promise.all(
              modulesData.map(async (module) => {
                if (module.contents && module.contents.length > 0) {
                  return module; // Already has contents
                }
                try {
                  // Try to fetch module with contents
                  const moduleRes = await api.get(`/courses/${fetchedCourse._id}/modules/${module._id}`);
                  return moduleRes.data.data || module;
                } catch (err) {
                  console.error(`Error fetching contents for module ${module._id}:`, err);
                  return module;
                }
              })
            );
            
            setModules(modulesWithContents);
          } catch (err) {
            console.error('Error fetching modules:', err);
            setModules([]);
          }
        }
      } catch (err) {
        console.error('Error fetching course for test:', skillName, err);
        console.error('Error details:', err.response?.data || err.message);
        setCourse(null);
        setModules([]);
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourseData();
  }, [skillName]);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const skillToFetch = skillName || 'python';
        const res = await api.get('/skills');
        const skills = res.data.data || [];
        const foundSkill = skills.find(s => s.skillName.toLowerCase() === skillToFetch.toLowerCase());
        if (foundSkill) {
          // If questions are already in the skill object, use them
          // Otherwise, fetch questions separately
          if (foundSkill.questions && foundSkill.questions.length > 0) {
            setSkill(foundSkill);
          } else {
            try {
              const questionsRes = await api.get(`/skills/${foundSkill._id}/questions`);
              setSkill({ ...foundSkill, questions: questionsRes.data.data || [] });
            } catch {
              // If questions endpoint fails, use skill with empty questions
              setSkill({ ...foundSkill, questions: [] });
            }
          }
        } else {
          setSkill(null);
        }
      } catch (err) {
        console.error('Error fetching skill:', err);
        setSkill(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [skillName]);

  const questions = skill?.questions || [];
  const questionCount = questions.length;
  // Each question gets 5 minutes (300 seconds)
  const duration = questionCount > 0 ? questionCount * 5 : 0; // in minutes
  const totalTimeInSeconds = questionCount * 300; // 5 minutes per question in seconds

  // Restore test state from URL on page load/refresh
  useEffect(() => {
    if (!loading && questions.length > 0 && !testStarted) {
      const questionParam = searchParams.get('question');
      if (questionParam) {
        const questionNum = parseInt(questionParam, 10);
        if (!isNaN(questionNum) && questionNum >= 1 && questionNum <= questions.length) {
          // Automatically start the test and navigate to the question from URL
          setTestStarted(true);
          setCurrentQuestionIndex(questionNum - 1);

          // Restore answers from localStorage if available
          const savedAnswersData = localStorage.getItem(`test_answers_${skill?._id}`);
          const savedAnswersState = localStorage.getItem(`test_saved_${skill?._id}`);
          if (savedAnswersData) {
            try {
              setAnswers(JSON.parse(savedAnswersData));
            } catch (e) {
              console.error('Error parsing saved answers:', e);
            }
          }
          if (savedAnswersState) {
            try {
              setSavedAnswers(JSON.parse(savedAnswersState));
            } catch (e) {
              console.error('Error parsing saved answers state:', e);
            }
          }

          // Initialize timer - 5 minutes per question
          const totalSeconds = questionCount * 300; // 5 minutes (300 seconds) per question
          setTimeRemaining(totalSeconds);

          // Start countdown timer
          timerIntervalRef.current = setInterval(() => {
            setTimeRemaining(prev => {
              if (prev <= 1) {
                clearInterval(timerIntervalRef.current);
                // If on summary screen, auto-submit; otherwise show summary
                if (showSummaryRef.current) {
                  handleConfirmSubmit();
                } else {
                  handleSubmit(); // Show summary when time runs out
                }
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, questions.length, skill?._id]);

  const handleStartTest = () => {
    if (questionCount === 0) {
      alert('No questions available for this skill test.');
      return;
    }
    setTestStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSavedAnswers({}); // Initialize saved answers

    // Update URL to show question 1
    setSearchParams({ question: '1' });

    // Initialize timer - 5 minutes per question
    const totalSeconds = questionCount * 300; // 5 minutes (300 seconds) per question
    setTimeRemaining(totalSeconds);
    
    // Start countdown timer
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          // If on summary screen, auto-submit; otherwise show summary
          if (showSummaryRef.current) {
            handleConfirmSubmit();
          } else {
            handleSubmit(); // Show summary when time runs out
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Update timer dynamically when question count changes
  useEffect(() => {
    if (testStarted && questionCount > 0) {
      // Calculate new total time: 5 minutes per question
      const newTotalSeconds = questionCount * 300;
      
      // If timer is running, update it
      if (timerIntervalRef.current) {
        // Update the remaining time: add time for new questions (5 min per new question)
        setTimeRemaining(prev => {
          // If we have more questions now, add the time for those questions
          if (newTotalSeconds > totalTimeInSeconds) {
            return prev + (newTotalSeconds - totalTimeInSeconds);
          }
          // If questions were removed, keep current time but don't exceed new total
          return Math.min(prev, newTotalSeconds);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCount, testStarted]);
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Helper function to calculate module-wise summary
  const calculateModuleWiseSummary = (questions, answers, modules, course, skill) => {
    // Get language name for first module
    const getLanguageName = () => {
      if (course) {
        const title = course.title.toLowerCase();
        if (title.includes('python')) return 'Python';
        if (title.includes('java')) return 'Java';
        if (title.includes('c++') || title.includes('cpp') || title.includes('c plus plus')) return 'C++';
        if (title.includes('c programming') || title.includes('learn c')) return 'C';
        if (title.includes('javascript')) return 'JavaScript';
        if (title.includes('typescript')) return 'TypeScript';
        if (title.includes('go') || title.includes('golang')) return 'Go';
        if (title.includes('rust')) return 'Rust';
        if (title.includes('php')) return 'PHP';
        if (title.includes('ruby')) return 'Ruby';
        if (title.includes('swift')) return 'Swift';
        if (title.includes('kotlin')) return 'Kotlin';
        if (title.includes('scala')) return 'Scala';
      }
      return skill?.skillName ? skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1) : 'Programming';
    };

    const languageName = getLanguageName();
    const firstModuleTitle = `Print statement and ${languageName} Syntax`;

    // Create a map to store module statistics
    const moduleStats = new Map();

    // Initialize with all modules from syllabus/modules
    // First module is always "Print statement and [Language] Syntax"
    moduleStats.set(firstModuleTitle, { correct: 0, total: 0 });

    // Add other modules
    if (modules && modules.length > 0) {
      // Start from second module (skip first)
      modules.slice(1).forEach(module => {
        moduleStats.set(module.title, { correct: 0, total: 0 });
      });
    } else if (course?.syllabus && Array.isArray(course.syllabus)) {
      // Use syllabus if modules not available
      course.syllabus.forEach(item => {
        const title = item.title || item;
        moduleStats.set(title, { correct: 0, total: 0 });
      });
    }

    // Group questions by module and calculate stats
    questions.forEach(q => {
      const moduleId = q.module;
      let moduleTitle = firstModuleTitle; // Default to first module

      // Determine module title
      if (moduleId && modules && modules.length > 0) {
        // Check if it's the first module
        const isFirstModule = moduleId === modules[0]._id;
        if (isFirstModule) {
          moduleTitle = firstModuleTitle;
        } else {
          const module = modules.find(m => m._id === moduleId || m._id?.toString() === moduleId?.toString());
          if (module) {
            moduleTitle = module.title;
          }
        }
      } else if (!moduleId) {
        // If no module assigned, assign to first module
        moduleTitle = firstModuleTitle;
      }

      // Initialize module if not exists
      if (!moduleStats.has(moduleTitle)) {
        moduleStats.set(moduleTitle, { correct: 0, total: 0 });
      }

      const stats = moduleStats.get(moduleTitle);
      stats.total++;

      // Check if answer is correct
      const userAnswer = answers[q._id];
      if (userAnswer) {
        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
          stats.correct++;
        }
      }
    });

    // Convert to array format with remarks
    const moduleWiseSummary = [];
    moduleStats.forEach((stats, moduleTitle) => {
      const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      const remarks = percentage < 50 ? 'Weak' : percentage < 70 ? 'Average' : 'Good';
      
      moduleWiseSummary.push({
        topic: moduleTitle,
        correct: stats.correct,
        total: stats.total,
        remarks: remarks
      });
    });

    // Sort by order: first module first, then by module order
    moduleWiseSummary.sort((a, b) => {
      const aIsFirst = a.topic === firstModuleTitle;
      const bIsFirst = b.topic === firstModuleTitle;
      if (aIsFirst && !bIsFirst) return -1;
      if (!aIsFirst && bIsFirst) return 1;
      return 0;
    });

    return moduleWiseSummary;
  };

  // Function to handle navigation to course module lesson
  const handleLearnClick = async (topicName, topicIndex) => {
    if (!course?._id) {
      console.error('Course not available');
      return;
    }

    try {
      // Use modules from state, or fetch if not available
      let modulesWithContents = modules;
      
      if (!modulesWithContents || modulesWithContents.length === 0) {
        try {
          const modulesRes = await api.get(`/courses/${course._id}/modules`);
          modulesWithContents = modulesRes.data.data || [];
          
          // Fetch contents for each module if not included
          modulesWithContents = await Promise.all(
            modulesWithContents.map(async (module) => {
              if (module.contents && module.contents.length > 0) {
                return module;
              }
              try {
                const moduleRes = await api.get(`/courses/${course._id}/modules/${module._id}`);
                return moduleRes.data.data || module;
              } catch (err) {
                return module;
              }
            })
          );
        } catch (err) {
          console.error('Error fetching modules with contents:', err);
          return;
        }
      }

      // Sort modules by order
      const sortedModules = [...modulesWithContents].sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return 0;
      });

      // Determine which module to navigate to
      let targetModule = null;
      let targetModuleIndex = topicIndex;

      // Check if it's the first module (Print statement and [Language] Syntax)
      const getLanguageName = () => {
        if (course) {
          const title = course.title.toLowerCase();
          if (title.includes('python')) return 'Python';
          if (title.includes('java')) return 'Java';
          if (title.includes('c++') || title.includes('cpp') || title.includes('c plus plus')) return 'C++';
          if (title.includes('c programming') || title.includes('learn c')) return 'C';
          if (title.includes('javascript')) return 'JavaScript';
          if (title.includes('typescript')) return 'TypeScript';
          if (title.includes('go') || title.includes('golang')) return 'Go';
          if (title.includes('rust')) return 'Rust';
          if (title.includes('php')) return 'PHP';
          if (title.includes('ruby')) return 'Ruby';
          if (title.includes('swift')) return 'Swift';
          if (title.includes('kotlin')) return 'Kotlin';
          if (title.includes('scala')) return 'Scala';
        }
        return 'Programming';
      };

      const languageName = getLanguageName();
      const firstModuleTitle = `Print statement and ${languageName} Syntax`;

      // If it's the first module title, use index 0
      if (topicName === firstModuleTitle) {
        targetModuleIndex = 0;
      } else {
        // Try to find module by title match
        const matchedModule = sortedModules.find((mod, idx) => {
          // Skip first module (index 0) as it's the "Print statement..." one
          // So topicIndex 1 should map to module index 1, topicIndex 2 to module index 2, etc.
          if (idx === 0) return false; // Skip first module
          return mod.title === topicName || mod.title?.toLowerCase() === topicName?.toLowerCase();
        });

        if (matchedModule) {
          targetModule = matchedModule;
        } else {
          // Fallback: use topicIndex to map to module
          // topicIndex 0 → module 0 (first module)
          // topicIndex 1 → module 1 (second module)
          // etc.
          targetModuleIndex = topicIndex;
        }
      }

      // Get the target module
      if (!targetModule && sortedModules.length > targetModuleIndex) {
        targetModule = sortedModules[targetModuleIndex];
      }

      if (!targetModule) {
        console.error('Module not found for topic:', topicName);
        return;
      }

      // Get the first lesson/content from the module
      let firstLesson = null;
      if (targetModule.contents && Array.isArray(targetModule.contents) && targetModule.contents.length > 0) {
        // Sort contents by order if available
        const sortedContents = [...targetModule.contents].sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return 0;
        });
        firstLesson = sortedContents[0];
      }

      if (!firstLesson) {
        console.error('No lesson found in module:', targetModule.title);
        // Navigate to course catalog page if no lesson found
        navigate(`/coursecatalog/${course._id}`);
        return;
      }

      // Navigate to the lesson
      navigate(`/coursecatalog/${course._id}/problems/${firstLesson._id}?q=0`);
    } catch (error) {
      console.error('Error navigating to lesson:', error);
      // Fallback: navigate to course catalog
      if (course?._id) {
        navigate(`/coursecatalog/${course._id}`);
      }
    }
  };

  const handlePrerequisiteClick = async () => {
    setShowPrerequisiteReport(!showPrerequisiteReport);
    
    if (!showPrerequisiteReport) {
      // Fetch user's skill test attempt data when showing report
      setLoadingReport(true);
      try {
        // Check if user has attempted this skill test
        if (skill?._id) {
          try {
            // Check localStorage for all attempts
            const attemptsKey = `test_attempts_${skill._id}`;
            const savedAttemptsStr = localStorage.getItem(attemptsKey);
            const savedTestResult = localStorage.getItem(`test_result_${skill._id}`); // For backward compatibility
            const savedAnswers = localStorage.getItem(`test_answers_${skill._id}`);
            const savedTestCompleted = localStorage.getItem(`test_completed_${skill._id}`);
            
            let allAttempts = [];
            
            // Load all attempts from new format
            if (savedAttemptsStr) {
              try {
                allAttempts = JSON.parse(savedAttemptsStr);
                // Ensure it's an array
                if (!Array.isArray(allAttempts)) {
                  allAttempts = [allAttempts];
                }
                // Sort by timestamp (newest first)
                allAttempts.sort((a, b) => {
                  const dateA = new Date(a.timestamp || a.attemptedDate || 0);
                  const dateB = new Date(b.timestamp || b.attemptedDate || 0);
                  return dateB - dateA;
                });
                console.log('Loaded attempts:', allAttempts.length, allAttempts);
              } catch (e) {
                console.error('Error parsing attempts:', e);
                allAttempts = [];
              }
            }
            
            // If no attempts in new format but have old format, migrate it
            if (allAttempts.length === 0 && (savedTestResult || savedTestCompleted === 'true')) {
              if (savedTestResult) {
                try {
                  const oldResult = JSON.parse(savedTestResult);
                  allAttempts = [oldResult];
                } catch (e) {
                  console.error('Error parsing old test result:', e);
                }
              }
            }
            
            // Check if test was completed (has results saved)
            if (allAttempts.length > 0 || savedTestResult || savedTestCompleted === 'true') {
              setUserHasAttempted(true);
              
              // If we have attempts, use them
              if (allAttempts.length > 0) {
                console.log('Setting attempts:', allAttempts.length);
                setTestAttempts(allAttempts);
                setCurrentAttemptIndex(0); // Show latest attempt by default
                setTestReport(allAttempts[0]);
              } else {
                // Parse saved test result if available
                let reportData = null;
                if (savedTestResult) {
                  try {
                    reportData = JSON.parse(savedTestResult);
                    setTestAttempts([reportData]);
                    setCurrentAttemptIndex(0);
                    setTestReport(reportData);
                  } catch (e) {
                    console.error('Error parsing saved test result:', e);
                  }
                }
                
                // If no saved result, try to calculate from saved answers
                if (!reportData && savedAnswers) {
                  try {
                    const answers = JSON.parse(savedAnswers);
                    
                    // Calculate score and statistics
                    let correctCount = 0;
                    let wrongCount = 0;
                    let attemptedCount = 0;
                    
                    questions.forEach(q => {
                      const userAnswer = answers[q._id];
                      if (userAnswer) {
                        attemptedCount++;
                        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
                        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
                          correctCount++;
                        } else {
                          wrongCount++;
                        }
                      }
                    });
                    
                    const totalQuestions = questions.length;
                    const skillScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
                    const maxScore = totalQuestions * 100;
                    const score = correctCount * 100;
                    
                    // Get attempted date from localStorage or use current date
                    const savedDate = localStorage.getItem(`test_date_${skill._id}`);
                    const attemptedDate = savedDate || new Date().toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).replace(/\//g, '-');
                    
                    // Calculate module-wise summary
                    const moduleWiseSummary = calculateModuleWiseSummary(questions, answers, modules, course, skill);
                    
                    // Calculate problem type breakdown
                    const mcqQuestions = questions.filter(q => q.type === 'mcq' || !q.type);
                    const codingQuestions = questions.filter(q => q.type === 'mcq-coding' || q.type === 'content');
                    
                    let mcqCorrect = 0;
                    let codingCorrect = 0;
                    
                    mcqQuestions.forEach(q => {
                      const userAnswer = answers[q._id];
                      if (userAnswer) {
                        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
                        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
                          mcqCorrect++;
                        }
                      }
                    });
                    
                    codingQuestions.forEach(q => {
                      const userAnswer = answers[q._id];
                      if (userAnswer) {
                        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
                        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
                          codingCorrect++;
                        }
                      }
                    });
                    
                    reportData = {
                      attemptedDate: attemptedDate,
                      totalScore: score,
                      score: score,
                      maxScore: maxScore,
                      skillScore: skillScore,
                      correctAnswers: correctCount,
                      wrongAnswers: wrongCount,
                      unattempted: totalQuestions - attemptedCount,
                      topicWiseSummary: moduleWiseSummary,
                      problemType: [
                        { topic: 'MCQs', correct: mcqCorrect, total: mcqQuestions.length },
                        { topic: 'Coding problems', correct: codingCorrect, total: codingQuestions.length }
                      ],
                      timestamp: new Date().toISOString()
                    };
                    
                    setTestAttempts([reportData]);
                    setCurrentAttemptIndex(0);
                    setTestReport(reportData);
                  } catch (e) {
                    console.error('Error calculating report from answers:', e);
                  }
                }
                
                // If still no report data, create a default one
                if (!reportData) {
                  const attemptedDate = new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }).replace(/\//g, '-');
                  
                  // Calculate default module-wise summary
                  const defaultModuleWiseSummary = calculateModuleWiseSummary(questions, {}, modules, course, skill);
                  
                  reportData = {
                    attemptedDate: attemptedDate,
                    totalScore: 0,
                    score: 0,
                    maxScore: questionCount * 100 || 800,
                    skillScore: 0,
                    correctAnswers: 0,
                    wrongAnswers: questionCount || 8,
                    unattempted: 0,
                    topicWiseSummary: defaultModuleWiseSummary.length > 0 ? defaultModuleWiseSummary : [
                      {
                        topic: skill?.skillName ? skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1) : 'Printing in python',
                        correct: 0,
                        total: questionCount || 8,
                        remarks: 'Weak'
                      }
                    ],
                    problemType: [
                      { topic: 'MCQs', correct: 0, total: Math.floor((questionCount || 8) * 0.625) },
                      { topic: 'Coding problems', correct: 0, total: Math.ceil((questionCount || 8) * 0.375) }
                    ],
                    timestamp: new Date().toISOString()
                  };
                  
                  setTestAttempts([reportData]);
                  setCurrentAttemptIndex(0);
                  setTestReport(reportData);
                }
              }
            } else {
              // Check if there's an API endpoint for test attempts
              try {
                // TODO: Replace with actual API endpoint when available
                // Example: const attemptsRes = await api.get(`/skills/${skill._id}/attempts`);
                // For now, if no localStorage data, user hasn't attempted
                setUserHasAttempted(false);
              } catch (err) {
                console.error('Error checking test attempts:', err);
                setUserHasAttempted(false);
              }
            }
          } catch (err) {
            console.error('Error checking user attempts:', err);
            setUserHasAttempted(false);
          }
        } else {
          setUserHasAttempted(false);
        }
      } catch (err) {
        console.error('Error fetching report:', err);
        setUserHasAttempted(false);
      } finally {
        setLoadingReport(false);
      }
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => {
      const newAnswers = {
      ...prev,
      [questionId]: answer
      };
      // Save to localStorage
      if (skill?._id) {
        localStorage.setItem(`test_answers_${skill._id}`, JSON.stringify(newAnswers));
      }
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Update URL with new question number
      setSearchParams({ question: String(nextIndex + 1) });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      // Update URL with new question number
      setSearchParams({ question: String(prevIndex + 1) });
    }
  };

  // Update URL when currentQuestionIndex changes (only when test is started)
  useEffect(() => {
    if (testStarted && questions.length > 0) {
      const questionNum = currentQuestionIndex + 1;
      const currentParam = searchParams.get('question');
      // Only update if different to avoid unnecessary updates
      if (currentParam !== String(questionNum)) {
        setSearchParams({ question: String(questionNum) }, { replace: true });
      }
    } else if (!testStarted && searchParams.get('question')) {
      // If test is not started but URL has question param, keep it (will be restored by restore effect)
      // Don't clear it here, let the restore effect handle it
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, testStarted, questions.length]);

  const handleSaveAnswer = async () => {
    if (!currentQuestion || !currentAnswer) {
      alert('Please select an option before saving.');
      return;
    }
    
    try {
      // Save the current answer
      setSavedAnswers(prev => {
        const newSaved = {
          ...prev,
          [currentQuestion._id]: true
        };
        // Save to localStorage
        if (skill?._id) {
          localStorage.setItem(`test_saved_${skill._id}`, JSON.stringify(newSaved));
        }
        return newSaved;
      });
      console.log('Saving answer:', { questionId: currentQuestion._id, answer: currentAnswer });
      // You can add API call here to save the answer to backend
    } catch (err) {
      console.error('Error saving answer:', err);
      alert('Failed to save answer');
    }
  };

  const allQuestionsAnswered = () => {
    return questions.length > 0 && questions.every(q => savedAnswers[q._id] === true);
  };

  const handleSubmit = () => {
    // Show summary screen instead of directly submitting
    setShowSummary(true);
    showSummaryRef.current = true;
  };

  const handleBackToAssessment = () => {
    setShowSummary(false);
    setShowConfirmModal(false);
    showSummaryRef.current = false;
  };

  const handleSubmitAndFinish = () => {
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    // Clear timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    // Calculate score
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;
    
    questions.forEach(q => {
      const userAnswer = answers[q._id];
      if (userAnswer) {
        attemptedCount++;
        // Check if the selected option is correct
        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });
    
      // Save test completion status and result to localStorage
    if (skill?._id) {
      const totalQuestions = questions.length;
      const skillScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      const maxScore = totalQuestions * 100;
      const finalScore = correctCount * 100;
      
      // Get current date
      const currentDate = new Date();
      const attemptedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');
      
      // Calculate module-wise summary
      const moduleWiseSummary = calculateModuleWiseSummary(questions, answers, modules, course, skill);
      
      // Calculate problem type breakdown
      const mcqQuestions = questions.filter(q => q.type === 'mcq' || !q.type);
      const codingQuestions = questions.filter(q => q.type === 'mcq-coding' || q.type === 'content');
      
      let mcqCorrect = 0;
      let codingCorrect = 0;
      
      mcqQuestions.forEach(q => {
        const userAnswer = answers[q._id];
        if (userAnswer) {
          const selectedOption = q.options?.find(opt => opt.text === userAnswer);
          if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
            mcqCorrect++;
          }
        }
      });
      
      codingQuestions.forEach(q => {
        const userAnswer = answers[q._id];
        if (userAnswer) {
          const selectedOption = q.options?.find(opt => opt.text === userAnswer);
          if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
            codingCorrect++;
          }
        }
      });
      
      // Create new attempt result
      const newAttempt = {
        attemptedDate: attemptedDate,
        totalScore: finalScore,
        score: finalScore,
        maxScore: maxScore,
        skillScore: skillScore,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        unattempted: totalQuestions - attemptedCount,
        topicWiseSummary: moduleWiseSummary,
        problemType: [
          { topic: 'MCQs', correct: mcqCorrect, total: mcqQuestions.length },
          { topic: 'Coding problems', correct: codingCorrect, total: codingQuestions.length }
        ],
        timestamp: new Date().toISOString() // For sorting
      };
      
      // Load existing attempts
      const attemptsKey = `test_attempts_${skill._id}`;
      const existingAttemptsStr = localStorage.getItem(attemptsKey);
      let allAttempts = [];
      
      if (existingAttemptsStr) {
        try {
          allAttempts = JSON.parse(existingAttemptsStr);
          // Ensure it's an array
          if (!Array.isArray(allAttempts)) {
            allAttempts = [allAttempts];
          }
        } catch (e) {
          console.error('Error parsing existing attempts:', e);
          allAttempts = [];
        }
      }
      
      // Add new attempt to the array
      allAttempts.push(newAttempt);
      
      // Sort by timestamp (newest first) before saving
      allAttempts.sort((a, b) => {
        const dateA = new Date(a.timestamp || a.attemptedDate || 0);
        const dateB = new Date(b.timestamp || b.attemptedDate || 0);
        return dateB - dateA;
      });
      
      console.log('Saving attempts:', allAttempts.length, allAttempts);
      
      // Save all attempts
      localStorage.setItem(attemptsKey, JSON.stringify(allAttempts));
      
      // Also save for backward compatibility (latest attempt)
      localStorage.setItem(`test_result_${skill._id}`, JSON.stringify(newAttempt));
      localStorage.setItem(`test_completed_${skill._id}`, 'true');
      localStorage.setItem(`test_date_${skill._id}`, attemptedDate);
    }
    
    setScore(correctCount);
    setShowSummary(false);
    setShowConfirmModal(false);
    setShowResults(true);
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion._id] : null;

  // Calculate attempted and unattempted questions
  const attemptedCount = Object.keys(answers).filter(qId => answers[qId]).length;
  const unattemptedCount = questionCount - attemptedCount;

  // Summary Screen View (First Image)
  if (showSummary) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    return (
      <div className="bg-white min-h-screen relative">
        {/* Confirmation Modal (Second Image) */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
                </div>
            </div>
            
              {/* Modal Text */}
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
                Are you sure, You want to end the Assessment?
              </h2>
              
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmSubmit}
                  className="px-8 py-2 bg-[#2800AE] text-white rounded-md font-medium hover:bg-[#1f0088] transition-colors"
                >
                  Yes
            </button>
                <button
                  onClick={handleCancelSubmit}
                  className="px-8 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                >
                  No
                </button>
          </div>
            </div>
          </div>
        )}

        {/* Dark Purple Header Bar */}
        <div className="bg-[#2800AE] h-2"></div>
        
        {/* Dark Grey Vertical Bar (Left Side) */}
        <div className="fixed left-0 top-0 bottom-0 w-1 bg-gray-800"></div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Header with Module Title and Timer */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Module test: {skill?.skillName ? skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1) : 'Output / print in python'}
            </h1>
            
            {/* Timer Box */}
            <div className="border-2 border-blue-300 rounded-lg px-4 py-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {minutes.toString().padStart(2, '0')} Min : {seconds.toString().padStart(2, '0')} Sec
              </span>
            </div>
            </div>
            
          {/* Total Questions */}
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Total Questions: <span className="font-semibold">{questionCount}/{questionCount}</span>
            </p>
          </div>

          {/* Question Status Summary */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {/* Total Attempted */}
            <div className="border-2 border-green-300 rounded-lg p-8 text-center min-w-[200px]">
              <div className="text-5xl font-bold text-green-600 mb-2">{attemptedCount}</div>
              <div className="text-sm font-medium text-gray-700">Total Attempted</div>
            </div>

            {/* Total Unattempted */}
            <div className="border-2 border-red-300 rounded-lg p-8 text-center min-w-[200px]">
              <div className="text-5xl font-bold text-red-600 mb-2">{unattemptedCount}</div>
              <div className="text-sm font-medium text-gray-700">Total Unattempted</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleBackToAssessment}
              className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Back To Assessment
            </button>
            <button
              onClick={handleSubmitAndFinish}
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Submit and Finish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // const courses = [
  //   {
  //     title: "Learn Python Programming",
  //     rating: "4.6",
  //     reviews: "(27,384)",
  //     learners: "257.4k learners",
  //     lessons: "36 lessons",
  //     tag: "Practice",
  //     image: "/python-logo.png",
  //   },
  //   {
  //     title: "Practice Python",
  //     rating: "4.6",
  //     reviews: "(29,168)",
  //     learners: "257.4k learners",
  //     lessons: "36 lessons",
  //     tag: "Practice",
  //     image: "/python-logo.png",
  //   },
  //   {
  //     title: "Python with beginner DSA",
  //     rating: null,
  //     reviews: null,
  //     learners: "15.92k learners",
  //     lessons: null,
  //     tag: "Practice",
  //     image: "/python-logo.png",
  //   },
  // ];

  // MCQ Test View
  if (testStarted && !showResults) {
    const isCurrentQuestionSaved = currentQuestion ? savedAnswers[currentQuestion._id] === true : false;

    return (
      <div className="bg-white min-h-screen flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200  py-4">
          <div className="flex items-center  justify-between gap-3 mb-4 bg-red-200">

            <div className="flex items-center gap-3">
              {/* Left - Back Button and Navigation */}
              <div className="flex items-center gap-3">
                {/* Back Button */}
                <button
                  onClick={() => navigate('/courses/allCourses?section=skilltest')}
                  style={{
                    background: "#f3f4f6",
                    border: "none",
                    color: "#23406e",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0,
                    padding: "8px 10px",
                    borderRadius: "6px",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#e5e7eb"}
                  onMouseLeave={(e) => e.target.style.background = "#f3f4f6"}
                >
                  <svg width="18" height="18" fill="#23406e" viewBox="0 0 24 24">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                </button>
                
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`text-sm font-medium ${currentQuestionIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#2800AE]'
                }`}
              >
                  &lt; Prev Question
              </button>
              </div>

              {/* Center - Progress Indicator with Next Question */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-[0.375rem] w-[2.75rem] rounded-[0.3125rem]  flex item-center ${index === currentQuestionIndex
                        ? 'bg-[#2800AE]'
                        : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                  className={`text-sm font-medium ${currentQuestionIndex === questions.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#2800AE] '
                    }`}
                >
                  Next Question &gt;
                </button>
              </div>
            </div>

            <div>
              {/* Right - Bookmark */}
              <div className="flex items-center gap-3">
                <button className="text-blue-700 hover:text-blue-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 mt-4 w-full bg-blue-200 h-[3.125rem]">
            <div className="bg-[#1e3a8a]   flex items-center justify-center w-[10rem] ">
              <span className="text-white text-sm font-medium whitespace-nowrap">
                Statement
              </span>
            </div>
            <div className="flex items-center gap-3 -pr-4">
              {allQuestionsAnswered() ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Submit All
                </button>
              ) : (
                <div className="flex items-center px-6 gap-3">
                  <button
                    onClick={handleSaveAnswer}
                    disabled={!currentAnswer || isCurrentQuestionSaved}
                    className={` text-white w-[11rem] h-[2.25rem] justify-center p-[0.625rem] rounded-[0.3125rem]  border-[#2800AE] bg-[#2800AE] shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)] flex items-center  ${isCurrentQuestionSaved
                      ? 'bg-[#2800AE] text-[0.625rem]  cursor-default'
                      : currentAnswer && !isCurrentQuestionSaved
                        ? 'bg-[#2800AE] text-gray-700 text-[0.625rem]'
                        : 'bg-[#2800AE] text-[0.625rem] cursor-not-allowed'
                      }`}
                  >
                    {isCurrentQuestionSaved && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isCurrentQuestionSaved ? 'Saved' : 'Submit'}
                  </button>
                  {currentQuestionIndex < questions.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="w-[11rem] h-[2.25rem] flex justify-center items-center p-[0.625rem] rounded-[0.3125rem]  border-[#2800AE] bg-[#F9FAFB] shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]"
                    >
                      <span className="text-[#2800AE] font-poppins text-[0.68738rem] font-medium leading-normal">
                        Next
                      </span>

              </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Split Screen */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Problem Statement */}
          <div className="flex-1 bg-white border-r border-gray-300 flex flex-col">
            {/* Left Side Top - Total Questions and Progress */}
            <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-700">
                    Total Questions: <span className="text-[#2800AE] font-semibold">{questionCount}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="text-sm font-medium text-gray-700">
                    Question <span className="text-[#2800AE] font-semibold">{currentQuestionIndex + 1}</span> of <span className="text-[#2800AE] font-semibold">{questionCount}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="text-sm font-medium text-gray-700">
                    Progress: <span className="text-[#2800AE] font-semibold">{Math.round(((currentQuestionIndex + 1) / questionCount) * 100)}%</span>
                  </div>
                </div>
                {/* Timer Display */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#2800AE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#2800AE]">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Tab - Vertical on left edge */}
            <div className="flex">


            {/* Question Content */}
              <div className="flex-1 p-6 overflow-y-auto ">
              {currentQuestion && (
                <>
                    {/* Show question text only for MCQ and MCQ-Coding types */}
                    {(currentQuestion.type === 'mcq' || currentQuestion.type === 'mcq-coding' || !currentQuestion.type) && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentQuestion.questionText}
                  </h2>
                    )}

                    {/* Show Coding Content for MCQ-Coding type or if codingContent exists */}
                    {(currentQuestion.type === 'mcq-coding' || currentQuestion.codingContent) && currentQuestion.codingContent && (
                      <div className="bg-gray-900 rounded-lg border-2 border-gray-700 p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-400 uppercase">Code</span>
                        </div>
                        <pre className="font-mono text-sm text-gray-100 whitespace-pre-wrap overflow-x-auto">
                          <code>{currentQuestion.codingContent}</code>
                        </pre>
                      </div>
                    )}

                    {/* Show Content Items for Content type */}
                    {currentQuestion.type === 'content' && currentQuestion.content && Array.isArray(currentQuestion.content) && (
                      <div className="space-y-4 mb-6">
                        {currentQuestion.content.map((item, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg border border-gray-300 p-4">
                            {item.title && (
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                            )}
                            {item.description && (
                              <div className="text-gray-700 whitespace-pre-wrap">
                                {item.type === 'code' ? (
                                  <pre className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                                    <code>{item.description}</code>
                                  </pre>
                                ) : (
                                  <p>{item.description}</p>
                                )}
                              </div>
                            )}
                            {item.type && (
                              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {item.type}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Common Doubts Section - Only show for MCQ types */}
                    {/* {(currentQuestion.type === 'mcq' || currentQuestion.type === 'mcq-coding' || !currentQuestion.type) && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Common Doubts:</h3>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-md transition-colors">
                            How long would this take?
                          </button>
                          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-md transition-colors">
                            How long would this take?
                          </button>
                          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-md transition-colors">
                            How long would this take?
                          </button>
                        </div>
                      </div>
                    )} */}

                    {/* Legacy Code Editor Area - Show if question mentions code but no codingContent */}
                    {!currentQuestion.codingContent &&
                      !currentQuestion.type &&
                      (currentQuestion.questionText?.toLowerCase().includes('code') ||
                        currentQuestion.questionText?.toLowerCase().includes('output') ||
                        currentQuestion.questionText?.toLowerCase().includes('following')) && (
                    <div className="bg-gray-50 rounded-lg border border-gray-300 p-4 mb-6">
                      <div className="font-mono text-sm text-gray-900">
                        {(() => {
                          // Try to extract code from question text (between code blocks or after keywords)
                          const codeMatch = currentQuestion.questionText.match(/```[\s\S]*?```|`([^`]+)`|(?:code|output|following):\s*([^\n]+)/i);
                          let code = codeMatch ? (codeMatch[1] || codeMatch[2] || codeMatch[0].replace(/```/g, '').trim()) : 'print("Hello")\nprint(" World!")';
                          
                          // Syntax highlighting for Python
                          return code.split('\n').map((line, lineIdx) => {
                            const parts = [];
                            let lastIndex = 0;
                            
                            // Find all print keywords and strings
                            const printRegex = /\bprint\b/g;
                            const stringRegex = /(".*?"|'.*?')/g;
                            
                            const matches = [];
                            let match;
                            
                            // Collect print matches
                            while ((match = printRegex.exec(line)) !== null) {
                              matches.push({ type: 'print', start: match.index, end: match.index + match[0].length, text: match[0] });
                            }
                            
                            // Collect string matches
                            while ((match = stringRegex.exec(line)) !== null) {
                              matches.push({ type: 'string', start: match.index, end: match.index + match[0].length, text: match[0] });
                            }
                            
                            // Sort matches by position
                            matches.sort((a, b) => a.start - b.start);
                            
                            // Build parts array
                            matches.forEach((m, idx) => {
                              // Add text before match
                              if (m.start > lastIndex) {
                                parts.push(<span key={`text-${idx}`}>{line.substring(lastIndex, m.start)}</span>);
                              }
                              // Add highlighted match
                              parts.push(
                                <span key={`match-${idx}`} className={m.type === 'print' ? 'text-blue-400' : 'text-orange-400'}>
                                  {m.text}
                                </span>
                              );
                              lastIndex = m.end;
                            });
                            
                            // Add remaining text
                            if (lastIndex < line.length) {
                              parts.push(<span key="rest">{line.substring(lastIndex)}</span>);
                            }
                            
                            return (
                              <div key={lineIdx}>
                                {parts.length > 0 ? parts : line}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Feedback Section */}
                  <div className="mt-auto pt-6 border-t border-gray-300">
                    <div className="text-sm text-gray-600 mb-2">Did you like the problem?</div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:text-green-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        </button>
                        <button className="text-gray-500 hover:text-red-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                      </div>
                        <span className="text-xs text-gray-500">44 users found this helpful</span>
                    </div>
                  </div>
                </>
              )}
              </div>
            </div>
          </div>

          {/* Right Side - Options */}
          <div className="flex-1 flex flex-col">
            {/* Right Side Top - Difficulty */}
            <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">
                  Difficulty: <span className={`font-semibold ${
                    currentQuestion?.difficultyLevel === 'easy' 
                      ? 'text-green-600' 
                      : currentQuestion?.difficultyLevel === 'medium' 
                        ? 'text-yellow-600' 
                        : currentQuestion?.difficultyLevel === 'hard'
                          ? 'text-red-600'
                          : 'text-gray-600'
                  }`}>
                    {currentQuestion?.difficultyLevel
                      ? (currentQuestion.difficultyLevel === 'easy' ? 'Easy' : currentQuestion.difficultyLevel === 'medium' ? 'Medium' : 'Hard')
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Only show options for MCQ and MCQ-Coding types */}
              {(currentQuestion?.type === 'mcq' || currentQuestion?.type === 'mcq-coding' || (!currentQuestion?.type && currentQuestion?.options)) && (
                <>
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Select one of the following options:
              </h3>

              {currentQuestion && currentQuestion.options && currentQuestion.options.length > 0 ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                          className={`flex items-start p-4 rounded cursor-pointer transition-all border ${currentAnswer === option.text
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion._id}`}
                        value={option.text}
                        checked={currentAnswer === option.text}
                        onChange={() => handleAnswerSelect(currentQuestion._id, option.text)}
                        className="w-4 h-4 text-blue-600 mt-1 mr-4 flex-shrink-0"
                      />
                      <span className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
                        {option.text.replace(/\\n/g, '\n')}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">No options available for this question.</div>
              )}

                  {/* See Answer and View Solution Section */}
                  {/* <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">See Answer</span>
            </div>
                      <div className="flex items-center gap-2 text-blue-900 cursor-pointer hover:text-blue-700">
                        <span className="text-sm font-medium">View Solution</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
          </div>
        </div>
                  </div> */}
                </>
              )}

              {/* Show message for Content type */}
              {currentQuestion?.type === 'content' && (
                <div className="text-center py-12">
                  <p className="text-gray-600">This is a content question. Please review the content above.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Circular Progress Component
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

  // Results View - Comprehensive Report (Second Image)
  if (showResults) {
    // Calculate statistics
    const percentage = questionCount > 0 ? Math.round((score / questionCount) * 100) : 0;
    const totalPoints = score * 100; // Assuming 100 points per question
    const maxPoints = questionCount * 100;
    
    // Calculate attempted, correct, wrong, and unattempted
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;
    questions.forEach(q => {
      const userAnswer = answers[q._id];
      if (userAnswer) {
        attemptedCount++;
        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
        if (selectedOption?.isCorrect || userAnswer === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });
    const unattemptedCount = questionCount - attemptedCount;
    
    // Get current date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    
    // Calculate topic-wise summary (group by topic if available, otherwise use skill name)
    const topicSummary = [{
      name: skill?.skillName ? skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1) : "Printing in python",
      correct: correctCount,
      total: questionCount,
      remarks: percentage < 50 ? "Weak" : percentage < 70 ? "Average" : "Good",
      resourceLink: "Learn"
    }];
    
    // Calculate problem type summary
    const mcqCount = questions.filter(q => q.type === 'mcq' || !q.type).length;
    const codingCount = questions.filter(q => q.type === 'mcq-coding' || q.type === 'content').length;
    
    let mcqCorrect = 0;
    let codingCorrect = 0;
    questions.forEach(q => {
      const userAnswer = answers[q._id];
      if (userAnswer) {
        const selectedOption = q.options?.find(opt => opt.text === userAnswer);
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
    
    // User position in distribution (determine which range the user falls into)
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
    
    const maxCount = 5000; // Max count for chart scaling
    
    // Get timer display
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    return (
      <div className="bg-white min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-5">
          {/* Title Section */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-medium text-gray-900">
                Report-Module test: {skill?.skillName ? skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1) : 'Output / print in python'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">Attempted Date: {formattedDate}</p>
              <p className="text-sm text-gray-600">Total Score: {totalPoints.toString().padStart(2, '0')} Points</p>
            </div>

            {/* Right Side - Timer, Score, Skill Score, View Solutions */}
            <div className="flex items-start gap-6">
              {/* Timer */}
              <div className="border-2 border-blue-300 rounded-lg px-4 py-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {minutes.toString().padStart(2, '0')} Min : {seconds.toString().padStart(2, '0')} Sec
                </span>
              </div>
              
              {/* Score Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {totalPoints}/{maxPoints} Points
                </div>
              </div>

              {/* Skill Score */}
              <div className="text-center">
                <p className="text-sm font-medium mb-1">Skill Score</p>
                <CircularProgress percentage={percentage} />
              </div>
              
              {/* View Solutions Button */}
              <div className="flex items-end">
                <button className="bg-[#2800AE] hover:bg-[#1f0088] text-white font-medium py-2 px-6 rounded transition-colors">
                  View Solutions
                </button>
              </div>
            </div>
          </div>

          {/* Summary of Attempts */}
          <div className="mb-6 flex items-center gap-6">
            {/* Answers Attempted */}
            <div className="border-2 border-green-300 rounded-lg p-6 text-center min-w-[180px]">
              <div className="text-4xl font-bold text-green-600 mb-2">{attemptedCount.toString().padStart(2, '0')}</div>
              <div className="text-sm font-medium text-gray-700">Answers Attempted</div>
            </div>

            {/* Wrong Answers */}
            <div className="border-2 border-red-300 rounded-lg p-6 text-center min-w-[180px]">
              <div className="text-4xl font-bold text-red-600 mb-2">{wrongCount.toString().padStart(2, '0')}</div>
              <div className="text-sm font-medium text-gray-700">Wrong Answers Attempted</div>
            </div>

            {/* Total Unattempted */}
            <div className="border-2 border-gray-300 rounded-lg p-6 text-center min-w-[180px]">
              <div className="text-4xl font-bold text-gray-600 mb-2">{unattemptedCount.toString().padStart(2, '0')}</div>
              <div className="text-sm font-medium text-gray-700">Total Unattempted</div>
            </div>
          </div>

          {/* Topic Wise Summary Table */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Topic Wise Summary</h2>
            <div className="bg-blue-50 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-blue-100">
                    <th className="py-3 px-4 text-sm font-medium">Topic</th>
                    <th className="py-3 px-4 text-sm font-medium">Correct</th>
                    <th className="py-3 px-4 text-sm font-medium">Total</th>
                    <th className="py-3 px-4 text-sm font-medium">Remarks</th>
                    <th className="py-3 px-4 text-sm font-medium">Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {topicSummary.map((topic, index) => (
                    <tr key={index} className="border-t border-blue-100 bg-white">
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

          {/* Problem Type Table */}
          <div className="mb-10">
            <h2 className="text-lg font-medium mb-3">Problem type</h2>
            <div className="bg-blue-50 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-blue-100">
                    <th className="py-3 px-4 text-sm font-medium">Topic</th>
                    <th className="py-3 px-4 text-sm font-medium">Correct</th>
                    <th className="py-3 px-4 text-sm font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {problemTypes.map((type, index) => (
                    <tr key={index} className="border-t border-blue-100 bg-white">
                      <td className="py-3 px-4 text-sm">{type.name}</td>
                      <td className="py-3 px-4 text-sm">{type.correct}</td>
                      <td className="py-3 px-4 text-sm">{type.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Summary Chart */}
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
                  {distribution.map((item, index) => {
                    const height = (item.count / maxCount) * 100;
                    const isUserPosition = item.range === userPosition;
                
                return (
                      <div 
                        key={index} 
                        className="flex flex-col items-center"
                        style={{ width: '8%' }}
                      >
                        <div className="relative w-full flex flex-col items-center">
                          {/* Bar */}
                          {item.count > 0 && (
                            <div 
                              className="w-full bg-blue-700 rounded-t"
                              style={{ height: `${height}%` }}
                            ></div>
                          )}
                          
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
  }

  // Initial View
  if (loading) {
    return (
      <div className="bg-white min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading skill test...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white min-h-screen p-6">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Sidebar */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {skill?.skillName ? `${skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1)} Skill Test` : 'Python Skill Test'}
            </h1>
            <p className="text-gray-800 text-sm font-medium">
              Not confident to take the test?
              <br />
              Learn from below courses
            </p>

            <div className="flex flex-col gap-4">
              {/* Card 1 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-[280px] flex flex-col justify-start">
                {/* Image + Tag */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center justify-center rounded-lg bg-amber-100 w-8 h-8">
                    <img src={pythonlogo} alt="Python logo" className="object-contain w-5 h-5" />
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                    Practice
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 font-semibold text-gray-900 text-base">
                  Practice Python
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm text-gray-700 mt-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="font-medium text-xs">4.8</span>
                </div>

                {/* Learners + Lessons */}
                <p className="text-gray-500 text-xs mt-2">
                  98 Ratings overall
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-[280px] h-[270px] flex flex-col justify-start">
                <div className="flex justify-between items-start">
                  <div className="flex items-center justify-center rounded-lg bg-[#FEEBC8] w-12 h-12">
                    <img src={pythonlogo} alt="Python logo" className="object-contain w-8 h-8" />
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                    Practice
                  </span>
                </div>

                <h3 className="mt-3 font-semibold text-gray-900 text-lg leading-snug">
                  Python for Data Science
                </h3>
                <br />
                <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
                  <img src="/Grouppracticetest.png" alt="Beginner level" className="w-3.5 h-3.5" />
                  Beginner Level
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-700 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.7</span>
                  <span className="text-gray-500">(980)</span>
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  90k learners • 15 lessons
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow w-[280px] flex flex-col justify-start">
                <div className="flex justify-between items-start">
                  <div className="flex items-center justify-center rounded-lg bg-amber-100 w-8 h-8">
                    <img src={pythonlogo} alt="Python logo" className="object-contain w-5 h-5" />
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                    Practice
                  </span>
                </div>

                <h3 className="mt-3 font-semibold text-gray-900 text-base">
                  Practice Python
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm text-gray-700 mt-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="font-medium text-xs">4.8</span>
                </div>

                {/* Learners + Lessons */}
                <p className="text-gray-500 text-xs mt-2">
                  98 Ratings overall
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Test Syllabus
            </h1>

            {/* Syllabus Card */}
            <div className="bg-[#F9FAFB] rounded-lg shadow-sm border border-gray-200 p-6">
              <button 
                onClick={handlePrerequisiteClick}
                className="text-blue-600 text-sm hover:underline mb-4 inline-block cursor-pointer"
              >
                Pre-requisite course
              </button>

              {/* Assessment Details */}
              <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-[#90E0EF]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700 mb-2">{duration} Minutes</h3>
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-blue-600 text-xs">ⓘ</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">Total time to attempt the assessment</p>

                <h3 className="font-medium text-gray-700 mb-2">{questionCount} Questions</h3>
                <p className="text-xs text-gray-600 mb-6">MCQ questions</p>

                <div className="bg-[#90E0EF] rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-700 font-medium mb-2">
                    Read the rules carefully before starting
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• You can only attempt the assessment once</li>
                    <li>• You will not be able to pause the assessment once started</li>
                    <li>• You are not allowed to switch tabs during the assessment. Otherwise you will be disbarred from the assessment.</li>
                    <li>• You will get a detailed report on your performance at the end of the assessment.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label
                    htmlFor="agreement"
                    className="text-sm text-gray-700"
                  >
                    I agree to participate fairly in the assessment
                  </label>
                </div>

                {/* <div className="flex justify-center">
                  <button
                    className={`w-[150px] py-2 px-4 rounded-md font-semibold text-white transition-colors ${agreed
                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                      }`}
                    disabled={!agreed}
                  >
                    Start Assessment
                  </button>
                </div> */}
              </div>
              {/* Dynamic Syllabus Display - Priority: Course Syllabus > Modules > Fallback */}
              {(() => {
                console.log('Rendering syllabus section - Course:', course);
                console.log('Course syllabus:', course?.syllabus);
                console.log('Modules:', modules);
                console.log('Course syllabus check:', course?.syllabus && Array.isArray(course.syllabus) && course.syllabus.length > 0);
                return null;
              })()}
              {course?.syllabus && Array.isArray(course.syllabus) && course.syllabus.length > 0 ? (
                // First priority: Show course syllabus (works for all languages: Java, Python, C++, etc.)
                <div className="flex mt-3">
                  {(() => {
                    // Get language name dynamically
                    const getLanguageName = () => {
                      if (!course) return 'Programming';
                      const title = course.title.toLowerCase();
                      if (title.includes('python')) return 'Python';
                      if (title.includes('java')) return 'Java';
                      if (title.includes('c++') || title.includes('cpp') || title.includes('c plus plus')) return 'C++';
                      if (title.includes('c programming') || title.includes('learn c')) return 'C';
                      if (title.includes('javascript')) return 'JavaScript';
                      if (title.includes('typescript')) return 'TypeScript';
                      if (title.includes('go') || title.includes('golang')) return 'Go';
                      if (title.includes('rust')) return 'Rust';
                      if (title.includes('php')) return 'PHP';
                      if (title.includes('ruby')) return 'Ruby';
                      if (title.includes('swift')) return 'Swift';
                      if (title.includes('kotlin')) return 'Kotlin';
                      if (title.includes('scala')) return 'Scala';
                      return 'Programming';
                    };

                    const languageName = getLanguageName();
                    // Add first module: "Print statement and [Language] Syntax"
                    const firstModule = { title: `Print statement and ${languageName} Syntax`, order: -1 };
                    
                    // If modules are available, use modules from course (starting from second module)
                    if (modules.length > 0) {
                      // Sort modules by order if available
                      const sortedModules = [...modules].sort((a, b) => {
                        if (a.order !== undefined && b.order !== undefined) {
                          return a.order - b.order;
                        }
                        return 0;
                      });
                      
                      // Start from second module (skip first module, index 0)
                      const modulesFromSecond = sortedModules.slice(1);
                      
                      // Prepend first module to the beginning, then add modules from second onwards
                      const modulesWithFirst = [firstModule, ...modulesFromSecond];
                      const midPoint = Math.ceil(modulesWithFirst.length / 2);
                      
                      return (
                        <>
                          <div className="pr-8">
                            {modulesWithFirst.slice(0, midPoint).map((item, index) => (
                              <div key={item._id || index} className="flex items-center gap-2 mb-2">
                                <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                                <span className="text-sm">{item.title || item}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            {modulesWithFirst.slice(midPoint).map((item, index) => (
                              <div key={item._id || index + midPoint} className="flex items-center gap-2 mb-2">
                                <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                                <span className="text-sm">{item.title || item}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    }
                    
                    // Fallback to syllabus if modules are not available
                    // Sort syllabus by order if available
                    const sortedSyllabus = [...course.syllabus].sort((a, b) => {
                      if (a.order !== undefined && b.order !== undefined) {
                        return a.order - b.order;
                      }
                      return 0;
                    });
                    
                    // Prepend first module to the beginning
                    const syllabusWithFirstModule = [firstModule, ...sortedSyllabus];
                    const midPoint = Math.ceil(syllabusWithFirstModule.length / 2);
                    
                    return (
                      <>
                        <div className="pr-8">
                          {syllabusWithFirstModule.slice(0, midPoint).map((item, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                              <span className="text-sm">{item.title || item}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          {syllabusWithFirstModule.slice(midPoint).map((item, index) => (
                            <div key={index + midPoint} className="flex items-center gap-2 mb-2">
                              <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                              <span className="text-sm">{item.title || item}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : modules.length > 0 ? (
                // Second priority: Show modules if syllabus is not available
                <div className="flex mt-3">
                  {(() => {
                    // Get language name dynamically
                    const getLanguageName = () => {
                      if (!course) {
                        // Try to get from skillName if course is not available
                        const testName = skillName?.toLowerCase() || '';
                        if (testName.includes('python')) return 'Python';
                        if (testName.includes('java')) return 'Java';
                        if (testName.includes('c++') || testName.includes('cpp')) return 'C++';
                        if (testName.includes('c')) return 'C';
                        return 'Programming';
                      }
                      const title = course.title.toLowerCase();
                      if (title.includes('python')) return 'Python';
                      if (title.includes('java')) return 'Java';
                      if (title.includes('c++') || title.includes('cpp') || title.includes('c plus plus')) return 'C++';
                      if (title.includes('c programming') || title.includes('learn c')) return 'C';
                      if (title.includes('javascript')) return 'JavaScript';
                      if (title.includes('typescript')) return 'TypeScript';
                      if (title.includes('go') || title.includes('golang')) return 'Go';
                      if (title.includes('rust')) return 'Rust';
                      if (title.includes('php')) return 'PHP';
                      if (title.includes('ruby')) return 'Ruby';
                      if (title.includes('swift')) return 'Swift';
                      if (title.includes('kotlin')) return 'Kotlin';
                      if (title.includes('scala')) return 'Scala';
                      return 'Programming';
                    };

                    const languageName = getLanguageName();
                    // Add first module: "Print statement and [Language] Syntax"
                    const firstModule = { title: `Print statement and ${languageName} Syntax`, _id: 'first-module' };
                    
                    // Sort modules by order if available
                    const sortedModules = [...modules].sort((a, b) => {
                      if (a.order !== undefined && b.order !== undefined) {
                        return a.order - b.order;
                      }
                      return 0;
                    });
                    
                    // Start from second module (skip first module, index 0)
                    const modulesFromSecond = sortedModules.slice(1);
                    
                    // Prepend first module to the beginning, then add modules from second onwards
                    const modulesWithFirst = [firstModule, ...modulesFromSecond];
                    const midPoint = Math.ceil(modulesWithFirst.length / 2);
                    
                    return (
                      <>
                        <div className="pr-8">
                          {modulesWithFirst.slice(0, midPoint).map((module, index) => (
                            <div key={module._id || index} className="flex items-center gap-2 mb-2">
                              <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                              <span className="text-sm">{module.title}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          {modulesWithFirst.slice(midPoint).map((module, index) => (
                            <div key={module._id || index + midPoint} className="flex items-center gap-2 mb-2">
                              <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                              <span className="text-sm">{module.title}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : courseLoading ? (
                // Show loading state while fetching course data
                <div className="flex mt-3 items-center justify-center py-4">
                  <span className="text-sm text-gray-500">Loading syllabus...</span>
                </div>
              ) : (
                // Only show fallback if course is not found or has no syllabus/modules
                // Don't show hardcoded Python topics for other languages
                course ? (
                  <div className="flex mt-3 items-center justify-center py-4">
                    <span className="text-sm text-gray-500">No syllabus available for this course.</span>
                  </div>
                ) : (
                  // Only show Python fallback if no course is found and it's a Python test
                  skillName?.toLowerCase().includes('python') ? (
                    <div className="flex mt-3">
                      <div className="pr-8">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Output / Print in Python</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Strings</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Conditional statements</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Arrays</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Functions in python</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Variables and datatypes</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">User inputs</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Debugging in Python</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Loops</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <input type="checkbox" checked disabled className="w-3.5 h-3.5" />
                          <span className="text-sm">Tuples and Dictionary</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex mt-3 items-center justify-center py-4">
                      <span className="text-sm text-gray-500">No course found. Please ensure the course exists and has a syllabus.</span>
                    </div>
                  )
                )
              )}

<div className="max-w-7xl mx-auto mt-12 mb-6">
  <div className="space-y-6">
    <div>
      <h2 className="font-medium text-lg text-gray-800">
        {course ? (
          `Are you ready to prove your ${course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming'} skills? Our ${course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming'} assessment test is designed to challenge your knowledge and help you grow as a programmer. Whether you're a beginner looking to test your ${course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming'} basics or an intermediate coder aiming to sharpen your skills, our ${course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming'} quiz is the perfect tool to evaluate your expertise.`
        ) : (
          'Are you ready to prove your programming skills? Our assessment test is designed to challenge your knowledge and help you grow as a programmer. Whether you\'re a beginner looking to test your basics or an intermediate coder aiming to sharpen your skills, our quiz is the perfect tool to evaluate your expertise.'
        )}
      </h2>
    </div>

    <div>
      <h3 className="font-semibold text-gray-900 mb-2">
        Why Take Our {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} Quiz?
      </h3>
      <ul className="space-y-2 ml-6">
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Assess Your {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} Skills: Get an accurate measure of your {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} knowledge with our carefully crafted {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} MCQ and coding test.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Identify Areas for Improvement: Our {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} mock test will highlight your strengths and weaknesses in various aspects of the language.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Prepare for Interviews: Many tech companies use {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} assessment tests in their hiring process. Get ahead of the curve with our practice questions.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Enhance Your Learning: Our {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} basics quiz covers fundamental concepts, helping you solidify your understanding.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Challenge Yourself: Push your limits with our mix of easy, medium, and difficult {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} quiz questions.</span>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-gray-900 mb-2">
        Upon finishing our {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} skill test, you'll receive:
      </h3>
      <ul className="space-y-2 ml-6">
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Instant Performance Report: Get a detailed breakdown of your performance, highlighting your strengths and areas for improvement.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Personalized Learning Path: Based on your results, we'll recommend tailored courses and resources to help you level up your {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} skills.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Sharable Score Card: Show off your {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} expertise with a professional score card you can share on LinkedIn or with potential employers.</span>
        </li>
        <li className="flex items-start">
          <span className="text-gray-700 mr-2">•</span>
          <span>Comparative Analysis: See how your skills stack up against other test-takers and industry standards.</span>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-gray-900 mb-2">
        Ready to Test Your {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'Programming') : 'Programming'} Skills?
      </h3>
      <p className="text-gray-700">
        Don't wait! Take our {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} assessment test now and start your journey towards {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} mastery. Whether you're a coding newbie or a seasoned developer, our {course ? (course.title.includes('Python') ? 'Python' : course.title.includes('Java') ? 'Java' : course.title.includes('C++') ? 'C++' : course.title.includes('C Programming') || course.title.includes('Learn C') ? 'C' : 'programming') : 'programming'} quiz questions will challenge and inspire you.
      </p>
    </div>
  </div>
</div>

                <div className="flex justify-center">
                  <button
                    className={`w-[150px] py-2 px-4 rounded-md font-semibold text-white transition-colors ${agreed && questionCount > 0
                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                      }`}
                    disabled={!agreed || questionCount === 0}
                    onClick={handleStartTest}
                  >
                    Start Assessment
                  </button>
                </div>

                {/* Prerequisite Course Report */}
                {showPrerequisiteReport && userHasAttempted && testReport && (
                  <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Report-Module test: {course?.title || skill?.skillName || 'Output / print in python'}
                    </h2>
                    
                    {/* Attempt Buttons - Dynamic */}
                    {testAttempts.length > 0 && (
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {testAttempts.map((attempt, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentAttemptIndex(index);
                              setTestReport(attempt);
                            }}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                              currentAttemptIndex === index
                                ? 'bg-[#1e3a8a] text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Attempt {index + 1}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Report Header */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">
                        Attempted Date: {testReport.attemptedDate || '13-09-2025'}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Score: {String(testReport.totalScore || 0).padStart(2, '0')} Points</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {testReport.score || 0}/{testReport.maxScore || 800} Points
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="relative w-24 h-24 mx-auto mb-2">
                            <svg className="transform -rotate-90 w-24 h-24">
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#e5e7eb"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#9333ea"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - (testReport.skillScore || 0) / 100)}`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xl font-bold text-gray-900">{testReport.skillScore || 0}%</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-700">Skill Score</p>
                          <button className="mt-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-md text-sm font-medium hover:bg-[#1e2d6b]">
                            View Solutions
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Summary Legend */}
                    <div className="flex gap-6 mb-6 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-700">
                          {String(testReport.correctAnswers || 0).padStart(2, '0')}: Answers Attempted
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-sm text-gray-700">
                          {String(testReport.wrongAnswers || 0).padStart(2, '0')}: wrong Answers Attempted
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span className="text-sm text-gray-700">Total Unattempted</span>
                      </div>
                    </div>

                    {/* Topic Wise Summary */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Wise Summary</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Topic</th>
                              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">Correct</th>
                              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">Total</th>
                              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">Remarks</th>
                              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">Resourses</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testReport.topicWiseSummary?.map((topic, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{topic.topic}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700">{topic.correct}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700">{topic.total}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-red-600">{topic.remarks}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <button
                                    onClick={() => handleLearnClick(topic.topic, index)}
                                    className="text-blue-600 hover:underline text-sm cursor-pointer bg-transparent border-none p-0"
                                  >
                                    Learn
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Problem Type */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem type</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Topic</th>
                              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">Correct</th>
                              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testReport.problemType?.map((problem, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{problem.topic}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700">{problem.correct}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-700">{problem.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {showPrerequisiteReport && !userHasAttempted && (
                  <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      You haven't attempted this course yet. Please complete the course first to view your report.
                    </p>
                  </div>
                )}

                {showPrerequisiteReport && loadingReport && (
                  <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 text-center">Loading report...</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
