import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SendEmailStatus() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="bg-[#0D2C66] py-3 px-6">
        <h2 className="text-white text-base font-semibold">Recovery Password</h2>
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-16 px-4">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <h1 className="text-xl md:text-2xl font-medium mb-6 text-black">
            Instructions Have Been Emailed
          </h1>

          {/* Info Box */}
          <div className="bg-[#C9F1E3] text-sm text-gray-800 p-6 rounded-md mb-6 leading-relaxed">
            <p className="mb-2">
              we have sent a link to reset the password to your registered email.
            </p>
            <p className="font-semibold">
              Please your email and follow the instructions.
            </p>
          </div>

          {/* Footer Info */}
          <p className="text-sm text-gray-700 mb-2">
            For any other assistance email{' '}
            <a
              href="mailto:codeiqgenius@gmail.com"
              className="text-black underline hover:text-blue-800 font-medium"
            >
              codeiqgenius@gmail.com
            </a>
          </p>

          {/* Back to Login */}
          <p
            className="text-sm text-black font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
}
