import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import { Badge as BadgeUI } from '../../Components/ui/Badge';
import { BadgeGrid, BadgeModal } from '../../Components/badges';
import api from '../../lib/api';
import {
  Award,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
} from 'lucide-react';

export const BadgeManagement = () => {
  const [badges, setBadges] = useState([]);
  const [filteredBadges, setFilteredBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTier, setFilterTier] = useState('all');

  // Form state for create/edit
  const [formData, setFormData] = useState({
    badgeId: '',
    name: '',
    description: '',
    icon: '🏆',
    category: 'learning',
    tier: 'bronze',
    rarity: 'common',
    pointValue: 10,
    criteria: {
      type: 'course_completion',
      target: 1,
      conditions: {},
    },
  });

  useEffect(() => {
    fetchBadges();
  }, []);

  useEffect(() => {
    filterBadges();
  }, [badges, searchTerm, filterCategory, filterTier]);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const response = await api.get('/badges');
      setBadges(response.data.data);
    } catch (error) {
      console.error('Failed to fetch badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBadges = () => {
    let filtered = [...badges];

    if (searchTerm) {
      filtered = filtered.filter(
        (badge) =>
          badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          badge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((badge) => badge.category === filterCategory);
    }

    if (filterTier !== 'all') {
      filtered = filtered.filter((badge) => badge.tier === filterTier);
    }

    setFilteredBadges(filtered);
  };

  const handleCreateBadge = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/badges', formData);
      setShowCreateModal(false);
      resetForm();
      fetchBadges();
      alert('Badge created successfully!');
    } catch (error) {
      console.error('Failed to create badge:', error);
      alert(error.response?.data?.message || 'Failed to create badge');
    }
  };

  const handleUpdateBadge = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/badges/${selectedBadge._id}`, formData);
      setShowEditModal(false);
      setSelectedBadge(null);
      resetForm();
      fetchBadges();
      alert('Badge updated successfully!');
    } catch (error) {
      console.error('Failed to update badge:', error);
      alert(error.response?.data?.message || 'Failed to update badge');
    }
  };

  const handleDeleteBadge = async (badgeId) => {
    if (!confirm('Are you sure you want to delete this badge? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/admin/badges/${badgeId}`);
      fetchBadges();
      alert('Badge deleted successfully!');
    } catch (error) {
      console.error('Failed to delete badge:', error);
      alert(error.response?.data?.message || 'Failed to delete badge');
    }
  };

  const openEditModal = (badge) => {
    setSelectedBadge(badge);
    setFormData({
      badgeId: badge.badgeId,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      category: badge.category,
      tier: badge.tier,
      rarity: badge.rarity,
      pointValue: badge.pointValue,
      criteria: badge.criteria,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      badgeId: '',
      name: '',
      description: '',
      icon: '🏆',
      category: 'learning',
      tier: 'bronze',
      rarity: 'common',
      pointValue: 10,
      criteria: {
        type: 'course_completion',
        target: 1,
        conditions: {},
      },
    });
  };

  const renderBadgeForm = (isEdit = false) => (
    <form onSubmit={isEdit ? handleUpdateBadge : handleCreateBadge} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Badge ID
          </label>
          <input
            type="text"
            value={formData.badgeId}
            onChange={(e) => setFormData({ ...formData, badgeId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
            disabled={isEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Icon (Emoji)
          </label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          rows="3"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="learning">Learning</option>
            <option value="community">Community</option>
            <option value="skill">Skill</option>
            <option value="special">Special</option>
            <option value="event">Event</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tier
          </label>
          <select
            value={formData.tier}
            onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="diamond">Diamond</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rarity
          </label>
          <select
            value={formData.rarity}
            onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Point Value
          </label>
          <input
            type="number"
            value={formData.pointValue}
            onChange={(e) => setFormData({ ...formData, pointValue: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            min="1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Criteria Type
        </label>
        <select
          value={formData.criteria.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              criteria: { ...formData.criteria, type: e.target.value },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        >
          <option value="course_completion">Course Completion</option>
          <option value="practice_solved">Practice Solved</option>
          <option value="contest_wins">Contest Wins</option>
          <option value="problem_categories">Problem Categories</option>
          <option value="daily_streak">Daily Streak</option>
          <option value="perfect_scores">Perfect Scores</option>
          <option value="blog_published">Blog Published</option>
          <option value="followers_gained">Followers Gained</option>
          <option value="comments_upvoted">Comments Upvoted</option>
          <option value="discussions_started">Discussions Started</option>
          <option value="users_helped">Users Helped</option>
          <option value="platform_active_days">Platform Active Days</option>
          <option value="language_mastery">Language Mastery</option>
          <option value="track_completion">Track Completion</option>
          <option value="special_achievement">Special Achievement</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Value
        </label>
        <input
          type="number"
          value={formData.criteria.target}
          onChange={(e) =>
            setFormData({
              ...formData,
              criteria: { ...formData.criteria, target: parseInt(e.target.value) },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          min="1"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            isEdit ? setShowEditModal(false) : setShowCreateModal(false);
            setSelectedBadge(null);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? 'Update Badge' : 'Create Badge'}
        </Button>
      </div>
    </form>
  );

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Award className="w-8 h-8 text-purple-600" />
                  Badge Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Create and manage achievement badges for users
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Badge
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-gray-900">{badges.length}</div>
                <div className="text-sm text-gray-600">Total Badges</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {badges.filter((b) => b.category === 'learning').length}
                </div>
                <div className="text-sm text-gray-600">Learning</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-green-600">
                  {badges.filter((b) => b.category === 'community').length}
                </div>
                <div className="text-sm text-gray-600">Community</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {badges.filter((b) => b.category === 'skill').length}
                </div>
                <div className="text-sm text-gray-600">Skill</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {badges.filter((b) => b.category === 'special').length}
                </div>
                <div className="text-sm text-gray-600">Special</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="learning">Learning</option>
                  <option value="community">Community</option>
                  <option value="skill">Skill</option>
                  <option value="special">Special</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Tier
                </label>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="all">All Tiers</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                  <option value="diamond">Diamond</option>
                  <option value="legendary">Legendary</option>
                  <option value="mythic">Mythic</option>
                </select>
              </div>
            </div>

            {(searchTerm || filterCategory !== 'all' || filterTier !== 'all') && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredBadges.length} of {badges.length} badges
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                    setFilterTier('all');
                  }}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Badges Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {filteredBadges.length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No badges found</p>
                <p className="text-gray-400 text-sm mt-2">
                  {searchTerm || filterCategory !== 'all' || filterTier !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first badge to get started'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBadges.map((badge) => (
                  <div
                    key={badge._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedBadge(badge)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{badge.icon}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(badge);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBadge(badge._id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {badge.description}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <BadgeUI variant="primary">{badge.category}</BadgeUI>
                      <span className="uppercase font-semibold text-gray-500">
                        {badge.tier}
                      </span>
                      <span className="font-semibold text-purple-600">
                        {badge.pointValue} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="w-6 h-6" />
                  Create New Badge
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">{renderBadgeForm(false)}</div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Edit className="w-6 h-6" />
                  Edit Badge
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedBadge(null);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">{renderBadgeForm(true)}</div>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && !showEditModal && (
        <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
      )}
    </div>
  );
};
