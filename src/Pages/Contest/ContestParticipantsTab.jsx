import { useState, useEffect } from 'react';
import { listContestParticipants } from '../../lib/contestApi';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge } from '../../Components/ui/Badge';
import { Calendar, Trophy, CheckCircle, Clock } from 'lucide-react';

export default function ContestParticipantsTab({ contestId }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contestId) {
      fetchParticipants();
    }
  }, [contestId]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await listContestParticipants(contestId);
      setParticipants(response.data?.participants || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      ACTIVE: 'warning',
      SUBMITTED: 'success',
    };
    const icons = {
      ACTIVE: <Clock className="w-3 h-3 mr-1" />,
      SUBMITTED: <CheckCircle className="w-3 h-3 mr-1" />,
    };
    return (
      <Badge variant={variants[status] || 'default'} className="flex items-center">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No Participants Yet</h3>
        <p className="text-gray-500">
          No one has joined this contest yet. Share it to get participants!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center text-blue-700">
          <Trophy className="w-5 h-5 mr-2" />
          <span className="font-semibold">
            Total Participants: {participants.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participants.map((participation) => (
                <tr key={participation._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {participation.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {participation.user?.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {participation.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(participation.joinedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-700">
                      {participation.submittedAt ? (
                        <>
                          <Calendar className="w-4 h-4 mr-2 text-green-400" />
                          {formatDate(participation.submittedAt)}
                        </>
                      ) : (
                        <span className="text-gray-400">Not submitted</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(participation.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {participation.score !== null && participation.score !== undefined ? (
                        <div className="flex items-center text-sm font-semibold text-indigo-600">
                          <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                          {participation.score}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
