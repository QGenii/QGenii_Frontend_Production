import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiTime } from "react-icons/bi";
import { BsFileEarmarkText } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
// import MainNavbar from '../MainNavbar';
import "./Contest.css";
import api from "../../lib/api.js";

const ContestDetailsPage = () => {
  const { contestId } = useParams();
  const [agreeToParticipate, setAgreeToParticipate] = useState(false);
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
     api.get(`/contests/${contestId}`)
     .then(res => { 
      console.log(res.data?.contest)
      setContestData(res.data?.contest)
     })
     .catch(err => console.log(err))

 
  }, []);

  // In a real app, you would fetch the contest details based on contestId
  const contestDetails = {
    name: "Recent Weekend Dev Challenge 07: React Projects",
    duration: "1 Day",
    timeToAttempt: "Total Time To Attempt The Assessment",
    questions: "5 Questions",
    questionText: "Programming Problems And MCQs",
    readRules: "Read The Rules Carefully Before Starting",
    contestOverview: "Contest Overview",
    overview: [
      "As Part Of This Contest, You Will Need To Solve Five Problems Based On Projects Built Using React.",
      "Project 1 – Create A Tic-Tac-Toe Web App Using React.",
      "React Challenges: It Includes 3 Incomplete React Projects.",
    ],
    contestRules: "Contest Rules- This Is An Un-Rated Contest.",
    rulesOpportunity: "You Can Use This As An Opportunity To",
    rulesList: [
      "Learn React",
      "Learn How Best To Utilise AI Tools In Coding A Real Life Project",
      "Discuss The Project With Your Friends",
    ],
    supportEmail: "ritesh@codeiqgenius.com",
  };

  return (
    <div>
      {/* <MainNavbar /> */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            border: "1px solid #E0E0E0",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          {/* Header section with title and button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 25px",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                margin: 0,
                fontWeight: "500",
                color: "#333",
              }}
            >
              {contestData?.title}
            </h2>
            <button
              style={{
                backgroundColor: "#0D3A80",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Start Assessment
            </button>
          </div>

          {/* Content section with light blue background */}
          <div
            style={{
              backgroundColor: "#E8F5F8",
              padding: "25px 30px",
            }}
          >
            {/* Duration and questions section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
              }}
            >
              {/* Left - Time section */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <BiTime
                    size={24}
                    color="#003380"
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ fontWeight: "500", fontSize: "17px" }}>
                    1 Day
                  </span>
                </div>
                <div
                  style={{
                    marginLeft: "34px",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  {contestDetails.timeToAttempt}
                </div>
              </div>

              {/* Middle - Questions section */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <BsFileEarmarkText
                    size={20}
                    color="#003380"
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ fontWeight: "500", fontSize: "17px" }}>
                    5 Questions
                  </span>
                </div>
                <div
                  style={{
                    marginLeft: "34px",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  {contestDetails.questionText}
                </div>
              </div>

              {/* Right - Check icon */}
              <div>
                <AiOutlineCheckCircle size={28} color="#1BB55C" />
              </div>
            </div>

            {/* Rules section */}
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <p style={{ fontWeight: "600", fontSize: "16px" }}>
                {contestDetails.readRules}
              </p>
            </div>

            {/* Contest Overview */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "600", fontSize: "16px" }}>
                {contestDetails.contestOverview}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  marginTop: "10px",
                  lineHeight: "1.5",
                }}
              >
                {contestData?.description}
              </p>
              {/* <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {contestDetails.overview.slice(1).map((item, index) => (
                  <li key={index} style={{ fontSize: '15px', marginBottom: '8px' }}>{item}</li>
                ))}
              </ul> */}
            </div>

            {/* Contest Rules */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "600", fontSize: "16px" }}>
                {contestDetails.contestRules}
              </p>
              <p style={{ fontSize: "15px", marginTop: "5px" }}>
                {contestDetails.rulesOpportunity}
              </p>
              <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                {contestDetails.rulesList.map((rule, index) => (
                  <li
                    key={index}
                    style={{ fontSize: "15px", marginBottom: "8px" }}
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support email */}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdEmail
                size={20}
                color="#003380"
                style={{ marginRight: "8px" }}
              />
              <span style={{ fontSize: "15px" }}>Support </span>
              <a
                href={`mailto:${contestDetails.supportEmail}`}
                style={{
                  color: "#003380",
                  textDecoration: "none",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                {contestDetails.supportEmail}
              </a>
            </div>
          </div>

          {/* Checkbox section */}
          <div style={{ padding: "20px 25px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "15px",
                color: "#555",
              }}
            >
              <input
                type="checkbox"
                checked={agreeToParticipate}
                onChange={() => setAgreeToParticipate(!agreeToParticipate)}
                style={{
                  marginRight: "10px",
                  width: "18px",
                  height: "18px",
                }}
              />
              I agree to participate fairly in the assessment
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetailsPage;
