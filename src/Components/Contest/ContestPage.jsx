import React, { useState, useEffect,useRef } from 'react';
import api from '../../lib/api';
// import MainNavbar from '../MainNavbar';
import { HiExternalLink, HiQuestionMarkCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './Contest.css';

const ContestPage = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [ongoingContests, setOngoingContests] = useState([]);
  const [skillTests, setSkillTests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [nowTick, setNowTick] = useState(Date.now());
  const targetRef = useRef(null)

  const formatHrsMin = (totalMinutes) => {
    if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return '';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    if (hours <= 0) return `${minutes} min`;
    return `${hours} Hrs ${minutes} Min`;
  };

  const formatCountdown = (ms) => {
    if (!Number.isFinite(ms) || ms <= 0) return '00:00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return days > 0 ? `${days}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
  };

  const getDurationText = (contest) => {
    const start = contest?.raw?.startTime ? new Date(contest.raw.startTime) : null;
    const end = contest?.raw?.endTime ? new Date(contest.raw.endTime) : null;
    if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '';
    const minutes = Math.max(0, Math.round((end - start) / (1000 * 60)));
    return formatHrsMin(minutes);
  };

  const getStartsInText = (contest, mode) => {
    // mode: 'upcoming' | 'live' | 'past'
    const now = new Date(nowTick);
    const start = contest?.raw?.startTime ? new Date(contest.raw.startTime) : null;
    const end = contest?.raw?.endTime ? new Date(contest.raw.endTime) : null;

    if (mode === 'upcoming') {
      if (!start || Number.isNaN(start.getTime())) return '';
      const ms = start - now;
      return ms > 0 ? formatCountdown(ms) : '00:00:00';
    }

    if (mode === 'live') {
      if (!end || Number.isNaN(end.getTime())) return '';
      const ms = end - now;
      return ms > 0 ? formatCountdown(ms) : '00:00:00';
    }

    // past
    return 'Ended';
  };

  const getContestLink = (contest, mode) => {
    const id = contest?.code;
    if (!id) return '/contest';
    if (mode === 'live') return `/contest/ongoing/${id}/start`;
    if (mode === 'upcoming') {
      const now = new Date(nowTick);
      const start = contest?.raw?.startTime ? new Date(contest.raw.startTime) : null;
      if (!start || Number.isNaN(start.getTime())) return `/contest/upcoming/${id}`;
      const hoursUntilStart = (start - now) / (1000 * 60 * 60);
      return hoursUntilStart > 24 ? `/contest/upcoming/${id}` : `/contest/ongoing/${id}/start`;
    }
    return `/contest/history/${id}`;
  };

  const fetchContests = async () => {
    try {
      const resp = await api.get('/contests', { params: { limit: 200 } });
      const list = resp.data?.data || resp.data || [];
      const upcoming = [];
      const ongoing = [];
      const past = [];
      const now = new Date();
      
      list.forEach((c) => {
        const status = (c.status || '').toUpperCase();
        const startTime = new Date(c.startTime);
        const endTime = new Date(c.endTime);
        const timeUntilStart = (startTime - now) / (1000 * 60 * 60); // hours until start
        const timeSinceEnd = (now - endTime) / (1000 * 60 * 60); // hours since end
        
        const item = {
          code: c._id,
          name: c.title,
          start: c.startTime ? new Date(c.startTime).toLocaleString() : '',
          time: '',
          duration: c.startTime && c.endTime ? `${Math.round((new Date(c.endTime)-new Date(c.startTime))/(1000*60))} mins` : '',
          startsIn: '',
          link: `/contest/ongoing/${c._id}/start`,
          raw: c,
        };
        
        // Categorization logic:
        // LIVE: Status is ONGOING and contest has actually started (timeUntilStart <= 0)
        if (status === 'ONGOING' && timeUntilStart <= 0) {
          ongoing.push(item);
        }
        // UPCOMING: Status is UPCOMING OR contest will start within 24 hours (but hasn't started yet)
        else if (status === 'UPCOMING' || (timeUntilStart > 0 && timeUntilStart <= 24)) {
          upcoming.push(item);
        }
        // PAST: Contest has ended
        else if (timeSinceEnd > 0 || status === 'ENDED') {
          past.push(item);
        }
        // Default to upcoming for any other ONGOING contests
        else if (status === 'ONGOING') {
          upcoming.push(item);
        }
      });
      setUpcomingContests(upcoming);
      setOngoingContests(ongoing);
      setPastContests(past);
    } catch (err) {
      console.error('Failed to load contests', err);
    }
  };

  const fetchSkillTests = async () => {
    try {
      const resp = await api.get('/skills');
      const skillsData = resp.data?.data || [];
      const formattedTests = skillsData.map((skill) => {
        const questionCount = skill.questions?.length || 0;
        const minutes = Math.max(10, Math.ceil(questionCount * 1.2));
        return {
          id: skill._id,
          name: `${skill.skillName} Online Test & Quiz`,
          duration: `${Math.floor(minutes / 60)} Hrs ${minutes % 60} Min`,
          questions: questionCount,
          participants: skill.attemptCount || 0,
          skillName: skill.skillName
        };
      });
      setSkillTests(formattedTests);
    } catch (err) {
      console.error('Failed to load skill tests', err);
    }
  };

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth', // Optional: for smooth scrolling animation
        block: 'start',
      });
    }
  }

  // Fetch data on mount
  useEffect(() => {
    fetchContests();
    fetchSkillTests();
  }, []);

  // Refresh countdown values without refetching
  useEffect(() => {
    const id = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="contest-page" ref={targetRef}> 
      <div className="bg-white">
        {/* <MainNavbar /> */}
        {/* <div className="d-flex justify-content-between align-items-center px-4 py-3">
          <h2 className="fw-bold mb-0">Contest</h2>
          <a
            href="/practice"
            className="btn btn-dark rounded-pill px-4 d-flex align-items-center gap-2"
            style={{ backgroundColor: '#0C316E' }}
          >
            Practice Section <HiExternalLink />
          </a>
        </div> */}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px', backgroundColor: '#fff' }}>
        {/* Ongoing Contests */}
        <section className="mb-3">
          <div className="mb-1">
            <h3 className="section-title" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Live Coding Challenge</h3>
          </div>
          
          <div className="table-responsive">
            <table className="table w-full" style={{ border: '1px solid #cfdce8' }}>
              <thead>
                <tr className="text-center" style={{backgroundColor: "#AFE8F3", color: "#222"}}>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>ID</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Title</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Start</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Duration</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Ends in</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}></th>
                </tr>
              </thead>
              <tbody >
                {ongoingContests.map((contest, index) => (
                  <tr key={index} className="border-bottom className='w-full'">
                    <td>{contest.code}</td>
                    <td>
                      <Link to={getContestLink(contest, 'live')} className="btn btn-link text-decoration-none p-0 " style={{color: "#0645ad"}}>
                        {contest.name}
                      </Link>
                    </td>
                    <td>
                      {contest.start}<br/>{contest.time}
                    </td>
                    <td>{getDurationText(contest)}</td>
                    <td>{getStartsInText(contest, 'live')}</td>
                    {/* <td>
                      <Link to={contest.link} className="btn btn-sm" style={{color: "#0C316E"}}>
                        <HiExternalLink />
                      </Link>
                    </td> */}
                  </tr>
                ))}
                {ongoingContests.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No ongoing contests at the moment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
             <div className="d-flex align-items-center mb-1">
            <h3 className="section-title" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Future Coding Challenge</h3>
            <HiQuestionMarkCircle className="text-muted ms-2" style={{ fontSize: '16px' }} />
          </div>
          
          <div className="table-responsive">
            <table className="table w-full" style={{ border: '1px solid #cfdce8' }}>
              <thead>
                <tr style={{backgroundColor: "#AFE8F3", color: "#222"}}>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>ID</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Title</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Start</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Duration</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Starts in</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}></th>
                </tr>
              </thead>
              <tbody>
                {upcomingContests.map((contest, index) => (
                <tr key={index} className="border-bottom">
                  <td>{contest.code}</td>
                  <td>
                    <Link to={getContestLink(contest, 'upcoming')} className="btn btn-link text-decoration-none p-0" style={{color: "#0645ad"}}>
                      {contest.name}
                    </Link>
                  </td>
                  <td>
                    {contest.start}<br/>{contest.time}
                  </td>
                  <td>{getDurationText(contest)}</td>
                  <td>{getStartsInText(contest, 'upcoming')}</td>
                  <td></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
           <div className="d-flex align-items-center mb-1">
            <h3 className="section-title">Skill Checks Test</h3>
            <span className="badge bg-success ms-2">New</span>
          </div>
          <p className="text-muted mb-2">
            Test your knowledge in Python, C, C++, and Java and DSA concepts. Skill tests help you check your industry readiness in the courses you are learning.
          </p>
          
          <div className="table-responsive">
            <table className="table w-full" style={{ border: '1px solid #cfdce8' }}>
              <thead>
                <tr style={{backgroundColor: "#AFE8F3", color: "#222"}}>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Title</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Duration</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Questions</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Attendants</th>
                </tr>
              </thead>
              <tbody>
                {skillTests.map((test) => (
                <tr key={test.id} className="border-bottom" style={{height: '38px'}}>
                  <td>
                    <Link to={`/practicetests/${test.skillName.toLowerCase()}`} className="test-link">
                      {test.name}
                    </Link>
                  </td>
                  <td>{test.duration}</td>
                  <td>{test.questions}</td>
                  <td>{test.participants}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          
          <div className=" mt-4 flex justify-center">
            <Link to="/courses/allCourses?section=skilltest">
              <button className=" rounded-[0.5rem] text-center text-white px-[2rem] py-2" style={{ backgroundColor: '#0C316E', fontSize: '14px' }}>
                View All Skill Checks Test
              </button>
            </Link>
          </div>
                    <div className="mb-1">
                      <h3 className="section-title" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Past Coding Challenge</h3>
                    </div>
          
          <div className="table-responsive">
            <table className="table w-full" style={{ border: '1px solid #cfdce8' }}>
              <thead>
                <tr style={{backgroundColor: "#AFE8F3", color: "#222"}}>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>ID</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Title</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Start</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Duration</th>
                  <th style={{color: "#222", padding: '8px 12px',textAlign : "left"}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pastContests.map((contest, index) => (
                <tr key={index} className="border-bottom">
                  <td>{contest.code}</td>
                  <td>
                    <Link to={`/contest/history/${contest.code}`} className="contest-link" style={{color: "#0645ad"}}>
                      {contest.name}
                    </Link>
                  </td>
                  <td>
                    {contest.start}<br/>{contest.time}
                  </td>
                  <td>{getDurationText(contest)}</td>
                  <td>{getStartsInText(contest, 'past')}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
               <div className="flex justify-content-end mt-3 " >
            <button className="btn btn-sm rounded-circle rounded-full" style={{ backgroundColor: '#00BA28', color: 'white', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={scrollToTarget}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
              </svg>
            </button>
          </div>
          {/* <h1>hlo</h1> */}
        </section>

      </div>
    </div>
  );
};

export default ContestPage;