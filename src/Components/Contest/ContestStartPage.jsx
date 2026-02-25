import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiTime } from 'react-icons/bi';
import { BsFileEarmarkText } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
// import MainNavbar from '../MainNavbar';
import './Contest.css';
import api from '../../lib/api.js';

const ContestStartPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [contestData, setContestData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hasParticipated, setHasParticipated] = useState(false);
  const [checkingParticipation, setCheckingParticipation] = useState(true);

  // In a real app, you would fetch the contest details based on contestId
  const contestDetails = {
    name: "Recent Weekend Coding Challenge 07: React Projects",
    duration: "1 Day",
    timeToAttempt: "Total Time To Attempt The Assessment",
    questions: "5 Questions",
    questionText: "Programming Problems And MCQs",
    readRules: "Read The Rules Carefully Before Starting",
    contestOverview: "Contest Overview",
    overview: [
      "As Part Of This Contest, You Will Need To Solve Five Problems Based On Projects Built Using React.",
      "Project 1 - Create A Tic-Tac-Toe Web App Using React.",
      "React Challenges: It Includes 3 Incomplete React Projects."
    ],
    contestRules: "Contest Rules- This Is An Un-Rated Contest.",
    rulesOpportunity: "You Can Use This As An Opportunity To",
    rulesList: [
      "Learn React",
      "Learn How Best To Utilise AI Tools In Coding A Real Life Project",
      "Discuss The Project With Your Friends"
    ],
    supportEmail: "ritesh@codeiqgenius.com",
    hours: 11,
    minutes: 27
  };

  // Fetch contest data
  useEffect(() => {
    api.get(`/contests/${contestId}`)
      .then(res => {
        console.log('Contest data:', res.data?.contest);
        setContestData(res.data?.contest);
        
        // Calculate time remaining until contest starts
        if (res.data?.contest?.startTime) {
          const startTime = new Date(res.data.contest.startTime);
          const now = new Date();
          const diff = startTime - now;
          
          if (diff > 0) {
            setTimeRemaining(diff);
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setHours(h);
            setMinutes(m);
          } else {
            // Contest has started, show the contest view (don't auto-navigate, let user click Start Assessment)
            setTimeRemaining(0);
            setHours(0);
            setMinutes(0);
          }
        }
      })
      .catch(err => console.log('Error fetching contest:', err));
  }, [contestId]);

  // Check if current user has already participated/submitted this contest
  useEffect(() => {
    const checkParticipation = async () => {
      try {
        setCheckingParticipation(true);
        const res = await api.get(`/contests/${contestId}/my-participation`);
        const participation = res.data?.data?.participation || res.data?.participation || res.data;
        const submitted = participation?.submitted === true || participation?.status === 'SUBMITTED';
        setHasParticipated(!!submitted);
      } catch (err) {
        // If there is no participation yet (404/403/etc.), treat as not participated
        if (err?.response) {
          console.log('Participation status error (non-fatal):', err.response.data || err.response.status);
        } else {
          console.log('Participation status error (non-fatal):', err.message);
        }
        setHasParticipated(false);
      } finally {
        setCheckingParticipation(false);
      }
    };

    checkParticipation();
  }, [contestId]);

  // Timer countdown effect
  useEffect(() => {
    if (timeRemaining === null) return;
    
    // If time remaining is 0 or less, just stop - don't auto-navigate
    if (timeRemaining <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          // Time is up, set to 0 and show assessment view
          setHours(0);
          setMinutes(0);
          return 0;
        }
        const newTime = prev - 1000;
        const h = Math.floor(newTime / (1000 * 60 * 60));
        const m = Math.floor((newTime % (1000 * 60 * 60)) / (1000 * 60));
        setHours(h);
        setMinutes(m);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleStartAssessment = () => {
    if (timeRemaining !== 0) return;
    if (!agreedToTerms) return;
    if (hasParticipated) return;
    navigate(`/contest/ongoing/${contestId}/assessment`);
  };

  return (
    <div>
      {/* <MainNavbar /> */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '40px auto',
        padding: '0 20px'
      }}>
        {/* Main card container */}
        <div style={{ 
          border: '1px solid #E0E0E0',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          {/* Header section with title and timer */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '15px 20px',
            borderBottom: '1px solid #E0E0E0'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              margin: 0, 
              fontWeight: '500',
              color: '#333'
            }}>
              {contestData?.title || contestDetails.name}
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                backgroundColor: '#E8F0FE',
                borderRadius: '4px',
                padding: '5px 8px',
                color: '#333',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {String(hours).padStart(2, '0')} Hrs
              </div>
              <span style={{ color: '#333', fontWeight: 'bold' }}>:</span>
              <div style={{
                backgroundColor: '#E8F0FE',
                borderRadius: '4px',
                padding: '5px 8px',
                color: '#333',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                {String(minutes).padStart(2, '0')} Min
              </div>
            </div>
          </div>
          
          {/* Main content with light blue background */}
          <div style={{ 
            backgroundColor: '#E8F5F8', 
            padding: '25px 30px'
          }}>
            {/* Top section with icons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '25px'
            }}>
              {/* Left side - Time information */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <BiTime size={24} color="#003380" style={{ marginRight: '12px' }} />
                  <span style={{ fontWeight: '600', fontSize: '18px' }}>1 Day</span>
                </div>
                <div style={{ marginLeft: '36px', color: '#333', fontSize: '14px' }}>
                  {contestDetails.timeToAttempt}
                </div>
              </div>
              
              {/* Middle - Questions information */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <BsFileEarmarkText size={22} color="#003380" style={{ marginRight: '12px' }} />
                  <span style={{ fontWeight: '600', fontSize: '18px' }}>{contestDetails.questions}</span>
                </div>
                <div style={{ marginLeft: '36px', color: '#333', fontSize: '14px' }}>
                  {contestDetails.questionText}
                </div>
              </div>
              
              {/* Right - Check icon */}
              <div>
                <AiOutlineCheckCircle size={30} color="#1BB55C" />
              </div>
            </div>

            {/* Rules and content section */}
            <div style={{ marginTop: '15px' }}>
              <p style={{ fontWeight: '600', fontSize: '16px', color: '#333', marginBottom: '16px' }}>
                {contestDetails.readRules}
              </p>
            
              <p style={{ fontWeight: '600', fontSize: '16px', color: '#333', marginBottom: '10px', marginTop: '20px' }}>
                {contestDetails.contestOverview}
              </p>
              
              <p style={{ fontSize: '15px', lineHeight: '1.5', margin: '10px 0' }}>
                {contestDetails.overview[0]}
              </p>
              
              <ul style={{ 
                paddingLeft: '20px', 
                margin: '10px 0 20px 0', 
                listStyleType: '• '
              }}>
                {contestDetails.overview.slice(1).map((item, index) => (
                  <li key={index} style={{ fontSize: '15px', marginBottom: '8px' }}>{item}</li>
                ))}
              </ul>

              <p style={{ fontWeight: '600', fontSize: '16px', color: '#333', marginBottom: '10px', marginTop: '20px' }}>
                {contestDetails.contestRules}
              </p>
              
              <p style={{ fontSize: '15px', margin: '10px 0' }}>
                {contestDetails.rulesOpportunity}
              </p>
              
              <ul style={{ 
                paddingLeft: '20px', 
                margin: '10px 0', 
                listStyleType: '• ' 
              }}>
                {contestDetails.rulesList.map((rule, index) => (
                  <li key={index} style={{ fontSize: '15px', marginBottom: '8px' }}>{rule}</li>
                ))}
              </ul>

              {/* Support Email */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: '20px'
              }}>
                <MdEmail size={20} style={{ marginRight: '8px' }} />
                <span style={{ fontSize: '15px' }}>Support </span>
                <a 
                  href={`mailto:${contestDetails.supportEmail}`}
                  style={{
                    color: '#003380',
                    textDecoration: 'none',
                    fontWeight: '500',
                    marginLeft: '5px'
                  }}
                >
                  {contestDetails.supportEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Checkbox footer */}
          <div style={{ 
            padding: '15px 20px', 
            borderTop: '1px solid #E0E0E0',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {checkingParticipation ? (
              <div style={{ width: '100%', textAlign: 'center', padding: '10px' }}>
                <span style={{ color: '#333', fontSize: '15px' }}>
                  Checking participation status...
                </span>
              </div>
            ) : hasParticipated ? (
              <div style={{ width: '100%', textAlign: 'center', padding: '10px' }}>
                <span style={{ color: '#d32f2f', fontSize: '15px', fontWeight: '500' }}>
                  You have already participated in this assessment.
                </span>
              </div>
            ) : (
              <>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: timeRemaining === 0 ? 'pointer' : 'not-allowed'
                }}>
                  <input 
                    type="checkbox" 
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                    disabled={timeRemaining !== 0}
                    style={{ 
                      marginRight: '10px',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                  <span style={{ color: '#333', fontSize: '15px' }}>
                    I agree to participate fairly in the assessment
                  </span>
                </label>
                <button 
                  onClick={handleStartAssessment}
                  disabled={timeRemaining !== 0 || !agreedToTerms || hasParticipated}
                  style={{
                    backgroundColor: (timeRemaining === 0 && agreedToTerms && !hasParticipated) ? '#0D3A80' : '#999999',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontWeight: '500',
                    cursor: (timeRemaining === 0 && agreedToTerms && !hasParticipated) ? 'pointer' : 'not-allowed',
                    opacity: (timeRemaining === 0 && agreedToTerms && !hasParticipated) ? 1 : 0.7
                  }}
                >
                  Start Assessment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestStartPage;