import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SyllabusSidebar from "./SyllabusSidebar"; // Make sure the path is correct

import MainNavbar from "../../MainNavbar"; // Import MainNavbar if needed
import UpperNavbar from "../../upperNavbar"; // Import UpperNavbar if needed

const QuestionNavbar = ({ title = "Code Output-MCQ", path = ["Practice", "Programming Languages", "Practice C++"] }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        {/* <MainNavbar /> */}
        {/* <UpperNavbar /> */}
      </div>
      {/* Top Navigation Bar */}
      <div style={{
        background: "#002856",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {path.map((item, index) => (
            <React.Fragment key={index}>
              <span 
                style={{ 
                  cursor: "pointer", 
                  marginRight: "8px",
                  fontSize: "16px",
                  fontWeight: index === path.length - 1 ? "500" : "400",
                  color: "white"
                }}
                onClick={() => navigate(index === 0 ? "/practice" : "#")}
              >
                {item}
              </span>
              {index < path.length - 1 && (
                <span style={{ marginRight: "8px", fontSize: "16px", color: "white" }}>{'>'}</span>
              )}
            </React.Fragment>
          ))}
          {title && (
            <>
              <span style={{ marginRight: "8px", fontSize: "16px", color: "white" }}>{'>'}</span>
              <span style={{ fontSize: "16px", fontWeight: "500", color: "white" }}>{title}</span>
            </>
          )}
        </div>
        {/* Menu Icon */}
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: 16,
            padding: 4,
            display: "flex",
            alignItems: "center"
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
            <rect x="4" y="6" width="16" height="2" rx="1"/>
            <rect x="4" y="11" width="16" height="2" rx="1"/>
            <rect x="4" y="16" width="16" height="2" rx="1"/>
          </svg>
        </button>
      </div>

      {/* Module Navigation Bar */}
      <div style={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #e0e0e0",
        background: "#fff"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={{ 
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            <span style={{ 
              fontSize: "14px", 
              fontWeight: "500", 
              color: "#555", 
              marginLeft: "4px" 
            }}>
              Prev Module
            </span>
          </button>

          <div style={{ 
            display: "flex", 
            alignItems: "center",
            margin: "0 20px"
          }}>
            <div style={{
              height: "4px",
              width: "12px",
              backgroundColor: "#002856",
              borderRadius: "2px",
              margin: "0 2px"
            }}></div>
            <div style={{
              height: "4px",
              width: "12px",
              backgroundColor: "#e0e0e0",
              borderRadius: "2px",
              margin: "0 2px"
            }}></div>
            <div style={{
              height: "4px",
              width: "12px",
              backgroundColor: "#e0e0e0",
              borderRadius: "2px",
              margin: "0 2px"
            }}></div>
            <div style={{
              height: "4px",
              width: "12px",
              backgroundColor: "#e0e0e0",
              borderRadius: "2px",
              margin: "0 2px"
            }}></div>
            <div style={{
              height: "4px",
              width: "12px",
              backgroundColor: "#e0e0e0",
              borderRadius: "2px",
              margin: "0 2px"
            }}></div>
          </div>

          <button style={{ 
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center" 
          }}>
            <span style={{ 
              fontSize: "14px", 
              fontWeight: "500", 
              color: "#555", 
              marginRight: "4px" 
            }}>
              Next
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer" 
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
            </svg>
          </button>

          <button style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer" 
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
              <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <SyllabusSidebar onClose={() => setSidebarOpen(false)} />
      )}
    </>
  );
};

export default QuestionNavbar;