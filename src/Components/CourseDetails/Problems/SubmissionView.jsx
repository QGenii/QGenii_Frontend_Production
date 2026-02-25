import React from "react";
import UpperNavbar from "./UpperNavbar";
import RightCodePanel from "./RightCodePanel";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

// Dummy data for demonstration; replace with props or API data for full generic use
const explainedSolutions = [
  { id: "1776073345", result: "success", language: "PYTH 3.3", author: "User_name_01", popularity: 0 },
  { id: "1776073283", result: "success", language: "PYTH 3.2", author: "User_name_01", popularity: 0 },
  { id: "1776073774", result: "success", language: "PYTH 3.2", author: "User_name_01", popularity: 0 },
  { id: "1776073315", result: "success", language: "PYTH 3.3", author: "User_name_01", popularity: 0 }
];

const mySubmissions = [
  { id: "1776073283", result: "success", mem: "9M", time: "0.01s", language: "PYTH 3.3", date: "5 min ago" }
];

const SubmissionsView = ({
  explained = explainedSolutions,
  mySubs = mySubmissions,

}) => {
  const navigate = useNavigate();
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

      {/* Main Content: Left (Submissions), Right (Code Panel) */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "0 32px",
        marginTop: 0,
        minHeight: "calc(100vh - 60px)"
      }}>
        {/* Left: Submissions */}
        <div style={{
          flex: 1.1,
          background: "#fff",
          borderRadius: "0 0 0 8px",
          marginTop: 0,
          marginRight: 12,
          padding: "32px 32px 32px 32px",
          minHeight: 600,
          boxShadow: "0 2px 8px rgba(33, 150, 243, 0.08)"
        }}>
          {/* Explained Solutions */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Explained Solutions</div>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#F8FAFF", borderRadius: 8, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#AFE8F3", color: "#222", fontWeight: 600 }}>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>ID</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Result</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Language</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Author</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Popularity</th>
                </tr>
              </thead>
              <tbody>
                {explained.map((row) => (
                  <tr key={row.id} style={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "10px 8px" }}>{row.id}</td>
                    <td style={{ padding: "10px 8px" }}>
                      <span style={{
                        display: "inline-block",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#4caf50",
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        marginRight: 6
                      }}>✔</span>
                    </td>
                    <td style={{ padding: "10px 8px" }}>{row.language}</td>
                    <td style={{ padding: "10px 8px", color: "#1976d2", textDecoration: "underline", cursor: "pointer" }} onClick={() => {navigate(`/users/${row.author}/dashboard`)}}>
                      {row.author}
                    </td>
                    <td style={{ padding: "10px 8px" }}>{row.popularity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Floating avatar */}
          
          </div>
          {/* Other's Submissions */}
          <div style={{
            background: "#F8FAFF",
            borderRadius: 8,
            padding: "18px 18px 18px 18px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}></div>
              <div style={{ fontSize: 14, color: "#555" }}></div>
            </div>
            <div style={{ color: "#1976d2", fontWeight: 500, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center" }} onClick ={() => navigate('/past/problems/:id/submissions')}>

              View all submissions
              <svg width="18" height="18" fill="#1976d2" style={{ marginLeft: 4 }} viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z" /></svg>
            </div>
          </div>
          {/* My Submissions */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>My Submissions</div>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#AFE8F3", color: "#222", fontWeight: 600 }}>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>ID</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Result</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Mem</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Time</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Language</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "10px 8px", textAlign: "left" }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {mySubs.map((row) => (
                  <tr key={row.id} style={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "10px 8px" }}>{row.id}</td>
                    <td style={{ padding: "10px 8px" }}>
                      <span style={{
                        display: "inline-block",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#4caf50",
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        marginRight: 6
                      }}>✔</span>
                    </td>
                    <td style={{ padding: "10px 8px" }}>{row.mem}</td>
                    <td style={{ padding: "10px 8px" }}>{row.time}</td>
                    <td style={{ padding: "10px 8px" }}>{row.language}</td>
                    <td style={{ padding: "10px 8px" }}>{row.date}</td>
                    <td style={{ padding: "10px 8px" }}>
                      <svg width="18" height="18" fill="#1976d2" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 8, fontSize: 14, color: "#555", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              1 of 1 page
              <svg width="18" height="18" fill="#1976d2" style={{ marginLeft: 4 }} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
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

export default SubmissionsView;