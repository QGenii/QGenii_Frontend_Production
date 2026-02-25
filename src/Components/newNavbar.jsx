import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Heart, ShoppingCart, Book, User, Menu, X, Globe
} from 'lucide-react';

export default function NewNavbar() {
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
    
      {/* --- BOTTOM NAVIGATION --- */}
      <div className="bg-slate-800 text-white text-sm font-normal space-x-20">
        <div className="max-w-[90%] mx-auto py-3 overflow-x-auto">
          <div className="flex justify-center gap-28 text-center text-base whitespace-nowrap">
            <span className="cursor-pointer hover:text-blue-300" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-g17v.vercel.app/')}>All courses</span>
            <span className="cursor-pointer hover:text-blue-300" onClick={() => navigate('/skills/study-plan')}>Study Plan</span>
            <span className="cursor-pointer hover:text-blue-300" onClick={() => navigate('/')}>Practice</span>
            <span className="cursor-pointer hover:text-blue-300" onClick={() => navigate('/contest')}>Contest</span>
            <span className="cursor-pointer hover:text-blue-300" onClick={() => navigate('/jobs')}>Job Portal</span>
            <span className="cursor-pointer hover:text-blue-300" onClick={() => navigate('/community')}>Community</span>
            {/* <span className="cursor-pointer hover:text-blue-300">Internship</span> */}
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {/* (Add your mobile menu logic/JSX here if needed) */}
    </header>
  );
}
