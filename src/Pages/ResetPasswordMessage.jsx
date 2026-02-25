import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordMessage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#0D2C66] py-3 px-6">
        <h2 className="text-white text-base font-semibold">Recovery Password</h2>
      </div>

      {/* Main Content */}
      <div className="flex justify-center px-4 mt-16 md:mt-20">
        <div className="w-full max-w-xl text-center">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold mb-6">
            Proceed To Reset Password
          </h1>

          {/* Message Box */}
          <div className="bg-[#E8EFFF] text-left p-6 rounded-md shadow-sm text-sm space-y-4">
            <p className="font-medium">
              This is your one time login for <span className="font-semibold">free__shine_97</span>
            </p>

            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>This page will expire by <span className="font-medium">thu, 06/11/2025–14:49</span></li>
              <li>This Url/Page can only be used once to change your password</li>
            </ul>

            <div className="pt-2">
              <Button
                type="button"
                className="bg-[#0D2C66] w-[130px] h-[40px] text-white text-sm font-semibold hover:bg-[#0b2555] transition"
                onClick={() => navigate('/changepassword')}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
