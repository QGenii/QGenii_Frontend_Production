import React, { useState } from "react";

export default function InviteFriend({ initialCode = "000000" }) {
  const [code] = useState(initialCode);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Code copied to clipboard!");
      setTimeout(() => setStatus(""), 2000);
    } catch (e) {
      setStatus("Copy failed — select and copy manually.");
      setTimeout(() => setStatus(""), 3000);
    }
  }

  function handleSend(e) {
    e?.preventDefault();
    setStatus("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("Please enter a valid email.");
      return;
    }
    // mock sending
    setStatus("Sending invite...");
    setTimeout(() => setStatus("Invite sent!"), 800);
  }

  return (
    <div className="max-w-2xl mx-auto p-8  rounded-lg text-center">
      <h4 className="text-lg font-medium mb-6">Invite Your Friends By sending Referral Code</h4>

      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="flex gap-2 border border-gray-200 rounded-md px-3 py-2">
          {code.split("").map((c, i) => (
            <div key={i} className="w-8 h-8 flex items-center justify-center rounded-md text-lg font-semibold border border-transparent bg-gray-100">
              {c}
            </div>
          ))}
        </div>

        <span onClick={handleCopy} className="p-2 rounded-md border border-gray-200 " title="Copy code">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5 9.16602C5 6.80935 5 5.63018 5.7325 4.89852C6.46417 4.16602 7.64333 4.16602 10 4.16602H12.5C14.8567 4.16602 16.0358 4.16602 16.7675 4.89852C17.5 5.63018 17.5 6.80935 17.5 9.16602V13.3327C17.5 15.6893 17.5 16.8685 16.7675 17.6002C16.0358 18.3327 14.8567 18.3327 12.5 18.3327H10C7.64333 18.3327 6.46417 18.3327 5.7325 17.6002C5 16.8685 5 15.6893 5 13.3327V9.16602Z" stroke="#747474" stroke-width="1.25"/>
  <path d="M5 15.8327C4.33696 15.8327 3.70107 15.5693 3.23223 15.1005C2.76339 14.6316 2.5 13.9957 2.5 13.3327V8.33268C2.5 5.19018 2.5 3.61852 3.47667 2.64268C4.45333 1.66685 6.02417 1.66602 9.16667 1.66602H12.5C13.163 1.66602 13.7989 1.92941 14.2678 2.39825C14.7366 2.86709 15 3.50297 15 4.16602" stroke="#747474" stroke-width="1.25"/>
</svg>
        </span>
      </div>

      <div className="mb-4">
        <a href="#" className="text-sm text-[#2800AE] underline">Link Here Link Here Link Here Link Here</a>
      </div>

      <form onSubmit={handleSend} className="max-w-xl mx-auto">
        <label className="block text-left text-sm mb-1">Enter your friend's email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
          className="w-full px-4 py-3 rounded-md border border-gray-200 mb-4 focus:outline-none"
        />

        <button type="submit" className="w-48 mx-auto block px-6 py-3 rounded-md bg-[#2D00F7] text-white font-medium shadow-md">Send</button>
      </form>

      {status && <div className="mt-4 text-sm text-gray-700">{status}</div>}
    </div>
  );
}
