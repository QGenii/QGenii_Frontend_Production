import React from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import ProblemsNavbar from "./ProblemsNavbar";
// import MainNavbar from "../../../MainNavbar";
// import UpperNavbar from "../../../upperNavbar";

const TopProblemNav = ({
  difficulty = 173,
  questions = [],
  currentQuestionIndex = 0,
  totalSteps,
  textSectionCount = 0,
  isOnQuestion = false, // Whether currently viewing a question
  onSubmit = null, // Submit handler for MCQ
  onSubmitDisabled = false, // Whether submit is disabled
  onSubmitAll = null, // Submit all handler for module tests
  showSubmitAll = false, // Whether to show "Submit All" button
  isModuleTest = false, // Whether this is a module test
  // forwarded from ProblemView to allow ProblemsNavbar to control tabs
  activeTab,
  setActiveTab,
  contentId,
  nextContentInModule = null, // Next content in same module
  prevContentInModule = null, // Previous content in same module
  nextModule = null, // Next module object
  prevModule = null, // Previous module object
  isLastQuestion = false, // Whether on last question
  isFirstQuestion = false, // Whether on first question
  isFirstChapter = false, // Whether on first chapter (first content in first module)
  isLastChapter = false, // Whether on last chapter (last content in last module)
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();

  // Treat currentQuestionIndex as the current *step* index (text sections + questions).
  // If totalSteps is not provided, fall back to number of questions.
  const effectiveTotalSteps = typeof totalSteps === "number" && totalSteps > 0
    ? totalSteps
    : questions.length;

  const currentStepIndex = Number.isFinite(currentQuestionIndex)
    ? currentQuestionIndex
    : 0;
  const prevStepIndex = currentStepIndex > 0 ? currentStepIndex - 1 : null;
  const nextStepIndex =
    effectiveTotalSteps > 0 &&
      currentStepIndex >= 0 &&
      currentStepIndex < effectiveTotalSteps - 1
      ? currentStepIndex + 1
      : null;

  // For the progress bar, show segments for both text sections and questions.
  const totalQuestions = questions.length;
  const questionStartIndex = textSectionCount || 0;
  const activeQuestionIndex =
    currentStepIndex >= questionStartIndex
      ? currentStepIndex - questionStartIndex
      : -1;

  const handlePrev = () => {
    // If on first chapter's first question, disable navigation
    if (isFirstChapter && isFirstQuestion) {
      console.log('On first chapter first question - navigation disabled');
      return;
    }

    // If on second chapter's first question (or later), navigate to previous chapter
    if (isFirstQuestion && prevContentInModule) {
      console.log('Navigating to previous chapter:', prevContentInModule.title);
      // Navigate to the previous content in the same module (go to last question of that content)
      // Find the last question index for the previous content
      const prevContentType = prevContentInModule.type;
      let lastQuestionIndex = 0;
      if (prevContentType === 'question' || prevContentType === 'quiz') {
        const prevQuestions = prevContentInModule.questions || [];
        if (prevQuestions.length > 0) {
          // Calculate total steps (text sections + questions)
          const prevTextSections = prevContentInModule.textSections || [];
          const prevTotalSteps = prevTextSections.length + prevQuestions.length;
          lastQuestionIndex = prevTotalSteps > 0 ? prevTotalSteps - 1 : 0;
        }
      }
      navigate(`/coursecatalog/${contentId}/problems/${prevContentInModule._id}?q=${lastQuestionIndex}`, {
        state: { lesson: prevContentInModule }
      });
      return;
    }

    // If no previous content in module, check for previous module
    if (isFirstQuestion && prevModule && Array.isArray(prevModule.contents) && prevModule.contents.length > 0) {
      const lastContent = prevModule.contents[prevModule.contents.length - 1];
      console.log('Navigating to previous module:', prevModule.title || 'Previous Module');
      console.log('Last content in previous module:', lastContent);
      // Find the last question index for the last content
      const lastContentType = lastContent.type;
      let lastQuestionIndex = 0;
      if (lastContentType === 'question' || lastContentType === 'quiz') {
        const lastQuestions = lastContent.questions || [];
        if (lastQuestions.length > 0) {
          const lastTextSections = lastContent.textSections || [];
          const lastTotalSteps = lastTextSections.length + lastQuestions.length;
          lastQuestionIndex = lastTotalSteps > 0 ? lastTotalSteps - 1 : 0;
        }
      }
      // Navigate to the last content of the previous module with lesson state
      navigate(`/coursecatalog/${contentId}/problems/${lastContent._id}?q=${lastQuestionIndex}`, {
        state: { lesson: lastContent }
      });
      return;
    }
    
    // Otherwise, navigate to previous question
    if (prevStepIndex !== null && prevStepIndex >= 0) {
      console.log('Prev clicked, navigating to step index:', prevStepIndex);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', prevStepIndex.toString());
      setSearchParams(newParams, { replace: false });
    } else {
      console.log('Prev disabled - prevStepIndex:', prevStepIndex, 'currentIndex:', currentStepIndex);
    }
  };

  const handleNext = () => {
    console.log('handleNext called:', {
      isLastQuestion,
      isFirstChapter,
      isLastChapter,
      hasNextContentInModule: !!nextContentInModule,
      nextContentTitle: nextContentInModule?.title,
      hasNextModule: !!nextModule,
      nextModuleTitle: nextModule?.title,
      nextStepIndex,
      effectiveTotalSteps,
      currentStepIndex
    });

    // If on last question, check navigation based on chapter position
    if (isLastQuestion) {
      // If on first chapter's last question, navigate to next chapter (next content in same module)
      if (isFirstChapter && nextContentInModule) {
        console.log('Navigating to next chapter:', nextContentInModule.title);
        navigate(`/coursecatalog/${contentId}/problems/${nextContentInModule._id}?q=0`, {
          state: { lesson: nextContentInModule }
        });
        return;
      }

      // If on last chapter's last question, navigate to next module
      if (isLastChapter && nextModule && Array.isArray(nextModule.contents) && nextModule.contents.length > 0) {
        const firstContent = nextModule.contents[0];
        console.log('Navigating to next module:', nextModule.title || 'Next Module');
        console.log('First content in next module:', firstContent);
        navigate(`/coursecatalog/${contentId}/problems/${firstContent._id}?q=0`, {
          state: { lesson: firstContent }
        });
        return;
      }

      // If on middle chapter's last question, navigate to next chapter
      if (nextContentInModule) {
        console.log('Navigating to next chapter:', nextContentInModule.title);
        navigate(`/coursecatalog/${contentId}/problems/${nextContentInModule._id}?q=0`, {
          state: { lesson: nextContentInModule }
        });
        return;
      }

      // If no next content in module, check for next module
      if (nextModule && Array.isArray(nextModule.contents) && nextModule.contents.length > 0) {
        const firstContent = nextModule.contents[0];
        console.log('Navigating to next module:', nextModule.title || 'Next Module');
        navigate(`/coursecatalog/${contentId}/problems/${firstContent._id}?q=0`, {
          state: { lesson: firstContent }
        });
        return;
      }
    }
    
    // Otherwise, navigate to next question
    if (nextStepIndex !== null && nextStepIndex < effectiveTotalSteps) {
      console.log('Next clicked, navigating to step index:', nextStepIndex);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', nextStepIndex.toString());
      setSearchParams(newParams, { replace: false });
    } else {
      console.log('Next disabled - nextStepIndex:', nextStepIndex, 'totalSteps:', effectiveTotalSteps, 'currentIndex:', currentStepIndex);
    }
  };

  const handleSubmit = () => {
    if (onSubmit && !onSubmitDisabled) {
      onSubmit();
    }
  };

  return (
    <div>
      {/* <MainNavbar /> */}
      {/* <UpperNavbar /> */}
      {/* Conditional rendering: Show Statement/Submit/Next UI for questions, default UI for text content */}
      {isOnQuestion ? (
        <>
          <div style={{
            width: "100%",
            background: "#fff",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            minHeight: 48
          }}>
            {/* Left: Back button, Prev/Next step (text sections + questions) */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Back Button */}
              <button
                onClick={() => navigate(`/coursecatalog/${contentId}`)}
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
                onClick={handlePrev}
                disabled={isFirstChapter && isFirstQuestion}
                style={{
                  background: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "#002856" : "none",
                  border: "none",
                  color: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "#fff" : "#23406e",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: (isFirstChapter && isFirstQuestion) ? "not-allowed" : ((prevStepIndex !== null || (isFirstQuestion && (prevContentInModule || prevModule))) ? "pointer" : "not-allowed"),
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "6px 12px" : 0,
                  borderRadius: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "4px" : 0,
                  opacity: (isFirstChapter && isFirstQuestion) ? 0.4 : ((prevStepIndex !== null || (isFirstQuestion && (prevContentInModule || prevModule))) ? 1 : 0.4)
                }}
              >

                <svg width="18" height="18" fill={isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "#fff" : "#23406e"} viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>

                {isFirstChapter && isFirstQuestion ? "Prev Question" : (isFirstQuestion && (prevContentInModule || prevModule) ? "Prev Chapter" : "Prev Question")}
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 20px",
                }}
              >
                {effectiveTotalSteps > 0 ? (
                  Array.from({ length: effectiveTotalSteps }, (_, index) => {
                    const isActive = currentStepIndex === index;
                    const isLast = index === effectiveTotalSteps - 1;
                    return (
                      <div
                        key={`step-${index}`}
                        style={{
                          height: "4px",
                          width: isLast ? "50px" : "40px",
                          backgroundColor: isActive ? "#002856" : "#e0e0e0",
                          borderRadius: "2px",
                          margin: "0 2px",
                        }}
                      />
                    );
                  })
                ) : (
                  <div style={{ fontSize: 12, color: "#666" }}>No steps</div>
                )}
              </div>
              <button
                onClick={handleNext}
                disabled={(isLastQuestion && isModuleTest) || (nextStepIndex === null && (!isLastQuestion || (!nextContentInModule && !nextModule)))}
                style={{
                  background: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "#002856" : "none",
                  border: "none",
                  color: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "#fff" : "#23406e",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: (isLastQuestion && isModuleTest) ? "not-allowed" : ((nextStepIndex !== null || (isLastQuestion && (nextContentInModule || nextModule))) ? "pointer" : "not-allowed"),
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "6px 12px" : 0,
                  borderRadius: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "4px" : 0,
                  opacity: (isLastQuestion && isModuleTest) ? 0.4 : ((nextStepIndex !== null || (isLastQuestion && (nextContentInModule || nextModule))) ? 1 : 0.4)
                }}
              >
                {isLastQuestion && isFirstChapter && nextContentInModule && !isModuleTest ? "Next Chapter" : 
                 isLastQuestion && isLastChapter && nextModule && !isModuleTest ? "Next Module" :
                 isLastQuestion && nextContentInModule && !isModuleTest ? "Next Chapter" :
                 isLastQuestion && nextModule && !isModuleTest ? "Next Module" : "Next Question"}
                <svg width="18" height="18" fill={isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "#fff" : "#23406e"} viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
              </button>
            </div>
            {/* Right: Difficulty and Bookmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#23406e",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <svg width="18" height="18" fill="#23406e" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
              </button>
              <span style={{ color: "#23406e", fontWeight: 500, fontSize: 15 }}>
                Difficulty: <span style={{ fontWeight: 700 }}>{difficulty}</span>
              </span>
              <div style={{ width: 1, height: 28, background: "#e0e0e0", margin: "0 8px" }} />
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#23406e",
                  cursor: "pointer",
                  padding: 0
                }}
              >
                <svg width="22" height="22" fill="#23406e" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              </button>
            </div>
          </div>
          <div style={{
            width: "100%",
            background: "#e3f2fd", // Light blue background
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
            minHeight: 48
          }}>
            {/* Left: Statement label */}
            <div style={{
              background: "#23406e", // Dark blue background
              color: "#fff",
              padding: "12px 32px",
              fontWeight: 500,
              fontSize: 15,
              minHeight: 48,
              display: "flex",
              alignItems: "center"
            }}>
              Statement
            </div>

            {/* Right: Submit and Next buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 32px" }}>
              {showSubmitAll && onSubmitAll ? (
                <button
                  onClick={onSubmitAll}
                  style={{
                    background: "#7b2cbf", // Dark purple
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "opacity 0.2s"
                  }}
                >
                  Submit All
                </button>
              ) : (
              <button
                onClick={handleSubmit}
                disabled={onSubmitDisabled}
                style={{
                  background: onSubmitDisabled ? "#ccc" : "#7b2cbf", // Dark purple
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 24px",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: onSubmitDisabled ? "not-allowed" : "pointer",
                  opacity: onSubmitDisabled ? 0.6 : 1,
                  transition: "opacity 0.2s"
                }}
              >
                Submit
              </button>
              )}
              {/* Hide "Next Module" button next to Submit All only on last question of module tests */}
              {!(isLastQuestion && isModuleTest) && (
              <button
                onClick={handleNext}
                  disabled={nextStepIndex === null && (!isLastQuestion || (!nextContentInModule && !nextModule))}
                style={{
                    background: isLastQuestion && (nextContentInModule || nextModule) ? "#002856" : "#fff",
                    color: isLastQuestion && (nextContentInModule || nextModule) ? "#fff" : "#7b2cbf", // Dark purple text
                    border: isLastQuestion && (nextContentInModule || nextModule) ? "1px solid #002856" : "1px solid #7b2cbf",
                  borderRadius: "6px",
                  padding: "10px 24px",
                  fontWeight: 500,
                  fontSize: 15,
                    cursor: (nextStepIndex !== null || (isLastQuestion && (nextContentInModule || nextModule))) ? "pointer" : "not-allowed",
                    opacity: (nextStepIndex !== null || (isLastQuestion && (nextContentInModule || nextModule))) ? 1 : 0.6,
                  transition: "opacity 0.2s"
                }}
              >
                  {isLastQuestion && isFirstChapter && nextContentInModule ? "Next Chapter" : 
                   isLastQuestion && isLastChapter && nextModule ? "Next Module" :
                   isLastQuestion && nextContentInModule ? "Next Chapter" :
                   isLastQuestion && nextModule ? "Next Module" : "Next"}
              </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div style={{
          width: "100%",
          background: "#fff",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          minHeight: 48
        }}>
          {/* Left: Back button, Prev/Next step (text sections + questions) */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Back Button */}
            <button
              onClick={() => navigate(`/coursecatalog/${contentId}`)}
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
              onClick={handlePrev}
              disabled={isFirstChapter && isFirstQuestion}
              style={{
                background: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "#002856" : "none",
                border: "none",
                color: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "#fff" : "#23406e",
                fontWeight: 500,
                fontSize: 15,
                cursor: (isFirstChapter && isFirstQuestion) ? "not-allowed" : ((prevStepIndex !== null || (isFirstQuestion && (prevContentInModule || prevModule))) ? "pointer" : "not-allowed"),
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "6px 12px" : 0,
                borderRadius: isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "4px" : 0,
                opacity: (isFirstChapter && isFirstQuestion) ? 0.4 : ((prevStepIndex !== null || (isFirstQuestion && (prevContentInModule || prevModule))) ? 1 : 0.4)
              }}
            >

              <svg width="18" height="18" fill={isFirstQuestion && (prevContentInModule || prevModule) && !(isFirstChapter && isFirstQuestion) ? "#fff" : "#23406e"} viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>

              {isFirstChapter && isFirstQuestion ? "Prev Question" : (isFirstQuestion && (prevContentInModule || prevModule) ? "Prev Chapter" : "Prev Question")}
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 20px",
              }}
            >
              {effectiveTotalSteps > 0 ? (
                Array.from({ length: effectiveTotalSteps }, (_, index) => {
                  const isActive = currentStepIndex === index;
                  const isLast = index === effectiveTotalSteps - 1;
                  return (
                    <div
                      key={`step-${index}`}
                      style={{
                        height: "4px",
                        width: isLast ? "50px" : "40px",
                        backgroundColor: isActive ? "#002856" : "#e0e0e0",
                        borderRadius: "2px",
                        margin: "0 2px",
                      }}
                    />
                  );
                })
              ) : (
                <div style={{ fontSize: 12, color: "#666" }}>No steps</div>
              )}
            </div>
            <button
              onClick={handleNext}
              disabled={(isLastQuestion && isModuleTest) || (nextStepIndex === null && (!isLastQuestion || (!nextContentInModule && !nextModule)))}
              style={{
                background: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "#002856" : "none",
                border: "none",
                color: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "#fff" : "#23406e",
                fontWeight: 500,
                fontSize: 15,
                cursor: (isLastQuestion && isModuleTest) ? "not-allowed" : ((nextStepIndex !== null || (isLastQuestion && (nextContentInModule || nextModule))) ? "pointer" : "not-allowed"),
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "6px 12px" : 0,
                borderRadius: isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "4px" : 0,
                opacity: (isLastQuestion && isModuleTest) ? 0.4 : ((nextStepIndex !== null || (isLastQuestion && (nextContentInModule || nextModule))) ? 1 : 0.4)
              }}
            >
              {isLastQuestion && isFirstChapter && nextContentInModule && !isModuleTest ? "Next Chapter" : 
               isLastQuestion && isLastChapter && nextModule && !isModuleTest ? "Next Module" :
               isLastQuestion && nextContentInModule && !isModuleTest ? "Next Chapter" :
               isLastQuestion && nextModule && !isModuleTest ? "Next Module" : "Next Question"}
              <svg width="18" height="18" fill={isLastQuestion && (nextContentInModule || nextModule) && !isModuleTest ? "#fff" : "#23406e"} viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
            </button>
          </div>
          {/* Right: Difficulty and Bookmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#23406e",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <svg width="18" height="18" fill="#23406e" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
            </button>
            <span style={{ color: "#23406e", fontWeight: 500, fontSize: 15 }}>
              Difficulty: <span style={{ fontWeight: 700 }}>{difficulty}</span>
            </span>
            <div style={{ width: 1, height: 28, background: "#e0e0e0", margin: "0 8px" }} />
            <button
              style={{
                background: "none",
                border: "none",
                color: "#23406e",
                cursor: "pointer",
                padding: 0
              }}
            >
              <svg width="22" height="22" fill="#23406e" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            </button>
          </div>
        </div>)
      }

      {/* Problems tab navbar (Statement / Submissions / Solutions / AI Help) */}
      {!isOnQuestion && (
        <ProblemsNavbar
          contentId={contentId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )



}


export default TopProblemNav;