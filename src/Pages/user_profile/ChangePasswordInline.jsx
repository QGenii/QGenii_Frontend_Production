import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { userProfileApi } from '../../lib/userProfileApi';

const ChangePasswordInline = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((p) => ({ ...p, [field]: !p[field] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    else if (formData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await userProfileApi.changePassword({ currentPassword: formData.currentPassword, newPassword: formData.newPassword });
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(false), 2500);
    } catch (error) {
      console.error('Failed to change password:', error);
      if (error.response?.data?.message) setErrors({ submit: error.response.data.message });
      else setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Password Changed</h3>
        <p className="text-sm text-gray-600">Your password was updated successfully.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Reset / Change Password</h3>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
          <div className="relative">
            <input
              name="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="button" onClick={() => togglePasswordVisibility('current')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <div className="relative">
            <input
              name="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="button" onClick={() => togglePasswordVisibility('new')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50">
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordInline;
