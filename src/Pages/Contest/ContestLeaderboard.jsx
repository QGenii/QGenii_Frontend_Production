import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContest, getContestLeaderboard } from '../../lib/contestApi';

export default function ContestLeaderboard() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const cres = await getContest(id);
        setContest(cres.data?.contest || null);
        const lres = await getContestLeaderboard(id, { limit: 20 });
        setBoard(lres.data?.leaderboard || []);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!contest) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="border rounded p-4">
        <h1 className="text-xl font-semibold">{contest.title} — Leaderboard</h1>
      </div>
      <div className="bg-white border rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Rank</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Score</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {board.map((row, idx) => (
              <tr key={row._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{row.user?.name || 'User'}</td>
                <td className="px-4 py-2 font-semibold">{row.score ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{row.submittedAt ? new Date(row.submittedAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
            {board.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan="4">No submissions yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
