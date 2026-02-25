import codeiqgeniuslogo from "../../assets/Navbar/codeiqgeniuslogo.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X, Globe } from "lucide-react";

export default function Header() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const disabledRoutes = ["/"];
  const disablelogin = disabledRoutes.includes(location.pathname);

  const disableHeaderRoutes = [
    "/coursecatalog",
    "/coursecatalog/learnpython",
    "/roadmaps/pythonroadmap",
    "/practicetests/python",
  ];
  const disableHeader1 = disableHeaderRoutes.includes(location.pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close profile modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const item = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.27148 18.346C4.27148 18.346 6.50048 15.5 12.0005 15.5C17.5005 15.5 19.7305 18.346 19.7305 18.346M12.0005 12C12.7961 12 13.5592 11.6839 14.1218 11.1213C14.6844 10.5587 15.0005 9.79565 15.0005 9C15.0005 8.20435 14.6844 7.44129 14.1218 6.87868C13.5592 6.31607 12.7961 6 12.0005 6C11.2048 6 10.4418 6.31607 9.87916 6.87868C9.31655 7.44129 9.00048 8.20435 9.00048 9C9.00048 9.79565 9.31655 10.5587 9.87916 11.1213C10.4418 11.6839 11.2048 12 12.0005 12Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: <Link to="/profile">My Profile</Link>,
    },
    { icon: null, title: "Language Selector" },
    { icon: null, title: "Wishlist" },
    { icon: null, title: "Notifications" },
    { icon: null, title: "Organizer Panel" },
    { icon: null, title: "My jobs / internships" },
    { icon: null, title: "My Opportunities" },
    { icon: null, title: "My rounds" },
    { icon: null, title: "Certifications" },
    { icon: null, title: "My Referrals" },
    { icon: null, title: "Registration & Application" },
    { icon: null, title: "My Studying" },
    { title: <h4 className="text-[#2800AE] font-[Poppins] text-base font-normal leading-normal">Billing & Subscriptions</h4> },
    { icon: null, title: "Subscription" },
    { icon: null, title: "QGenii Credits" },
    { icon: null, title: "Purchase History" },
    { icon: null, title: "QGenii Business Pro" },
    { icon: null, title: "QGenii Pro" },
    { title: <h4 className="text-[#2800AE] text-[1rem] font-normal">Privacy Setting</h4> },
    { icon: null, title: "Change Password" },
    { icon: null, title: "Change Username" },
    { icon: null, title: "Update Email Preferences" },
    { title: <h4 className="text-[#2800AE] text-[1rem] font-normal">Community</h4> },
    { icon: null, title: "Invite Friends" },
    { icon: null, title: "Help & Support" },
    { title: <h4 className="text-[#2800AE] text-[1rem] font-normal">Others</h4> },
    { icon: null, title: "Get The App" },
    { icon: null, title: "Delete Account" },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16.47 9.53082C16.3375 9.38865 16.2654 9.2006 16.2688 9.0063C16.2723 8.812 16.351 8.62662 16.4884 8.4892C16.6258 8.35179 16.8112 8.27308 17.0055 8.26965C17.1998 8.26622 17.3878 8.33834 17.53 8.47082L20.53 11.4708C20.6705 11.6114 20.7493 11.8021 20.7493 12.0008C20.7493 12.1996 20.6705 12.3902 20.53 12.5308L17.53 15.5308C17.3878 15.6633 17.1998 15.7354 17.0055 15.7319C16.8112 15.7285 16.6258 15.6498 16.4884 15.5124C16.351 15.375 16.2723 15.1896 16.2688 14.9953C16.2654 14.801 16.3375 14.613 16.47 14.4708L18.19 12.7508H10C9.80109 12.7508 9.61032 12.6718 9.46967 12.5312C9.32902 12.3905 9.25 12.1997 9.25 12.0008C9.25 11.8019 9.32902 11.6111 9.46967 11.4705C9.61032 11.3298 9.80109 11.2508 10 11.2508H18.19L16.47 9.53082Z" fill="#1E1E1E" />
        </svg>
      ),
      title: "Logout",
    },
  ];

  return (
    <header className="w-full font-sans text-sm relative z-50">
      {/* ===== TOP BAR ===== */}
      <div className="border-b shadow-sm bg-white">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <img
              src={codeiqgeniuslogo}
              alt="CodeIQ Genius"
              style={{
                maxWidth: "150px",
                maxHeight: "41px",
                width: "auto",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(40,0,174,0.08)",
              }}
              className="transition-all duration-300"
            />
          </div>

          {/* Desktop center nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              to="/home"
              className="text-black font-bold text-base lg:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide"
            >
              HOME
            </Link>
            <span
              className="text-black font-bold text-base lg:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide"
              onClick={() => (window.location.href = "https://codeiqgenius-frontend-nitesh.vercel.app/blog")}
            >
              BLOG
            </span>
            <span
              className="text-black font-bold text-base lg:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide"
              onClick={() => (window.location.href = "https://codeiqgenius-frontend-nitesh.vercel.app/partnership")}
            >
              PARTNERSHIP
            </span>
            <span
              className="text-black font-bold text-base lg:text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide whitespace-nowrap"
              onClick={() => (window.location.href = "https://codeiqgenius-frontend-nitesh.vercel.app/contact-us")}
            >
              CONTACT US
            </span>
          </nav>

          {/* Desktop Login/Signup — show only on homepage */}
          {disablelogin && (
            <div className="hidden md:flex items-center gap-3">
              <button
                className="border border-blue-900 text-blue-900 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="bg-blue-900 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-800 transition-colors"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-3 shadow-md">
            <Link
              to="/home"
              className="block text-black font-bold text-lg hover:text-blue-600 uppercase"
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </Link>
            <span
              className="block text-black font-bold text-lg hover:text-blue-600 cursor-pointer uppercase"
              onClick={() => { setMenuOpen(false); window.location.href = "https://codeiqgenius-frontend-nitesh.vercel.app/blog"; }}
            >
              BLOG
            </span>
            <span
              className="block text-black font-bold text-lg hover:text-blue-600 cursor-pointer uppercase"
              onClick={() => { setMenuOpen(false); window.location.href = "https://codeiqgenius-frontend-nitesh.vercel.app/partnership"; }}
            >
              PARTNERSHIP
            </span>
            <span
              className="block text-black font-bold text-lg hover:text-blue-600 cursor-pointer uppercase"
              onClick={() => { setMenuOpen(false); window.location.href = "https://codeiqgenius-frontend-nitesh.vercel.app/contact-us"; }}
            >
              CONTACT US
            </span>

            {/* Mobile middle bar links */}
            <hr className="my-2" />
            <span className="block text-gray-700 font-semibold text-base hover:text-blue-600 cursor-pointer">Compiler</span>
            <span
              className="block text-gray-700 font-semibold text-base hover:text-blue-600 cursor-pointer"
              onClick={() => { setMenuOpen(false); navigate("/"); }}
            >
              QGenii Business
            </span>
            <span className="block text-gray-700 font-semibold text-base hover:text-blue-600 cursor-pointer">Teach On QGenii</span>
            <Link
              to="/mystudying"
              className="block text-gray-700 font-semibold text-base hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              My Studying
            </Link>

            {/* Mobile Login/Signup */}
            {disablelogin && (
              <div className="flex gap-3 pt-2">
                <button
                  className="flex-1 border border-blue-900 text-blue-900 py-2 rounded-md text-sm font-semibold"
                  onClick={() => { setMenuOpen(false); navigate("/login"); }}
                >
                  Log In
                </button>
                <button
                  className="flex-1 bg-blue-900 text-white py-2 rounded-md text-sm font-semibold"
                  onClick={() => { setMenuOpen(false); navigate("/signup"); }}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Bottom bar links in mobile */}
            <hr className="my-2" />
            <div className="grid grid-cols-3 gap-2 pb-2">
              {["All courses", "Study Plan", "Practice", "Contest", "Community"].map((item) => (
                <span key={item} className="text-white bg-slate-700 rounded px-2 py-1 text-center text-sm cursor-pointer hover:bg-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== MIDDLE BAR (Blue) ===== */}
      <div className="bg-[#0288E7] w-full">
        <div className="flex flex-wrap items-center min-h-[56px] px-4 gap-3 justify-between">
          {/* Try Out + Search */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              className="text-white font-semibold px-4 py-2 text-base bg-[#0288E7] rounded-full focus:outline-none whitespace-nowrap border border-white/30 hover:bg-white/10 transition-colors"
            >
              Try Out
            </button>
            <div className="relative bg-white rounded-full shadow-sm flex items-center h-10 w-[200px] md:w-[280px] lg:w-[340px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="text-black w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search for something"
                className="w-full pl-10 pr-3 py-2 rounded-full border-none outline-none text-black text-sm placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-[#f1f1f1] flex-1 justify-center">
            <span className="font-semibold text-base lg:text-xl cursor-pointer hover:underline whitespace-nowrap">Compiler</span>
            <span
              className="font-semibold text-base lg:text-xl cursor-pointer hover:underline whitespace-nowrap"
              onClick={() => navigate("/")}
            >
              QGenii Business
            </span>
            <span className="font-semibold text-base lg:text-xl cursor-pointer hover:underline whitespace-nowrap">Teach On QGenii</span>
            <Link to="/mystudying" className="font-semibold text-base lg:text-xl cursor-pointer hover:underline whitespace-nowrap text-[#f1f1f1]">
              My Studying
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4 ml-auto">
            <ShoppingCart className="text-white w-5 h-5 cursor-pointer hover:text-gray-200" />

            {!disablelogin && (
              <>
                <Heart className="text-white w-5 h-5 cursor-pointer hover:text-gray-200" />
                <IoMdNotificationsOutline className="text-white w-5 h-5 cursor-pointer hover:text-gray-200" />

                {/* Profile icon + dropdown */}
                <div
                  className="bg-[#E6E9ED] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
                  onClick={() => setShowProfileModal(!showProfileModal)}
                >
                  <User className="w-5 h-5" />

                  {/* Profile Modal */}
                  {showProfileModal && (
                    <div
                      ref={modalRef}
                      className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-xl text-gray-800 z-50"
                    >
                      <aside className="flex flex-col items-center gap-2 shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] w-72 max-h-[80vh] px-6 py-8 overflow-y-auto">
                        <div className="flex w-full gap-2 p-2 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 1.25C10.7403 1.25 9.5321 1.75044 8.6413 2.64124C7.7505 3.53204 7.25006 4.74022 7.25006 6C7.25006 7.25978 7.7505 8.46796 8.6413 9.35876C9.5321 10.2496 10.7403 10.75 12.0001 10.75C13.2598 10.75 14.468 10.2496 15.3588 9.35876C16.2496 8.46796 16.7501 7.25978 16.7501 6C16.7501 4.74022 16.2496 3.53204 15.3588 2.64124C14.468 1.75044 13.2598 1.25 12.0001 1.25Z" fill="#2800AE" />
                          </svg>
                          <h4 className="text-[#2800AE] text-[1rem] font-normal">Account</h4>
                        </div>

                        {item.map((items, idx) => (
                          <span
                            key={idx}
                            onClick={() => {
                              if (
                                items.title === "Logout" ||
                                (typeof items.title === "string" && items.title.toLowerCase().includes("logout"))
                              ) {
                                logout();
                              }
                            }}
                            className="flex items-center gap-2 p-2 rounded-md w-full cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            {items.icon && <span className="shrink-0">{items.icon}</span>}
                            <span className="text-sm">{items.title}</span>
                          </span>
                        ))}
                      </aside>
                    </div>
                  )}
                </div>
              </>
            )}

            {disablelogin && (
              <Globe className="w-5 h-5 text-white cursor-pointer hover:opacity-80 transition-opacity" />
            )}
          </div>
        </div>
      </div>

      {/* ===== BOTTOM NAVIGATION BAR ===== */}
      {!disableHeader1 && (
        <div className="bg-slate-800 text-white text-sm font-normal">
          <div className="max-w-[90%] mx-auto py-3 overflow-x-auto">
            <div className="flex justify-center gap-6 md:gap-12 lg:gap-20 xl:gap-28 text-center text-sm md:text-base whitespace-nowrap text-white">
              <span
                className="cursor-pointer hover:text-blue-300"
                onClick={() => (window.location.href = "https://codeiqgenius-frontend-g17v.vercel.app/coursecatalog")}
              >
                All courses
              </span>
              <span className="cursor-pointer hover:text-blue-300">Study Plan</span>
              <span className="cursor-pointer hover:text-blue-300">Practice</span>
              <span className="cursor-pointer hover:text-blue-300">Contest</span>
              <span className="cursor-pointer hover:text-blue-300">Community</span>
            </div>
          </div>
        </div>
      )}

      {/* Path-specific breadcrumb bars */}
      {location.pathname === "/coursecatalog" && (
        <div className="bg-[#0a2a72] text-white px-6 py-6 text-sm font-medium">
          <span className="text-white font-semibold">Catalog</span>
          <span className="text-gray-300"> / All Courses Catalog</span>
        </div>
      )}

      {location.pathname === "/coursecatalog/learnpython" && (
        <div className="bg-[#0a2a72] text-white px-4 md:px-6 py-4 md:py-6 text-sm font-medium flex flex-wrap gap-1 items-center">
          <span className="text-white font-semibold underline">Catalog</span>
          <span className="text-gray-300 font-semibold underline">/ All Courses Catalog</span>
          <span className="text-gray-300 font-semibold underline">/ Topics</span>
          <span className="text-gray-300 font-semibold underline">/ Learn Python</span>
          <span className="text-gray-300 font-semibold underline">/ Learn Python Programming</span>
        </div>
      )}

      {location.pathname === "/roadmaps/pythonroadmap" && (
        <div className="bg-[#0a2a72] text-white px-4 md:px-6 py-4 md:py-6 text-sm font-medium flex flex-wrap gap-1 items-center">
          <span className="text-white font-semibold underline">All Catalog</span>
          <span className="text-gray-300 font-semibold underline">/ Catalog</span>
          <span className="text-gray-300 font-semibold underline">/ All Roadmaps</span>
          <span className="text-gray-300 font-semibold underline">/ Python With Beginner DSA</span>
        </div>
      )}

      {location.pathname === "/practicetests/python" && (
        <div className="bg-blue-800 py-2 px-4 md:px-6">
          <div className="flex flex-wrap items-center text-sm gap-1 text-white">
            <a href="#" className="opacity-80 hover:opacity-100">All Courses</a>
            <span className="opacity-60">›</span>
            <a href="#" className="opacity-80 hover:opacity-100">Catalog</a>
            <span className="opacity-60">›</span>
            <a href="#" className="opacity-80 hover:opacity-100">Skill Tests</a>
            <span className="opacity-60">›</span>
            <span>Python Quiz</span>
          </div>
        </div>
      )}

      {location.pathname === "/module-test/python/output-print" && (
        <div className="bg-[#003478] px-4 md:px-8 py-1.5 flex flex-wrap items-center gap-1 text-white text-sm">
          <Link to="/all-courses" className="hover:underline">All Courses</Link>
          <span>&gt;</span>
          <Link to="/catalog" className="hover:underline">Catalog</Link>
          <span>&gt;</span>
          <Link to="/topics" className="hover:underline">Topics</Link>
          <span>&gt;</span>
          <Link to="/learn-python" className="hover:underline">Learn Python</Link>
          <span>&gt;</span>
          <Link to="/learn-python-programming" className="hover:underline">Learn Python Programming</Link>
          <span>&gt;</span>
          <span>Module Test: Output / Print in Python</span>
        </div>
      )}

      {location.pathname === "/learn-python/print-lesson" && (
        <div className="bg-[#003478] text-white py-2 px-4 md:px-8">
          <div className="flex flex-wrap items-center text-sm gap-1">
            <Link to="/all-courses" className="hover:underline">All Courses</Link>
            <span>&gt;</span>
            <Link to="/catalog" className="hover:underline">Catalog</Link>
            <span>&gt;</span>
            <Link to="/topics" className="hover:underline">Topics</Link>
            <span>&gt;</span>
            <Link to="/learn-python" className="hover:underline">Learn Python</Link>
            <span>&gt;</span>
            <Link to="/learn-python-programming" className="hover:underline">Learn Python Programming</Link>
            <span>&gt;</span>
            <span>Module Test: Output / Print in Python</span>
          </div>
        </div>
      )}

      {location.pathname === "/module-test/python-output-print" && (
        <div className="bg-[#003478] text-white py-2 px-4 md:px-8">
          <div className="flex flex-wrap items-center text-sm gap-1">
            <Link to="/all-courses" className="hover:underline">All Courses</Link>
            <span>&gt;</span>
            <Link to="/catalog" className="hover:underline">Catalog</Link>
            <span>&gt;</span>
            <Link to="/topics" className="hover:underline">Topics</Link>
            <span>&gt;</span>
            <Link to="/learn-python" className="hover:underline">Learn Python</Link>
            <span>&gt;</span>
            <Link to="/learn-python-programming" className="hover:underline">Learn Python Programming</Link>
            <span>&gt;</span>
            <span>Module Test: Output / Print in Python</span>
          </div>
        </div>
      )}
    </header>
  );
}
