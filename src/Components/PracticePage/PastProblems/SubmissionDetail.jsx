import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainNavbar from "../../MainNavbar";

// Dummy submission data
const submissionData = {
  "123456": {
    id: "123456",
    problem: "Independence Day",
    problemCode: "INNDAY",
    user: "user_name_01",
    date: "2023-05-20",
    time: "13:45:23",
    language: "C",
    result: "AC",
    runtime: "0.00",
    memory: "8.5M",
    code: `#include <stdio.h>

int main() {
    int t;
    scanf("%d", &t);
    
    while (t--) {
        int n;
        scanf("%d", &n);
        int arr[n];
        
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
        }
        
        // Solution logic
        int result = 0;
        for (int i = 0; i < n; i++) {
            result += arr[i];
        }
        
        printf("%d\\n", result);
    }
    
    return 0;
}`,
    testCases: [
      { input: "1\n5\n1 2 3 4 5", output: "15", result: "correct" },
      { input: "1\n3\n10 20 30", output: "60", result: "correct" },
      { input: "1\n4\n2 4 6 8", output: "20", result: "correct" },
      { input: "1\n2\n100 200", output: "300", result: "correct" }
    ],
    subtasks: [
      { subtaskId: 1, taskId: 0, result: "correct", time: "0.01" },
      { subtaskId: 1, taskId: 1, result: "correct", time: "0.01" },
      { subtaskId: 1, taskId: 2, result: "correct", time: "0.01" },
      { subtaskId: 1, taskId: 3, result: "correct", time: "0.01" }
    ],
    subtaskInfo: {
      id: "1176389256",
      score: "10.0",
      memory: "8.5M",
      subtaskScore: "100%",
      totalScore: "100%",
      result: "Correct"
    }
  },
  "123457": {
    id: "123457",
    problem: "Independence Day",
    problemCode: "INNDAY",
    user: "user_name_01",
    date: "2023-05-20",
    time: "13:40:12",
    language: "C",
    result: "WA",
    runtime: "0.00",
    memory: "8.5M",
    code: `#include <stdio.h>

int main() {
    int t;
    scanf("%d", &t);
    
    while (t--) {
        int n;
        scanf("%d", &n);
        int arr[n];
        
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
        }
        
        // Incorrect solution logic
        int result = 0;
        for (int i = 0; i < n; i++) {
            result += arr[i] - 1; // Subtracting 1 from each element (incorrect)
        }
        
        printf("%d\\n", result);
    }
    
    return 0;
}`,
    testCases: [
      { input: "1\n5\n1 2 3 4 5", output: "15", expected: "15", userOutput: "10", result: "wrong" },
      { input: "1\n3\n10 20 30", output: "60", expected: "60", userOutput: "57", result: "wrong" },
      { input: "1\n4\n2 4 6 8", output: "20", expected: "20", userOutput: "16", result: "wrong" },
      { input: "1\n2\n100 200", output: "300", expected: "300", userOutput: "298", result: "wrong" }
    ],
    subtasks: [
      { subtaskId: 1, taskId: 0, result: "correct", time: "0.01" },
      { subtaskId: 1, taskId: 1, result: "wrong", time: "0.01" },
      { subtaskId: 1, taskId: 2, result: "skipped", time: null },
      { subtaskId: 1, taskId: 3, result: "skipped", time: null }
    ],
    subtaskInfo: {
      id: "1176389256",
      score: "0",
      memory: "8.5M",
      subtaskScore: "0%",
      totalScore: "0%",
      result: "Wrong"
    }
  }
};

