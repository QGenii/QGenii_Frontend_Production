// ReferralSimple.jsx
import React, { useState } from "react";

/**
 * ReferralSimple
 * Props:
 * - onSend(email) => Promise (optional)   // called when sending invite
 */
export default function HelpAndSupport({ onSend }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"
  const [message, setMessage] = useState("");

  async function handleSend(e) {
    e?.preventDefault();
    setMessage("");
    // basic email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      setMessage("");
      if (onSend) {
        await onSend(email);
      } else {
        // mock delay when no handler provided
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("success");
      setMessage("Invite sent!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err?.message || "Failed to send invite.");
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <h4 className="text-center text-lg font-medium mb-6">Invite Your Friends By sending Referral Code</h4>

      <form onSubmit={handleSend} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Enter your friend's email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            className="w-[32rem] h-[2.125rem] px-2 rounded-md border border-gray-200 bg-white outline-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-48 text-center px-6 py-3 rounded-md bg-[#2D00F7] text-white font-medium shadow-[0_8px_18px_rgba(45,0,247,0.18)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>
        </div>

        {message && (
          <div
            className={`text-center text-sm ${
              status === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
