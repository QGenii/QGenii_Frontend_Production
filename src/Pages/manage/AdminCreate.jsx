import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Input } from '../../Components/ui/Input';
import { Select } from '../../Components/ui/Select';
import { Button } from '../../Components/ui/Button';
import api from '../../lib/api';
import { Shield, ArrowLeft, AlertCircle } from 'lucide-react';

export const AdminCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ADMIN',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      await api.post('/admin/users', payload);
      alert(`${formData.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'} created successfully!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create admin:', error);
      alert(error.response?.data?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Admin</h1>
              <p className="text-gray-600 mt-1">Add a new administrator to the platform</p>
            </div>
          </div>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Admin Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary-600" />
                  Admin Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., John Doe"
                    required
                  />

                  <Input
                    label="Email Address *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., admin@qgenii.com"
                    required
                  />

                  <Select
                    label="Admin Role *"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    options={roleOptions}
                    required
                  />
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Set Password</h3>
                <div className="space-y-4">
                  <Input
                    label="Password *"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    required
                  />

                  <Input
                    label="Confirm Password *"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </div>

              {/* Role Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Role Permissions
                </h4>
                {formData.role === 'SUPER_ADMIN' ? (
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Full access to all platform features</li>
                    <li>✓ Create, edit, and delete admins</li>
                    <li>✓ Manage all users, categories, and courses</li>
                    <li>✓ Cannot be blocked or deleted by regular admins</li>
                    <li>✓ Access to system configuration and settings</li>
                    <li>✓ View all audit logs and activity reports</li>
                  </ul>
                ) : (
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Manage users (approve, block, monitor activity)</li>
                    <li>✓ Create, edit, and delete categories</li>
                    <li>✓ Manage and approve courses</li>
                    <li>✓ Review and approve mentor applications</li>
                    <li>✓ View platform analytics and statistics</li>
                    <li>✗ Cannot manage Super Admins</li>
                  </ul>
                )}
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800 mb-1">Important Notice</p>
                    <p className="text-sm text-yellow-700">
                      Admin accounts have elevated privileges. Create strong passwords and only grant admin access to trusted individuals. All admin actions are logged for security purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Create Admin
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
