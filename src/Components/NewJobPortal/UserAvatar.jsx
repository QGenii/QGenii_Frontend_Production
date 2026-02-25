import React from 'react';

const UserAvatar = () => {
  return (
    <div className="w-14 h-14 rounded-full bg-indigo-500 border-2 border-white shadow-lg overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-300">
      <img 
        src="/assets/avatar.jpg" 
        alt="User" 
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=User&background=6366f1&color=fff`;
        }}
      />
    </div>
  );
};

export default UserAvatar;