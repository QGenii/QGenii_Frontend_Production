import React from "react";
import MainNavbar from "../../MainNavbar";

const PracticeTabsNavbar = ({
  activeTab = "old",
  onTabChange = () => {}
}) => {
  return (
    <div>
      
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "transparent",
        paddingTop: 24,
        paddingBottom: 18
      }}
    >
      
      <div
        style={{
          display: "flex",
          background: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(33, 150, 243, 0.06)",
          overflow: "hidden"
        }}
      >
        {/* All Old Practice Problems Tab */}
        <button
          onClick={() => onTabChange("old")}
          style={{
            background: activeTab === "old" ? "#133b77" : "#fff",
            color: activeTab === "old" ? "#fff" : "#133b77",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            outline: "none",
            padding: "18px 38px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          <svg width="22" height="22" fill={activeTab === "old" ? "#fff" : "#133b77"} style={{ marginRight: 8 }} viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          All Old Practice Problems
        </button>
        {/* Recent Contest Problems Tab */}
        <button
          onClick={() => onTabChange("recent")}
          style={{
            background: activeTab === "recent" ? "#133b77" : "#fff",
            color: activeTab === "recent" ? "#fff" : "#133b77",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            outline: "none",
            padding: "18px 38px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          <svg width="22" height="22" fill={activeTab === "recent" ? "#fff" : "#133b77"} style={{ marginRight: 8 }} viewBox="0 0 24 24">
            <path d="M17 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2v-2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2V8H7A2 2 0 0 1 5 6V4a2 2 0 0 1 2-2z"/>
          </svg>
          Recent Contest Problems
        </button>
      </div>
    </div>
    </div>
  );
};

export default PracticeTabsNavbar;