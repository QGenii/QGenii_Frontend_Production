import React, { useState } from "react";

export default function QGeniiCredits() {
  const [query, setQuery] = useState("");
  const [credits] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h4 className="text-sm text-gray-700 mb-1">Qgenii credits</h4>
          <div className="text-lg font-semibold">Your credits: ₹{credits}</div>
        </div>

        <div className="w-80">
          <div className=" flex items-center justify-start w-full py-2  px-2 rounded-full border  bg-white  outline-none bg-">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
             
            <input

              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter code"
              className="outline-none text-[0.875rem]"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
