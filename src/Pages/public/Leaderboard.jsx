import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { Trophy, Medal, Award, TrendingUp, Search, RefreshCw, Info, Users } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Tier colors
const TIER_CONFIG = {
  bronze: { color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-400', label: 'Bronze' },
  silver: { color: 'text-gray-500', bgColor: 'bg-gray-50', borderColor: 'border-gray-400', label: 'Silver' },
  gold: { color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-400', label: 'Gold' },
  platinum: { color: 'text-cyan-500', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-400', label: 'Platinum' },
  diamond: { color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-400', label: 'Diamond' },
  legendary: { color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-400', label: 'Legendary' },
  mythic: { color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-400', label: 'Mythic' },
};

// Rank medal component
const RankMedal = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span className="font-bold text-yellow-500 text-lg">#{rank}</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center gap-1">
        <Medal className="w-6 h-6 text-gray-400" />
        <span className="font-bold text-gray-400 text-lg">#{rank}</span>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center gap-1">
        <Award className="w-6 h-6 text-orange-600" />
        <span className="font-bold text-orange-600 text-lg">#{rank}</span>
      </div>
    );
  }
  return <span className="font-bold text-gray-600">#{rank}</span>;
};

// Tier badge component
const TierBadge = ({ tier, level }) => {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.bronze;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border-2 ${config.bgColor} ${config.color} ${config.borderColor}`}>
      {config.label} {level}
    </span>
  );
};

// User rank card
const UserRankCard = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6 text-center">
        <div className="text-white">Loading your stats...</div>
      </div>
    );
  }

  if (!stats) return null;

  const config = TIER_CONFIG[stats.currentTier] || TIER_CONFIG.bronze;
  const totalXP = stats.totalXP || 0;
  const xpToNextLevel = stats.xpToNextLevel || 1;
  const currentLevelXP = stats.currentLevelXP || 0;
  const xpProgress = xpToNextLevel > 0 
    ? (currentLevelXP / xpToNextLevel) * 100 
    : 100;

  return (
    <div className={`rounded-lg border-2 ${config.borderColor} ${config.bgColor} p-6 mb-6`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="text-center">
          <img
            src={stats.user?.profileImage || '/default-avatar.png'}
            alt={stats.user?.name}
            className={`w-20 h-20 rounded-full mx-auto mb-2 border-4 ${config.borderColor}`}
          />
          <div className="font-bold text-lg">{stats.user?.name}</div>
          <TierBadge tier={stats.currentTier} level={stats.currentLevel} />
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Global Rank</div>
          <div className="text-3xl font-bold">#{stats.globalRank || 'N/A'}</div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Role Rank</div>
          <div className="text-3xl font-bold">#{stats.roleRank || 'N/A'}</div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Total XP</div>
          <div className="text-3xl font-bold">{totalXP.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Level {stats.currentLevel || 1} → {(stats.currentLevel || 1) + 1}</span>
          <span>{xpToNextLevel.toLocaleString()} XP needed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full bg-gradient-to-r ${config.color === 'text-blue-500' ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'}`}
            style={{ width: `${Math.min(xpProgress, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [leaderboard, setLeaderboard] = useState([]);
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('global'); // 'global' or 'friends'

  // Filters
  const [timeframe, setTimeframe] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 50;

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        timeframe,
        limit,
        page,
      };

      if (roleFilter !== 'all') params.role = roleFilter;
      if (tierFilter !== 'all') params.tier = tierFilter;

      const response = await axios.get(`${API_BASE}/leaderboard`, { params });

      setLeaderboard(response.data.data.leaderboard);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.response?.data?.message || 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user stats (if logged in)
  const fetchUserStats = async () => {
    if (!currentUser) {
      setStatsLoading(false);
      return;
    }

    try {
      setStatsLoading(true);
      const response = await axios.get(`${API_BASE}/leaderboard/my-stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // The backend returns { stats, nearbyUsers, recentTransactions, friendsLeaderboard }
      // We need the stats object which contains the userLeaderboard data
      setUserStats(response.data.data.stats);
      
      // If friendsLeaderboard is included in the response, use it
      if (response.data.data.friendsLeaderboard) {
        setFriendsLeaderboard(response.data.data.friendsLeaderboard);
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch friends leaderboard (followers + following)
  const fetchFriendsLeaderboard = async () => {
    if (!currentUser) return;

    try {
      setFriendsLoading(true);
      const response = await axios.get(`${API_BASE}/leaderboard/friends`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setFriendsLeaderboard(response.data.data);
    } catch (err) {
      console.error('Error fetching friends leaderboard:', err);
    } finally {
      setFriendsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe, roleFilter, tierFilter, page]);

  useEffect(() => {
    fetchUserStats();
  }, [currentUser]);

  // Fetch friends when switching to friends tab
  useEffect(() => {
    if (activeTab === 'friends' && currentUser && friendsLeaderboard.length === 0) {
      fetchFriendsLeaderboard();
    }
  }, [activeTab, currentUser]);

  // Filter leaderboard by search query
  const filteredLeaderboard = leaderboard.filter((entry) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.user?.name?.toLowerCase().includes(query) ||
      entry.user?.email?.toLowerCase().includes(query)
    );
  });

  // Filter friends leaderboard by search query
  const filteredFriendsLeaderboard = friendsLeaderboard.filter((entry) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.user?.name?.toLowerCase().includes(query) ||
      entry.user?.email?.toLowerCase().includes(query)
    );
  });

  // Handle refresh
  const handleRefresh = () => {
    if (activeTab === 'global') {
      fetchLeaderboard();
    } else {
      fetchFriendsLeaderboard();
    }
    fetchUserStats();
  };

  // Handle user row click
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-gray-600">Compete with the best and climb to the top!</p>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          title="Refresh"
        >
          <RefreshCw className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      {/* User rank card */}
      {currentUser && <UserRankCard stats={userStats} loading={statsLoading} />}

      {/* Tabs for Global vs Friends */}
      {currentUser && (
        <div className="mb-6">
          <div className="flex rounded-lg border overflow-hidden bg-white inline-flex">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-6 py-3 text-sm font-medium transition flex items-center gap-2 ${
                activeTab === 'global'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Top 100
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-3 text-sm font-medium transition flex items-center gap-2 ${
                activeTab === 'friends'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Friends
            </button>
          </div>
        </div>
      )}

      {/* Filters - only show for global leaderboard */}
      {activeTab === 'global' && (
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Timeframe toggle */}
            <div className="md:col-span-4">
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  onClick={() => setTimeframe('all')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                    timeframe === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Time
                </button>
                <button
                  onClick={() => setTimeframe('monthly')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                    timeframe === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setTimeframe('weekly')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                    timeframe === 'weekly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>

          {/* Role filter */}
          <div className="md:col-span-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="mentor">Mentors</option>
              <option value="recruiter">Recruiters</option>
            </select>
          </div>

          {/* Tier filter */}
          <div className="md:col-span-3">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Tiers</option>
              <option value="mythic">Mythic</option>
              <option value="legendary">Legendary</option>
              <option value="diamond">Diamond</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>

          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Leaderboard table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Level</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total XP</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {timeframe === 'weekly' ? 'Weekly XP' : timeframe === 'monthly' ? 'Monthly XP' : 'XP'}
              </th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'global' ? loading : friendsLoading) ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  <div className="flex justify-center">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                </td>
              </tr>
            ) : (activeTab === 'global' ? filteredLeaderboard : filteredFriendsLeaderboard).length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  {activeTab === 'friends' 
                    ? 'No friends on the leaderboard yet. Follow other users to see their rankings!' 
                    : 'No users found'}
                </td>
              </tr>
            ) : (
              (activeTab === 'global' ? filteredLeaderboard : filteredFriendsLeaderboard).map((entry) => {
                const isCurrentUser = currentUser && entry.user?._id === currentUser._id;
                const config = TIER_CONFIG[entry.currentTier] || TIER_CONFIG.bronze;

                return (
                  <tr
                    key={entry._id}
                    onClick={() => handleUserClick(entry.user?._id)}
                    className={`border-t cursor-pointer transition ${
                      isCurrentUser ? `${config.bgColor}` : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <RankMedal
                        rank={timeframe === 'all' ? entry.globalRank : entry[`${timeframe}Rank`] || entry.globalRank}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={entry.user?.profileImage || '/default-avatar.png'}
                          alt={entry.user?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className={`${isCurrentUser ? 'font-bold' : ''}`}>
                            {entry.user?.name}
                            {isCurrentUser && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{entry.user?.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <TierBadge tier={entry.currentTier} level={entry.currentLevel} />
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border border-gray-300 text-gray-700">
                        {entry.user?.role?.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-bold">{(entry.totalXP || 0).toLocaleString()}</div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-bold text-blue-600">
                        {timeframe === 'weekly'
                          ? (entry.weeklyXP || 0).toLocaleString()
                          : timeframe === 'monthly'
                          ? (entry.monthlyXP || 0).toLocaleString()
                          : (entry.totalXP || 0).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - only for global leaderboard */}
      {activeTab === 'global' && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded ${
                  page === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm mb-1">How Rankings Work</div>
            <div className="text-xs text-gray-700 space-y-1">
              <div>• Rankings are based on total XP earned from courses, practice problems, contests, and community contributions</div>
              <div>• Global Rank shows your position among all users</div>
              <div>• Role Rank shows your position among users with the same role</div>
              <div>• Weekly and Monthly rankings reset at the start of each period</div>
              <div>• Climb through 7 tiers (Bronze → Mythic) across 100 levels!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
