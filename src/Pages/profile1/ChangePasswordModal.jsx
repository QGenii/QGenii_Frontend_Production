import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { userProfileApi } from '../../lib/userProfileApi';

const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await userProfileApi.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setSuccess(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to change password:', error);

      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to change password. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Password Changed Successfully!
          </h3>
          <p className="text-gray-600">
            Your password has been updated successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Password Security Tips:
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Use a mix of uppercase and lowercase letters</li>
              <li>• Include numbers and special characters</li>
              <li>• Avoid using personal information</li>
              <li>• Make it at least 8 characters long</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
