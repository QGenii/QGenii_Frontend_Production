import React, { useEffect, useRef, useState } from "react";

/**
 * PasswordFlow
 *
 * Props:
 * - mode: "change" | "reset"  (default: "reset")
 * - onSendOtp(contact) => Promise - called when sending OTP (optional)
 * - onVerifyOtp(otp) => Promise - called when verifying OTP (optional)
 * - onSetPassword(payload) => Promise - called when submitting new password (optional)
 */
 

// ! onSendOtp, onVerifyOtp, onSetPassword
  
export default function ChangePassword({
  mode = "reset",
  onSendOtp,
  onVerifyOtp,
  onSetPassword,
}) {
  // common
  const [loading, setLoading] = useState(false);
  const primary = "#2800ae";

  // change-mode fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [confirmPassword2, setConfirmPassword2] = useState("");

  // reset-mode fields
  const [contact, setContact] = useState(""); // email or phone
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(mode === "change" ? "change" : "enterContact");
  const [error, setError] = useState("");

  useEffect(() => {
    // reset when mode changes
    setStep(mode === "change" ? "change" : "enterContact");
    setContact("");
    setOtp(["", "", "", ""]);
    setOtpSent(false);
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword2("");
    setConfirmPassword2("");
    setError("");
  }, [mode]);

  // OTP helpers
  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return; // only single digit
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  }
  function handleOtpKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  }
  function pasteOtp(e) {
    const pasted = e.clipboardData?.getData("Text")?.trim() ?? "";
    if (/^\d{4}$/.test(pasted)) {
      const arr = pasted.split("");
      setOtp(arr);
      setTimeout(() => otpRefs[3].current?.focus(), 0);
    }
  }

  // Actions
  async function sendOtp() {
    setError("");
    if (!contact) {
      setError("Please enter email or mobile number.");
      return;
    }
    setLoading(true);
    try {
      if (onSendOtp) await onSendOtp(contact);
      // simulate success
      await new Promise((r) => setTimeout(r, 600));
      setOtpSent(true);
      setStep("enterOtp");
      setTimeout(() => otpRefs[0].current?.focus(), 50);
    } catch (err) {
      setError(err?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setError("");
    const code = otp.join("");
    if (code.length !== 4) {
      setError("Enter the 4-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      if (onVerifyOtp) await onVerifyOtp(code);
      // simulate verification
      await new Promise((r) => setTimeout(r, 600));
      setStep("setNewPassword");
    } catch (err) {
      setError(err?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  }

  async function submitNewPassword() {
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Please fill both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (onSetPassword) await onSetPassword({ password: newPassword, mode: "reset" });
      await new Promise((r) => setTimeout(r, 700));
      // success — you can add success toast or redirect
      setStep("done");
    } catch (err) {
      setError(err?.message || "Failed to set password.");
    } finally {
      setLoading(false);
    }
  }

  async function submitChangePassword(e) {
    e?.preventDefault();
    setError("");
    if (!currentPassword) {
      setError("Enter current password.");
      return;
    }
    if (!newPassword2 || !confirmPassword2) {
      setError("Enter and confirm new password.");
      return;
    }
    if (newPassword2 !== confirmPassword2) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (onSetPassword) await onSetPassword({ currentPassword, newPassword: newPassword2, mode: "change" });
      await new Promise((r) => setTimeout(r, 700));
      setStep("done");
    } catch (err) {
      setError(err?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  }

  // UI bits
  const inputClass =
    "w-full bg-white border border-gray-200 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-30";
  const fullBtn =
    `w-full max-w-sm mx-auto block text-sm font-medium text-white px-6 py-3 rounded-md shadow-[0_8px_18px_rgba(40,0,174,0.18)] transition disabled:opacity-60 disabled:cursor-not-allowed bg-[${primary}] hover:bg-[#23008a]`;

  return (
    <div className="min-h-[220px] flex items-start justify-center p-8 bg-[#F4F7FC]">
      <div className="w-full max-w-2xl">
        {mode === "reset" && (
          <form onSubmit={submitChangePassword} className="flex flex-col items-center gap-6">
            <h2 className="text-center text-lg font-semibold text-gray-900">
              Enter a New password below to change your password
            </h2>

            <div className="w-full px-4 md:px-0">
              <label className="text-sm text-gray-700 mb-2 block">Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`${inputClass}`}
              />
            </div>

            <div className="w-full px-4 md:px-0">
              <label className="text-sm text-gray-700 mb-2 block">New Password</label>
              <input
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                className={`${inputClass}`}
              />
            </div>

            <div className="w-full px-4 md:px-0">
              <label className="text-sm text-gray-700 mb-2 block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword2}
                onChange={(e) => setConfirmPassword2(e.target.value)}
                className={`${inputClass}`}
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="w-full px-4 md:px-0">
              <button
                type="submit"
                disabled={loading}
                className={fullBtn}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}

        {mode === "change" && (
          <div className="flex flex-col items-center gap-6">
            {step === "enterContact" && (
              <>
                <h2 className="text-center text-lg font-semibold text-gray-900">
                  Enter a New password below to change your password
                </h2>

                <div className="w-full px-4 md:px-0">
                  <label className="text-sm text-gray-700 mb-2 block">Enter Your Email or mobile number</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className={`${inputClass}`}
                    
                  />
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="w-full px-4 md:px-0">
                  <button
                    onClick={sendOtp}
                    disabled={loading}
                    className={fullBtn}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </>
            )}

            {step === "enterOtp" && (
              <>
                <h3 className="text-center text-lg font-semibold text-gray-900">Email OTP Verification</h3>
                <p className="text-sm text-gray-600">Enter Your Received OTP here</p>

                <div
                  className="flex gap-3 mt-4"
                  onPaste={pasteOtp}
                >
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      value={v}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      maxLength={1}
                      className="w-12 h-12 bg-white border border-gray-200 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#2800ae]/30"
                      inputMode="numeric"
                    />
                  ))}
                </div>

                {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

                <div className="w-full px-4 md:px-0 mt-2">
                  <button onClick={verifyOtp} disabled={loading} className={fullBtn}>
                    {loading ? "Verifying..." : "Confirm OTP"}
                  </button>
                </div>

                <div className="text-sm text-gray-600 mt-2">
                  <button
                    onClick={() => { setStep("enterContact"); setOtp(["","","",""]); setOtpSent(false); }}
                    className="text-[#2800ae] underline"
                  >
                    Resend / change contact
                  </button>
                </div>
              </>
            )}

            {step === "setNewPassword" && (
              <>
                <h2 className="text-center text-lg font-semibold text-gray-900">
                  Enter a New password below to change your password
                </h2>

                <div className="w-full px-4 md:px-0">
                  <label className="text-sm text-gray-700 mb-2 block">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`${inputClass}`}
                  />
                </div>

                <div className="w-full px-4 md:px-0">
                  <label className="text-sm text-gray-700 mb-2 block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${inputClass}`}
                  />
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="w-full px-4 md:px-0">
                  <button onClick={submitNewPassword} disabled={loading} className={fullBtn}>
                    {loading ? "Confirming..." : "Confirm Password"}
                  </button>
                </div>
              </>
            )}

            {step === "done" && (
              <div className="text-center">
                <h3 className="text-lg font-semibold">Success</h3>
                <p className="text-sm text-gray-600 mt-2">Your password has been updated.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
