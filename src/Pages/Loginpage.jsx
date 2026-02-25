import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';



export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreeToTerms) {
      setError('Please agree to Terms and Privacy Policy');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: 'USER',
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="bg-white shadow-md rounded-md max-w-md w-full p-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => switchTab('signup')}
          >
            SIGN UP
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => switchTab('login')}
          >
            LOGIN
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        {activeTab === 'login' ? (
          // Login Form
          <form onSubmit={handleLogin}>
            <p className="mb-4 text-gray-700">Already have an account?</p>
            <button
              type="button"
              className="w-full flex items-center justify-center border px-4 py-2 mb-4 rounded hover:bg-gray-50"
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 mr-2" />
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-t" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Email: *</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Password: *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
                  onClick={togglePassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleRegister}>
            <button
              type="button"
              className="w-full flex items-center justify-center border px-4 py-2 mb-4 rounded hover:bg-gray-50"
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 mr-2" />
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-t" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Full Name: *</label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                minLength={2}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Email: *</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-sm">Password: *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
                  onClick={togglePassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div className="mb-4 flex items-start">
              <input
                type="checkbox"
                className="mr-2 mt-1"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <label className="text-sm">
                I agree to <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'REGISTER'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
