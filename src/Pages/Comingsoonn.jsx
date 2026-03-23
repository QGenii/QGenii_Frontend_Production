import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 text-center text-white max-w-lg w-full">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
          🚀 Coming Soon
        </h1>

        <p className="text-lg opacity-80 mb-6">
          We're building something amazing. Stay tuned for the launch!
        </p>

        {/* Animated Loader */}
        <div className="flex justify-center mb-6">
          <div className="w-3 h-3 bg-white rounded-full mx-1 animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full mx-1 animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-white rounded-full mx-1 animate-bounce delay-300"></div>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="mt-2 border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-800 transition-all duration-300"
        >
          Go Back Profile
        </button>

      </div>
    </div>
  );
};

export default ComingSoon;