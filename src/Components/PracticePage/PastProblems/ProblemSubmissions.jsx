import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainNavbar from "../../MainNavbar";

// Dummy data for submissions
const submissionsData = [
  { id: "123456", user: "user_name_01", time: "13 seconds ago", result: "AC", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123457", user: "user_name_01", time: "13 seconds ago", result: "WA", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123458", user: "user_name_01", time: "13 seconds ago", result: "AC", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123459", user: "user_name_01", time: "13 seconds ago", result: "WA", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123460", user: "user_name_01", time: "13 seconds ago", result: "AC", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123461", user: "user_name_01", time: "13 seconds ago", result: "TLE", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123462", user: "user_name_01", time: "13 seconds ago", result: "AC", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123463", user: "user_name_01", time: "13 seconds ago", result: "WA", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123464", user: "user_name_01", time: "13 seconds ago", result: "AC", runtime: "0.00", memory: "1.5M", language: "C" },
  { id: "123465", user: "user_name_01", time: "13 seconds ago", result: "RE", runtime: "0.00", memory: "1.5M", language: "C" },
];

// Result code to display mapping
const resultDisplay = {
  "AC": { icon: "✓", color: "#1db954", description: "Correct" },
  "WA": { icon: "✗", color: "#e74c3c", description: "Wrong Answer" },
  "TLE": { icon: "⌛", color: "#f39c12", description: "Time Limit Exceeded" },
  "RE": { icon: "⚠️", color: "#e67e22", description: "Runtime Error" },
  "CE": { icon: "⚙️", color: "#9b59b6", description: "Compilation Error" },
};

// Languages for dropdown
const languages = [
  "C++", "C", "C#", "Go", "Java", "JavaScript", "Kotlin", "Python3", "PyPy 3", "R", "Rust", "SQL", "TypeScript"
];

// Result types for dropdown
const resultTypes = [
  "Correct", "Partial Correct", "Wrong Answer", "Limited time exceeded", "Runtime Error", "Internal Error", "Compilation Error"
];

// Contest names for dropdown
const contests = [
  "Contest Name", "Contest Name", "Contest Name", "Contest Name", "Contest Name"
];

