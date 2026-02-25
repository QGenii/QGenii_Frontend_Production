import { useState, useEffect } from 'react';
import { Sidebar } from '../../Components/layout/Sidebar';
import { Button } from '../../Components/ui/Button';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import {
  Award,
  Save,
  RefreshCw,
  Settings,
  TrendingUp,
  Users,
  Trophy,
  Zap
} from 'lucide-react';

export const LeaderboardConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('points');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await api.get('/leaderboard/config');
      setConfig(response.data.data);
    } catch (error) {
      console.error('Failed to fetch config:', error);
      alert('Failed to load configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put('/leaderboard/config', config);
      alert('Configuration saved successfully!');
      fetchConfig();
    } catch (error) {
      console.error('Failed to save config:', error);
      alert(error.response?.data?.message || 'Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleRecalculate = async () => {
    if (!confirm('Recalculate all rankings? This may take a while.')) return;

    try {
      await api.post('/leaderboard/recalculate');
      alert('Rankings recalculated successfully!');
    } catch (error) {
      console.error('Failed to recalculate rankings:', error);
      alert('Failed to recalculate rankings');
    }
  };

  const updatePointValue = (key, value) => {
    setConfig({
      ...config,
      pointValues: {
        ...config.pointValues,
        [key]: parseInt(value) || 0
      }
    });
  };

  const updateContestMultiplier = (key, value) => {
    setConfig({
      ...config,
      contestMultipliers: {
        ...config.contestMultipliers,
        [key]: parseFloat(value) || 0
      }
    });
  };

  const updateEventMultiplier = (key, value) => {
    setConfig({
      ...config,
      eventMultipliers: {
        ...config.eventMultipliers,
        [key]: parseFloat(value) || 1
      }
    });
  };

  const updateCategoryWeight = (role, category, value) => {
    setConfig({
      ...config,
      categoryWeights: {
        ...config.categoryWeights,
        [role]: {
          ...config.categoryWeights[role],
          [category]: parseFloat(value) || 0
        }
      }
    });
  };

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
                  <Settings className="w-8 h-8 text-purple-600" />
                  Leaderboard Configuration
                </h1>
                <p className="text-gray-600 mt-2">
                  Configure point values, weights, and multipliers for the leaderboard system
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleRecalculate}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Recalculate Rankings
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`tab-button ${activeTab === 'points' ? 'active' : ''} px-6 py-4 font-semibold ${
                    activeTab === 'points'
                      ? 'border-b-2 border-purple-600 text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('points')}
                >
                  <Award className="w-4 h-4 inline mr-2" />
                  Point Values
                </button>
                <button
                  className={`tab-button ${activeTab === 'multipliers' ? 'active' : ''} px-6 py-4 font-semibold ${
                    activeTab === 'multipliers'
                      ? 'border-b-2 border-purple-600 text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('multipliers')}
                >
                  <Trophy className="w-4 h-4 inline mr-2" />
                  Contest Multipliers
                </button>
                <button
                  className={`tab-button ${activeTab === 'weights' ? 'active' : ''} px-6 py-4 font-semibold ${
                    activeTab === 'weights'
                      ? 'border-b-2 border-purple-600 text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('weights')}
                >
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Category Weights
                </button>
                <button
                  className={`tab-button ${activeTab === 'events' ? 'active' : ''} px-6 py-4 font-semibold ${
                    activeTab === 'events'
                      ? 'border-b-2 border-purple-600 text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab('events')}
                >
                  <Zap className="w-4 h-4 inline mr-2" />
                  Event Bonuses
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Point Values Tab */}
              {activeTab === 'points' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Activities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.pointValues)
                        .filter(([key]) => key.startsWith('course'))
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updatePointValue(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Activities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.pointValues)
                        .filter(([key]) => key.startsWith('practice') || key === 'perfectScore')
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updatePointValue(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contest Activities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.pointValues)
                        .filter(([key]) => key.startsWith('contest'))
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updatePointValue(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Activities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.pointValues)
                        .filter(([key]) => key.startsWith('blog') || key.startsWith('comment') || key.startsWith('discussion') || key.startsWith('help'))
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updatePointValue(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Badge Rewards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(config.pointValues)
                        .filter(([key]) => key.startsWith('badge'))
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace('badge', '')}
                            </label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updatePointValue(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contest Multipliers Tab */}
              {activeTab === 'multipliers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rank-Based Multipliers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.contestMultipliers)
                        .filter(([key]) => key.startsWith('rank') || key.startsWith('top'))
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={value}
                              onChange={(e) => updateContestMultiplier(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Multipliers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(config.contestMultipliers)
                        .filter(([key]) => key.startsWith('difficulty'))
                        .map(([key, value]) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {key.replace('difficulty', '')}
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={value}
                              onChange={(e) => updateContestMultiplier(key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Streak Bonuses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Streak Bonus (XP per contest)
                        </label>
                        <input
                          type="number"
                          value={config.contestMultipliers.streakBonus}
                          onChange={(e) => updateContestMultiplier('streakBonus', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Streak Bonus
                        </label>
                        <input
                          type="number"
                          value={config.contestMultipliers.streakMax}
                          onChange={(e) => updateContestMultiplier('streakMax', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Weights Tab */}
              {activeTab === 'weights' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Weights determine how different activity categories contribute to overall ranking for each role.
                    Total should equal 1.0 for each role.
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Weights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.categoryWeights.student).map(([category, weight]) => (
                        <div key={category}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {category.charAt(0).toUpperCase() + category.slice(1)} ({(weight * 100).toFixed(0)}%)
                          </label>
                          <input
                            type="number"
                            step="0.05"
                            min="0"
                            max="1"
                            value={weight}
                            onChange={(e) => updateCategoryWeight('student', category, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Total: {(Object.values(config.categoryWeights.student).reduce((a, b) => a + b, 0) * 100).toFixed(0)}%
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentor Weights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.categoryWeights.mentor).map(([category, weight]) => (
                        <div key={category}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {category.charAt(0).toUpperCase() + category.slice(1)} ({(weight * 100).toFixed(0)}%)
                          </label>
                          <input
                            type="number"
                            step="0.05"
                            min="0"
                            max="1"
                            value={weight}
                            onChange={(e) => updateCategoryWeight('mentor', category, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Total: {(Object.values(config.categoryWeights.mentor).reduce((a, b) => a + b, 0) * 100).toFixed(0)}%
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruiter Weights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(config.categoryWeights.recruiter).map(([category, weight]) => (
                        <div key={category}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {category.charAt(0).toUpperCase() + category.slice(1)} ({(weight * 100).toFixed(0)}%)
                          </label>
                          <input
                            type="number"
                            step="0.05"
                            min="0"
                            max="1"
                            value={weight}
                            onChange={(e) => updateCategoryWeight('recruiter', category, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Total: {(Object.values(config.categoryWeights.recruiter).reduce((a, b) => a + b, 0) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              )}

              {/* Event Bonuses Tab */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Set global multipliers for special events and time periods. 1.0 = no bonus, 2.0 = double XP, etc.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weekend Bonus Multiplier
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        value={config.eventMultipliers.weekendBonus}
                        onChange={(e) => updateEventMultiplier('weekendBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Applied on Saturdays and Sundays</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Holiday Bonus Multiplier
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        value={config.eventMultipliers.holidayBonus}
                        onChange={(e) => updateEventMultiplier('holidayBonus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Manual activation for holidays</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Event Multiplier
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        value={config.eventMultipliers.specialEvent}
                        onChange={(e) => updateEventMultiplier('specialEvent', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">For special promotions and events</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Weekend bonus encourages weekend learning activity</li>
                      <li>• Use special event multipliers for platform launches or milestones</li>
                      <li>• Multipliers stack (e.g., weekend + special event)</li>
                      <li>• Set to 1.0 to disable any bonus</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Save Button (Footer) */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Last updated: {new Date(config.updatedAt).toLocaleString()}
                </p>
                {config.updatedBy && (
                  <p className="text-xs text-gray-500">
                    By admin
                  </p>
                )}
              </div>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2"
                size="lg"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save All Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
