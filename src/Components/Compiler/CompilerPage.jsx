

import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "./CodeEditor";
// import { getCodeTemplate } from './codeTemplates';
import { AiOutlineCode, AiOutlinePlayCircle } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import axios from "axios";
import { AppleIcon } from "lucide-react";
import api from "../../lib/api";

const CompilerPage = () => {
  const [code, setCode] = useState("");
  const [showLanguage, setShowLanguage] = useState("javascript"); // selected language string
  const [runtimes, setRuntimes] = useState([]); // available runtimes from API
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // search query for filtering languages
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // dropdown visibility
  const dropdownRef = useRef(null);

  // Load template when selected language changes
  // useEffect(() => {
  //   setCode(getCodeTemplate(showLanguage));
  // }, [showLanguage]);

  // Fetch runtimes on mount
  useEffect(() => {
    fetchRuntimes();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchRuntimes = async () => {
    try {
      const response = await api.get(
        "https://emkc.org/api/v2/piston/runtimes",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response.data || [];
      // console.log(data);
      setRuntimes(data);
      // If the selected language isn't set (or not in the list), pick a sensible default
      if (!showLanguage && data.length > 0) setShowLanguage(data[0].language);
    } catch (err) {
      console.error("Failed to fetch runtimes", err);
      // fallback minimal list if desired
      setRuntimes([]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRunCode = async () => {
    if (!code) return;
    const payload = {
      language: showLanguage,
      code: code,
      stdin: input, // Changed from 'input' to 'stdin' to match backend expectation
    };

    try {
      setIsRunning(true);
      setOutput("");
      const response = await api.post("/compiler/runCode", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (err) {
      console.error("Run error", err);
      setOutput(
        err?.response?.data?.message || err.message || "Failed to run code"
      );
    } finally {
      setIsRunning(false);
    }
  };

  // Filter runtimes based on search query
  const filteredRuntimes = runtimes.filter((rt) =>
    rt.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-2xl font-semibold text-gray-900">
              Online Compiler
            </h2>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d3557] text-white text-sm font-medium hover:opacity-95"
            >
              Checkout our practise section{" "}
              <HiExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          {/* <h2 className="text-2xl font-bold text-gray-800">Online Compiler</h2> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor column (span 2 on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Header: language select + run */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 relative">
                <label htmlFor="language" className="sr-only">
                  Language
                </label>

                {/* Custom searchable dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <input
                    type="text"
                    placeholder="Search language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="block w-48 py-2 px-3 border border-gray-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />

                  {/* Dropdown list */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-48 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg">
                      {filteredRuntimes.length > 0 ? (
                        filteredRuntimes.map((rt, idx) => {
                          return (
                            <div
                              key={rt.language}
                              onClick={() => {
                                setShowLanguage(rt.language);
                                setSearchQuery("");
                                setIsDropdownOpen(false);
                              }}
                              className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 ${
                                showLanguage === rt.language
                                  ? "bg-indigo-100 font-medium"
                                  : ""
                              }`}
                            >
                              {rt.language}
                            </div>
                          );
                        })
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No languages found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  <span className="hidden sm:inline">Selected: </span>
                  <span className="font-medium text-gray-700 ml-1">
                    {showLanguage}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium shadow-sm ${
                    isRunning
                      ? "bg-indigo-300 text-white cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <AiOutlinePlayCircle className="w-5 h-5" />
                  {isRunning ? "Running..." : "Run"}
                </button>
              </div>
            </div>

            {/* Code editor */}
            <div className="flex-1 min-h-[360px] bg-white border border-gray-200 rounded-md overflow-hidden">
              <CodeEditor
                code={code}
                language={showLanguage}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          {/* Right column: merged input + output console (Programiz-like) */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2 ">
                <h5 className="text-lg font-medium text-gray-800"> Output</h5>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setOutput("");
                      setInput("");
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="flex-1  overflow-auto bg-gray-900 text-gray-100 p-3 rounded-md max-h-[20.6875rem] overflow-y-scroll hide-scrollbar">
                <pre className="whitespace-pre-wrap text-sm mb-2">
                  {output || "Run your code to see output"}
                </pre>

                {/* Inline input merged into console, like Programiz */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-green-400">{">"}</span>
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleRunCode();
                      }
                    }}
                    // placeholder="Type input here and press Enter..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-100 text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info / marketing section */}
        <div className="mt-8">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              Welcome to our online compiler
            </h3>
            <p className="mb-3">Our compiler will allow you to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-gray-700">
              <li>Write and test code in many programming languages</li>
              <li>See execution output and any errors</li>
              <li>Save, share, and collaborate on code snippets</li>
              <li>Access code history and automatically save code</li>
            </ul>

            <h4 className="font-medium mb-2">What is an online compiler?</h4>
            <p className="text-sm text-gray-700 mb-4">
              Online compilers are online tools where you can write your code in
              real time and see results immediately, without downloading any
              software.
            </p>

            <h4 className="font-medium mb-2">
              Check out our other online compilers
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-5 text-sm text-indigo-700">
              <li>
                <a className="hover:underline" href="/compiler/language/python">
                  Online Python Compiler
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/compiler/language/java">
                  Online Java Compiler
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/compiler/language/cpp">
                  Online C++ Compiler
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/compiler/language/c">
                  Online C Compiler
                </a>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href="/compiler/language/javascript"
                >
                  Online JavaScript Compiler
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/compiler/language/php">
                  Online PHP Compiler
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/compiler/language/ruby">
                  Online Ruby Compiler
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerPage;
