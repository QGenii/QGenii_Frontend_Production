import React from "react";

const ProblemsSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div
      style={{
        width: 140,
        minHeight: 320,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(20,59,110,0.08)",
        padding: "18px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 18,
        marginLeft: 10,
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#888",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: 0.2,
          }}
        >
          Select Here
        </div>
        <button
          style={{
            width: "90%",
            padding: "12px 0",
            margin: "0 auto 8px auto",
            borderRadius: 6,
            border: "none",
            background: activeTab === "all" ? "#133b77" : "#f5f8fc",
            color: activeTab === "all" ? "#fff" : "#133b77",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            transition: "background 0.2s",
            display: "block",
          }}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          style={{
            width: "90%",
            padding: "12px 0",
            margin: "0 auto 8px auto",
            borderRadius: 6,
            border: "none",
            background: activeTab === "unattempted" ? "#133b77" : "#f5f8fc",
            color: activeTab === "unattempted" ? "#fff" : "#133b77",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            transition: "background 0.2s",
            display: "block",
          }}
          onClick={() => setActiveTab("unattempted")}
        >
          Unattempted
        </button>
        <button
          style={{
            width: "90%",
            padding: "12px 0",
            margin: "0 auto",
            borderRadius: 6,
            border: "none",
            background: activeTab === "attempted" ? "#133b77" : "#f5f8fc",
            color: activeTab === "attempted" ? "#fff" : "#133b77",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            transition: "background 0.2s",
            display: "block",
          }}
          onClick={() => setActiveTab("attempted")}
        >
          Attempted
        </button>
      </div>
    </div>
  );
};

export default ProblemsSidebar;