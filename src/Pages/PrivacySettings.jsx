import React, { useState, useEffect } from 'react';
import { userProfileApi } from '../lib/userProfileApi';
import './PrivacySettings.css';

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: true,
    showLocation: true,
    showBio: true,
    showSkills: true,
    showInterests: true,
    showSocialLinks: true,
    showGithub: true,
    showLinkedIn: true,
    showPortfolio: true,
    showPracticeStats: true,
    showContestStats: true,
    showCourseStats: true,
    showStreak: true,
    showBadges: true,
    showRecentActivity: true,
    showSubmissionCalendar: true,
    showRanking: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchPrivacySettings();
  }, []);

  const fetchPrivacySettings = async () => {
    try {
      const response = await userProfileApi.getPrivacySettings();
      if (response.data.success) {
        setPrivacySettings(response.data.data.profilePrivacy);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to load privacy settings',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (field) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await userProfileApi.updatePrivacySettings(privacySettings);
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Privacy settings updated successfully!',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update privacy settings',
      });
    } finally {
      setSaving(false);
    }
  };

  const privacyGroups = [
    {
      title: 'Personal Information',
      description: 'Control what personal details are visible on your public profile',
      settings: [
        { key: 'showEmail', label: 'Show Email Address', description: 'Your email will be visible to everyone' },
        { key: 'showLocation', label: 'Show Location', description: 'Your location/city will be displayed' },
        { key: 'showBio', label: 'Show Bio', description: 'Your bio/about section will be visible' },
      ],
    },
    {
      title: 'Skills & Interests',
      description: 'Manage visibility of your skills and interests',
      settings: [
        { key: 'showSkills', label: 'Show Skills', description: 'Display your skills on your profile' },
        { key: 'showInterests', label: 'Show Interests', description: 'Display your interests and topics' },
      ],
    },
    {
      title: 'Social Links',
      description: 'Control which social media profiles are displayed',
      settings: [
        { key: 'showSocialLinks', label: 'Show All Social Links', description: 'Master toggle for all social links' },
        { key: 'showGithub', label: 'Show GitHub Profile', description: 'Display link to your GitHub profile' },
        { key: 'showLinkedIn', label: 'Show LinkedIn Profile', description: 'Display link to your LinkedIn profile' },
        { key: 'showPortfolio', label: 'Show Portfolio URL', description: 'Display link to your portfolio website' },
      ],
    },
    {
      title: 'Statistics & Performance',
      description: 'Choose what stats and achievements are visible',
      settings: [
        { key: 'showPracticeStats', label: 'Show Practice Statistics', description: 'Problems solved, points, and acceptance rate' },
        { key: 'showContestStats', label: 'Show Contest Statistics', description: 'Contest participations and rankings' },
        { key: 'showCourseStats', label: 'Show Course Statistics', description: 'Enrolled and completed courses' },
        { key: 'showStreak', label: 'Show Study Streak', description: 'Current and longest study streak' },
        { key: 'showRanking', label: 'Show Global Ranking', description: 'Your rank among all users' },
      ],
    },
    {
      title: 'Activity & Achievements',
      description: 'Control visibility of your activity and badges',
      settings: [
        { key: 'showBadges', label: 'Show Badges', description: 'Display earned badges and achievements' },
        { key: 'showRecentActivity', label: 'Show Recent Activity', description: 'Display your latest actions' },
        { key: 'showSubmissionCalendar', label: 'Show Submission Calendar', description: 'GitHub-style activity heatmap' },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="privacy-settings-loading">
        <div className="loading-spinner"></div>
        <p>Loading privacy settings...</p>
      </div>
    );
  }

  return (
    <div className="privacy-settings">
      <div className="privacy-settings-header">
        <h2>Privacy Settings</h2>
        <p className="privacy-settings-subtitle">
          Control what information is visible on your public profile. By default, everything is visible.
        </p>
      </div>

      {message.text && (
        <div className={`privacy-message privacy-message-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="privacy-groups">
        {privacyGroups.map((group, index) => (
          <div key={index} className="privacy-group">
            <div className="privacy-group-header">
              <h3>{group.title}</h3>
              <p>{group.description}</p>
            </div>
            <div className="privacy-group-settings">
              {group.settings.map((setting) => (
                <div key={setting.key} className="privacy-setting-item">
                  <div className="privacy-setting-info">
                    <label htmlFor={setting.key}>{setting.label}</label>
                    <p className="privacy-setting-description">{setting.description}</p>
                  </div>
                  <div className="privacy-toggle">
                    <input
                      type="checkbox"
                      id={setting.key}
                      checked={privacySettings[setting.key]}
                      onChange={() => handleToggle(setting.key)}
                    />
                    <label htmlFor={setting.key} className="toggle-label">
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="privacy-settings-actions">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-save-privacy"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={fetchPrivacySettings}
          disabled={saving}
          className="btn-cancel-privacy"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
