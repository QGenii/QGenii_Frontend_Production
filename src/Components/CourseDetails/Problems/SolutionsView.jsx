import React from "react";
import UpperNavbar from "./UpperNavbar";
import RightCodePanel from "./RightCodePanel";
import { useSearchParams, useParams } from "react-router-dom";


const SolutionsView = ({
  avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg"
}) => {
  const [searchParams] = useSearchParams();
  const { contentId } = useParams();
  const currentQ = Number(searchParams.get('q')) || 0;

  return (
    <div style={{ background: "#F8FAFF", minHeight: "100vh", padding: 0 }}>
      {/* Top navigation bar */}
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

      {/* Main Content: Left (Solutions Locked), Right (Code Panel) */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "0 32px",
        marginTop: 0,
        minHeight: "calc(100vh - 60px)"
      }}>
        {/* Left: Solutions Locked Box */}
        <div style={{
          flex: 1.1,
          background: "#fff",
          borderRadius: "0 0 0 8px",
          marginTop: 0,
          marginRight: 12,
          padding: "32px 32px 32px 32px",
          minHeight: 600,
          boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "#fff8eb",
            border: "1px solid #e8e8e8",
            borderRadius: 12,
            padding: "28px 32px",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Unlock Solution For This Problem
            </div>
            <div style={{ fontSize: 15, color: "#444", marginBottom: 20 }}>
              Get Pro to unlock all the solutions in CodeIQGenius
            </div>
            
            {/* Star Character Image */}
            <div style={{ margin: "15px 0", width: 120, height: 120 }}>
              <img 
                src="/Group.png" 
                alt="Pro Character" 
                style={{ width: "100%", height: "100%" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.imgur.com/0Vq0CtO.png"; // Fallback URL
                }}
              />
            </div>
            
            <button style={{
              background: "#2ecc40",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              border: "none",
              borderRadius: 6,
              padding: "10px 20px",
              marginTop: 15,
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(46, 204, 64, 0.2)"
            }}>
              Become a Pro Member
            </button>
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

export default SolutionsView;