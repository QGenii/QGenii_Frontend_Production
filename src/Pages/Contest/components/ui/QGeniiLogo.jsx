import React from 'react';

const QGeniiLogo = ({ className = "h-[4rem] w-[8rem]" }) => {
  return (
    <div className={`${className} bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold text-lg rounded-lg shadow-md`}>
      <span className="text-2xl font-extrabold tracking-tight">QGenii</span>
    </div>
  );
};

export default QGeniiLogo;