const SubmissionDetail = () => {
  const { problemId, submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch submission data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const data = submissionData[submissionId];
      setSubmission(data || {
        id: submissionId,
        problem: "Unknown Problem",
        problemCode: problemId || "UNKNOWN",
        result: "WA",
        language: "Unknown",
        code: "// No code available",
        testCases: []
      });
      setLoading(false);
    }, 500); // Simulate API delay
  }, [submissionId, problemId]);

  const goBack = () => {
    navigate(-1);
  };

  // Render loading state
  if (loading) {
    return (
      <div>
        <MainNavbar />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading submission details...</div>
      </div>
    );
  }

  // Determine if the submission was successful or not
  const isSuccess = submission.result === "AC";

  return (
    <div>
      <MainNavbar />
      
      {/* Navy blue breadcrumb header as shown in the image */}
      <div style={{ 
        background: "#0A2357", 
        color: "white",
        padding: "10px 20px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <span 
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", marginRight: "10px", fontWeight: "500" }}
          >
            Home
          </span>
          <span style={{ margin: "0 5px", opacity: 0.7 }}>»</span>
          <span 
            onClick={() => navigate("/practice")}
            style={{ cursor: "pointer", margin: "0 10px", fontWeight: "500" }}
          >
            Practice
          </span>
          <span style={{ margin: "0 5px", opacity: 0.7 }}>»</span>
          <span 
            onClick={() => navigate("/past/problems")}
            style={{ cursor: "pointer", margin: "0 10px", fontWeight: "500" }}
          >
            Old Practice Page
          </span>
          <span style={{ margin: "0 5px", opacity: 0.7 }}>»</span>
          <span 
            onClick={() => navigate(`/past/problems/${problemId}`)}
            style={{ cursor: "pointer", margin: "0 10px", fontWeight: "500" }}
          >
            {submission.problemCode}
          </span>
          <span style={{ margin: "0 5px", opacity: 0.7 }}>»</span>
          <span 
            onClick={() => navigate(`/past/problems/${problemId}/submissions`)}
            style={{ cursor: "pointer", margin: "0 10px", fontWeight: "500" }}
          >
            Submissions
          </span>
          <span style={{ margin: "0 5px", opacity: 0.7 }}>»</span>
          <span style={{ marginLeft: "5px" }}>{submission.subtaskInfo?.id || submissionId}</span>
        </div>
      </div>
      
      <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: "0 20px" }}>
        {/* Submission Header Info Section */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "20px" }}>
          <h2 style={{ margin: "0 0 20px 0", fontWeight: "500", fontSize: "24px" }}>{submission.problem}</h2>
          
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            alignItems: "center",
            gap: "20px",
            borderBottom: "1px solid #E0E0E0",
            paddingBottom: "15px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "#666" }}>Status:</span>
              <div style={{ 
                display: "flex", 
                alignItems: "center" 
              }}>
                <div style={{ 
                  width: "15px", 
                  height: "15px", 
                  borderRadius: "50%", 
                  background: isSuccess ? "#4CAF50" : "#F44336",
                  marginRight: "8px"
                }}></div>
                <span style={{ fontWeight: "500" }}>{isSuccess ? "Correct Answer" : "Wrong Answer"}</span>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "#666" }}>Submission By:</span>
              <span style={{ color: "#1976d2", fontWeight: "500" }}>{submission.user || "Username_01"}</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "#666" }}>Submitted:</span>
              <span>54 Minutes Ago</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "#666" }}>Problem:</span>
              <span style={{ color: "#1976d2", fontWeight: "500", display: "flex", alignItems: "center" }}>
                {submission.problemCode}
                <span style={{ 
                  marginLeft: "5px", 
                  fontSize: "13px",
                  color: "#666" 
                }}>
                  »
                </span>
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "#666" }}>Practice:</span>
              <span style={{ color: "#1976d2", fontWeight: "500", display: "flex", alignItems: "center" }}>
                Contest
                <span style={{ 
                  marginLeft: "5px", 
                  fontSize: "13px",
                  color: "#666" 
                }}>
                  »
                </span>
              </span>
            </div>
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            borderBottom: "1px solid #E0E0E0",
            paddingBottom: "15px",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px", color: "#666" }}>Language:</span>
              <span style={{ fontWeight: "500" }}>{submission.language === "C" ? "Java" : submission.language}</span>
            </div>
            
            <div style={{ display: "flex", gap: "15px" }}>
              <button style={{ 
                background: "transparent", 
                border: "none", 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#555">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </button>
              
              <button style={{ 
                background: "transparent", 
                border: "none", 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center" 
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#555">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
              </button>
              
              <button style={{ 
                background: "transparent", 
                border: "none", 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center" 
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#555">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              </button>
              
              <button style={{ 
                background: "transparent", 
                border: "none", 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center" 
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#555">
                  <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Rest of the content in a consistent width container */}
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Submission info and status bar */}
          <div style={{ 
            background: isSuccess ? "#e7f9ef" : "#ffefef", 
            padding: "15px", 
            borderRadius: "5px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%", 
                background: isSuccess ? "#1db954" : "#e74c3c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                marginRight: "12px"
              }}>
                {isSuccess ? "✓" : "✗"}
              </div>
              <div>
                <div style={{ fontWeight: "500", color: isSuccess ? "#1db954" : "#e74c3c" }}>
                  {isSuccess ? "Correct Answer" : "Wrong Answer"}
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {submission.date} {submission.time}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ 
                background: "#eee", 
                padding: "4px 10px", 
                borderRadius: "4px",
                fontSize: "14px"
              }}>
                {submission.language}
              </div>
              <div style={{ 
                background: "#eee", 
                padding: "4px 10px", 
                borderRadius: "4px",
                fontSize: "14px"
              }}>
                Runtime: {submission.runtime}
              </div>
              <div style={{ 
                background: "#eee", 
                padding: "4px 10px", 
                borderRadius: "4px",
                fontSize: "14px"
              }}>
                Memory: {submission.memory}
              </div>
            </div>
          </div>

          {/* Code section */}
          <div style={{ 
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
            marginBottom: "20px"
          }}>
            <div style={{ 
              padding: "15px", 
              borderBottom: "1px solid #eee",
              fontWeight: "500"
            }}>
              Solution Code
            </div>
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#1e1e1e", 
              color: "#e6e6e6",
              borderRadius: "0 0 8px 8px",
              fontFamily: "monospace",
              whiteSpace: "pre",
              overflowX: "auto",
              fontSize: "14px",
              lineHeight: "1.5"
            }}>
              {submission.code}
            </div>
          </div>

          {/* Test Cases Section */}
          <div style={{ 
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
            marginBottom: "20px"
          }}>
            <div style={{ 
              padding: "15px", 
              borderBottom: "1px solid #eee",
              fontWeight: "500"
            }}>
              {isSuccess ? "Correct Test Cases" : "Test Results"}
            </div>
            
            
            <div style={{ padding: "15px", textAlign: "right", borderTop: "1px solid #eee" }}>
              <button 
                onClick={goBack}
                style={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Back to Submissions
              </button>
            </div>
          </div>

          {/* Subtask Info Section */}
          <div style={{ 
            background: "#e7f5f9",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
            marginBottom: "20px",
            overflow: "hidden"
          }}>
            <div style={{ padding: "20px 0 15px 0" }}>
              <h3 style={{ 
                textAlign: "center", 
                margin: "0", 
                fontSize: "18px", 
                fontWeight: "500" 
              }}>
                Subtask Info
              </h3>
            </div>
            
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              padding: "0 20px",
              marginBottom: "20px",
              alignItems: "center"
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center" 
              }}>
                <div style={{ 
                  width: "4px", 
                  height: "18px",
                  backgroundColor: isSuccess ? "#4CAF50" : "#F44336",
                  marginRight: "10px",
                  borderRadius: "2px"
                }}></div>
                <span style={{ fontWeight: "500" }}>{isSuccess ? "Correct Answer" : "Wrong Answer"}</span>
                <span style={{ 
                  color: "#666", 
                  fontSize: "14px", 
                  marginLeft: "10px" 
                }}>
                  ID: {submission.subtaskInfo?.id || '1176389256'}
                </span>
              </div>
              <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: "500", display: "block", textAlign: "right" }}>Score:</span>
                  <span style={{ display: "block", textAlign: "right" }}>{submission.subtaskInfo?.score || (isSuccess ? "10.0" : "0")}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "500", display: "block", textAlign: "right" }}>Memory:</span>
                  <span style={{ display: "block", textAlign: "right" }}>{submission.memory}</span>
                </div>
              </div>
            </div>
            
            <div style={{ background: "white" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#bbdef1" }}>
                    <th style={{ padding: "10px", textAlign: "center", width: "33%" }}>Sub-Task</th>
                    <th style={{ padding: "10px", textAlign: "center", width: "33%" }}>Task #</th>
                    <th style={{ padding: "10px", textAlign: "center", width: "34%" }}>
                      Result<br />(time)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submission.subtasks?.map((subtask, index) => (
                    <tr 
                      key={index} 
                      style={{
                        background: subtask.result === "correct" ? "#e8f5e9" :
                                 subtask.result === "wrong" ? "#ffebee" :
                                 "#f5f5f5"
                      }}
                    >
                      <td style={{ padding: "10px", textAlign: "center" }}>{subtask.subtaskId}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>{subtask.taskId}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <div style={{ fontWeight: "500" }}>
                          {subtask.result === "correct" ? "Correct" :
                           subtask.result === "wrong" ? "Wrong" :
                           "Skipped testfile"}
                        </div>
                        {subtask.time && <div>({subtask.time})</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{ 
                borderTop: "1px solid #ddd", 
                padding: "10px", 
                display: "flex", 
                justifyContent: "space-between"
              }}>
                <div>Subtask Score: {submission.subtaskInfo?.subtaskScore || (isSuccess ? "100%" : "0%")}</div>
                <div>Result: {submission.subtaskInfo?.result || (isSuccess ? "Correct" : "Wrong")}</div>
              </div>
              
              <div style={{ 
                borderTop: "1px solid #ddd", 
                padding: "10px", 
                textAlign: "right" 
              }}>
                Total score={submission.subtaskInfo?.totalScore || (isSuccess ? "100%" : "0%")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;