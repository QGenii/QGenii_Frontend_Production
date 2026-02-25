import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    // Optional: validation / API call here

    // Show modal
    setShowModal(true);
  };

  const handleRedirect = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0D2C66] py-3 px-6">
        <h2 className="text-white text-base font-semibold">Recovery Password</h2>
      </div>

      {/* Main Section */}
      <div className="flex justify-center px-4 mt-16 mb-10">
        <div className="w-full max-w-4xl border border-gray-300 p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start bg-white">
          {/* Left: Form Fields */}
          <div className="md:col-span-2">
            <h1 className="text-xl font-semibold mb-6">Change Password</h1>

            <form onSubmit={handleSave} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full h-[42px] border border-gray-300 rounded px-3 text-sm focus:outline-none"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Confirm Password:
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full h-[42px] border border-gray-300 rounded px-3 text-sm focus:outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 bg-[#0D2C66] text-white text-sm font-semibold px-6 py-2 rounded hover:bg-[#0b2555] transition"
              >
                Save
              </button>
            </form>
          </div>

          {/* Right: Password Rules */}
          <div className="bg-gray-100 border border-gray-300 p-4 rounded text-sm text-gray-800">
            <p className="font-medium mb-3">Password should have at least</p>
            <ul className="list-disc list-inside space-y-1">
              <li>8 characters</li>
              <li>one uppercase letter [A-Z]</li>
              <li>one lowercase letter [a-z]</li>
              <li>one digit [0–9]</li>
              <li>one character which isn’t a digit or a letter</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Suggestion Box */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl border border-gray-300 rounded-md p-6 text-sm text-gray-800 shadow-sm">
          <p className="mb-2 font-medium">
            Google Password Manager created a strong password for this website
          </p>
          <p className="text-gray-600 mb-4">
            You won’t need to remember this password. It will be saved to Google Password Manager for{' '}
            <span className="font-medium">riteshk2005@gmail.com</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="border border-[#0D2C66] text-[#0D2C66] px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
              Choose your own
            </button>
            <button className="bg-[#0D2C66] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#0b2555] transition">
              Use Strong Password
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white max-w-md w-full rounded-lg p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Password Updated
                </Dialog.Title>
                <div className="mt-2 text-sm text-gray-600">
                  Your password has been successfully updated. Redirecting to login page.
                </div>

                <div className="mt-6 text-right">
                  <button
                    className="bg-[#0D2C66] text-white px-5 py-2 text-sm rounded hover:bg-[#0b2555] transition"
                    onClick={handleRedirect}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
