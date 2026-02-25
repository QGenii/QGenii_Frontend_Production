import React, { useEffect, useRef, useState } from "react";

/**
 * LogoutToDeleteFlow
 *
 * Props:
 * - open (bool) : whether the dialog is visible
 * - onCancel() : called when user cancels at any step
 * - onLogoutConfirm() : called when user confirms logout (optional)
 * - onDelete(password) : called when user confirms delete (required for real delete)
 */
 

// ye ek prop hai tah integate hoga jab backend use hoga =>> onDelete,onCancel,
export default function DeleteAccount({ open,  onLogoutConfirm,  }) {
  const [step, setStep] = useState("confirmLogout"); // 'confirmLogout' | 'delete'
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passRef = useRef(null);

  // reset when opened/closed
  useEffect(() => {
    if (!open) {
      setStep("confirmLogout");
      setPassword("");
      setLoading(false);
    } else {
      // focus first input when opened
      setTimeout(() => {
        if (step === "delete" && passRef.current) passRef.current.focus();
      }, 50);
    }
  }, [open]);

  if (!open) return null;

  async function handleLogoutYes() {
    // optional hook before moving to delete step
    if (typeof onLogoutConfirm === "function") {
      try {
        await Promise.resolve(onLogoutConfirm());
      } catch (err) {
        // ignore hook errors and continue
        console.log(err);
      }
    }
    setStep("delete");
    // focus password
    setTimeout(() => passRef.current?.focus(), 50);
  }

  async function handleDeleteSubmit(e) {
    e?.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      if (typeof onDelete === "function") {
        // await Promise.resolve(onDelete(password));
      } else {
        // placeholder: simulate API delay
        await new Promise((r) => setTimeout(r, 800));
       
        console.log("Deleted (simulated) with password:", password);
      }
    } catch (err) {
      // handle error (you could surface it to UI)
    
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className=" flex items-center justify-center  p-4"
      role="dialog"
      aria-modal="true"
    //   onClick={onCancel}
    >
      <div
        className=" w-full max-w-2xl rounded-md p-6 "
        onClick={(e) => e.stopPropagation()}
      >
        {step === "confirmLogout" ? (
          // Step 1: logout confirm
          <div className="flex flex-col items-center gap-6">
            <h4 className="text-center text-sm text-gray-800">
              To continue, delete your account permanently?
            </h4>

            <div className="flex gap-4">
              <span
                onClick={handleLogoutYes}
                className="px-6 py-2 rounded-md  text-black text-xs font-medium   shadow-sm border-2 border-[#2800AE] transition"
              >
                Yes
              </span>

              <span
                // onClick={onCancel}
                className="px-6 py-2 border-2 border-[#2800AE] rounded-md text-xs font-medium bg-white text-gray-800shadow-sm  transition"
              >
                No
              </span>
            </div>
          </div>
        ) : (
          // Step 2: delete permanently + password
          <form onSubmit={handleDeleteSubmit} className="flex flex-col items-center gap-6">
            <h2 className="text-center text-lg font-semibold text-gray-900">
              To continue, delete your account permanently?
            </h2>

            <div className="w-full px-6 md:px-16">
              <label className="block text-sm text-gray-700 mb-2">Enter your password</label>
              <input
                ref={passRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                className="w-[32.3125rem] h-[2.125rem] bg-[#F1F3F7] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none "
                aria-label="Enter your password"
              />
            </div>

            <div className="w-full px-6 md:px-16">
              <button
                type="submit"
                disabled={!password || loading}
                className={`w-[16.25rem]  mx-auto text-nowrap text-center  text-sm font-medium text-white px-[3.62rem] py-3 rounded-lg  transition  disabled:cursor-not-allowed ${
                  !loading ? "bg-[#2800AE] " : "bg-[#2800AE]"
                }`}
              >
                {loading ? "Deleting..." : "Confirm Delete account"}
              </button>
            </div>

          
          </form>
        )}
      </div>
    </div>
  );
}
