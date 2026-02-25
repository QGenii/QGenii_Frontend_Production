import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContest, getContestPlayableQuestions, submitContest, participateContest } from '../../lib/contestApi';
import { Spinner } from '../../Components/ui/Spinner';
import { useAuth } from '../../hooks/useAuth';

export default function ContestAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // key: questionId
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Load contest
        const cres = await getContest(id);
        const contestData = cres.data?.contest;
        setContest(contestData);

        let qs = [];
        try {
          const qres = await getContestPlayableQuestions(id);
          qs = qres.data?.questions || qres.questions || [];
        } catch (e) {
          const msg = e.response?.data?.message || e.message;
          // Attempt auto-join if not participated yet
          if (msg.toLowerCase().includes('join contest') && contestData?.status === 'ONGOING') {
            try {
              await participateContest(id);
              const retry = await getContestPlayableQuestions(id);
              qs = retry.data?.questions || retry.questions || [];
            } catch (inner) {
              setError(inner.response?.data?.message || inner.message || 'Failed to load questions');
            }
          } else {
            setError(msg || 'Failed to load questions');
          }
        }
        
        // Check if contest has ANY coding questions - redirect to code editor
        const hasCodingQuestions = qs.some(q => q.type === 'CODING');
        if (hasCodingQuestions && contestData?.type !== 'MCQ_ONLY') {
          navigate(`/contests/${id}/code`, { replace: true });
          return;
        }
        
        setQuestions(qs);
      } catch (e) {
        setError(e.response?.data?.message || e.message || 'Failed to load contest');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const setAnswer = (qid, updater) => {
    setAnswers(prev => ({ ...prev, [qid]: { ...(prev[qid] || {}), ...updater } }));
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const payload = {
        answers: questions.map(q => {
          const a = answers[q._id] || {};
          if (q.type === 'MCQ') {
            return { questionId: q._id, type: 'MCQ', selectedIndexes: a.selectedIndexes || [] };
          } else if (q.type === 'CODING') {
            return { questionId: q._id, type: 'CODING', outputs: a.outputs || [] };
          } else {
            return { questionId: q._id, type: 'TEXT', text: a.text || '' };
          }
        })
      };
      const res = await submitContest(id, payload);
      const score = res?.data?.participation?.score ?? 0;
      navigate(`/contests/${id}?submitted=1&score=${score}`);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]"><Spinner /></div>
    );
  }
  if (error) return (
    <div className="p-6">
      <div className="text-red-600 mb-3">{error}</div>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
      >Retry</button>
      <button
        onClick={() => navigate(`/contests/${id}`)}
        className="ml-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
      >Back to Contest</button>
    </div>
  );
  if (!contest) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="border rounded p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{contest.title} — Attempt</h1>
          <span className={`px-2 py-1 rounded text-xs ${contest.status === 'ONGOING' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{contest.status}</span>
        </div>
      </div>

      <div className="space-y-5">
        {questions.length === 0 && (
          <div className="border rounded p-4 text-sm text-gray-600">No questions available yet.</div>
        )}
        {questions.map((q, idx) => (
          <div key={q._id} className="border rounded p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">Question {idx + 1} • {q.type}</div>
                <h3 className="text-lg font-semibold">{q.title}</h3>
              </div>
              <div className="text-sm text-gray-600">Points: {q.points || 1}</div>
            </div>
            {q.description && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{q.description}</p>}

            {q.type === 'MCQ' && (
              <div className="mt-3 space-y-2">
                {(q.options || []).map((opt, i) => {
                  const selected = new Set(answers[q._id]?.selectedIndexes || []);
                  const checked = selected.has(i);
                  return (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={checked}
                        onChange={(e) => {
                          const next = new Set(answers[q._id]?.selectedIndexes || []);
                          if (e.target.checked) next.add(i); else next.delete(i);
                          setAnswer(q._id, { selectedIndexes: Array.from(next) });
                        }}
                      />
                      <span>{opt.text}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {q.type === 'CODING' && (
              <div className="mt-3 space-y-3">
                <div className="p-2 bg-gray-50 rounded border">
                  <div className="text-xs text-gray-500 mb-1">Starter Code ({q.language})</div>
                  <pre className="text-sm whitespace-pre-wrap">{typeof q.starterCode === 'object' ? JSON.stringify(q.starterCode, null, 2) : (q.starterCode || '// write your function locally and paste outputs per test')}</pre>
                </div>
                <div className="space-y-2">
                  {(q.tests || []).map((t, i) => (
                    <div key={i} className="border rounded p-2">
                      <div className="text-xs text-gray-500">Test {i + 1}</div>
                      {t.input && (
                        <div className="text-xs text-gray-600">Input: <code>{t.input}</code></div>
                      )}
                      <div className="text-xs text-gray-600">Expected Output: <code>{t.hidden ? 'Hidden' : t.expectedOutput}</code></div>
                      <textarea
                        className="w-full border rounded mt-2 p-2 text-sm"
                        rows={2}
                        placeholder="Your output for this test"
                        value={(answers[q._id]?.outputs || [])[i] || ''}
                        onChange={(e) => {
                          const arr = [...(answers[q._id]?.outputs || [])];
                          arr[i] = e.target.value;
                          setAnswer(q._id, { outputs: arr });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {q.type === 'TEXT' && (
              <div className="mt-3">
                <textarea
                  className="w-full border rounded p-2"
                  rows={3}
                  placeholder="Your answer"
                  value={answers[q._id]?.text || ''}
                  onChange={(e) => setAnswer(q._id, { text: e.target.value })}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border rounded p-4 flex justify-end">
        <button 
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
          onClick={onSubmit}
        >
          {submitting ? 'Submitting...' : 'Submit Contest'}
        </button>
      </div>
    </div>
  );
}
