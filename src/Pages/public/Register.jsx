import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
// import { Input } from '../../Components/ui/Input';
import { Select } from '../../Components/ui/Select';
// import { Button } from '../../Components/ui/Button';
// import { Container } from '../../Components/layout/Container';
import { BookOpen } from 'lucide-react';
import { Input } from '../../Components/ui/Input';
import { Button } from '../../Components/ui/Button';
import { Container } from '../../Components/layout/Container';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'USER', label: 'Student' },
    { value: 'MENTOR', label: 'Mentor' },
    { value: 'HIRING_PARTNER', label: 'Hiring Partner' },
    { value: 'OTHER', label: 'Other' },
  ];

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join QGenii and start learning</p>
        </div>

        <div className="card">
          <div className="p-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <Select
                label="I want to join as"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
              />

              {(formData.role === 'MENTOR' || formData.role === 'HIRING_PARTNER') && (
                <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800">
                  Your account will require admin approval before you can access all features.
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
