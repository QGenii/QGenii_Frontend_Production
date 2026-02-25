import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaInfoCircle, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { BsInfoCircle, BsFileEarmark } from 'react-icons/bs';
// import MainNavbar from '../MainNavbar';
import './Contest.css';

const UpcomingContestDivisionPage = () => {
  const { contestId, divisionId } = useParams();

  return (
    <div>
      {/* <MainNavbar /> */}
      <div className="container-fluid py-3" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Breadcrumb Navigation */}
        <div className="d-flex align-items-center mb-3 px-2">
          <Link to="/" className="text-decoration-none text-muted small">Home</Link>
          <span className="mx-2 text-muted">•</span>
          <Link to="/contest" className="text-decoration-none text-muted small">Contests</Link>
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
            {/* Solvable Problems Section */}
            <h5 className="fw-bold mb-3">Solvable Problems for Division I</h5>
            
            <div className="table-responsive mb-4">
              <table className="table table-bordered bg-light" style={{ borderColor: "#dee2e6" }}>
                <thead className="bg-light">
                  <tr>
                    <th scope="col" style={{ width: "50px", fontSize: "14px" }}>S/No.</th>
                    <th scope="col" style={{ fontSize: "14px" }}>Code</th>
                    <th scope="col" style={{ fontSize: "14px" }}>Successful Submissions</th>
                    <th scope="col" style={{ fontSize: "14px" }}>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center small py-2">
                      Problems will be available here for practice 3 days after the event.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* ANNOUNCEMENTS Section */}
            <div className="mb-4">
              <div className="bg-light p-3 rounded">
                <h6 className="fw-bold mb-3" style={{ color: "#0277BD" }}>ANNOUNCEMENTS</h6>
                <p className="small text-muted mb-0">No announcements.</p>
              </div>
            </div>

            {/* START HERE DETAILS Section */}
            <div className="mb-4">
              <div className="bg-light p-3 rounded">
                <h6 className="fw-bold mb-3" style={{ color: "#0277BD" }}>STARTER100 • DETAILS</h6>

                <h6 className="fw-bold mt-3 mb-2">CodeIQGenius: A Platform for Aspiring Programmers</h6>
                <p className="small text-muted">
                  CodeIQGenius was created as a platform to help programmers hone it through the world of 
                  competitive programming and build problem-solving skills. It has been trusted by thousands of 
                  developers from around the world who use our platform to solve everyday real life 
                  programming problems. Come join us and be a part of the community.
                </p>

                <h6 className="fw-bold mt-4 mb-2">ABOUT CodeIQGenius STARTERS:</h6>
                <p className="small text-muted">
                  CodeIQGenius Starters is a short programming contest which takes place on every Wednesday.
                </p>

                <h6 className="fw-bold mt-4 mb-2">Contest Details:</h6>
                <ul className="ps-4 small text-muted mb-3">
                  <li>Contest Duration: 2 hours</li>
                  <li>Start Date: Wednesday, 27th July, 2023 at 20:00 (WIB)</li>
                  <li>End Date: Wednesday, 27th July, 2023 at 22:00 (WIB)</li>
                </ul>

                <h6 className="fw-bold mt-4 mb-2">Eligibility Criteria: Anyone with a knack for programming</h6>
                <p className="small text-muted">
                  Our contests are open to all programmers across the globe.
                </p>

                <h6 className="fw-bold mt-4 mb-2">What's in it for you?</h6>
                <p className="small text-muted">
                  This latest edition brings programming problems to the and we'll test your skills competing. Also, 
                  they have a computer programming center for practicing different types of programming challenges. 
                  We like to encourage and foster strong programming habits. It's a fun platform to upskill yourselves. 
                  We've created this platform for many kinds of programmer-related questions. The themes are expected 
                  solutions to code in.
                </p>

                <h6 className="fw-bold mt-4 mb-2">Rules and Regulations</h6>
                <p className="small text-muted">
                  <strong>Timing is of the essence:</strong> The sooner that the problem will be publicly shared, the sooner you will get to submit the solutions for solving contest level tasks.
                </p>
                <ul className="ps-4 small text-muted mb-3">
                  <li>Remember that these test cases will be visible on your solution page.</li>
                  <li>Use/Understanding of the problem context correctly. No Brute force or just copy/paste the solution.</li>
                  <li>Your score depends on the time (cpu + penalty) elapsed in the contest or sum of time.</li>
                  <li>Check input and output format and follow it accordingly. Failure in the submission of this format will make your submission invalid.</li>
                  <li>We have derived all of the problem test sets as good as possible for better understanding, We request you to submit your solution in a timely manner to avoid server congestion.</li>
                  <li>You can also reach out to practice@codeiqgenius.com during the contest.</li>
                </ul>

                <p className="small text-muted">
                  <strong>Please do not focus on entirely implementing compilers, or else it may continue to dump the contest.</strong> Having said that:
                </p>
                <ul className="ps-4 small text-muted mb-3">
                  <li>If you're caught using someone's algorithm as if it can be a viable one, be prepared.</li>
                  <li>Accessing other CPU problems in your contest or questions beyond scope of the task.</li>
                  <li>Accessing CodeIQGenius problems in any manner at a particular time of the week; or</li>
                  <li>Committing/discussing any other hacks on the platform or trying to disrupt the contest infrastructure.</li>
                </ul>
                
                <p className="small text-muted">
                  <strong>Note:</strong> Contact your Guide Correctly, and Be sure your codes are run checked.
                </p>
                <p className="small text-muted">
                  However, if you're asking any other online development sources in real time, make sure it has offer convenience 
                  towards other comfort while programming practice rather than copying the solution "as is" which could introduce 
                  the code that you didn't. If you need more, check in at Code your experience (about your result)!
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-lg-4 mt-3 mt-lg-0">
            {/* Contest Starts In */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Contest Starts In</h6>
              <div className="border rounded p-3">
                <div className="d-flex justify-content-between">
                  <div className="text-center px-2" style={{ width: "24%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">3</h5>
                    </div>
                    <small className="text-muted">DAYS</small>
                  </div>
                  <div className="text-center px-2" style={{ width: "24%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">24</h5>
                    </div>
                    <small className="text-muted">HRS</small>
                  </div>
                  <div className="text-center px-2" style={{ width: "24%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">36</h5>
                    </div>
                    <small className="text-muted">MIN</small>
                  </div>
                  <div className="text-center px-2" style={{ width: "24%" }}>
                    <div style={{ backgroundColor: "#E3F2FD", borderRadius: "4px", padding: "8px 0" }}>
                      <h5 className="mb-0">10</h5>
                    </div>
                    <small className="text-muted">SEC</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Contest Details */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Contest Details</h6>
              <div className="d-flex justify-content-between">
                <div className="text-center" style={{ width: "32%" }}>
                  <div className="border rounded p-2">
                    <div className="mb-1 text-center">
                      <BsInfoCircle size={20} color="#1976D2" />
                    </div>
                    <span className="d-block small text-muted">Contest Brief</span>
                  </div>
                </div>
                <div className="text-center" style={{ width: "32%" }}>
                  <div className="border rounded p-2">
                    <div className="mb-1 text-center">
                      <FaCalendarAlt size={20} color="#1976D2" />
                    </div>
                    <span className="d-block small text-muted">Schedule</span>
                  </div>
                </div>
                <div className="text-center" style={{ width: "32%" }}>
                  <div className="border rounded p-2">
                    <div className="mb-1 text-center">
                      <FaTrophy size={20} color="#1976D2" />
                    </div>
                    <span className="d-block small text-muted">How You Win</span>
                  </div>
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
                  className="btn w-100" 
                  style={{ 
                    backgroundColor: "#1A237E", 
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  Register for the contest
                </button>
              </div>
            </div>

            {/* Live Ratings Graph */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Live Ratings Graph</h6>
              <div className="border rounded p-3">
                <div className="chart-container mb-3" style={{ height: "200px", position: "relative" }}>
                  {/* Bar chart visualization */}
                  <div style={{ 
                    position: "absolute", 
                    bottom: "30px",
                    left: "10%", 
                    width: "10%", 
                    height: "50px", 
                    backgroundColor: "#6C55E0" 
                  }}></div>
                  <div style={{ 
                    position: "absolute", 
                    bottom: "30px",
                    left: "25%", 
                    width: "10%", 
                    height: "80px", 
                    backgroundColor: "#F44336" 
                  }}></div>
                  <div style={{ 
                    position: "absolute", 
                    bottom: "30px",
                    left: "40%", 
                    width: "10%", 
                    height: "120px", 
                    backgroundColor: "#9C27B0" 
                  }}></div>
                  <div style={{ 
                    position: "absolute", 
                    bottom: "30px",
                    left: "55%", 
                    width: "10%", 
                    height: "90px", 
                    backgroundColor: "#FFC107" 
                  }}></div>
                  <div style={{ 
                    position: "absolute", 
                    bottom: "30px",
                    left: "70%", 
                    width: "10%", 
                    height: "70px", 
                    backgroundColor: "#4CAF50" 
                  }}></div>
                </div>
                <p className="text-muted small mb-0">
                  This feature allows you to see how your live rating compares to others. 
                  See the spikes in your rankings and note how specific changes in 
                  your performance influence your ratings score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingContestDivisionPage;