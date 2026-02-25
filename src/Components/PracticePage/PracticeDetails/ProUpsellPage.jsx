import React, { useState } from "react";
import QuestionNavbar from "./QuestionNavbar";

const proFeatures = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="24" fill="#e3f2fd"/>
        <path d="M24 14v10l8 4" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Full access to 5000+ Practice Challenges in in-demand skills."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="24" fill="#e3f2fd"/>
        <path d="M32 16v16M16 16v16" stroke="#1976d2" strokeWidth="2"/>
      </svg>
    ),
    title: "Get expert-led video solutions for those tricky problems"
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="24" fill="#e3f2fd"/>
        <circle cx="24" cy="24" r="8" stroke="#1976d2" strokeWidth="2"/>
      </svg>
    ),
    title: "Stuck? Ask AI! Debug your code and clear doubts in real-time."
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="24" fill="#e3f2fd"/>
        <path d="M18 30l12-12M18 18l12 12" stroke="#1976d2" strokeWidth="2"/>
      </svg>
    ),
    title: "Hints and Hidden test cases to help you keep moving."
  }
];

const ProUpsellPage = () => {
  const [activeTab, setActiveTab] = useState("statement");

  return (
    <div style={{ background: "#f7fafd", minHeight: "100vh" }}>
      <QuestionNavbar />
      {/* Tabs */}
      <div style={{
        display: "flex",
        background: "#e3f2fd",
        borderBottom: "1px solid #e0e0e0",
        paddingLeft: 0
      }}>
        <div
          onClick={() => setActiveTab("statement")}
          style={{
            fontWeight: 500,
            fontSize: "15px",
            padding: "12px 32px",
            backgroundColor: activeTab === "statement" ? "#233e6e" : "#e3f2fd",
            color: activeTab === "statement" ? "#fff" : "#222",
            cursor: "pointer",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginRight: 2
          }}
        >
          Statement
        </div>
        <div
          onClick={() => setActiveTab("aiHelp")}
          style={{
            fontWeight: 500,
            fontSize: "15px",
            padding: "12px 32px",
            backgroundColor: activeTab === "aiHelp" ? "#233e6e" : "#e3f2fd",
            color: activeTab === "aiHelp" ? "#fff" : "#222",
            cursor: "pointer",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4
          }}
        >
          AI Help
        </div>
      </div>
      {/* Main Content */}
      <div style={{
        display: "flex",
        height: "calc(100vh - 110px)",
        background: "#f7fafd"
      }}>
        {/* Left: Locked Content */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRight: "1px solid #e0e0e0",
          minWidth: 0,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{
            filter: "blur(2.5px)",
            opacity: 0.7,
            height: "100%",
            overflow: "auto",
            padding: 32
          }}>
            <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20 }}>Project – Guess the number</h2>
            <p style={{ margin: "16px 0" }}>
              Welcome to our course on Building Projects using Python.<br /><br />
              In each module, we will build one project, step by step. First we will start with a demo of the final project you are going to build, then in each lesson we will implement functionality one by one.<br /><br />
              In this module we will build a simple Guess the Number game.<br /><br />
              Click on Run button to play around with the game in the console to understand how it functions. The project will take some time to load for the first time. Please be patient.<br /><br />
              Rules of the game:<br />
              - The computer generates a random number between 1 to 100 and you need to guess the number.<br />
              - If your guess is greater than the number, the system will output 'too high'.<br />
              - If your guess is less than the number, the system will output 'too low'.<br />
              - If your guess is within +/- 3 of the number, the system will output 'hot'.<br />
              - You have an infinite number of attempts.<br /><br />
              The concepts which will be covered:<br />
              - User output<br />
              - User input<br />
              - Conditional statements<br /><br />
              All the above concepts were covered in Learn Python.<br />
              Click Next when you are done exploring the project. Let's build it step by step in the next few lessons.
            </p>
          </div>
          {/* Lock Overlay */}
          <div style={{
            position: "absolute",
            top: "30%",
            left: 0,
            width: "100%",
            textAlign: "center",
            zIndex: 2
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <svg width="90" height="90" fill="none" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="45" fill="#e3f2fd"/>
                <path d="M45 30a10 10 0 0 1 10 10v8H35v-8a10 10 0 0 1 10-10zm0 0v-3a7 7 0 0 1 14 0v3" stroke="#233e6e" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="45" cy="55" r="4" fill="#233e6e"/>
              </svg>
              <div style={{ fontWeight: 700, fontSize: 20, margin: "16px 0 0 0", color: "#233e6e" }}>
                Don't pause your progress<br />- become a Pro Today!
              </div>
            </div>
          </div>
        </div>
        {/* Right: Pro Upsell */}
        <div style={{
          width: 420,
          background: "#fff",
          padding: "32px 24px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, textAlign: "center" }}>
            User name, Don’t Miss out!
          </div>
          <div style={{ color: "#444", fontSize: 15, marginBottom: 24, textAlign: "center" }}>
            Check out how Pro can accelerate your learning
          </div>
          {/* Features */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginBottom: 28
          }}>
            {proFeatures.map((f, i) => (
              <div key={i} style={{
                background: "#f7fafd",
                borderRadius: 12,
                padding: "18px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 1px 4px rgba(30,62,110,0.04)"
              }}>
                {f.icon}
                <div style={{ fontSize: 13, color: "#233e6e", textAlign: "center", marginTop: 8, fontWeight: 500 }}>
                  {f.title}
                </div>
              </div>
            ))}
          </div>
          {/* CTA Card */}
          <div style={{
            background: "#fffbe7",
            border: "1px solid #ffe082",
            borderRadius: 10,
            padding: "18px 18px 18px 18px",
            marginTop: 10,
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 16
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                Ready To Continue Your Python Projects For Beginners Challenges?
              </div>
              <button style={{
                background: "#1bbf4c",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 700,
                fontSize: 15,
                margin: "8px 0 4px 0",
                cursor: "pointer"
              }}>
                <span role="img" aria-label="lock">🔓</span> Unlock Pro today
              </button>
              <div style={{ color: "#d32f2f", fontSize: 12, marginTop: 2 }}>
                Your discount expires in 1 Day
              </div>
            </div>
            <div>
              <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="28" fill="#fffde7"/>
                <ellipse cx="28" cy="38" rx="10" ry="4" fill="#ffe082"/>
                <circle cx="28" cy="25" r="10" fill="#ffe082"/>
                <path d="M24 23c0-2 2-3 4-3s4 1 4 3" stroke="#233e6e" strokeWidth="2"/>
                <circle cx="25" cy="25" r="1" fill="#233e6e"/>
                <circle cx="31" cy="25" r="1" fill="#233e6e"/>
                <path d="M26 28c1 1 3 1 4 0" stroke="#233e6e" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M32 18l2 6h-4l2-6z" fill="#233e6e"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProUpsellPage;