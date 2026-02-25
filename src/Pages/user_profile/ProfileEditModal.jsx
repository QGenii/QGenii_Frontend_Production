import { useState } from 'react';
import { X } from 'lucide-react';
import { userProfileApi } from '../../lib/userProfileApi';
import LanguageSelector from '../../Components/LanguageSelector';

const ProfileEditModal = ({ profile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    dateOfBirth: profile?.dateOfBirth
      ? new Date(profile.dateOfBirth).toISOString().split('T')[0]
      : '',
    gender: profile?.gender || '',
    mobileNumber: profile?.mobileNumber || '',
    preferredLanguage: profile?.preferredLanguage || 'english',
    highestQualification: profile?.highestQualification || '',
    collegeName: profile?.collegeName || '',
    courseBranch: profile?.courseBranch || '',
    yearOfPassing: profile?.yearOfPassing || '',
    academicAchievements: profile?.academicAchievements || '',
    currentRole: profile?.currentRole || '',
    companyName: profile?.companyName || '',
    yearsOfExperience: profile?.yearsOfExperience || 0,
    skills: profile?.skills ? profile.skills.join(', ') : '',
    linkedInProfile: profile?.linkedInProfile || '',
    githubProfile: profile?.githubProfile || '',
    portfolioUrl: profile?.portfolioUrl || '',
    interests: profile?.interests ? profile.interests.join(', ') : '',
    resume: profile?.resume || '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleLanguageChange = (language) => {
    setFormData((prev) => ({
      ...prev,
      preferredLanguage: language,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (
      formData.yearOfPassing &&
      (formData.yearOfPassing < 1950 ||
        formData.yearOfPassing > new Date().getFullYear() + 10)
    ) {
      newErrors.yearOfPassing = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await userProfileApi.updateUserProfile(formData);
      onUpdate(response.data.data.user);
    } catch (error) {
      console.error('Failed to update profile:', error);
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              📝 Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="City, State, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Language
                </label>
                <LanguageSelector
                  value={formData.preferredLanguage}
                  onChange={handleLanguageChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio/About Me
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell something about yourself..."
              />
            </div>
          </div>

          {/* Academic Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              🎓 Academic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Highest Qualification
                </label>
                <input
                  type="text"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Bachelor's, Master's, PhD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College/University Name
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter college/university name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course/Branch
                </label>
                <input
                  type="text"
                  name="courseBranch"
                  value={formData.courseBranch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Computer Science, MBA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Passing
                </label>
                <input
                  type="number"
                  name="yearOfPassing"
                  value={formData.yearOfPassing}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 2024"
                  min="1950"
                  max={new Date().getFullYear() + 10}
                />
                {errors.yearOfPassing && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.yearOfPassing}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Achievements (optional)
              </label>
              <textarea
                name="academicAchievements"
                value={formData.academicAchievements}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Awards, honors, publications, etc."
              />
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              💼 Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Role
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Software Engineer, Student"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Organization Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0"
                  min="0"
                  max="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="JavaScript, React, Node.js, Python"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate skills with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedInProfile"
                  value={formData.linkedInProfile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  name="githubProfile"
                  value={formData.githubProfile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              📄 Other Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Technology, Sports, Music, Reading"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate interests with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume/CV
                </label>
                <input
                  type="url"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="URL to your resume/CV"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
