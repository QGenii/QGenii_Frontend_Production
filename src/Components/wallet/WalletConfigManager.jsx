import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Save, 
  RotateCcw, 
  Trophy, 
  BookOpen, 
  Target, 
  Award,
  MessageSquare,
  User,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import api from '../../lib/api';

const WalletConfigManager = () => {
  const [config, setConfig] = useState(null);
  const [originalConfig, setOriginalConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await api.get('/wallet-config');
      setConfig(response.data.data);
      setOriginalConfig(response.data.data);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to load configuration' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setConfig({ ...config, [field]: numValue });
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });

      const updates = {};
      Object.keys(config).forEach(key => {
        if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && 
            key !== '__v' && key !== 'lastModifiedBy' && key !== 'active') {
          updates[key] = config[key];
        }
      });

      await api.put('/wallet-config', updates);
      setMessage({ 
        type: 'success', 
        text: 'Configuration saved successfully!' 
      });
      fetchConfig(); // Refresh to get updated data
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to save configuration' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all coin rewards to default values?')) {
      return;
    }

    try {
      setSaving(true);
      setMessage({ type: '', text: '' });

      await api.post('/wallet-config/reset');
      setMessage({ 
        type: 'success', 
        text: 'Configuration reset to defaults!' 
      });
      fetchConfig();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to reset configuration' 
      });
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = () => {
    if (!config || !originalConfig) return false;
    return Object.keys(config).some(key => config[key] !== originalConfig[key]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const ConfigSection = ({ title, icon: Icon, fields }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-primary-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={config[key] || 0}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">
                coins
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="w-8 h-8 text-primary-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Coin Reward Configuration
              </h1>
              <p className="text-gray-600 mt-1">
                Set coin rewards for various activities across the platform
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              disabled={saving}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges() || saving}
              className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mt-4 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {message.text}
          </div>
        )}
      </div>

      {/* Practice Problems */}
      <ConfigSection
        title="Practice Problems"
        icon={Target}
        fields={[
          { key: 'practiceEasy', label: 'Easy Problem' },
          { key: 'practiceMedium', label: 'Medium Problem' },
          { key: 'practiceHard', label: 'Hard Problem' }
        ]}
      />

      {/* Courses */}
      <ConfigSection
        title="Course Activities"
        icon={BookOpen}
        fields={[
          { key: 'courseEnrolled', label: 'Course Enrolled' },
          { key: 'courseModuleCompleted', label: 'Module Completed' },
          { key: 'courseCompleted', label: 'Course Completed' }
        ]}
      />

      {/* Contests */}
      <ConfigSection
        title="Contest Rewards"
        icon={Trophy}
        fields={[
          { key: 'contestParticipation', label: 'Participation' },
          { key: 'contestRank1', label: '1st Place Bonus' },
          { key: 'contestRank2', label: '2nd Place Bonus' },
          { key: 'contestRank3', label: '3rd Place Bonus' },
          { key: 'contestTop10', label: 'Top 10 Bonus' }
        ]}
      />

      {/* Badges */}
      <ConfigSection
        title="Badge Achievements"
        icon={Award}
        fields={[
          { key: 'badgeBronze', label: 'Bronze Badge' },
          { key: 'badgeSilver', label: 'Silver Badge' },
          { key: 'badgeGold', label: 'Gold Badge' }
        ]}
      />

      {/* Blogs & Content */}
      <ConfigSection
        title="Blog & Content"
        icon={MessageSquare}
        fields={[
          { key: 'blogPublished', label: 'Blog Published' },
          { key: 'blogLiked', label: 'Blog Liked' },
          { key: 'commentPosted', label: 'Comment Posted' }
        ]}
      />

      {/* Profile & Social */}
      <ConfigSection
        title="Profile & Social"
        icon={User}
        fields={[
          { key: 'profileCompleted', label: 'Profile Completed' },
          { key: 'dailyLogin', label: 'Daily Login' },
          { key: 'referralSuccess', label: 'Successful Referral' },
          { key: 'firstPurchase', label: 'First Purchase Bonus' }
        ]}
      />

      {/* Streaks & Special Events */}
      <ConfigSection
        title="Streaks & Special Events"
        icon={Calendar}
        fields={[
          { key: 'loginStreak7Days', label: '7-Day Login Streak' },
          { key: 'loginStreak30Days', label: '30-Day Login Streak' },
          { key: 'monthlyBonus', label: 'Monthly Activity Bonus' },
          { key: 'birthdayBonus', label: 'Birthday Bonus' }
        ]}
      />

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Changes take effect immediately after saving</li>
              <li>All coin values must be non-negative integers</li>
              <li>Contest rewards are additive (participation + rank bonus)</li>
              <li>Consider the economy balance when adjusting values</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConfigManager;
