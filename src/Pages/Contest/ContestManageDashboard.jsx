import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { listContests, deleteContest } from '../../lib/contestApi';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge } from '../../Components/ui/Badge';
import { Button } from '../../Components/ui/Button';
import ContestParticipantsTab from './ContestParticipantsTab';
import ContestReviewsTab from './ContestReviewsTab';
import { 
  Trophy, 
  Users, 
  MessageCircle, 
  FileText, 
  Trash2, 
  Eye, 
  Edit,
  Plus,
  Calendar,
  Target
} from 'lucide-react';

export default function ContestManageDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialContestId = state?.contestId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        // Fetch all and filter by creator on client for now
        const res = await listContests({});
        const all = res.data || [];
        const own = all.filter(c => c.creator?._id === user?._id);

        // Sort contests: ONGOING first, then UPCOMING, then ENDED
        const statusOrder = { ONGOING: 0, UPCOMING: 1, ENDED: 2 };
        const sorted = [...own].sort((a, b) => {
          const aStatus = statusOrder[a.status] ?? 99;
          const bStatus = statusOrder[b.status] ?? 99;
          if (aStatus !== bStatus) return aStatus - bStatus;
          const aTime = a.startTime ? new Date(a.startTime).getTime() : 0;
          const bTime = b.startTime ? new Date(b.startTime).getTime() : 0;
          return aTime - bTime;
        });

        setContests(sorted);
        if (sorted.length > 0 && !selectedContest) {
          const fromState = initialContestId
            ? sorted.find(c => c._id === initialContestId)
            : null;
          const first = fromState || sorted[0];
          setSelectedContest(first);
          setActiveTab('overview');
        }
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally { setLoading(false); }
    };
    load();
  }, [user?._id, initialContestId]);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this contest?')) return;
    try {
      await deleteContest(id);
      const remainingContests = contests.filter(c => c._id !== id);
      setContests(remainingContests);
      if (selectedContest?._id === id) {
        setSelectedContest(remainingContests[0] || null);
        setActiveTab('overview');
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      UPCOMING: 'info',
      ONGOING: 'success',
      ENDED: 'default',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
    { id: 'questions', label: 'Questions', icon: FileText },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-indigo-600" />
          Manage My Contests
        </h1>
        <Button onClick={() => navigate('/contests/create')} className="flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          New Contest
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          {error}
        </div>
      )}

      {contests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Contests Yet</h2>
          <p className="text-gray-500 mb-4">You haven't created any contests yet.</p>
          <Button onClick={() => navigate('/contests/create')} className="flex items-center mx-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Contest
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contest List Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Contests</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {contests.map((contest) => (
                <div
                  key={contest._id}
                  onClick={() => {
                    setSelectedContest(contest);
                    setActiveTab('overview');
                  }}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedContest?._id === contest._id
                      ? 'bg-indigo-50 border-indigo-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1 truncate">
                    {contest.title}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(contest.status)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(contest.startTime)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contest Details Panel */}
          <div className="lg:col-span-3">
            {selectedContest ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Contest Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedContest.title}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        {getStatusBadge(selectedContest.status)}
                        <Badge variant="outline">{selectedContest.difficulty}</Badge>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(selectedContest.startTime)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/contests/${selectedContest._id}`)}
                        className="flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(selectedContest._id)}
                        className="flex items-center text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="flex gap-1 border-b border-gray-200">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors relative ${
                            activeTab === tab.id
                              ? 'text-indigo-600 border-b-2 border-indigo-600'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedContest.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Start Time</span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {formatDate(selectedContest.startTime)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">End Time</span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {formatDate(selectedContest.endTime)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Users className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Capacity</span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {selectedContest.maxParticipants || 'Unlimited'}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Target className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Difficulty</span>
                          </div>
                          <p className="text-gray-900 font-semibold capitalize">
                            {selectedContest.difficulty}
                          </p>
                        </div>
                      </div>

                      {selectedContest.tags && selectedContest.tags.length > 0 && (
                        <div className="pt-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedContest.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'participants' && (
                    <ContestParticipantsTab contestId={selectedContest._id} />
                  )}

                  {activeTab === 'reviews' && (
                    <ContestReviewsTab contestId={selectedContest._id} />
                  )}

                  {activeTab === 'questions' && (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Manage Contest Questions
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Add, edit, and organize questions for this contest.
                      </p>
                      <Button
                        onClick={() => navigate(`/manage/contests/${selectedContest._id}/questions`)}
                        className="flex items-center mx-auto"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Open Question Manager
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
                <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Select a contest to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
