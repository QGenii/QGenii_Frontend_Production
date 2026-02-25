import React, { useState, useEffect } from 'react';
import { X, Award, Lock, CheckCircle, TrendingUp, Filter, Search } from 'lucide-react';
import BadgeCard from './BadgeCard';

const AllBadgesProgressModal = ({ isOpen, onClose, userId }) => {
  const [allBadges, setAllBadges] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // all, earned, in-progress, locked
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen && userId) {
      fetchBadgeProgress();
    }
  }, [isOpen, userId]);

  const fetchBadgeProgress = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Fetch all badges
      const badgesResponse = await fetch('http://localhost:5000/badges', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const badgesData = await badgesResponse.json();

      // Fetch user's badge progress
      const progressResponse = await fetch(`http://localhost:5000/badge-progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const progressData = await progressResponse.json();

      setAllBadges(badgesData.data || []);
      setUserProgress(progressData.data || {});
    } catch (error) {
      console.error('Failed to fetch badge progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getTierColor = (tier) => {
    const colors = {
      bronze: 'from-amber-700 to-amber-900',
      silver: 'from-gray-400 to-gray-600',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-gray-300 to-gray-400',
      diamond: 'from-cyan-300 to-blue-400',
      legendary: 'from-orange-400 to-red-500',
      mythic: 'from-purple-500 to-blue-600',
    };
    return colors[tier] || 'from-gray-400 to-gray-600';
  };

  const getBadgeStatus = (badge) => {
    const earnedBadges = userProgress.earnedBadges || [];
    const progress = userProgress.progress || {};

    if (earnedBadges.some((b) => b.badge._id === badge._id)) {
      return 'earned';
    }

    const badgeProgress = progress[badge._id];
    if (badgeProgress && badgeProgress.progressPercentage > 0) {
      return 'in-progress';
    }

    return 'locked';
  };

  const getBadgeProgress = (badge) => {
    const progress = userProgress.progress || {};
    const badgeProgress = progress[badge._id];

    if (!badgeProgress) {
      return { current: 0, target: badge.criteria.target, percentage: 0, remaining: badge.criteria.target };
    }

    return {
      current: badgeProgress.progress,
      target: badge.criteria.target,
      percentage: badgeProgress.progressPercentage,
      remaining: badge.criteria.target - badgeProgress.progress,
    };
  };

  const getFilteredBadges = () => {
    let filtered = allBadges;

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter((badge) => badge.category === filterCategory);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((badge) => getBadgeStatus(badge) === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (badge) =>
          badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          badge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredBadges = getFilteredBadges();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'learning', label: 'Learning' },
    { value: 'community', label: 'Community' },
    { value: 'skill', label: 'Skill' },
    { value: 'special', label: 'Special' },
    { value: 'event', label: 'Event' },
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'earned', label: 'Earned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'locked', label: 'Locked' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Award className="w-7 h-7" />
                All Badges & Progress
              </h2>
              <p className="text-purple-100 text-sm mt-1">
                Track your progress towards earning all badges
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Filter className="w-4 h-4 inline mr-1" />
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Showing {filteredBadges.length} of {allBadges.length} badges
          </div>
        </div>

        {/* Badge List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredBadges.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No badges found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBadges.map((badge) => {
                const status = getBadgeStatus(badge);
                const progress = getBadgeProgress(badge);

                return (
                  <div
                    key={badge._id}
                    className={`border rounded-lg p-4 transition-all ${
                      status === 'earned'
                        ? 'border-green-300 bg-green-50'
                        : status === 'in-progress'
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-4xl relative">
                        {badge.icon}
                        {status === 'earned' && (
                          <CheckCircle className="w-5 h-5 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
                        )}
                        {status === 'locked' && (
                          <Lock className="w-5 h-5 text-gray-400 absolute -top-1 -right-1 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {badge.name}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {badge.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-gray-100 rounded uppercase font-semibold">
                            {badge.tier}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded uppercase font-semibold">
                            {badge.category}
                          </span>
                          <span className="font-semibold text-purple-600">
                            {badge.pointValue} pts
                          </span>
                        </div>
                      </div>
                    </div>

                    {status !== 'earned' && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-gray-900">
                            {progress.current} / {progress.target} ({Math.round(progress.percentage)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div
                            className={`bg-gradient-to-r ${getTierColor(badge.tier)} h-3 rounded-full transition-all duration-300`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          {progress.remaining > 0 ? (
                            <>
                              <span className="font-semibold text-purple-600">
                                {progress.remaining}
                              </span>{' '}
                              more {badge.criteria.type.replace(/_/g, ' ')} needed to unlock!
                            </>
                          ) : (
                            <span className="text-green-600 font-semibold">Ready to earn!</span>
                          )}
                        </p>
                      </div>
                    )}

                    {status === 'earned' && (
                      <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Badge Earned!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBadgesProgressModal;
