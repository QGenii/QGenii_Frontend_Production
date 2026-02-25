import { useState, useEffect } from 'react';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import { userProfileApi } from '../../lib/userProfileApi';
import { User, Settings, BookOpen, Briefcase, Award, Camera, Heart, Calendar } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangePasswordInline from './ChangePasswordInline';
import WishlistPage from './WishlistPage';
import CertificatesPage from './CertificatesPage';
import StudyPlanPage from './StudyPlanPage';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activitySummary, setActivitySummary] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [userApplications, setUserApplications] = useState([]);

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
              </div>
            </div>
          </CardBody>
        </Card>


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
              { key: 'security', label: 'Security', icon: Settings },
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

        {/* SECURITY TAB (Reset Password) */}
        {activeTab === 'security' && (
          <div>
            <ChangePasswordInline />
          </div>
        )}

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
    </div>
  );
};

export default UserProfile;
