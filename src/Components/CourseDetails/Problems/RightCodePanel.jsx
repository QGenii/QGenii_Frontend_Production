import React, { useState, useEffect, useRef } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import CodeEditor from "../../Compiler/CodeEditor";

// Default programming languages (fallback if API fails)
const defaultProgrammingLanguages = [
  "C++",
  "C",
  "C#",
  "Go",
  "Java",
  "JavaScript",
  "Kotlin",
  "Python3",
  "PyPy 3",
  "R",
  "Rust",
  "SQL",
  "TypeScript"
];

// Map display names to piston runtime language names
const languageMap = {
  "Python3": "python",
  "PyPy 3": "python",
  "C++": "cpp",
  "C#": "csharp",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "Java": "java",
  "Go": "go",
  "Rust": "rust",
  "Kotlin": "kotlin",
  "R": "r",
  "SQL": "sql",
  "C": "c"
};

const RightCodePanel = ({
  defaultProgLang = "Python3"
}) => {
  const [selectedProgLang, setSelectedProgLang] = useState(defaultProgLang);
  const [showProgDropdown, setShowProgDropdown] = useState(false);
  const [code, setCode] = useState("# cook your dish here");
  const [customInput, setCustomInput] = useState("");
  const [runOutput, setRunOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runtimes, setRuntimes] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState(defaultProgrammingLanguages);
  const [searchQuery, setSearchQuery] = useState(""); // For searchable dropdown
  const dropdownRef = useRef(null);

  // Fetch available runtimes from API
  useEffect(() => {
    const fetchRuntimes = async () => {
      try {
        const response = await api.get("https://emkc.org/api/v2/piston/runtimes", {
          headers: { "Content-Type": "application/json" },
        });
        const data = response.data || [];
        setRuntimes(data);
        
        // Extract language names from runtimes
        if (data.length > 0) {
          const langNames = [...new Set(data.map(rt => rt.language))]; // Remove duplicates
          setProgrammingLanguages(langNames);
        }
      } catch (err) {
        console.error("Failed to fetch runtimes, using defaults:", err);
        // Keep default languages if API fails
      }
    };

    fetchRuntimes();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProgDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selected language when runtimes are loaded (if default not available)
  useEffect(() => {
    if (runtimes.length > 0) {
      const langNames = [...new Set(runtimes.map(rt => rt.language))];
      const currentLangExists = langNames.includes(selectedProgLang) || 
                                runtimes.find(rt => rt.language.toLowerCase() === selectedProgLang.toLowerCase());
      
      if (!currentLangExists) {
        // If selected language not in runtimes, try to find a match or use first available
        const pythonRuntime = runtimes.find(rt => 
          rt.language.toLowerCase() === "python" || 
          rt.language.toLowerCase() === "python3"
        );
        if (pythonRuntime) {
          setSelectedProgLang(pythonRuntime.language);
        } else if (runtimes.length > 0) {
          setSelectedProgLang(runtimes[0].language);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runtimes]); // Only depend on runtimes to avoid infinite loop

  // Convert display language name to piston runtime language
  const getPistonLanguage = (displayLang) => {
    // Check direct mapping first
    if (languageMap[displayLang]) {
      return languageMap[displayLang];
    }
    
    // Check if it exists in runtimes
    const runtime = runtimes.find(rt => 
      rt.language.toLowerCase() === displayLang.toLowerCase() ||
      rt.aliases?.some(alias => alias.toLowerCase() === displayLang.toLowerCase())
    );
    
    if (runtime) {
      return runtime.language;
    }
    
    // Default fallback
    return displayLang.toLowerCase();
  };

  // Filter languages based on search query
  const filteredLanguages = programmingLanguages.filter(lang =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Real code execution
  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Please write some code before running");
      return;
    }

    try {
      setIsRunning(true);
      setRunOutput(null);
      
      const pistonLanguage = getPistonLanguage(selectedProgLang);
      
      const payload = {
        language: pistonLanguage,
        code: code,
        stdin: customInput,
      };

      const response = await api.post("/compiler/runCode", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Handle different response formats
      const output = response.data?.output || response.data?.message || JSON.stringify(response.data);
      setRunOutput(output);
    } catch (err) {
      console.error("Run error:", err);
      const errorMessage = err?.response?.data?.message || 
                          err?.response?.data?.error || 
                          err?.message || 
                          "Failed to run code";
      setRunOutput(`Error: ${errorMessage}`);
      toast.error("Code execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  // Handle clear output and input
  const handleClear = () => {
    setRunOutput(null);
    setCustomInput("");
    toast.success("Cleared");
  };

  return (
    <div style={{ width: "100%", background: "#F8FAFF", minHeight: "100vh", padding: 0 }}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Top Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 0 12px 0",
        background: "#fff",
        justifyContent: "space-between"
      }}>
        {/* Programming Language Dropdown - Searchable */}
        <div style={{ position: "relative", marginLeft: 8 }} ref={dropdownRef}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowProgDropdown(true);
              }}
              onFocus={() => setShowProgDropdown(true)}
              style={{
                background: "#f4f8fd",
                color: "#222",
                border: "1px solid #bdbdbd",
                borderRadius: 4,
                padding: "8px 32px 8px 16px",
                fontWeight: 500,
                fontSize: 15,
                minWidth: 150,
                outline: showProgDropdown ? "2px solid #23406e" : "none"
              }}
            />
            <span style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#666"
            }}>
              {showProgDropdown ? "▲" : "▼"}
            </span>
          </div>
          {showProgDropdown && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "#e3f0fc",
              borderRadius: 4,
              boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
              marginTop: 2,
              zIndex: 100,
              minWidth: 180,
              maxHeight: 300,
              overflowY: "auto",
              border: "1px solid #bdbdbd"
            }}>
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map(lang => (
                  <div
                    key={lang}
                    onClick={() => {
                      setSelectedProgLang(lang);
                      setShowProgDropdown(false);
                      setSearchQuery("");
                    }}
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      background: selectedProgLang === lang ? "#d1eaff" : "transparent",
                      fontWeight: selectedProgLang === lang ? 600 : 400
                    }}
                    onMouseEnter={(e) => {
                      if (selectedProgLang !== lang) {
                        e.currentTarget.style.background = "#d1eaff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedProgLang !== lang) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {lang}
                  </div>
                ))
              ) : (
                <div style={{ padding: "8px 16px", color: "#666" }}>
                  {searchQuery ? "No languages found" : "Loading languages..."}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Run Button */}
        <h2>Selected : {selectedProgLang}</h2>
        <button
          onClick={handleRun}
          disabled={isRunning}
          style={{
            background: isRunning ? "#ccc" : "#fff",
            border: "1px solid #23406e",
            color: isRunning ? "#666" : "#23406e",
            borderRadius: 4,
            padding: "8px 32px",
            fontWeight: 500,
            fontSize: 15,
            cursor: isRunning ? "not-allowed" : "pointer",
            opacity: isRunning ? 0.6 : 1
          }}
        >
          {isRunning ? "Running..." : "▶ Run"}
        </button>
        {/* Submit Button */}
        
        {/* Icons */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16, marginRight: 12 }}>
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer"
          }}>
            <svg width="22" height="22" fill="#23406e" viewBox="0 0 24 24"><path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z"/></svg>
          </button>
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer"
          }}>
            <svg width="22" height="22" fill="#23406e" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A6.5 6.5 0 0 1 8.5 2c1.74 0 3.41.81 4.5 2.09A6.5 6.5 0 0 1 21 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>
          </button>
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer"
          }}>
            <svg width="22" height="22" fill="#23406e" viewBox="0 0 24 24"><path d="M12 4V1m0 22v-3m8-8h3M1 12H4m15.07-7.07l2.12-2.12M4.93 19.07l-2.12 2.12m0-16.97l2.12 2.12M19.07 19.07l2.12 2.12"/></svg>
          </button>
        </div>
      </div>
      {/* Code Editor - Using CodeEditor Component */}
      <div style={{
        background: "#24262C",
        borderRadius: 8,
        margin: "0 0 18px 0",
        minHeight: 260,
        width: "100%",
        boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
        overflow: "hidden"
      }}>
        <CodeEditor
          code={code}
          language={selectedProgLang}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      {/* Output Console - Integrated Input/Output like Compiler */}
      <div style={{
        background: "#fff",
        borderRadius: 8,
        padding: "16px",
        marginBottom: 18,
        boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          marginBottom: 12 
        }}>
          <h5 style={{ 
            fontWeight: 600, 
            fontSize: 16, 
            margin: 0,
            color: "#222"
          }}>
            Output
          </h5>
          {(runOutput !== null || customInput) && (
            <button
              onClick={handleClear}
              style={{
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontSize: 14,
                padding: "4px 8px",
                borderRadius: 4
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Clear
            </button>
          )}
        </div>

        {/* Output Console */}
        <div className="hide-scrollbar" style={{
          background: "#1e1e1e",
          borderRadius: 6,
          padding: "12px",
          minHeight: 120,
          maxHeight: 300,
          overflowY: "auto",
          fontFamily: "Fira Mono, monospace",
          fontSize: 14,
          color: "#d4d4d4"
        }}>
          {isRunning ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 16,
                height: 16,
                border: "2px solid #4ec9b0",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }} />
              <span style={{ color: "#4ec9b0" }}>Running your code...</span>
            </div>
          ) : runOutput !== null ? (
            <pre style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              color: runOutput?.startsWith("Error:") ? "#f48771" : "#d4d4d4"
            }}>
              {runOutput || "No output"}
            </pre>
          ) : (
            <div style={{ color: "#6a6a6a", fontStyle: "italic" }}>
              Run your code to see output
            </div>
          )}

          {/* Inline Input in Console - Programiz style */}
          {!isRunning && (
            <div style={{ 
              marginTop: 12, 
              paddingTop: 12, 
              borderTop: "1px solid #3e3e3e",
              display: "flex", 
              alignItems: "center", 
              gap: 8 
            }}>
              <span style={{ color: "#4ec9b0", fontWeight: 600 }}>{">"}</span>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleRun();
                  }
                }}
                placeholder="Type input here and press Enter to run..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#d4d4d4",
                  fontSize: 14,
                  fontFamily: "Fira Mono, monospace"
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightCodePanel;