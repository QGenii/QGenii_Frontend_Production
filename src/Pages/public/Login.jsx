import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../Components/ui/Input';
import { Button } from '../../Components/ui/Button';
import { Container } from '../../Components/layout/Container';
// import { Container } from 'react-bootstrap';

import { BookOpen } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your QGenii account</p>
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
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