const ProblemSubmissions = () => {
  const { problemId } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showResultDropdown, setShowResultDropdown] = useState(false);
  const [showContestDropdown, setShowContestDropdown] = useState(false);
  const navigate = useNavigate();
  
  const getResultStyle = (result) => {
    return {
      backgroundColor: resultDisplay[result]?.color || "#ccc"
    };
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <MainNavbar />
      <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: "0 20px" }}>
        {/* Breadcrumb navigation */}
        <div style={{ 
          background: "#002856", 
          color: "white", 
          padding: "12px 20px", 
          display: "flex", 
          alignItems: "center",
          fontSize: "14px"
        }}>
          <span 
            onClick={() => navigate("/practice")}
            style={{ cursor: "pointer", marginRight: "5px" }}
          >
            Practice
          </span> {" > "}
          <span 
            onClick={() => navigate("/past/problems")}
            style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
          >
            Old Practice Pages
          </span> {" > "}
          <span 
            onClick={() => navigate(`/problems/${problemId}`)}
            style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }}
          >
            {problemId}
          </span> {" > "}
          <span style={{ marginLeft: "5px" }}>Submissions</span>
        </div>

        {/* Page title */}
        <h2 style={{ margin: "20px 0", fontWeight: "500" }}>Submissions for {problemId || "INNDAY"}</h2>

        {/* Search and filters row */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          gap: "10px", 
          marginBottom: "20px" 
        }}>
          {/* Search field */}
          <div style={{ position: "relative" }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                padding: "10px", 
                paddingLeft: "30px",
                border: "1px solid #ddd", 
                borderRadius: "4px",
                width: "200px"
              }}
            />
            <span style={{ position: "absolute", left: "10px", top: "10px", color: "#666" }}>🔍</span>
          </div>

          {/* Filter dropdowns */}
          {/* Language dropdown */}
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => {
                setShowLanguageDropdown(!showLanguageDropdown);
                setShowResultDropdown(false);
                setShowContestDropdown(false);
              }}
              style={{ 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                background: "white",
                minWidth: "120px",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {selectedLanguage || "Select Language"} <span>▼</span>
            </button>
            {showLanguageDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 10,
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "200px",
                maxHeight: "300px",
                overflowY: "auto",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                marginTop: "5px"
              }}>
                <div style={{ padding: "10px", position: "sticky", top: 0, background: "white" }}>
                  <input 
                    type="text" 
                    placeholder="Search languages..." 
                    style={{ 
                      width: "100%", 
                      padding: "8px", 
                      border: "1px solid #ddd",
                      borderRadius: "4px"
                    }}
                  />
                </div>
                <div>
                  {languages.map((lang, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        background: selectedLanguage === lang ? "#f0f7ff" : "transparent",
                        color: selectedLanguage === lang ? "#1976d2" : "inherit",
                        borderBottom: index < languages.length - 1 ? "1px solid #eee" : "none"
                      }}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result type dropdown */}
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => {
                setShowResultDropdown(!showResultDropdown);
                setShowLanguageDropdown(false);
                setShowContestDropdown(false);
              }}
              style={{ 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                background: "white",
                minWidth: "120px",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {selectedResult || "Select Result"} <span>▼</span>
            </button>
            {showResultDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 10,
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "200px",
                maxHeight: "300px",
                overflowY: "auto",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                marginTop: "5px"
              }}>
                {resultTypes.map((result, index) => (
                  <div 
                    key={index} 
                    onClick={() => {
                      setSelectedResult(result);
                      setShowResultDropdown(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      background: selectedResult === result ? "#f0f7ff" : "transparent",
                      color: selectedResult === result ? "#1976d2" : "inherit",
                      borderBottom: index < resultTypes.length - 1 ? "1px solid #eee" : "none"
                    }}
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contest dropdown */}
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => {
                setShowContestDropdown(!showContestDropdown);
                setShowLanguageDropdown(false);
                setShowResultDropdown(false);
              }}
              style={{ 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                background: "white",
                minWidth: "120px",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {"Contest Name"} <span>▼</span>
            </button>
            {showContestDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 10,
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "200px",
                maxHeight: "300px",
                overflowY: "auto",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                marginTop: "5px"
              }}>
                {contests.map((contest, index) => (
                  <div 
                    key={index} 
                    onClick={() => setShowContestDropdown(false)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: index < contests.length - 1 ? "1px solid #eee" : "none"
                    }}
                  >
                    {contest}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submissions table */}
        <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#AFE8F3", color: "#222", fontWeight: "600" }}>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>Username</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>Date/Time</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>Result</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>Time</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>Memory</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}>Language</th>
                <th style={{ padding: "12px 8px", textAlign: "left" }}></th>
              </tr>
            </thead>
            <tbody>
              {submissionsData.map((submission, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px 8px" }}>{submission.id}</td>
                  <td style={{ padding: "12px 8px" }}>
  <button
    style={{
      background: "none",
      border: "none",
      color: "#1976d2",
      textDecoration: "underline",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "inherit",
      padding: 0,
      margin: 0
    }}
    onClick={() => navigate(`/users/${submission.user}/dashboard`)}
  >
    {submission.user}
  </button>
</td>
                  <td style={{ padding: "12px 8px" }}>{submission.time}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <span style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      width: "24px", 
                      height: "24px", 
                      borderRadius: "0%", 
                      color: "white",
                      ...getResultStyle(submission.result)
                    }}>
                      {submission.result === "AC" ? "✓" : "✗"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 8px" }}>{submission.runtime}</td>
                  <td style={{ padding: "12px 8px" }}>{submission.memory}</td>
                  <td style={{ padding: "12px 8px" }}>{submission.language}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <button 
                      style={{
                        background: "#AFE8F3",
                        border: "none",
                        color: "#1976d2",
                        cursor: "pointer",
                        borderRadius: "50%",
                        backgroundColor: "#AFE8F3",
                      }}
                      onClick={() => navigate(`/past/problems/${problemId}/submissions/${submission.id}`)}
                    >
                      ➔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "18px",
          marginRight: "24px",
          fontSize: "15px",
          color: "#23406e"
          
        }}>
          <svg width="22" height="22" fill="#23406e" style={{ marginRight: "8px", cursor: "pointer" }} viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
          1 of 1 page
          <svg width="22" height="22" fill="#23406e" style={{ marginLeft: "8px", cursor: "pointer" }} viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProblemSubmissions;