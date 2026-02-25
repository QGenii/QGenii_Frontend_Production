import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Forgotpassword() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="bg-[#0D2C66] py-3 px-8">
        <h2 className="text-white text-base font-semibold">Recovery Password</h2>
      </div>

      {/* Form Container */}
      <div className="flex justify-center mt-20">
        <div className="w-[620px] bg-[#F9FAFB] border border-gray-300 p-10">
          <h5 className="text-sm font-medium mb-6">Provide Account Details</h5>

          <p className="text-[13px] text-gray-700 mb-8 leading-tight">
            To recover the password for your account , please provide us the account details.
          </p>

          {/* Form */}
          <Form>
            {/* Username or Email */}
            <Form.Group className="mb-6" controlId="formEmailOrUsername">
              <Form.Label className="text-[13px] font-medium">Username or Email:</Form.Label>
              <Form.Control
                type="text"
                className="m-3 mt-1 h-[42px] text-sm border border-l-gray-400 bg-white"
                placeholder=""
              />
            </Form.Group>

            {/* CAPTCHA */}
            <Form.Group className="mb-8" controlId="formCaptcha">
              <Form.Label className="text-[13px] font-medium">what code is in the image?:</Form.Label>
              <Form.Control
                type="text"
                className="m-3 mt-1 h-[42px] text-sm border border-l-gray-400 bg-white"
                placeholder=""
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="mt-4">
              <Button
                type="submit"
                className="bg-[#0D2C66] w-[135px] h-[40px] text-white text-sm font-semibold rounded hover:bg-[#0b2555] transition"
                 onClick={() => navigate('/send-emailstatus')}
              >
                Proceed
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
