import React, { useState } from "react";

export default function LanguageSelector() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("English (Default)");

  const languages = [
    "English (Default)",
    "Assamese",
    "Bengali",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Malayalam",
    "Marathi",
    "Nepali",
    "Oriya",
    "Punjabi",
    "Tamil",
    "Telugu",
  ];

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-6 w-[52.06rem] mx-auto  min-h-screen ">
      {/* Search Bar */}
      <div className="mb-6 w-[52rem]">
        <div className="flex items-center w-full bg-white border border-gray-200 rounded-full shadow-sm px-4 py-3">
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
            placeholder="Search Language"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

<div className="flex flex-col justify-center items-center">
      {/* Title */}
      <h4 className="text-gray-600 text-sm mb-4  w-[44.06rem]">Select Your Language</h4>

      {/* Language List */}
      <div className="space-y-4  w-[44.06rem]">
        {filteredLanguages.map((lang) => (
          <div
            key={lang}
            onClick={() => setSelected(lang)}
            className="flex justify-between items-center cursor-pointer text-gray-800 hover:text-[#2800ae]"
          >
            <span>{lang}</span>

            {selected === lang && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#2800ae]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 000 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
