import React, { useState } from "react";
import UpperNavbar from "./UpperNavbar";
import RightCodePanel from "./RightCodePanel";
import { useSearchParams, useParams } from "react-router-dom";


const chatOptions = [
  {
    label: "Error Finder",
    icon: (
      <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/>
      </svg>
    )
  },
  {
    label: "Discussion Mode",
    icon: (
      <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24">
        <path d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5v7A2.5 2.5 0 0 0 5.5 16H6v3l4-3h6.5A2.5 2.5 0 0 0 21 13.5z"/>
      </svg>
    )
  },
  {
    label: "Code review",
    icon: (
      <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24">
        <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 14H4V6h16zm-7-2h2v-2h-2zm0-4h2V8h-2z"/>
      </svg>
    )
  }
];

const languageList = [
  "English",
  "Hindi",
  "Bengali",
  "Marathi",
  "Telugu",
  "Tamil",
  "Gujarati",
  "Kannada"
];

const AIHelpView = ({
  tabs = ["Statement", "Submissions", "Solutions", "AI Help"],
  avatarUrl = ""
}) => {
  const [selectedLang, setSelectedLang] = useState(languageList[0]);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const [searchParams] = useSearchParams();
  const { contentId } = useParams();
  const currentQ = Number(searchParams.get('q')) || 0;

  return (
    <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: 0 }}>
      
      <UpperNavbar
        difficulty={173}
        questions={[]}
        currentQuestionIndex={currentQ}
        totalSteps={5}
        textSectionCount={0}
        isOnQuestion={false}
        onSubmit={null}
        onSubmitDisabled={true}
        activeTab={null}
        setActiveTab={null}
        contentId={contentId}
      />

      {/* Main Content: Left (AI Help), Right (Code Panel) */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "0 32px",
        marginTop: 0,
        minHeight: "calc(100vh - 60px)"
      }}>
        {/* Left: AI Help Options */}
        <div style={{
          flex: 1.1,
          background: "#fff",
          borderRadius: "0 0 0 8px",
          marginTop: 0,
          marginRight: 12,
          padding: "32px 32px 32px 32px",
          minHeight: 600,
          boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
          position: "relative"
        }}>
          {/* Language Dropdown - upper right of left panel */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowLangDropdown(v => !v)}
                style={{
                  background: "#e6e6fa",
                  color: "#222",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 16px",
                  fontWeight: 500,
                  fontSize: 14,
                  boxShadow: "0 1px 4px rgba(33, 150, 243, 0.08)",
                  cursor: "pointer",
                  outline: showLangDropdown ? "2px solid #a259f7" : "none"
                }}
              >
                {selectedLang} <span style={{ fontSize: 12 }}>{showLangDropdown ? "▲" : "▼"}</span>
              </button>
              {showLangDropdown && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#e3f0fc",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
                  marginTop: 2,
                  zIndex: 100,
                  minWidth: 120,
                  border: "1px solid #bdbdbd"
                }}>
                  {languageList.map(lang => (
                    <div
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setShowLangDropdown(false);
                      }}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        background: selectedLang === lang ? "#d1eaff" : "transparent",
                        fontWeight: selectedLang === lang ? 600 : 400
                      }}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 24, marginBottom: 32, fontWeight: 600, fontSize: 18 }}>
            Pick any one of the chat code
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            marginTop: 24
          }}>
            {chatOptions.map(option => (
              <div key={option.label} style={{
                background: "#0A2C5E",
                color: "#fff",
                borderRadius: 12,
                width: 280,
                height: 80,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(33, 150, 243, 0.10)",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                padding: "0 20px"
              }}>
                <div style={{ marginRight: 20 }}>{option.icon}</div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{option.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Code Editor and Custom Input */}
        <div style={{
          flex: 1.3,
          minWidth: 0
        }}>
          <RightCodePanel />
        </div>
      </div>
   
    </div>
  );
};

export default AIHelpView;