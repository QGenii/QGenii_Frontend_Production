import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContest, getContestQuestions, submitContest, getParticipantScore } from '../../lib/contestApi';
import { getSubmissions } from '../../lib/codeSubmissionApi';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../../Components/ui/Spinner';

export default function ContestQuestionsList() {
  const { id: contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [myScore, setMyScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, [contestId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [contestRes, questionsRes, scoreRes] = await Promise.all([
        getContest(contestId),
        getContestQuestions(contestId),
        getParticipantScore(contestId).catch(() => ({ data: { score: 0 } })),
      ]);

      const contestData = contestRes.data?.contest || contestRes.contest;
      const questionsData = questionsRes.data?.questions || questionsRes.questions || [];
      
      setContest(contestData);
      setQuestions(questionsData);
      setMyScore(scoreRes.data?.score || scoreRes.score || 0);

      // Load submissions for each question
      const submissionsData = {};
      for (const q of questionsData.filter(q => q.type === 'CODING')) {
        try {
          const subRes = await getSubmissions(contestId, q._id, { limit: 1, page: 1 });
          const subs = subRes.data?.submissions || subRes.submissions || [];
          if (subs.length > 0) {
            submissionsData[q._id] = subs[0];
          }
        } catch (e) {
          console.log('No submissions for question:', q._id);
        }
      }
      setSubmissions(submissionsData);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load contest');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitContest = async () => {
    if (!confirm('Are you sure you want to submit the contest? This will finalize your submissions and you cannot make changes after this.')) {
      return;
    }

    setSubmitting(true);
    try {
      // For coding contests, just mark as submitted
      await submitContest(contestId, { answers: [] });
      alert(`Contest submitted successfully! Your final score: ${myScore}`);
      navigate(`/contests/${contestId}?submitted=1&score=${myScore}`);
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to submit contest');
    } finally {
      setSubmitting(false);
    }
  };

  const getQuestionStatus = (question) => {
    const sub = submissions[question._id];
    if (!sub) return { status: 'Not Attempted', color: 'gray', icon: '○' };
    
    if (sub.status === 'ACCEPTED') {
      return { status: 'Solved', color: 'green', icon: '✓' };
    } else if (sub.status === 'WRONG_ANSWER') {
      return { status: 'Attempted', color: 'yellow', icon: '◐' };
    } else {
      return { status: sub.status, color: 'red', icon: '✗' };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!contest) return null;

  const codingQuestions = questions.filter(q => q.type === 'CODING');
  const totalPoints = codingQuestions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/contests/${contestId}`)}
                className="text-blue-600 hover:underline text-sm"
              >
                ← Back to Contest
              </button>
              <div>
                <h1 className="text-xl font-bold">{contest.title}</h1>
                <p className="text-sm text-gray-600">
                  {codingQuestions.length} Questions • {totalPoints} Total Points
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{myScore}</div>
                <div className="text-xs text-gray-600">Your Score</div>
              </div>
              <button
                onClick={handleSubmitContest}
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {submitting ? 'Submitting...' : 'Submit Contest'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-4">
          {codingQuestions.map((question, index) => {
            const status = getQuestionStatus(question);
            const submission = submissions[question._id];

            return (
              <div
                key={question._id}
                className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-semibold text-gray-400">
                          {index + 1}.
                        </span>
                        <h3 className="text-lg font-semibold">{question.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded ${
                          question.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {question.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">
                          {question.points} points
                        </span>
                      </div>

                      {question.problemStatement && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {question.problemStatement.substring(0, 150)}...
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 text-sm font-medium ${
                          status.color === 'green' ? 'text-green-600' :
                          status.color === 'yellow' ? 'text-yellow-600' :
                          status.color === 'red' ? 'text-red-600' :
                          'text-gray-500'
                        }`}>
                          <span className="text-xl">{status.icon}</span>
                          <span>{status.status}</span>
                        </div>

                        {submission && (
                          <div className="text-sm text-gray-600">
                            Score: <span className="font-semibold">{submission.score}/{question.points}</span>
                          </div>
                        )}

                        {submission && submission.testResults && (
                          <div className="text-sm text-gray-600">
                            Tests: {submission.passedCount}/{submission.totalCount} passed
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate(`/contests/${contestId}/questions/${question._id}/solve`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium whitespace-nowrap"
                      >
                        {submission ? 'Solve Again' : 'Solve Problem'}
                      </button>
                      
                      {submission && (
                        <button
                          onClick={() => navigate(`/contests/${contestId}/questions/${question._id}/submissions`)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium whitespace-nowrap"
                        >
                          View Submissions
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Contest Summary
              </h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <span className="font-medium">Solved:</span>{' '}
                  {Object.values(submissions).filter(s => s.status === 'ACCEPTED').length} / {codingQuestions.length}
                </p>
                <p>
                  <span className="font-medium">Current Score:</span> {myScore} / {totalPoints}
                </p>
                <p>
                  <span className="font-medium">Attempted:</span>{' '}
                  {Object.keys(submissions).length} / {codingQuestions.length}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmitContest}
                disabled={submitting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {submitting ? 'Submitting...' : 'Submit Contest'}
              </button>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Finalize your submissions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
