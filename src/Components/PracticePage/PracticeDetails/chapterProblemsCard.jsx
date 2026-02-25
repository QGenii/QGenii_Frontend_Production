import React from "react";
import { useNavigate } from "react-router-dom";

const ChapterProblemsCard = ({
  number = 1,
  title = "Output & Basic math Operators",
  description = "Learn how to make Python print whatever you want, and learn to use it as a basic calculator.",
  problems = [
    { name: "Code Output - MCQ", status: false, level: "Easy", id: 1, type: "mcq" },
    { name: "Print Coding, Genius!", status: false, level: "Easy", id: 2, type: "coding" },
    { name: "Identify Correct Syntax", status: false, level: "Easy", id: 3, type: "mcq" }
  ]
}) => {
  const navigate = useNavigate();

  const handleProblemClick = (problem) => {
    if (problem.type === "coding") {
      navigate(`/problems/${problem.id}`);
    } else {
      navigate(`/question/${problem.id}`);
    }
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        background: "#fff",
        border: "1px solid #e0e0e0",
        marginBottom: "20px",
        overflow: "hidden"
      }}
    >
      {/* Header section with light blue background */}
      <div style={{ 
        backgroundColor: "#7FDBFF",
        padding: "15px 20px",
        display: "flex",
        alignItems: "flex-start"
      }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "8px",
            background: "#FF9800",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            flexShrink: 0
          }}
        >
          {number}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "1.1rem", color: "#000" }}>{title}</div>
          <div style={{ color: "#333", fontSize: "0.9rem", marginTop: "4px" }}>{description}</div>
        </div>
      </div>

      {/* Problems list */}
      <div style={{ padding: "10px 20px" }}>
        {problems.map((problem, idx) => (
          <div 
            key={idx} 
            style={{ 
              marginBottom: "15px", 
              display: "flex", 
              alignItems: "center", 
              cursor: "pointer",
              padding: "8px 0",
              borderBottom: idx < problems.length - 1 ? "1px solid #f0f0f0" : "none"
            }}
            onClick={() => handleProblemClick(problem)}
          >
            <div style={{ 
              width: "20px", 
              height: "20px", 
              backgroundColor: "#FFF4E5",
              borderRadius: "4px",
              marginRight: "15px",
              flexShrink: 0
            }} />
            
            <div 
              style={{ 
                display: "inline-block",
                backgroundColor: "#FFEBEE", 
                color: "#FF5252", 
                padding: "2px 12px", 
                borderRadius: "12px", 
                fontSize: "0.85rem",
                fontWeight: "500",
                marginRight: "15px",
                flexShrink: 0,
                width: "55px",
                textAlign: "center"
              }}
            >
              {problem.level}
            </div>

            <div style={{ 
              color: "#2980B9",
              fontSize: "0.95rem",
              fontWeight: "500",
              flex: 1
            }}>
              {problem.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterProblemsCard;