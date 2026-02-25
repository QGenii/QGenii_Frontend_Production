import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Search, Heart, ShoppingCart, Book, User, Menu, X, Globe, 
  Settings, Users, BookOpen, BarChart3, Home, LogOut
} from 'lucide-react';
import codeiqgeniuslogo from "../../assets/Navbar/codeiqgeniuslogo.jpg";
import QGeniiLogo from '../ui/QGeniiLogo';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin, isSuperAdmin, isMentor } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const modalRef = useRef();
  const sidebarRef = useRef();

  // List of routes where login/signup should be shown
  const showAuthRoutes = ["/"];
  const showAuth = showAuthRoutes.includes(location.pathname);

  // List of routes where the bottom header should be disabled
  const disableBottomHeader = ['/coursecatalog', '/coursecatalog/learnpython', '/roadmaps/pythonroadmap', '/practicetests/python'];
  const hideBottomHeader = disableBottomHeader.includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowMobileSidebar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowProfileModal(false);
  };

  const getDashboardRoute = () => {
    if (isSuperAdmin()) return '/dashboard';
    if (isAdmin()) return '/dashboard';
    if (isMentor()) return '/mentor/dashboard';
    if (user?.role === 'HIRING_PARTNER') return '/dashboard';
    return '/user/dashboard';
  };

  const getDashboardTitle = () => {
    if (isSuperAdmin()) return 'Super Admin Dashboard';
    if (isAdmin()) return 'Admin Dashboard';
    if (isMentor()) return 'Mentor Dashboard';
    if (user?.role === 'HIRING_PARTNER') return 'Hiring Partner Dashboard';
    return 'My Dashboard';
  };

  const getUserRoleColor = () => {
    if (isSuperAdmin()) return 'text-purple-600 bg-purple-50';
    if (isAdmin()) return 'text-green-600 bg-green-50';
    if (isMentor()) return 'text-blue-600 bg-blue-50';
    if (user?.role === 'HIRING_PARTNER') return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getMobileMenuItems = () => {
    const baseItems = [
      { label: 'HOME', path: '/', icon: Home },
      { label: 'JOB PORTAL', path: '/jobs', icon: BookOpen },
      { label: 'BLOG', path: 'https://codeiqgenius-frontend-nitesh.vercel.app/blog', icon: BookOpen, external: true },
      { label: 'PARTNERSHIP', path: 'https://codeiqgenius-frontend-nitesh.vercel.app/partnership', icon: Users, external: true },
      { label: 'CONTACT US', path: '/contact', icon: Settings }
    ];

    if (user) {
      const dashboardItem = {
        label: getDashboardTitle().toUpperCase(),
        path: getDashboardRoute(),
        icon: BarChart3,
        highlight: true
      };
      const profileItem = {
        label: 'MY PROFILE',
        path: '/profile',
        icon: User
      };
      return [...baseItems, dashboardItem, profileItem];
    }

    return baseItems;
  };

  return (
    <header className="w-full font-sans text-sm">
      {/* --- TOP BAR --- */}
      <div className="border-b shadow-sm h-16 flex items-center justify-between relative">
        <div className="flex justify-between items-center w-full h-16 px-4 md:px-5">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <QGeniiLogo />
            </Link>
          </div>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-between pr-10 w-[50rem] gap-[1.5rem] xl:gap-[3rem]">
            <span className="text-black font-bold text-lg xl:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center">
              <Link to='/'>HOME</Link>
            </span>
            <h4 className="text-black font-bold text-lg xl:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center">
              <Link to='/jobs'>JOBS</Link>
            </h4>
            <h4 
              className="text-black font-bold text-lg xl:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" 
              onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/blog')}
            >
              BLOG
            </h4>
            <h4 
              className="text-black font-bold text-lg xl:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" 
              onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/partnership')}
            >
              PARTNERSHIP
            </h4>
            <h4 className="text-black font-bold text-lg xl:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center text-nowrap">
              <Link to='/contact'>CONTACT US</Link>
            </h4>
          </div>

          {/* Auth buttons - show login/signup when not logged in, dashboard/logout when logged in */}
          <div className="hidden md:flex items-center justify-end gap-3">
            {!user ? (
              <>
                <button
                  className="border-blue-900 text-blue-900 px-2 py-1.5 rounded-md text-sm font-semibold w-[5rem] text-center space-x-2 border hover:bg-blue-50 transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button
                  className="bg-blue-900 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-800 transition-colors"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${getUserRoleColor()} border`}
                  onClick={() => navigate(getDashboardRoute())}
                >
                  {isSuperAdmin() ? 'Super Admin' : isAdmin() ? 'Admin Panel' : isMentor() ? 'Mentor Hub' : user?.role === 'HIRING_PARTNER' ? 'Hiring Portal' : 'Dashboard'}
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden cursor-pointer p-2" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* --- MIDDLE BAR --- */}
      <div className="bg-[#0288E7] w-full">
        <div className="flex items-center h-[56px] px-2 md:px-0 justify-between md:justify-center gap-2 md:gap-[1rem]">
          {/* Try Out button and Search bar group */}
          <div className="flex items-center justify-center gap-2 md:gap-[3rem] flex-1 md:flex-none">
            <div className="flex items-center w-full md:min-w-[500px] pl-2 md:pl-8">
              <button 
                className="text-white font-semibold px-3 md:px-5 py-2 text-sm md:text-lg bg-[#0288E7] rounded-full mr-2 md:mr-4 focus:outline-none hover:bg-blue-600 transition-colors whitespace-nowrap" 
                style={{ fontWeight: 600, minWidth: '80px' }}
              >
                Try Out
              </button>
              <div className="relative bg-white rounded-full shadow-sm w-full md:w-[340px] flex items-center h-10 md:h-12">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-black w-4 md:w-5 h-4 md:h-5" />
                <input
                  type="text"
                  placeholder="Search for something"
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 rounded-full border-none outline-none text-black text-sm md:text-lg placeholder:text-gray-500 h-10 md:h-12"
                  style={{ fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Center nav links - Hidden on mobile and tablet */}
            <div className="hidden xl:flex items-start gap-4 lg:gap-8 text-nowrap justify-flex-start w-[500px] lg:w-[700px] mx-auto text-[#f1f1f1]">
              <h4 className="font-semibold text-lg xl:text-xl cursor-pointer hover:underline flex-1 text-center">
                Compiler
              </h4>
              <h4 
                className="font-semibold text-lg xl:text-xl cursor-pointer hover:underline flex-1 text-center" 
                onClick={() => navigate('/')}
              >
                QGenii Business
              </h4>
              <h4 className="font-semibold text-lg xl:text-xl cursor-pointer hover:underline flex-1 text-center">
                Teach On QGenii
              </h4>
              <h4 className="font-semibold text-lg xl:text-xl cursor-pointer hover:underline flex-1 text-center">
                <Link to='/mystudying'>My Studying</Link>
              </h4>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-10">
            <ShoppingCart className="text-white w-5 md:w-6 h-5 md:h-6 cursor-pointer hover:text-gray-200" />
            
            {/* Show profile options when logged in */}
            {user && (
              <div className="flex items-center justify-center px-1 gap-4 md:gap-6 lg:gap-8">
                <Heart className="text-white w-5 md:w-6 h-5 md:h-6 cursor-pointer hover:text-gray-200" />
                <Book className="text-white w-5 md:w-6 h-5 md:h-6 cursor-pointer hover:text-gray-200" />
                
                {/* User Profile */}
                <div
                  className="bg-[#E6E9ED] rounded-full w-10 md:w-15 h-10 md:h-11 flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
                  onClick={() => setShowProfileModal(!showProfileModal)}
                >
                  <div className="w-8 md:w-[3rem] h-8 md:h-[2rem] rounded-full md:rounded-[1.875rem] flex items-center justify-center">
                    <User className="w-4 md:w-[1.25rem] h-4 md:h-[1.25rem]" />
                  </div>
                  
                  {/* Profile Modal */}
                  {showProfileModal && (
                    <div
                      ref={modalRef}
                      className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-xl text-gray-800 z-50"
                    >
                      <div className="px-4 py-3 border-b font-semibold text-sm bg-gray-50 flex items-center justify-between">
                        <span>← My Profile</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getUserRoleColor()}`}>
                          {user.role?.toLowerCase() || 'user'}
                        </span>
                      </div>
                      <ul className="p-4 space-y-3 text-sm">
                        {/* Dashboard - Made more prominent with role-based styling */}
                        <li 
                          className={`flex justify-between items-center cursor-pointer hover:opacity-80 font-semibold px-3 py-2 rounded-md ${getUserRoleColor()}`}
                          onClick={() => {
                            navigate(getDashboardRoute());
                            setShowProfileModal(false);
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            {getDashboardTitle()}
                          </span>
                        </li>
                        <hr />
                        <li 
                          className="cursor-pointer hover:text-blue-600 flex items-center gap-2"
                          onClick={() => {
                            navigate('/profile');
                            setShowProfileModal(false);
                          }}
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </li>
                        <li className="cursor-pointer hover:text-blue-600">Language Selector</li>
                        <li className="cursor-pointer hover:text-blue-600">Wishlist</li>
                        <hr />
                        <li className="font-semibold text-gray-900">Subscription</li>
                        <li>
                          <Link to="/manage/contests" className="cursor-pointer hover:text-blue-600">My Contests</Link>
                        </li>
                        <li className="cursor-pointer hover:text-blue-600">My Certificates</li>
                        <li className="cursor-pointer hover:text-blue-600">Notifications</li>
                        <li className="cursor-pointer hover:text-blue-600">Messages</li>
                        <li className="cursor-pointer hover:text-blue-600">Code IQ Credits</li>
                        <li className="cursor-pointer hover:text-blue-600">Purchase history</li>
                        <li className="cursor-pointer hover:text-blue-600">Code IQ Business</li>
                        <li className="cursor-pointer hover:text-blue-600">Payment Methods</li>
                        <li className="cursor-pointer hover:text-blue-600">Invite friends</li>
                        <li className="cursor-pointer hover:text-blue-600">Help & Support</li>
                        <li className="cursor-pointer hover:text-blue-600">Get the app</li>
                        <li className="pt-2 border-t">
                          <button 
                            className="mt-2 w-full bg-red-600 text-white font-medium text-sm py-2 rounded hover:bg-red-700 transition-colors"
                            onClick={handleLogout}
                          >
                            🚪 Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Show globe icon when not logged in on home page */}
            {showAuth && !user && (
              <div className="flex items-center justify-start space-x-4 md:space-x-8 pr-2 md:pr-8">
                <Globe className="w-5 md:w-[24px] h-5 md:h-[24px] text-white cursor-pointer hover:opacity-80 transition-opacity" />
              </div>
            )}
          </div>
        </div>

        {/* --- BOTTOM NAVIGATION --- */}
        {!hideBottomHeader && (
          <div className="bg-slate-800 text-white text-sm font-normal space-x-20">
            <div className="max-w-[90%] mx-auto py-3 overflow-x-auto">
              <div className="flex justify-center gap-20 text-center text-base whitespace-nowrap text-white">
                <h4 
                  className="cursor-pointer text-white hover:text-blue-300" 
                  onClick={() => (window.location.href = 'https://codeiqgenius-frontend-g17v.vercel.app/coursecatalog')}
                >
                  All courses
                </h4>
                <h4 className="cursor-pointer text-white hover:text-blue-300">Study Plan</h4>
                <h4 className="cursor-pointer text-white hover:text-blue-300">Practice</h4>
                <h4 className="cursor-pointer text-white hover:text-blue-300">
                  <Link to='/contests'>Contest</Link>
                </h4>
                <h4 className="cursor-pointer text-white hover:text-blue-300">
                  <Link to='/jobs'>Job Portal</Link>
                </h4>
                <h4 className="cursor-pointer text-white hover:text-blue-300">
                  <Link to='/blogs'>Blogs</Link>
                </h4>
                <h4 className="cursor-pointer text-white hover:text-blue-300">Community</h4>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic breadcrumb sections based on route */}
        {location.pathname === '/coursecatalog' && (
          <div className="bg-[#0a2a72] text-white px-6 py-6 text-sm font-medium">
            <span className="text-white font-semibold">Catalog</span>
            <span className="text-gray-300"> / All Courses Catalog</span>
          </div>
        )}

        {location.pathname === '/coursecatalog/learnpython' && (
          <div className="bg-[#0a2a72] text-white px-6 py-6 text-sm font-medium">
            <span className="text-white font-semibold underline">Catalog</span> &nbsp; &nbsp; 
            <span className="text-gray-300 font-semibold underline"> / All Courses Catalog</span> &nbsp; &nbsp; 
            <span className="text-gray-300 font-semibold underline">/ Topics</span> &nbsp; &nbsp;
            <span className="text-gray-300 font-semibold underline"> / Learn Python</span> &nbsp; &nbsp;
            <span className="text-gray-300 font-semibold underline"> / Learn Python Programming</span>
          </div>
        )}

        {location.pathname === '/roadmaps/pythonroadmap' && (
          <div className="bg-[#0a2a72] text-white px-6 py-6 text-sm font-medium">
            <span className="text-white font-semibold underline">All Catalog</span> &nbsp; &nbsp;
            <span className="text-gray-300 font-semibold underline"> / Catalog</span> &nbsp; &nbsp;
            <span className="text-gray-300 font-semibold underline">/ All Roadmaps</span> &nbsp; &nbsp;
            <span className="text-gray-300 font-semibold underline"> / Python With Beginner DSA</span>
          </div>
        )}

        {location.pathname === '/practicetests/python' && (
          <div className="bg-blue-800 py-2 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center text-sm">
                <Link to="/courses/allCourses" className="text-white opacity-80 hover:opacity-100">All Courses</Link>
                <span className="mx-2 text-white opacity-60">›</span>
                <Link to="/coursecatalog" className="text-white opacity-80 hover:opacity-100">Catalog</Link>
                <span className="mx-2 text-white opacity-60">›</span>
                <Link to="/courses/allCourses" onClick={() => console.log("hello")} className="text-white opacity-80 hover:opacity-100">Skill Tests</Link>
                <span className="mx-2 text-white opacity-60">›</span>
                <span className="text-white">Python Quiz</span>
              </div>
            </div>
          </div>
        )}

        {location.pathname === '/module-test/python/output-print' && (
          <div className="bg-[#003478] px-8 py-1.5 flex items-center gap-2 text-white text-sm">
            <Link to="/all-courses" className="text-white hover:underline">All Courses</Link>
            <span>&gt;</span>
            <Link to="/catalog" className="text-white hover:underline">Catalog</Link>
            <span>&gt;</span>
            <Link to="/topics" className="text-white hover:underline">Topics</Link>
            <span>&gt;</span>
            <Link to="/learn-python" className="text-white hover:underline">Learn Python</Link>
            <span>&gt;</span>
            <Link to="/learn-python-programming" className="text-white hover:underline">Learn Python Programming</Link>
            <span>&gt;</span>
            <span className="text-white">Module Test: Output / Print in Python</span>
          </div>
        )}

        {location.pathname === '/learn-python/print-lesson' && (
          <div className="bg-[#003478] text-white py-2 px-8">
            <div className="container mx-auto flex items-center text-sm">
              <Link to="/all-courses" className="hover:underline">All Courses</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/catalog" className="hover:underline">Catalog</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/topics" className="hover:underline">Topics</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/learn-python" className="hover:underline">Learn Python</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/learn-python-programming" className="hover:underline">Learn Python Programming</Link>
              <span className="mx-2">&gt;</span>
              <span>Module Test: Output / Print in Python</span>
            </div>
          </div>
        )}

        {location.pathname === '/module-test/python-output-print' && (
          <div className="bg-[#003478] text-white py-2 px-8">
            <div className="flex items-center text-sm">
              <Link to="/all-courses" className="hover:underline">All Courses</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/catalog" className="hover:underline">Catalog</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/topics" className="hover:underline">Topics</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/learn-python" className="hover:underline">Learn Python</Link>
              <span className="mx-2">&gt;</span>
              <Link to="/learn-python-programming" className="hover:underline">Learn Python Programming</Link>
              <span className="mx-2">&gt;</span>
              <span>Module Test: Output / Print in Python</span>
            </div>
          </div>
        )}
      </div>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {showMobileSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div 
            ref={sidebarRef}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
              <div className="flex items-center gap-3">
                <QGeniiLogo className="w-8 h-8" />
                <span className="text-lg font-bold">QGenii</span>
              </div>
              <button 
                onClick={() => setShowMobileSidebar(false)}
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info Section */}
            {user && (
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
                    <p className="text-sm text-gray-600 capitalize">{user.role?.toLowerCase() || 'User'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {getMobileMenuItems().map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index}>
                      {item.external ? (
                        <button
                          onClick={() => {
                            window.location.href = item.path;
                            setShowMobileSidebar(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            item.highlight 
                              ? 'bg-blue-50 text-blue-700 font-semibold' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setShowMobileSidebar(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            item.highlight 
                              ? 'bg-blue-50 text-blue-700 font-semibold' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Quick Actions */}
                <div className="pt-4 mt-4 border-t">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</p>
                  <Link
                    to="/mystudying"
                    onClick={() => setShowMobileSidebar(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <BookOpen className="w-5 h-5" />
                    My Studying
                  </Link>
                  <button
                    onClick={() => {
                      // Add search functionality here
                      setShowMobileSidebar(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <Search className="w-5 h-5" />
                    Search Courses
                  </button>
                </div>
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="border-t p-4">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileSidebar(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate('/login');
                      setShowMobileSidebar(false);
                    }}
                    className="w-full px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register');
                      setShowMobileSidebar(false);
                    }}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}