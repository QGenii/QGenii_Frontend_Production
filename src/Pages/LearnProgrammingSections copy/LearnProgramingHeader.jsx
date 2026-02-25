import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Heart, ShoppingCart, Book, User, Menu, X, Globe
} from 'lucide-react';

export default function LearnProgrammingHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full font-sans text-sm">
      {/* --- TOP BAR --- */}
      <div className="bg-white border-b shadow-sm relative h-16 z-50 flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="../codeiqgeniuslogo.png" alt="CodeIQ Genius" className="h-12 object-contain h-20" />
        </div>

        {/* Center Navigation */}
            <div className="flex flex-1 justify-between max-w-[900px] mx-auto ml-[640px] text-l">
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => navigate('/')} >HOME</span>
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/blog')}>BLOG</span>
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/partnership')}>PARTNERSHIP</span>
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/contact-us')}>CONTACT US</span>
        </div>

        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </div>
      </div>

      {/* --- MIDDLE BAR --- */}
            <div className="bg-[#0288E7]">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 px-4 sm:px-6 py-2 sm:py-0 gap-2 sm:gap-0">
                {/* Left section - Try Out button and Search */}
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 gap-2 pr-10">
                  <button className="text-white font-semibold px-4 py-2 whitespace-nowrap text-xl ">
                    Try Out
                  </button>
                  <div className="relative bg-white rounded-full shadow-sm w-72 sm:w-80 ">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
                      <Search className="text-gray-400 w-4 h-4 ml-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="search for something"
                      className="w-full pl-18 pr-4 py-2.5  rounded-full border-none outline-none text-gray-700 text-xl leading-3"
                    />
                  </div>
                </div>
      
                {/* Desktop Center Navigation */}
                     <div className="flex flex-1 justify-between max-w-[900px] mx-auto px-10 text-[#f1f1f1]">
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href ='https://codeiqgenius-frontend-nitesh.vercel.app/compiler')}>Compiler</span>
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href ='https://codeiqgenius-frontend-nitesh.vercel.app/iq-business')}>IQ Business</span>
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href ='https://codeiqgenius-frontend-nitesh.vercel.app/teach/steps')}>Teach on IQ</span>
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href = 'https://code-i-qgenius-frontend-ajeet-sahan.vercel.app/mystudying')}>My Studying</span>


          </div>
      
                {/* Mobile Center Navigation */}
                <div className="lg:hidden w-full overflow-x-auto">
                  <div className="flex items-center space-x-6 whitespace-nowrap text-white text-sm font-medium px-1">
                    <span className="cursor-pointer">Compiler</span>
                    <span className="cursor-pointer">IQ Business</span>
                    <span className="cursor-pointer">Teach on IQ</span>
                    <span className="cursor-pointer">My studies</span>
                  </div>
                </div>
      
                <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-end relative">
                  <ShoppingCart className="text-white w-6 h-6 cursor-pointer hover:text-gray-200" />
                  <Heart className="text-white w-6 h-6 cursor-pointer hover:text-gray-200" />
                  <Book className="text-white w-6 h-6 cursor-pointer hover:text-gray-200" />
      
                  <div
                    className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 relative"
                    onClick={() => setShowProfileModal(!showProfileModal)}
                  >
                    <User className="text-gray-700 w-6 h-6" />
      
                    {/* Profile Modal */}
                    {showProfileModal && (
                      <div
                        ref={modalRef}
                        className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-xl text-gray-800 z-50"
                      >
                        <div className="px-4 py-3 border-b font-semibold text-sm bg-gray-50">← My Profile</div>
                        <ul className="p-4 space-y-3 text-sm">
                          <li className="cursor-pointer hover:text-blue-600">Edit Profile</li>
                          <li className="cursor-pointer hover:text-blue-600">Language Selector</li>
                          <li className="flex justify-between items-center cursor-pointer hover:text-blue-600">
                            My Course
                            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">9+</span>
                          </li>
                          <li className="cursor-pointer hover:text-blue-600">Wishlist</li>
      
                          <hr />
                          <li className="font-semibold text-gray-900">Subscription</li>
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
                            <button className="mt-2 w-full border text-blue-600 font-medium text-sm py-1 rounded hover:bg-blue-50">
                              🌐 Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

       {/* --- Dark Blue Section Below Navbar --- */}
      <div className="bg-[#0a2a72] text-white px-6 py-6 text-sm font-medium">
        <span className="text-white font-semibold underline">Catalog    </span>  &nbsp;  &nbsp; 
        <span className="text-gray-300  font-semibold underline"> / All Courses Catalog  </span>  &nbsp;  &nbsp; 
         <span className="text-gray-300  font-semibold underline">/ Topics   </span>  &nbsp;  &nbsp;
          <span className="text-gray-300  font-semibold underline"> / Learn Python   </span>  &nbsp;  &nbsp;
           <span className="text-gray-300  font-semibold underline"> / Learn Python Programming   </span>
      </div>

      {/* --- MOBILE MENU --- */}
      {menuOpen && (
        <div className="bg-white px-6 py-4 md:hidden font-medium text-sm text-black space-y-4 border-b shadow-sm">
          <span className="block cursor-pointer hover:text-blue-600">HOME</span>
          <span className="block cursor-pointer hover:text-blue-600">BLOG</span>
          <span className="block cursor-pointer hover:text-blue-600">PARTNERSHIP</span>
          <span className="block cursor-pointer hover:text-blue-600">CONTACT US</span>
        </div>
      )}
    </header>
  );
}
