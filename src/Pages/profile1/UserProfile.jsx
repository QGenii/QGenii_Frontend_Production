import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import { userProfileApi } from '../../lib/userProfileApi';
import { User, Settings, BookOpen, Briefcase, Award, Camera, Heart, Calendar, Globe, Lock, ExternalLink, Shield, Eye, EyeOff, Users, Trophy, TrendingUp } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';
import ChangePasswordModal from './ChangePasswordModal';
import WishlistPage from './WishlistPage';
import CertificatesPage from './CertificatesPage';
import StudyPlanPage from './StudyPlanPage';
import FollowModal from '../../Components/FollowModal';
import { BadgeGrid, BadgeModal, BadgeProgressBar, AllBadgesProgressModal } from '../../Components/badges';
import './UserProfile.css';

const UserProfile1 = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activitySummary, setActivitySummary] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [privacySettings, setPrivacySettings] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [followStats, setFollowStats] = useState({ followersCount: 0, followingCount: 0 });
  const [showFollowModal, setShowFollowModal] = useState(null);
  const [userBadges, setUserBadges] = useState([]);
  const [badgeStats, setBadgeStats] = useState(null);
  const [recommendedBadges, setRecommendedBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showAllBadgesModal, setShowAllBadgesModal] = useState(false);
  const [leaderboardStats, setLeaderboardStats] = useState(null);
  

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [profileRes, summaryRes] = await Promise.all([
        userProfileApi.getUserProfile(),
        userProfileApi.getUserActivitySummary(),
      ]);

      setProfile(profileRes.data.data.user);
      setActivitySummary(summaryRes.data.data.summary);

      // Fetch privacy settings
      try {
        const privacyRes = await userProfileApi.getPrivacySettings();
        setPrivacySettings(privacyRes.data.data.profilePrivacy);
      } catch (error) {
        console.error('Failed to fetch privacy settings:', error);
      }

      // Fetch follow stats
      try {
        const token = localStorage.getItem('token');
        if (token && profileRes.data.data.user._id) {
          const response = await fetch(`http://localhost:5000/follow/${profileRes.data.data.user._id}/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setFollowStats(data.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch follow stats:', error);
      }

      // Fetch user badges
      try {
        const token = localStorage.getItem('token');
        if (token && profileRes.data.data.user._id) {
          const badgesResponse = await fetch(`http://localhost:5000/users/${profileRes.data.data.user._id}/badges?displayed=true`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (badgesResponse.ok) {
            const badgesData = await badgesResponse.json();
            setUserBadges(badgesData.data || []);
          }

          // Fetch badge stats
          const statsResponse = await fetch(`http://localhost:5000/users/${profileRes.data.data.user._id}/badge-stats`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setBadgeStats(statsData.data);
          }

          // Fetch recommended badges
          const recommendedResponse = await fetch(`http://localhost:5000/recommended-badges?limit=3`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (recommendedResponse.ok) {
            const recommendedData = await recommendedResponse.json();
            setRecommendedBadges(recommendedData.data || []);
          }

          // Fetch leaderboard stats
          const leaderboardResponse = await fetch(`http://localhost:5000/leaderboard/my-stats`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (leaderboardResponse.ok) {
            const leaderboardData = await leaderboardResponse.json();
            setLeaderboardStats(leaderboardData.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch badges:', error);
      }

      if (activeTab === 'courses') {
        const coursesRes = await userProfileApi.getUserCourses({ limit: 10 });
        setUserCourses(coursesRes.data.data.enrollments);
      } else if (activeTab === 'applications') {
        const appsRes = await userProfileApi.getUserJobApplications({ limit: 10 });
        setUserApplications(appsRes.data.data.applications);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = async (tab) => {
    setActiveTab(tab);

    if (tab === 'courses' && userCourses.length === 0) {
      try {
        const coursesRes = await userProfileApi.getUserCourses({ limit: 10 });
        setUserCourses(coursesRes.data.data.enrollments);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    } else if (tab === 'applications' && userApplications.length === 0) {
      try {
        const appsRes = await userProfileApi.getUserJobApplications({ limit: 10 });
        setUserApplications(appsRes.data.data.applications);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowEditModal(false);
  };

  const handleImageUpload = async (imageUrl) => {
    try {
      const response = await userProfileApi.uploadProfileImage({ profileImage: imageUrl });
      setProfile(response.data.data.user);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Profile Header */}
        <Card className="mb-8">
          <CardBody>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                  )}
                </div>

                <button
                  onClick={() => document.getElementById('imageInput').click()}
                  className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      handleImageUpload(imageUrl);
                    }
                  }}
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {profile?.name}
                    </h1>
                    <p className="text-gray-600 mb-1">{profile?.email}</p>

                    {profile?.currentRole && (
                      <p className="text-gray-600">
                        {profile.currentRole}
                        {profile.companyName && ` at ${profile.companyName}`}
                      </p>
                    )}

                    {profile?.location && (
                      <p className="text-sm text-gray-500 mt-1">📍 {profile.location}</p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </button>

                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {profile?.bio && (
                  <p className="text-gray-700 text-sm md:text-base">{profile.bio}</p>
                )}

                {/* Referral Code Display */}
                {profile?.referralCode && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-500">Your Referral Code:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-primary-700 text-base select-all">
                      {profile.referralCode}
                    </span>
                    <button
                      className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200"
                      onClick={() => {
                        navigator.clipboard.writeText(profile.referralCode);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 1500);
                      }}
                    >
                      {copiedLink ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* === PUBLIC PROFILE & PRIVACY === */}
        <Card className="mb-8">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Public Profile & Privacy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Public Profile Link */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Your Public Profile</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Share your achievements and stats with others
                    </p>
                    <div className="flex gap-2">
                      <Link
                        to={`/profile/${profile?._id}`}
                        target="_blank"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Public Profile
                      </Link>
                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/profile/${profile?._id}`;
                          navigator.clipboard.writeText(link);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        }}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm"
                      >
                        {copiedLink ? '✓ Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Privacy Settings</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Control what others can see on your public profile
                    </p>
                    
                    {privacySettings && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Eye className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">
                            <strong>
                              {Object.values(privacySettings).filter(v => v === true).length}
                            </strong> items visible
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <EyeOff className="w-4 h-4 text-red-600" />
                          <span className="text-gray-700">
                            <strong>
                              {Object.values(privacySettings).filter(v => v === false).length}
                            </strong> items hidden
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => navigate('/profile/privacy')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Manage Privacy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Privacy Overview */}
            {privacySettings && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Privacy Overview</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showEmail ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Email</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showPracticeStats ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Practice Stats</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showContestStats ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Contest Stats</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showBadges ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Badges</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showStreak ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Streak</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showRanking ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Ranking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showSocialLinks ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Social Links</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {privacySettings.showRecentActivity ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <span className="text-gray-600">Recent Activity</span>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>


        {/* === FOLLOWERS & FOLLOWING === */}
        <Card className="mb-8">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Followers & Following
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Followers */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {followStats.followersCount}
                    </div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="p-3 bg-purple-600 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  People who follow you and see your updates
                </p>
                <button
                  onClick={() => setShowFollowModal('followers')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={followStats.followersCount === 0}
                >
                  {followStats.followersCount === 0 ? 'No Followers Yet' : 'View Followers'}
                </button>
              </div>

              {/* Following */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {followStats.followingCount}
                    </div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="p-3 bg-blue-600 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Users you follow and get updates from
                </p>
                <button
                  onClick={() => setShowFollowModal('following')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={followStats.followingCount === 0}
                >
                  {followStats.followingCount === 0 ? 'Not Following Anyone' : 'View Following'}
                </button>
              </div>
            </div>

            {/* Privacy Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Privacy Note</h4>
                  <p className="text-sm text-gray-600">
                    Your followers list is private and only visible to you. Your following list is public and can be seen by others.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* === BADGES & ACHIEVEMENTS === */}
        <Card className="mb-8">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Badges & Achievements
              </h2>
              <button
                onClick={() => setShowAllBadgesModal(true)}
                className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                View All Progress
              </button>
            </div>

            {/* Badge Stats */}
            {badgeStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 text-center border border-yellow-200">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {badgeStats.badgeStats?.totalBadges || 0}
                  </div>
                  <div className="text-xs text-gray-600">Total Badges</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {badgeStats.badgeStats?.badgePoints || 0}
                  </div>
                  <div className="text-xs text-gray-600">Badge Points</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {badgeStats.rarityCounts?.legendary || 0}
                  </div>
                  <div className="text-xs text-gray-600">Legendary</div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 text-center border border-cyan-200">
                  <div className="text-3xl font-bold text-cyan-600 mb-1">
                    {badgeStats.badgeStats?.currentStreak || 0}
                  </div>
                  <div className="text-xs text-gray-600">Day Streak 🔥</div>
                </div>
              </div>
            )}

            {/* Earned Badges */}
            {userBadges.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Earned Badges ({userBadges.length})</h3>
                <BadgeGrid
                  badges={userBadges}
                  onBadgeClick={(badgeData) => setSelectedBadge(badgeData)}
                />
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-semibold mb-1">No Badges Yet</p>
                <p className="text-sm text-gray-500">
                  Complete courses, solve problems, and engage with the community to earn badges!
                </p>
              </div>
            )}

            {/* Recommended Next Badges */}
            {recommendedBadges.length > 0 && (
              <div className="mt-6">
                <BadgeProgressBar recommendedBadges={recommendedBadges} />
              </div>
            )}
          </CardBody>
        </Card>

        {/* === LEADERBOARD STATS === */}
        {leaderboardStats && (
          <Card className="mb-8">
            <CardBody>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Leaderboard Stats
                </h2>
                <Link
                  to="/practice/leaderboard"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View Full Leaderboard
                  <TrendingUp className="w-4 h-4" />
                </Link>
              </div>

              {/* Tier Badge */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold border-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 text-yellow-700">
                  {leaderboardStats.currentTier?.toUpperCase()} Level {leaderboardStats.currentLevel}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 text-center border border-blue-200">
                  <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    #{leaderboardStats.globalRank || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-600">Global Rank</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    #{leaderboardStats.roleRank || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-600">Role Rank</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {(leaderboardStats.totalXP || 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Total XP</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center border border-orange-200">
                  <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {(leaderboardStats.weeklyXP || 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Weekly XP</div>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Level {leaderboardStats.currentLevel || 1} → {(leaderboardStats.currentLevel || 1) + 1}</span>
                  <span>{(leaderboardStats.xpToNextLevel || 0).toLocaleString()} XP to next level</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    style={{
                      width: `${Math.min(100, leaderboardStats.xpToNextLevel > 0 ? ((leaderboardStats.currentLevelXP || 0) / leaderboardStats.xpToNextLevel) * 100 : 0)}%`
                    }}
                  ></div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}


        {/* === ACTIVITY SUMMARY === */}
        {activitySummary && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

            <Card>
              <CardBody className="text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{activitySummary.courses?.total || 0}</p>
                <p className="text-sm text-gray-600">Courses Enrolled</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{activitySummary.courses?.completed || 0}</p>
                <p className="text-sm text-gray-600">Courses Completed</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{activitySummary.applications?.jobs || 0}</p>
                <p className="text-sm text-gray-600">Job Applications</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Briefcase className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">{activitySummary.applications?.internships || 0}</p>
                <p className="text-sm text-gray-600">Internships</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{activitySummary.applications?.scholarships || 0}</p>
                <p className="text-sm text-gray-600">Scholarships</p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <Award className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-emerald-600">{activitySummary.applications?.accepted || 0}</p>
                <p className="text-sm text-gray-600">Accepted</p>
              </CardBody>
            </Card>

          </div>
        )}

        {/* Practice Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardBody className="text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{activitySummary?.practice?.solved || 0}</p>
              <p className="text-sm text-gray-700 font-medium">Problems Solved</p>
              <button
                onClick={() => window.location.href = '/practice/my-solved'}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                View All →
              </button>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardBody className="text-center">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{activitySummary?.practice?.contributions || 0}</p>
              <p className="text-sm text-gray-700 font-medium">Questions Contributed</p>
              <button
                onClick={() => window.location.href = '/practice/my-contributions'}
                className="mt-2 text-xs text-green-600 hover:underline"
              >
                View All →
              </button>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardBody className="text-center">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{activitySummary?.practice?.points || 0}</p>
              <p className="text-sm text-gray-700 font-medium">Total Points</p>
              <p className="text-xs text-gray-600 mt-1">Keep solving!</p>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardBody className="text-center">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{activitySummary?.practice?.approved || 0}</p>
              <p className="text-sm text-gray-700 font-medium">Approved Questions</p>
              <button
                onClick={() => window.location.href = '/practice'}
                className="mt-2 text-xs text-purple-600 hover:underline"
              >
                Start Practicing →
              </button>
            </CardBody>
          </Card>
        </div>


        {/* =========================================
                 TABS
        ========================================== */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: User },
              { key: 'courses', label: 'My Courses', icon: BookOpen },
              { key: 'applications', label: 'Applications', icon: Briefcase },
              { key: 'studyplan', label: 'Study Plan', icon: Calendar },
              { key: 'wishlist', label: 'Wishlist', icon: Heart },
              { key: 'certificates', label: 'Certificates', icon: Award },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>


        {/* =========================================
                 TAB CONTENT
        ========================================== */}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Personal Info */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Mobile Number', value: profile?.mobileNumber },
                    { label: 'Date of Birth', value: profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : null },
                    { label: 'Gender', value: profile?.gender },
                    { label: 'Location', value: profile?.location },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600">{label}:</span>
                      <span className="font-medium">{value || 'Not provided'}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>


            {/* Academic Info */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Academic Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Highest Qualification', value: profile?.highestQualification },
                    { label: 'College/University', value: profile?.collegeName },
                    { label: 'Course/Branch', value: profile?.courseBranch },
                    { label: 'Year of Passing', value: profile?.yearOfPassing },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600">{label}:</span>
                      <span className="font-medium">{value || 'Not provided'}</span>
                    </div>
                  ))}

                  {profile?.academicAchievements && (
                    <div className="pt-3 border-t">
                      <p className="text-gray-600">Achievements:</p>
                      <p className="text-sm">{profile.academicAchievements}</p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>


            {/* Professional Info */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Current Role', value: profile?.currentRole },
                    { label: 'Company', value: profile?.companyName },
                    { label: 'Years of Experience', value: profile?.yearsOfExperience ? `${profile.yearsOfExperience} years` : null },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600">{label}:</span>
                      <span className="font-medium">{value || 'Not provided'}</span>
                    </div>
                  ))}

                  {profile?.skills?.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-gray-600 mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>


            {/* Links */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Links & Resume</h3>
                <div className="space-y-3">
                  {[
                    { label: 'LinkedIn', value: profile?.linkedInProfile, isLink: true },
                    { label: 'GitHub', value: profile?.githubProfile, isLink: true },
                    { label: 'Portfolio', value: profile?.portfolioUrl, isLink: true },
                    { label: 'Resume', value: profile?.resume, isLink: true },
                  ].map(({ label, value, isLink }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600">{label}:</span>
                      {value ? (
                        isLink ? (
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600"
                          >
                            View →
                          </a>
                        ) : (
                          <span>{value}</span>
                        )
                      ) : (
                        <span className="text-gray-500">Not provided</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}


        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {userCourses.length > 0 ? (
              userCourses.map((enrollment) => (
                <Card key={enrollment._id}>
                  <CardBody>
                    <div className="flex items-start gap-4">
                      {enrollment.course?.thumbnail && (
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}

                      <div className="flex-1">
                        <h4 className="font-semibold">{enrollment.course?.title}</h4>
                        <p className="text-sm text-gray-600">{enrollment.course?.description}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <span>Progress: {enrollment.progress}%</span>
                          <span>Status: {enrollment.completed ? 'Completed' : 'In Progress'}</span>
                          <span>Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Card>
                <CardBody className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No courses enrolled yet</p>
                  <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">
                    Browse Courses
                  </button>
                </CardBody>
              </Card>
            )}
          </div>
        )}


        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {userApplications.length > 0 ? (
              userApplications.map((app) => (
                <Card key={app._id}>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{app.job?.title}</h4>
                        <p className="text-gray-600">
                          {app.job?.company} • {app.job?.location}
                        </p>

                        <div className="flex items-center gap-4 text-sm mt-2">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              app.status === 'ACCEPTED'
                                ? 'bg-green-100 text-green-800'
                                : app.status === 'REJECTED'
                                ? 'bg-red-100 text-red-800'
                                : app.status === 'SHORTLISTED'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'REVIEWING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {app.status}
                          </span>

                          <span className="text-gray-500">
                            Applied: {new Date(app.createdAt).toLocaleDateString()}
                          </span>

                          <span className="text-gray-500">Type: {app.job?.type}</span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Card>
                <CardBody className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No job applications yet</p>
                  <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg">
                    Browse Jobs
                  </button>
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {/* STUDY PLAN TAB */}
        {activeTab === 'studyplan' && <StudyPlanPage />}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && <WishlistPage />}

        {/* CERTIFICATES TAB */}
        {activeTab === 'certificates' && <CertificatesPage />}

      </div>

      {/* Modals */}
      {showEditModal && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {showFollowModal && (
        <FollowModal
          userId={profile?._id}
          userName={profile?.name}
          type={showFollowModal}
          onClose={() => setShowFollowModal(null)}
        />
      )}

      {selectedBadge && (
        <BadgeModal
          badge={selectedBadge.badge}
          earned={true}
          earnedAt={selectedBadge.earnedAt}
          onClose={() => setSelectedBadge(null)}
        />
      )}

      {/* All Badges Progress Modal */}
      <AllBadgesProgressModal
        isOpen={showAllBadgesModal}
        onClose={() => setShowAllBadgesModal(false)}
        userId={profile?._id}
      />
    </div>
  );
};

export default UserProfile1;
