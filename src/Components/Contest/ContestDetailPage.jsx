import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import MainNavbar from '../MainNavbar';
import { HiExternalLink, HiArrowLeft } from 'react-icons/hi';
import './Contest.css';

const ContestDetailPage = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch - in a real app this would be an API call
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockContest = {
        id: contestId,
        name: `Weekly Contest ${380 + parseInt(contestId)}`,
        startTime: '2023-09-17 14:30 UTC',
        endTime: '2023-09-17 16:00 UTC',
        duration: '1h 30m',
        participants: 24689,
        rank: 3546,
        score: '3/4'
      };
      
      const mockProblems = [
        {
          id: 1,
          name: 'Maximum Number of Operations With the Same Score',
          difficulty: 'Easy',
          solved: true,
          attempts: 1,
          timeToSolve: '5m 12s'
        },
        {
          id: 2,
          name: 'Apply Operations to Make Sum of Array Greater Than or Equal to k',
          difficulty: 'Medium',
          solved: true,
          attempts: 2,
          timeToSolve: '18m 45s'
        },
        {
          id: 3,
          name: 'Minimum Cost to Make Array Equalindromic',
          difficulty: 'Medium',
          solved: true,
          attempts: 3,
          timeToSolve: '43m 28s'
        },
        {
          id: 4,
          name: 'Maximum Number of Non-overlapping Palindrome Substrings',
          difficulty: 'Hard',
          solved: false,
          attempts: 2,
          timeToSolve: '-'
        }
      ];
      
      const mockSubmissions = [
        {
          id: 1,
          problemId: 1,
          problemName: 'Maximum Number of Operations With the Same Score',
          submitTime: '2023-09-17 14:35:12',
          status: 'Accepted',
          runtime: '56 ms',
          memory: '14.2 MB'
        },
        {
          id: 2,
          problemId: 2,
          problemName: 'Apply Operations to Make Sum of Array Greater Than or Equal to k',
          submitTime: '2023-09-17 14:45:30',
          status: 'Wrong Answer',
          runtime: '64 ms',
          memory: '15.1 MB'
        },
        {
          id: 3,
          problemId: 2,
          problemName: 'Apply Operations to Make Sum of Array Greater Than or Equal to k',
          submitTime: '2023-09-17 14:49:15',
          status: 'Accepted',
          runtime: '60 ms',
          memory: '15.0 MB'
        },
        {
          id: 4,
          problemId: 3,
          problemName: 'Minimum Cost to Make Array Equalindromic',
          submitTime: '2023-09-17 15:02:45',
          status: 'Time Limit Exceeded',
          runtime: '-',
          memory: '-'
        },
        {
          id: 5,
          problemId: 3,
          problemName: 'Minimum Cost to Make Array Equalindromic',
          submitTime: '2023-09-17 15:10:18',
          status: 'Wrong Answer',
          runtime: '128 ms',
          memory: '16.5 MB'
        },
        {
          id: 6,
          problemId: 3,
          problemName: 'Minimum Cost to Make Array Equalindromic',
          submitTime: '2023-09-17 15:13:58',
          status: 'Accepted',
          runtime: '132 ms',
          memory: '16.4 MB'
        },
        {
          id: 7,
          problemId: 4,
          problemName: 'Maximum Number of Non-overlapping Palindrome Substrings',
          submitTime: '2023-09-17 15:45:22',
          status: 'Wrong Answer',
          runtime: '210 ms',
          memory: '18.2 MB'
        },
        {
          id: 8,
          problemId: 4,
          problemName: 'Maximum Number of Non-overlapping Palindrome Substrings',
          submitTime: '2023-09-17 15:58:05',
          status: 'Time Limit Exceeded',
          runtime: '-',
          memory: '-'
        }
      ];
      
      setContest(mockContest);
      setProblems(mockProblems);
      setSubmissions(mockSubmissions);
      setLoading(false);
    }, 800);
  }, [contestId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Accepted': 
        return 'text-success';
      case 'Wrong Answer':
        return 'text-danger';
      case 'Time Limit Exceeded':
        return 'text-warning';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="contest-page">
        <div className="bg-white">
          <MainNavbar />
          <div className="d-flex justify-content-between align-items-center px-4 py-3">
            <h2 className="fw-bold mb-0">Contest Details</h2>
          </div>
        </div>
        
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading contest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contest-page">
      <div className="bg-white">
        {/* <MainNavbar /> */}
        <div className="d-flex justify-content-between align-items-center px-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <Link to="/contest" className="btn btn-outline-secondary rounded-circle p-1">
              <HiArrowLeft size={20} />
            </Link>
            <h2 className="fw-bold mb-0">{contest?.name}</h2>
          </div>
          <a
            href="/practice"
            className="btn btn-dark rounded-pill px-4 d-flex align-items-center gap-2"
            style={{ backgroundColor: '#0C316E' }}
          >
            Practice Section <HiExternalLink />
          </a>
        </div>
      </div>

      <div className="container py-4">
        {/* Contest Summary */}
        <section className="mb-5">
          <div className="mb-3">
            <h3 className="section-title">Contest Summary</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <th width="20%">Contest</th>
                  <td>{contest?.name}</td>
                </tr>
                <tr>
                  <th>Start Time</th>
                  <td>{formatDate(contest?.startTime)}</td>
                </tr>
                <tr>
                  <th>End Time</th>
                  <td>{formatDate(contest?.endTime)}</td>
                </tr>
                <tr>
                  <th>Duration</th>
                  <td>{contest?.duration}</td>
                </tr>
                <tr>
                  <th>Participants</th>
                  <td>{contest?.participants?.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Your Rank</th>
                  <td>{contest?.rank?.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Your Score</th>
                  <td>{contest?.score}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Problems */}
        <section className="mb-5">
          <div className="mb-3">
            <h3 className="section-title">Problems</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <tr className="border-top border-bottom" style={{backgroundColor: "#0C316E"}}>
                <th style={{color: "white"}}>Problem Name</th>
                <th style={{color: "white"}}>Difficulty</th>
                <th style={{color: "white"}}>Status</th>
                <th style={{color: "white"}}>Attempts</th>
                <th style={{color: "white"}}>Time to Solve</th>
              </tr>
              {problems.map(problem => (
                <tr key={problem.id} className="border-bottom">
                  <td>
                    <Link to={`/practice/problems/${problem.id}`} className="problem-link" style={{color: "#0645ad"}}>
                      {problem.name}
                    </Link>
                  </td>
                  <td>
                    <span className={`difficulty-tag ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>
                    {problem.solved ? 
                      <span className="text-success">Solved</span> : 
                      <span className="text-danger">Unsolved</span>
                    }
                  </td>
                  <td>{problem.attempts}</td>
                  <td>{problem.timeToSolve}</td>
                </tr>
              ))}
            </table>
          </div>
        </section>

        {/* Submissions */}
        <section className="mb-5">
          <div className="mb-3">
            <h3 className="section-title">Your Submissions</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <tr className="border-top border-bottom" style={{backgroundColor: "#0C316E"}}>
                <th style={{color: "white"}}>Problem</th>
                <th style={{color: "white"}}>Submit Time</th>
                <th style={{color: "white"}}>Status</th>
                <th style={{color: "white"}}>Runtime</th>
                <th style={{color: "white"}}>Memory</th>
              </tr>
              {submissions.map(submission => (
                <tr key={submission.id} className="border-bottom">
                  <td>
                    <Link to={`/practice/problems/${submission.problemId}`} className="problem-link" style={{color: "#0645ad"}}>
                      {submission.problemName}
                    </Link>
                  </td>
                  <td>{formatDate(submission.submitTime)}</td>
                  <td className={getStatusClass(submission.status)}>
                    {submission.status}
                  </td>
                  <td>{submission.runtime}</td>
                  <td>{submission.memory}</td>
                </tr>
              ))}
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContestDetailPage;