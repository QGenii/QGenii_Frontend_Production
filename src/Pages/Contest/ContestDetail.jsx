import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContest, participateContest, addContestReview, listContestReviews, getParticipantScore } from '../../lib/contestApi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import WishlistButton from '../../Components/WishlistButton';

export function ContestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [contest, setContest] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });
  const [savingReview, setSavingReview] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [myScore, setMyScore] = useState(null);

  const canJoin = () => {
    if (!contest) return false;
    if (contest.status !== 'ONGOING') return false;
    if (!user) return false;
    if (contest.maxParticipants && contest.participantCount >= contest.maxParticipants) return false;
    return true;
  };

  const canReview = () => contest && user && contest.status === 'ENDED';
  const isCreatorOrAdmin = () => {
    if (!contest || !user) return false;
    const isCreator = contest.creator?._id === user._id;
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
    return isCreator || isAdmin;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContest(id);
        // Handle different response structures
        const contestData = res.data?.contest || res.contest || res.data;
        if (!contestData) {
          throw new Error('Contest data not found');
        }
        setContest(contestData);
        const rres = await listContestReviews(id);
        setReviews(rres.data?.reviews || rres.reviews || []);
        
        // Load user's score if logged in and contest type is coding
        if (user && contestData?.type === 'CODING_ONLY') {
          try {
            const scoreRes = await getParticipantScore(id);
            setMyScore(scoreRes.data?.score || scoreRes.score || 0);
          } catch (e) {
            // User might not have participated yet
            console.log('No score yet');
          }
        }
      } catch (e) {
        setError(e.response?.data?.message || e.message || 'Failed to load contest');
      } finally {
        setLoading(false);
      }
    };
    load();
    // parse submission query params
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === '1') {
      setAlreadySubmitted(true);
      const sc = params.get('score');
      if (sc) setSubmittedScore(Number(sc));
    }
  }, [id, user]);

  const handleJoin = async () => {
    setJoinError(null);
    try {
      const res = await participateContest(id);
      // Optimistically update participant count
      setContest((c) => ({ ...c, participantCount: (c?.participantCount || 0) + 1 }));
      alert('Participation confirmed. Good luck!');
    } catch (e) {
      setJoinError(e.response?.data?.message || e.message);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSavingReview(true);
    try {
      await addContestReview(id, reviewForm);
      const rres = await listContestReviews(id);
      setReviews(rres.data?.reviews || rres.reviews || []);
      setReviewForm({ rating: 5, review: '' });
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    } finally {
      setSavingReview(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!contest) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="border rounded-lg p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{contest.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm ${contest.status === 'ONGOING' ? 'bg-green-100 text-green-700' : contest.status === 'UPCOMING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{contest.status}</span>
        </div>
        <p className="mt-3 text-gray-700 whitespace-pre-wrap">{contest.description}</p>
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-gray-600">
          <p><strong>Starts:</strong> {new Date(contest.startTime).toLocaleString()}</p>
          <p><strong>Ends:</strong> {new Date(contest.endTime).toLocaleString()}</p>
          <p><strong>Difficulty:</strong> {contest.difficulty}</p>
          <p><strong>Participants:</strong> {contest.participantCount}{contest.maxParticipants ? ` / ${contest.maxParticipants}` : ''}</p>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {contest.tags?.map(t => <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}
        </div>
        {joinError && <div className="text-red-600 mt-3">{joinError}</div>}
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button disabled={!canJoin()} onClick={handleJoin} className={`px-4 py-2 rounded ${canJoin() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
            Join Contest
          </button>
          {user && (
            <WishlistButton 
              type="contests" 
              itemId={contest._id} 
              size="lg" 
              className=""
            />
          )}
          {myScore !== null && (
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded font-semibold">
              Your Score: {myScore}
            </div>
          )}
          {user && contest.status === 'ONGOING' && !alreadySubmitted && (
            <>
              {contest.type === 'CODING_ONLY' ? (
                <Link to={`/contests/${contest._id}/questions`} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                  View Questions
                </Link>
              ) : (
                <Link to={`/contests/${contest._id}/attempt`} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                  Attempt Contest
                </Link>
              )}
            </>
          )}
          <Link to={`/contests/${contest._id}/leaderboard`} className="px-4 py-2 rounded border hover:bg-gray-50">
            Leaderboard
          </Link>
          {isCreatorOrAdmin() && (
            <>
              <Link to={`/manage/contests/${contest._id}/questions`} className="px-4 py-2 rounded border">Manage Questions</Link>
              <Link to="/manage/contests" className="px-4 py-2 rounded border">My Contests</Link>
            </>
          )}
        </div>
        {alreadySubmitted && (
          <div className="mt-4 p-3 rounded bg-green-50 border text-sm">
            <strong>Submission recorded.</strong> Your score: {submittedScore ?? '0'}
          </div>
        )}
      </div>

      <div className="border rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-3">Reviews ({contest.reviewCount})</h2>
        {canReview() && (
          <form onSubmit={submitReview} className="mb-4 space-y-2">
            <div className="flex items-center gap-3">
              <label className="text-sm">Rating</label>
              <select value={reviewForm.rating} onChange={(e) => setReviewForm((f) => ({ ...f, rating: Number(e.target.value) }))} className="border rounded px-2 py-1">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <textarea value={reviewForm.review} onChange={(e) => setReviewForm((f) => ({ ...f, review: e.target.value }))} className="w-full border rounded px-3 py-2" rows={3} placeholder="Share your feedback (optional)" />
            <button disabled={savingReview} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{savingReview ? 'Saving...' : 'Submit Review'}</button>
          </form>
        )}
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r._id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">{r.user?.name || 'User'}</div>
                <div className="text-xs">Rating: {r.rating}</div>
              </div>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{r.review}</p>
              {r.reply && (
                <div className="mt-2 p-2 bg-gray-50 rounded border">
                  <div className="text-xs text-gray-500">Reply</div>
                  <div className="text-sm">{r.reply}</div>
                </div>
              )}
            </div>
          ))}
          {reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default ContestDetail;
