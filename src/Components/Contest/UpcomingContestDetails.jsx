import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft, FaExclamationCircle, FaClock, FaCalendarAlt, FaTrophy } from 'react-icons/fa';
import { BsInfoCircle, BsLightbulbFill, BsQuestion } from 'react-icons/bs';
import { BiSolidInfoCircle, BiCodeAlt } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import api from '../../lib/api';
// import MainNavbar from '../MainNavbar';
// import '../PracticePage/Practice.css';
import './Contest.css';

const UpcomingContestDetails = () => {
  const { contestId } = useParams();
  const [selectedRating, setSelectedRating] = useState(null);
  const [contestData, setContestData] = useState(null);
  const [time, setTime] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });

  // Fetch contest data
  useEffect(() => {
    api.get(`/contests/${contestId}`)
      .then(res => setContestData(res.data?.contest))
      .catch(err => console.error('Error fetching contest:', err));
  }, [contestId]);

  // Calculate time remaining
  function getTimeLeft(startTime) {
    if (!startTime) return { days: 0, hrs: 0, min: 0, sec: 0 };
    const diff = new Date(startTime) - new Date();
    if (diff <= 0) return { days: 0, hrs: 0, min: 0, sec: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
      min: Math.floor((diff / (1000 * 60)) % 60),
      sec: Math.floor((diff / 1000) % 60),
    };
  }

  // Update timer every second
  useEffect(() => {
    if (!contestData?.startTime) return;
    
    const timer = setInterval(() => {
      setTime(getTimeLeft(contestData.startTime));
    }, 1000);
    
    // Initial set
    setTime(getTimeLeft(contestData.startTime));
    
    return () => clearInterval(timer);
  }, [contestData?.startTime]);

  // Mock data for practice problems
  const problems = [
    {
      id: 'problem1',
      name: 'Problem 1',
      rating: 'Medium',
      ratingValue: 1600,
      status: 'Solved',
      accuracy: '70%',
    },
    {
      id: 'problem2',
      name: 'Problem 2',
      rating: 'Hard',
      ratingValue: 1900,
      status: 'Unsolved',
      accuracy: '45%',
    },
    {
      id: 'problem3',
      name: 'Problem 3',
      rating: 'Easy',
      ratingValue: 1200,
      status: 'Solved',
      accuracy: '89%',
    },
    {
      id: 'problem4',
      name: 'Problem 4',
      rating: 'Medium',
      ratingValue: 1550,
      status: 'Unsolved',
      accuracy: '65%',
    },
  ];

  // Get rating class for background color
  const getRatingClass = (rating) => {
    switch(rating.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Contest information
  const contestInfo = {
    name: 'Weekend Dev Challenge 07',
    hours: 23,
    minutes: 45,
    seconds: 30,
    days: 3
  };

  return (
    <div>
      {/* <MainNavbar /> */}
      <div className="container-fluid py-3" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Breadcrumb Navigation */}
        <div className="d-flex align-items-center mb-3 px-2">
          <Link to="/" className="text-decoration-none text-muted small">HOME</Link>
          <span className="mx-2 text-muted">•</span>
          <Link to="/contest" className="text-decoration-none text-muted small">Contest</Link>
          <span className="mx-2 text-muted">•</span>
          <span className="small text-muted">Weekend-07</span>
        </div>

        {/* Blue Banner */}
        <div 
          className="mb-4 rounded" 
          style={{ 
            height: "180px", 
            background: "#0D99FF",
            borderRadius: "8px"
          }}
        ></div>

        <div className="row">
          {/* Main Content Column */}
          <div className="col-lg-8 pe-lg-4">
            {/* Rating Selection Section */}
            <h5 className="fw-bold mb-2">Participate in this contest based on your rating.</h5>
            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
              If you're a new user, select 'ratings' in all rankings under solved problem rankings to see where you stand.
            </p>
            
            {/* Division Table with Clean Design */}
            <div className="mb-4">
              <table className="table table-borderless">
                <tbody>
                  {[
                    { name: "Division 1", rating: "≥ 1800" },
                    { name: "Division 2", rating: "1600 to 1800" },
                    { name: "Division 3", rating: "Below 1600" },
                    { name: "Division 4", rating: "All" },
                  ].map((division, index) => (
                    <tr key={index} className="border-bottom" style={{ height: "50px" }}>
                      <td style={{ width: "100px", color: "#444" }}>{division.name}</td>
                      <td style={{ color: "#666" }}>
                        Rating — {division.rating}
                      </td>
                      <td className="text-end" style={{ width: "80px" }}>
                        <Link 
                          to={`/contest/upcoming/${contestId}/division/${index + 1}`} 
                          className="btn btn-sm" 
                          style={{ 
                            backgroundColor: "#1A237E", 
                            color: "white", 
                            borderRadius: "4px",
                            fontSize: "13px",
                            padding: "4px 12px",
                            fontWeight: "500"
                          }}
                        >
                          VIEW
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* About Divisions Alert */}
            <div className="mb-4">
              <div 
                className="p-2 px-3 rounded-1 d-flex align-items-center" 
                style={{ 
                  backgroundColor: "#E8F5E9", 
                  border: "none", 
                  fontSize: "14px" 
                }}
              >
                <span style={{ color: "#4CAF50", fontWeight: "600" }}>About Division & Rating System</span>
                <span className="mx-1">-</span>
                <Link to="/rating-system" style={{ color: "#0277BD", textDecoration: "none", fontWeight: "600" }}>
                  View details here
                </Link>
              </div>
            </div>

            {/* Prepare for the Contest Section */}
            <div className="mb-4">
              <h6 className="fw-bold">PREPARE FOR THE CONTEST</h6>
              <p className="text-muted small mt-3">No announcements</p>
            </div>

            {/* Contest Details Section */}
            <div className="mb-4">
              <h6 className="fw-bold">CONTEST DETAILS</h6>
              <h6 className="fw-bold mt-4 mb-2">CodeIQGenius: A Platform for Aspiring Programmers</h6>
              <p className="small text-muted mb-3">
                Create the right mindset to approach challenges & help strengthen your coding skills. 
                In this contest you need to solve 5 problems. The problems will be a combination of 
                implementation, greedy and binary search type problems. Your ranking depends on 
                solving the most problems in the given time, and the score is based on the programming time(s).
              </p>
              
              <h6 className="fw-bold mt-4">CONTEST PREPARATION: BASICS</h6>
              <p className="small text-muted mb-2">
                CodeIQGenius is a coding programming contest where current ideas are easily showcased.
              </p>
              
              <ul className="small text-muted ps-3 mb-3">
                <li>Contest Duration: Wednesday, 23 July 2023 at 20:00 WIB (UTC+7)</li>
                <li>This coding challenge will last for approximately 120 minutes</li>
              </ul>

              <h6 className="fw-bold mt-4">Eligibility Criteria: Anyone who is happy to focus on programming</h6>
              <p className="small text-muted mb-3">Our contests are open to all programmers across the globe.</p>
              
              <h6 className="fw-bold mt-4">About the Organizers</h6>
              <p className="small text-muted mb-3">
                This latest edition brings programming problems to the and you'll learn skills completing daily challenges.
                We like to encourage and foster strong programming habits. It's a fun platform to upskill yourselves.
                This platform is ideal for many kinds of programmer-related questions. The theme will be announced when the contest is selected to solve it.
              </p>
              
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm px-4 py-2 rounded-md" style={{ backgroundColor: "#1A237E", color: "white" }}>
                  Register for the Contest
                </button>
              </div>

              <h6 className="fw-bold mt-4">How to Participate</h6>
              <ul className="small text-muted ps-3 mb-3">
                <li>You are all invited to participate. The sooner that the problem will be publicly shared, the sooner you will have access to the challenges.</li>
                <li>For every question, discuss the solutions and approaches.</li>
                <li>Describe the algorithm to solve the problem.</li>
                <li>You can submit solutions any time, there's no push and pull basis!</li>
                <li>You don't need to use any specific approach for solving these questions.</li>
                <li>You are free to use libraries and built-in functions if the problem says it's okay. Use your best judgement.</li>
              </ul>
              
              <p className="small text-muted mb-3">
                We have removed all the rules that had you run the algorithm. Now our electronic file helps you keep better track of your programming scope by giving you a brief description.
              </p>

              <p className="small text-muted mb-3">
                Exams are a part of a computer science career and let's all learn something for us to improve. You are the future of technology.
                When we assess you're chasing high standards, suggestions of the correctness & style for solution reviews, in all areas, we will know what to prioritize in future contests and exams.
              </p>
              
              <p className="small text-muted mb-3">
                However, if you've solved the other similar programming submission, these are not what conventional apps & focus needed in our daily life. Every month we have new questions to help you practice.
                Thus, your rate of answers to your questions may turn out to be big. Have fun, and don't forget to code.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-lg-4 mt-3 mt-lg-0">
            {/* Contest Starts In Box */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Contest Starts In</h6>
              <div className="border rounded p-3 w-[24rem]">
                <div className="d-flex flex-column align-items-center">
                  <div className="text-center mb-2" style={{ width: "100%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">{time.days}</h5>
                    </div>
                    <small className="text-muted">DAYS</small>
                  </div>
                  <div className="text-center mb-2" style={{ width: "100%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">{time.hrs}</h5>
                    </div>
                    <small className="text-muted">HRS</small>
                  </div>
                  <div className="text-center mb-2" style={{ width: "100%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">{time.min}</h5>
                    </div>
                    <small className="text-muted">MIN</small>
                  </div>
                  <div className="text-center" style={{ width: "100%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">{time.sec}</h5>
                    </div>
                    <small className="text-muted">SEC</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Contest Details */}
            <h6 className="fw-bold mb-3">Contest Details</h6>
            <div className="d-flex justify-content-between mb-4">
              <div className="text-center" style={{ width: "32%" }}>
                <div className="border rounded p-2">
                  <div className="mb-1">
                    <BsInfoCircle size={20} color="#1976D2" />
                  </div>
                  <span className="d-block small text-muted">Contest Brief</span>
                </div>
              </div>
              <div className="text-center" style={{ width: "32%" }}>
                <div className="border rounded p-2">
                  <div className="mb-1">
                    <FaCalendarAlt size={20} color="#1976D2" />
                  </div>
                  <span className="d-block small text-muted">Schedule</span>
                </div>
              </div>
              <div className="text-center" style={{ width: "32%" }}>
                <div className="border rounded p-2">
                  <div className="mb-1">
                    <FaTrophy size={20} color="#1976D2" />
                  </div>
                  <span className="d-block small text-muted">How You Win</span>
                </div>
              </div>
            </div>

            {/* Contest Reminder */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Contest Reminder</h6>
              <div className="border rounded p-3 text-center">
                <div className="mb-3">
                  <FaTrophy size={48} color="#FFD700" />
                </div>
                <button 
                  className="btn w-100 mb-2 px-4 py-2 rounded-md" 
                  style={{ 
                    backgroundColor: "#1A237E", 
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  Register for the Contest
                </button>
              </div>
            </div>

            {/* Include FCA */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Include FCA</h6>
              <div 
                className="rounded" 
                style={{ 
                  height: "120px", 
                  background: "#2196F3"
                }}
              ></div>
            </div>

            {/* Live Ratings Graph */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Live Ratings Graph</h6>
              <div className="border rounded p-3">
                <div className="mb-3">
                  <p className="small text-muted mb-2">
                    This feature shows your live rankings graph which you can use to track your progress.
                  </p>
                  <p className="small text-muted">
                    Get yourself registered to use all these features.
                  </p>
                </div>
                <button 
                  className="btn w-100 px-4 py-2 rounded-md" 
                  style={{ 
                    border: "1px solid #1A237E", 
                    color: "#1A237E", 
                    fontWeight: "500",
                    fontSize: "14px"
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingContestDetails;