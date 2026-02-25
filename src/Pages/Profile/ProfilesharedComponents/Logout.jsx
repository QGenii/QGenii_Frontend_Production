import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

// { open, onConfirm, onCancel }
export default function LogoutConfirm({setTabActive}) {
  //   if (!open) return null;
const { logout } = useAuth()
  const onConfirm = () => {
    logout()
  };
  const onCancel = () => {
   setTabActive("My Profile")
  };

  return (
    // overlay
    <div
      className=" flex items-center justify-center      "
      role="dialog"
      aria-modal="true"
      //  clicking outside closes
    >
      {/* panel (stop propagation so clicks inside don't close) */}

      <div
        div
        className="bg-[#F4F7FC] w-full max-w-md mx-4 rounded-md p-6 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-sm text-gray-800 mb-6">
          Are You sure You want to Logout?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-md text-xs font-medium bg-[#2800ae] text-white shadow-sm hover:bg-[#1f008c] transition"
          >
            Yes
          </button>

          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-md text-xs font-medium bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-50 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
