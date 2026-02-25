import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User, BookOpen, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                QGenii
              </span>
            </Link>

            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>

                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
