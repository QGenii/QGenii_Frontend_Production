import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { publicProfileApi } from '../../lib/publicProfileApi';
import { Spinner } from '../../Components/ui/Spinner';
import FollowButton from '../../Components/FollowButton';
import FollowModal from '../../Components/FollowModal';
import { BadgeGrid, BadgeModal } from '../../Components/badges';
import {
  User,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Calendar,
  Award,
  TrendingUp,
  Code,
  Trophy,
  BookOpen,
  Target,
  Flame,
  Star,
  Clock,
  CheckCircle2,
  Activity,
  Users,
  FileText,
} from 'lucide-react';
import './PublicProfile.css';

const PublicProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFollowModal, setShowFollowModal] = useState(null); // 'followers' or 'following'
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [leaderboardStats, setLeaderboardStats] = useState(null);

  useEffect(() => {
    fetchPublicProfile();
  }, [username]);

  const fetchPublicProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicProfileApi.getPublicProfile(username);
      setProfileData(response.data.data);
      
      // Fetch follow stats separately
      if (response.data.data?.user?._id) {
        try {
          const statsResponse = await publicProfileApi.getFollowStats(response.data.data.user._id);
          setProfileData(prev => ({
            ...prev,
            followStats: statsResponse.data
          }));
        } catch (statsErr) {
          console.error('Error fetching follow stats:', statsErr);
          // Set default stats if fetch fails
          setProfileData(prev => ({
            ...prev,
            followStats: { followersCount: 0, followingCount: 0 }
          }));
        }
      }
      
      // Fetch leaderboard stats for the user
      if (response.data.data?.user?._id) {
        try {
          const leaderboardResponse = await fetch(
            `http://localhost:5000/leaderboard/user/${response.data.data.user._id}`
          );
          if (leaderboardResponse.ok) {
            const leaderboardData = await leaderboardResponse.json();
            // The backend returns { data: { stats, nearbyUsers, ... } }
            setLeaderboardStats(leaderboardData.data?.stats || leaderboardData.data);
          }
        } catch (err) {
          console.error('Error fetching leaderboard stats:', err);
        }
      }
    } catch (err) {
      console.error('Error fetching public profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { user, stats, problemsSolvedByDifficulty, submissionCalendar, recentActivities, badges, ranking, followStats, blogs } = profileData;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'practice':
        return <Code className="w-4 h-4" />;
      case 'contest':
        return <Trophy className="w-4 h-4" />;
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderHeatmap = () => {
    if (!submissionCalendar || submissionCalendar.length === 0) {
      return null;
    }

    const today = new Date();
    const days = [];
    
    // Generate last 365 days
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const submission = submissionCalendar.find(s => s.date === dateString);
      const count = submission ? submission.count : 0;
      
      days.push({
        date: dateString,
        count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
      });
    }

    // Group by week
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="heatmap-container">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Submission Activity
        </h3>
        <div className="heatmap-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`heatmap-day level-${day.level}`}
                  title={`${day.date}: ${day.count} submissions`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="heatmap-legend mt-4 flex items-center justify-end text-sm text-gray-600">
          <span className="mr-2">Less</span>
          <div className="heatmap-day level-0" />
          <div className="heatmap-day level-1" />
          <div className="heatmap-day level-2" />
          <div className="heatmap-day level-3" />
          <div className="heatmap-day level-4" />
          <span className="ml-2">More</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="public-profile-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="profile-header bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="profile-image-container">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {ranking && ranking.rank && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full">
                    Rank #{ranking.rank}
                  </span>
                )}
                {/* Follow Button */}
                {localStorage.getItem('token') && (
                  <FollowButton userId={user._id} userName={user.name} />
                )}
              </div>
              
              {/* Follow Stats */}
              {followStats && (
                <div className="flex gap-4 mb-4 justify-center md:justify-start">
                  <button
                    onClick={() => setShowFollowModal('followers')}
                    className="follow-stat"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    <span className="font-bold">{followStats.followersCount}</span> Followers
                  </button>
                  <button
                    onClick={() => setShowFollowModal('following')}
                    className="follow-stat"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    <span className="font-bold">{followStats.followingCount}</span> Following
                  </button>
                </div>
              )}
              
              {user.email && <p className="text-gray-600 mb-4">{user.email}</p>}

              {user.bio && (
                <p className="text-gray-700 mb-4 max-w-2xl">{user.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {formatDate(user.createdAt)}
                </div>
              </div>

              {/* Social Links */}
              {(user.githubProfile || user.linkedInProfile || user.portfolioUrl) && (
                <div className="flex gap-3 mt-4 justify-center md:justify-start">
                  {user.githubProfile && (
                    <a
                      href={user.githubProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {user.linkedInProfile && (
                    <a
                      href={user.linkedInProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {user.portfolioUrl && (
                    <a
                      href={user.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid mb-6">
          {/* Streak Card */}
          {stats.streak && (
            <div className="stat-card streak-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="stat-label">Current Streak</div>
                  <div className="stat-value text-orange-600 flex items-center">
                    <Flame className="w-8 h-8 mr-2" />
                    {stats.streak.current}
                    <span className="text-2xl ml-1">days</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Longest Streak</div>
                  <div className="text-xl font-bold text-gray-800">{stats.streak.longest} days</div>
                </div>
              </div>
            </div>
          )}

          {/* Problems Solved Card */}
          {stats.practice && (
            <div className="stat-card">
              <div className="stat-label">Problems Solved</div>
              <div className="stat-value text-blue-600">
                {stats.practice.totalSolved}
                <span className="text-2xl text-gray-600">/{stats.practice.totalQuestions}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Acceptance Rate: {stats.practice.acceptanceRate}%
              </div>
            </div>
          )}

          {/* Contest Performance */}
          {stats.contests && (
            <div className="stat-card">
              <div className="stat-label">Contest Performance</div>
              <div className="stat-value text-purple-600">{stats.contests.totalParticipated}</div>
              <div className="mt-2 text-sm text-gray-600">
                {stats.contests.bestRank && `Best Rank: #${stats.contests.bestRank}`}
              </div>
            </div>
          )}

          {/* Courses */}
          {stats.courses && (
            <div className="stat-card">
              <div className="stat-label">Courses</div>
              <div className="stat-value text-green-600">{stats.courses.coursesCompleted}</div>
              <div className="mt-2 text-sm text-gray-600">
                {stats.courses.inProgress} in progress
              </div>
            </div>
          )}
        </div>
        {/* Problems by Difficulty */}
        {problemsSolvedByDifficulty && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Problems Solved by Difficulty
            </h3>
            <div className="space-y-4">
              {/* Easy */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-semibold">Easy</span>
                  <span className="text-gray-700 font-medium">
                    {problemsSolvedByDifficulty.easy.solved}/{problemsSolvedByDifficulty.easy.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-green-600"
                    style={{
                      width: `${
                        problemsSolvedByDifficulty.easy.total > 0
                          ? (problemsSolvedByDifficulty.easy.solved / problemsSolvedByDifficulty.easy.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-600 font-semibold">Medium</span>
                  <span className="text-gray-700 font-medium">
                    {problemsSolvedByDifficulty.medium.solved}/{problemsSolvedByDifficulty.medium.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-yellow-600"
                    style={{
                      width: `${
                        problemsSolvedByDifficulty.medium.total > 0
                          ? (problemsSolvedByDifficulty.medium.solved / problemsSolvedByDifficulty.medium.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-red-600 font-semibold">Hard</span>
                  <span className="text-gray-700 font-medium">
                    {problemsSolvedByDifficulty.hard.solved}/{problemsSolvedByDifficulty.hard.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill bg-red-600"
                    style={{
                      width: `${
                        problemsSolvedByDifficulty.hard.total > 0
                          ? (problemsSolvedByDifficulty.hard.solved / problemsSolvedByDifficulty.hard.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submission Calendar Heatmap */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {renderHeatmap()}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </button>
              <button
                className={`tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
                onClick={() => setActiveTab('blogs')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Blogs ({blogs?.length || 0})
              </button>
              <button
                className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
                onClick={() => setActiveTab('badges')}
              >
                <Award className="w-4 h-4 mr-2" />
                Badges ({badges.length})
              </button>
              <button
                className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Recent Activity
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills */}
                  {user.skills && user.skills.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {user.interests && user.interests.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Detailed Stats Summary */}
                <div className="space-y-6">
                  {/* Practice Stats */}
                  {stats.practice && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-blue-600" />
                        Practice Statistics
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{stats.practice.totalPoints}</div>
                          <div className="text-sm text-gray-600">Total Points</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{stats.practice.totalSolved}</div>
                          <div className="text-sm text-gray-600">Problems Solved</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{stats.practice.acceptanceRate}%</div>
                          <div className="text-sm text-gray-600">Acceptance Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{stats.practice.questionsContributed}</div>
                          <div className="text-sm text-gray-600">Questions Contributed</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contest Stats */}
                  {stats.contests && (
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                        Contest Performance
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{stats.contests.totalParticipated}</div>
                          <div className="text-sm text-gray-600">Total Participated</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{stats.contests.contestsCompleted}</div>
                          <div className="text-sm text-gray-600">Completed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{stats.contests.avgScore}</div>
                          <div className="text-sm text-gray-600">Average Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            {stats.contests.bestRank ? `#${stats.contests.bestRank}` : 'N/A'}
                          </div>
                          <div className="text-sm text-gray-600">Best Rank</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course Stats */}
                  {stats.courses && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                        Course Progress
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{stats.courses.totalEnrolled}</div>
                          <div className="text-sm text-gray-600">Total Enrolled</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{stats.courses.coursesCompleted}</div>
                          <div className="text-sm text-gray-600">Completed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{stats.courses.inProgress}</div>
                          <div className="text-sm text-gray-600">In Progress</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Study Time & Streak */}
                  {(stats.studyTime || stats.streak) && (
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Flame className="w-5 h-5 mr-2 text-orange-600" />
                        Activity & Engagement
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.streak && (
                          <>
                            <div>
                              <div className="text-2xl font-bold text-orange-600">{stats.streak.current}</div>
                              <div className="text-sm text-gray-600">Current Streak (days)</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-orange-600">{stats.streak.longest}</div>
                              <div className="text-sm text-gray-600">Longest Streak (days)</div>
                            </div>
                          </>
                        )}
                        {stats.studyTime && (
                          <>
                            <div>
                              <div className="text-2xl font-bold text-orange-600">{Math.floor(stats.studyTime.total / 60)}h</div>
                              <div className="text-sm text-gray-600">Total Study Time</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-orange-600">{stats.studyTime.dailyGoal || 0}m</div>
                              <div className="text-sm text-gray-600">Daily Goal</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Leaderboard Stats */}
                  {leaderboardStats && (
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-100 rounded-lg p-6 border-2 border-yellow-400">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                          Leaderboard Stats
                        </h4>
                        <Link
                          to="/practice/leaderboard"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                          View Full Leaderboard
                          <TrendingUp className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                      
                      {/* Tier Badge */}
                      <div className="mb-4">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 
                          ${leaderboardStats.currentTier === 'bronze' ? 'bg-orange-100 text-orange-700 border-orange-400' : ''}
                          ${leaderboardStats.currentTier === 'silver' ? 'bg-gray-100 text-gray-700 border-gray-400' : ''}
                          ${leaderboardStats.currentTier === 'gold' ? 'bg-yellow-100 text-yellow-700 border-yellow-400' : ''}
                          ${leaderboardStats.currentTier === 'platinum' ? 'bg-cyan-100 text-cyan-700 border-cyan-400' : ''}
                          ${leaderboardStats.currentTier === 'diamond' ? 'bg-blue-100 text-blue-700 border-blue-400' : ''}
                          ${leaderboardStats.currentTier === 'legendary' ? 'bg-red-100 text-red-700 border-red-400' : ''}
                          ${leaderboardStats.currentTier === 'mythic' ? 'bg-purple-100 text-purple-700 border-purple-400' : ''}
                        `}>
                          <Award className="w-4 h-4 mr-2" />
                          {leaderboardStats?.currentTier ? leaderboardStats.currentTier.toUpperCase() : 'UNKNOWN'} Level {leaderboardStats?.currentLevel || 'N/A'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 text-center border border-blue-300">
                          <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold text-blue-700">#{leaderboardStats.globalRank || 'N/A'}</div>
                          <div className="text-xs text-gray-600 mt-1">Global Rank</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 text-center border border-purple-300">
                          <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-700">#{leaderboardStats.roleRank || 'N/A'}</div>
                          <div className="text-xs text-gray-600 mt-1">Role Rank</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 text-center border border-green-300">
                          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-700">{leaderboardStats.totalXP?.toLocaleString() || 0}</div>
                          <div className="text-xs text-gray-600 mt-1">Total XP</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 text-center border border-orange-300">
                          <Award className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                          <div className="text-2xl font-bold text-orange-700">{(leaderboardStats.weeklyXP || 0).toLocaleString()}</div>
                          <div className="text-xs text-gray-600 mt-1">Weekly XP</div>
                        </div>
                      </div>

                      {/* XP Progress Bar */}
                      {(leaderboardStats.xpToNextLevel || 0) > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress to Level {(leaderboardStats.currentLevel || 1) + 1}</span>
                            <span>{Math.round(((leaderboardStats.currentLevelXP || 0) / leaderboardStats.xpToNextLevel) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2.5 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(((leaderboardStats.currentLevelXP || 0) / leaderboardStats.xpToNextLevel) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-center">
                            {leaderboardStats.currentLevelXP || 0} / {leaderboardStats.xpToNextLevel} XP
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Blogs Tab */}
            {activeTab === 'blogs' && (
              <div>
                {blogs && blogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                      <div key={blog._id} className="blog-card">
                        {blog.coverImage && (
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="blog-cover-image"
                          />
                        )}
                        <div className="blog-content">
                          <h3 className="blog-title">{blog.title}</h3>
                          {blog.excerpt && (
                            <p className="blog-excerpt">{blog.excerpt}</p>
                          )}
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="blog-tags">
                              {blog.tags.map((tag, index) => (
                                <span key={index} className="blog-tag">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="blog-footer">
                            <span className="blog-date">
                              <Calendar className="w-4 h-4" />
                              {formatDate(blog.createdAt)}
                            </span>
                            <a
                              href={`/blog/${blog._id}`}
                              className="blog-read-more"
                            >
                              Read More →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No blogs published yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div>
                {badges && badges.length > 0 ? (
                  <>
                    <BadgeGrid
                      badges={badges}
                      onBadgeClick={setSelectedBadge}
                    />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No badges earned yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Complete courses, solve problems, and engage with the community to earn badges!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                {recentActivities && recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-800">{activity.action}</span>
                            {activity.type === 'practice' && (
                              <Link
                                to={`/practice/${activity.slug}`}
                                className="text-blue-600 hover:underline font-medium"
                              >
                                {activity.title}
                              </Link>
                            )}
                            {activity.type !== 'practice' && (
                              <span className="text-gray-700">{activity.title}</span>
                            )}
                            {activity.difficulty && (
                              <span className={`text-sm font-semibold ${getDifficultyColor(activity.difficulty)}`}>
                                [{activity.difficulty}]
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(activity.date)}
                            </span>
                            {activity.status && (
                              <span className={`flex items-center ${
                                activity.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {activity.status === 'accepted' ? (
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                ) : null}
                                {activity.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No recent activities to display.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Badge Modal */}
      {selectedBadge && (
        <BadgeModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </>
  );
};

export default PublicProfile;
