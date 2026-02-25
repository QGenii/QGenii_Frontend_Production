import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Heart, ShoppingCart, Book, User, Menu, X, Globe
} from 'lucide-react';

export default function PythonRoadmapHeader() {
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
         <div className="bg-white border-b shadow-sm h-16 flex items-center justify-between pr-[20px]">
           {/* Logo on far left */}
          <div className="flex items-center">
       <img
         src="./codeiqgeniuslogo.png"
         alt="CodeIQ Genius"
         className="object-contain h-[80px] w-[158px]"
       />
     </div>
           {/* Center Navigation - shifted right to align above blue bar links */}
                 <div className="flex flex-1 justify-between max-w-[900px] mx-auto ml-[640px] text-l">
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => navigate('/')} >HOME</span>
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/blog')}>BLOG</span>
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/partnership')}>PARTNERSHIP</span>
          <span className="text-black font-bold text-xl hover:text-blue-600 cursor-pointer transition-colors uppercase tracking-wide flex-1 text-center" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/contact-us')}>CONTACT US</span>
        </div>
           {/* Profile/Menu for mobile */}
           <div className="md:hidden cursor-pointer">
             {menuOpen ? <X /> : <Menu />}
           </div>
         </div>
   
         {/* --- MIDDLE BAR --- */}
         <div className="bg-[#0288E7] w-full">
           <div className="max-w-[1600px] mx-auto flex items-center h-[56px] px-0">
             {/* Try Out button and Search bar group - left aligned */}
             <div className="flex items-center min-w-[500px] pl-8">
               <button className="text-white font-semibold px-5 py-2 text-lg bg-[#0288E7] rounded-full mr-4 focus:outline-none" style={{fontWeight:600, minWidth:'110px'}}>Try Out</button>
               <div className="relative bg-white rounded-full shadow-sm w-[340px] flex items-center h-12">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2"><Search className="text-black w-5 h-5" /></span>
                 <input
                   type="text"
                   placeholder="Search for something"
                   className="w-full pl-12 pr-4 py-2 rounded-full border-none outline-none text-black text-lg placeholder:text-gray-500 h-12"
                   style={{fontWeight:500}}
                 />
               </div>
             </div>
             {/* Center nav links - evenly distributed below top nav */}
                <div className="flex flex-1 justify-between max-w-[900px] mx-auto px-10 text-[#f1f1f1]">
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href ='https://codeiqgenius-frontend-nitesh.vercel.app/compiler')}>Compiler</span>
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href ='https://codeiqgenius-frontend-nitesh.vercel.app/iq-business')}>IQ Business</span>
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href ='https://codeiqgenius-frontend-nitesh.vercel.app/teach/steps')}>Teach on IQ</span>
            <span className=" font-semibold text-xl cursor-pointer hover:underline flex-1 text-center" onClick={() => (window.location.href = 'https://code-i-qgenius-frontend-ajeet-sahan.vercel.app/mystudying')}>My Studying</span>


          </div>
             {/* Icons - right aligned, spaced out */}
             <div className="flex items-center space-x-8 pr-8">
               <ShoppingCart className="text-white w-6 h-6 cursor-pointer hover:text-gray-200" />
               <Heart className="text-white w-6 h-6 cursor-pointer hover:text-gray-200" />
               <Book className="text-white w-6 h-6 cursor-pointer hover:text-gray-200" />
               {/* User/Profile in gray circle */}
               <div
                 className="bg-[#E6E9ED] rounded-full w-15 h-11 flex items-center justify-center cursor-pointer hover:bg-gray-300 relative"
                 onClick={() => setShowProfileModal(!showProfileModal)}
               >
                 <User className="text-black w-6 h-6" />
                 {/* Profile Modal */}
                 {showProfileModal && (
                   <div
                     ref={modalRef}
                     className="absolute right-0 top-12 w-72 bg-white border rounded-lg shadow-xl text-gray-800 z-50"
                   >
                     <div className="px-4 py-3 border-b font-semibold text-sm bg-gray-50">\u2190 My Profile</div>
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
                           \ud83c\udf10 Logout
                         </button>
                       </li>
                     </ul>
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
         {/* --- BOTTOM NAVIGATION --- */}
         {/* <div className="bg-slate-800 text-white text-sm font-normal space-x-20">
           <div className="max-w-[90%] mx-auto py-3 overflow-x-auto">
             <div className="flex justify-center gap-28 text-center text-base whitespace-nowrap">
               <span className="cursor-pointer hover:text-blue-300" onClick={() => navigate('/coursecatalog')}>All courses</span>
               <span className="cursor-pointer hover:text-blue-300">Study Plan</span>
               <span className="cursor-pointer hover:text-blue-300">Practice</span>
               <span className="cursor-pointer hover:text-blue-300">Contest</span>
               <span className="cursor-pointer hover:text-blue-300">Job Portal</span>
               <span className="cursor-pointer hover:text-blue-300">Community</span>
               <span className="cursor-pointer hover:text-blue-300">Internship</span>
             </div>
           </div>
         </div> */}
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
