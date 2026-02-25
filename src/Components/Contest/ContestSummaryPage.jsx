import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../lib/api';
import { submitContest } from '../../lib/contestApi';
import toast from 'react-hot-toast';

const ContestSummaryPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const autoConfirm = state?.autoConfirm;
  const [loading, setLoading] = useState(true);
  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [codingState, setCodingState] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // If navigated from assessment with autoConfirm flag, open confirmation popup immediately
  useEffect(() => {
    if (autoConfirm) {
      setShowConfirmPopup(true);
    }
  }, [autoConfirm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          const durationMs = parseInt(contestData.duration) * 60 * 1000;
          if (contestData?.startTime) {
            const startTime = new Date(contestData.startTime);
            const endTime = new Date(startTime.getTime() + durationMs);
            const now = new Date();
            const remaining = Math.max(0, endTime - now);
            setTimeRemaining(remaining);
          } else {
            setTimeRemaining(durationMs);
          }
        }

        // Fetch questions
        const questionsRes = await api.get(`/contests/${contestId}/playable-questions`);
        const fetchedQuestions = questionsRes.data?.questions || questionsRes.data?.data?.questions || [];
        setQuestions(fetchedQuestions);

        // Load saved state from localStorage or calculate from questions
        const savedState = localStorage.getItem(`contest_${contestId}_state`);
        if (savedState) {
          const parsed = JSON.parse(savedState);
          setSubmittedQuestions(parsed.submittedQuestions || {});
          setSelectedOptions(parsed.selectedOptions || {});
          setCodingState(parsed.codingState || {});
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load contest data");
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

  const getQuestionId = (q, fallbackIdx) => q?.id || q?._id || String(fallbackIdx ?? 0);

  // Calculate attempted and unattempted
  const attemptedCount = questions.filter((q, idx) => {
    const qid = getQuestionId(q, idx);
    const qType = (q.type || "").toLowerCase();
    
    if (qType === "coding") {
      const codingStateForQ = codingState[qid] || {};
      return !!codingStateForQ.submitResult || submittedQuestions[qid] === true;
    } else if (qType === "mcq" || qType === "coding_mcq") {
      return submittedQuestions[qid] === true;
    }
    return submittedQuestions[qid] === true;
  }).length;

  const unattemptedCount = questions.length - attemptedCount;

  const handleSubmitAndFinish = async () => {
    setSubmitting(true);
    try {
      // Collect all answers
      const answers = questions.map((q, idx) => {
        const qid = getQuestionId(q, idx);
        const qType = (q.type || "").toLowerCase();
        
        if (qType === "coding") {
          const codingStateForQ = codingState[qid] || {};
          return {
            questionId: qid,
            type: "coding",
            language: codingStateForQ.language,
            code: codingStateForQ.code,
            submissionId: codingStateForQ.submitResult?.submissionId || null,
          };
        } else if (qType === "mcq" || qType === "coding_mcq") {
          return {
            questionId: qid,
            type: qType,
            selectedOption: selectedOptions[qid],
          };
        }
        return {
          questionId: qid,
          type: qType,
        };
      });

      const result = await submitContest(contestId, { answers });
      toast.success("Contest submitted successfully!");
      
      // Navigate to results page
      navigate(`/contest/ongoing/${contestId}/results`);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Failed to submit contest";
      toast.error(msg);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{contest?.name || 'Contest'}</h1>
              <p className="text-sm text-gray-600 mt-1">Total Questions: {questions.length}/{questions.length}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-blue-300 rounded-lg bg-blue-50">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-blue-700 font-medium">{formatTimeRemaining(timeRemaining)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Total Attempted */}
          <div className="bg-white border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">{attemptedCount}</div>
            <div className="text-gray-700 font-medium">Total Attempted</div>
          </div>

          {/* Total Unattempted */}
          <div className="bg-white border-2 border-red-500 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-red-600 mb-2">{unattemptedCount}</div>
            <div className="text-gray-700 font-medium">Total Unattempted</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(`/contest/ongoing/${contestId}/assessment?q=0`)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back To Assessment
          </button>
          <button
            onClick={() => setShowConfirmPopup(true)}
            disabled={submitting}
            className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit and Finish'}
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex flex-col items-center">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Message */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Are you sure, You want to end the Assessment?
              </h3>

              {/* Buttons */}
              <div className="flex items-center gap-4 w-full">
                <button
                  onClick={handleSubmitAndFinish}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Yes'}
                </button>
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContestSummaryPage;

