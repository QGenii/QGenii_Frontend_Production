import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudyPlan.css';
import MonthSelector from './MonthSelector';
import StudyGuideCard from './StudyGuideCard';
import EditPlanModal from './EditPlanModal';
import DownloadPlanModal from './DownloadPlanModal';
import MainNavbar from '../MainNavbar';
import studyPlanImg from '../../assets/assets/studyplan.png';

import imgSetPriorities from '../../assets/assets/Studyplan/1.png';
import imgBuildFocus from '../../assets/assets/Studyplan/2.png';
import imgWeeklyPlan from '../../assets/assets/Studyplan/3.png';
import imgTrackProgress from '../../assets/assets/Studyplan/4.png';

import { useNavigate } from 'react-router-dom';
import { studyPlanService } from '../../services/studyPlan.service.jsx';

const StudyPlan = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [date, setDate] = useState(new Date(2023, 7, 15)); // August 15, 2023
  const [currentMonth, setCurrentMonth] = useState('August');
  const [currentYear, setCurrentYear] = useState(2023);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isStudyActive, setIsStudyActive] = useState(false);
  // New: focus and break time state (in minutes)
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [studyPlans, setStudyPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyProgress, setDailyProgress] = useState(65);
  const [weeklyProgress, setWeeklyProgress] = useState(75);

  // Fetch study plans (paginated) + dashboard stats in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [plansRes, statsRes, allPlansRes] = await Promise.allSettled([
          studyPlanService.getStudyPlans({ page, limit: pageSize }),
          studyPlanService.getDashboardStats(),
          studyPlanService.getStudyPlans({ page: 1, limit: 100 }), // all for PDF
        ]);

        // Paginated plans
        if (plansRes.status === 'fulfilled' && plansRes.value?.success) {
          setStudyPlans(plansRes.value.data.studyPlans || []);
          setTotalPages(plansRes.value.data.pagination?.totalPages || 1);
        } else {
          setStudyPlans([]);
          setTotalPages(1);
        }

        // Dashboard stats
        if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
          const stats = statsRes.value.data;
          setDashboardStats(stats);
        }

        // All plans for PDF table
        if (allPlansRes.status === 'fulfilled' && allPlansRes.value?.success) {
          setAllPlans(allPlansRes.value.data.studyPlans || []);
        }

        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load study plan');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, pageSize]);

  // Import study plan images

  const studyGuides = [
    {
      title: "Set Priorities",
      description: "20 min break after 25 min study to improve focus and retention",
      image: imgSetPriorities
    },
    {
      title: "Build Better Focus",
      description: "Use the Pomodoro Technique for maximum focus and productivity",
      image: imgBuildFocus
    },
    {
      title: "Weekly Plan",
      description: "Create a simple weekly planner to break down your study goals",
      image: imgWeeklyPlan
    },
    {
      title: "Track your progress",
      description: "Measure your improvement through regular assessments and reviews",
      image: imgTrackProgress
    }
  ];

  // Timer effect (Pomodoro logic)
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (!isOnBreak) {
              // Switch to break
              setIsOnBreak(true);
              return breakTime * 60;
            } else {
              // End break, reset to focus
              setIsOnBreak(false);
              setIsRunning(false);
              return focusTime * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isOnBreak, focusTime, breakTime]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setCurrentMonth(newDate.toLocaleString('default', { month: 'long' }));
    setCurrentYear(newDate.getFullYear());
  };

  // Function to handle month change from dropdown
  const handleMonthChange = (month) => {
    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ].indexOf(month);

    if (monthIndex !== -1) {
      const newDate = new Date(date);
      newDate.setMonth(monthIndex);
      handleDateChange(newDate);
    }
  };

  // Function to handle year change from dropdown
  const handleYearChange = (year) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    handleDateChange(newDate);
  };

  // Navigate to previous month
  const navigatePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    handleDateChange(newDate);
  };

  // Navigate to next month
  const navigateNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    handleDateChange(newDate);
  };

  return (
    <div className="study-plan-page">
      {/* <MainNavbar /> */}

      {/* Error Message */}
      {error && (
        <div style={{
          background: "#f8d7da",
          color: "#721c24",
          padding: "15px",
          margin: "20px",
          borderRadius: "4px",
          border: "1px solid #f5c6cb"
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          fontSize: "18px"
        }}>
          Loading your study plan...
        </div>
      )}

      {/* Study Session View */}
      {isStudyActive && (
        <div className="study-session-container">
          <div className="session-inner">
            <Button
              variant="outline-secondary"
              onClick={() => setIsStudyActive(false)}
              style={{ marginBottom: "20px" }}
            >
              ← Back to Plan
            </Button>
            <h2 style={{ marginBottom: "30px" }}>Study Session</h2>
            <div style={{
              background: "#f8f9fa",
              padding: "30px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <h4>Start Your Study Session</h4>
              {/* Focus and Break Time Inputs */}
              <div className="timer-settings">
                <div>
                  <label htmlFor="focusTime" style={{ fontWeight: 500 }}>Focus time (minutes): </label>
                  <input
                    id="focusTime"
                    type="number"
                    min={1}
                    max={120}
                    value={focusTime}
                    onChange={e => {
                      const val = Math.max(1, Math.min(120, Number(e.target.value)));
                      setFocusTime(val);
                      if (!isRunning && !isOnBreak) setTimeLeft(val * 60);
                    }}
                    style={{ width: 60, marginLeft: 8 }}
                  />
                </div>
                <div>
                  <label htmlFor="breakTime" style={{ fontWeight: 500 }}>Break time (minutes): </label>
                  <input
                    id="breakTime"
                    type="number"
                    min={1}
                    max={60}
                    value={breakTime}
                    onChange={e => {
                      const val = Math.max(1, Math.min(60, Number(e.target.value)));
                      setBreakTime(val);
                    }}
                    style={{ width: 60, marginLeft: 8 }}
                  />
                </div>
              </div>
              <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
                Focus time: {focusTime} minutes | Break time: {breakTime} minutes
              </p>
              <div className="timer-display" style={{ color: isOnBreak ? "#28a745" : "#007bff" }}>
                {isOnBreak ? 'Break' : 'Focus'}: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
              <div className="timer-buttons">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setIsRunning(true);
                    if (!isOnBreak) setTimeLeft(focusTime * 60);
                    else setTimeLeft(breakTime * 60);
                  }}
                  disabled={isRunning}
                >
                  Start Session
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={() => setIsRunning(false)}
                  disabled={!isRunning}
                >
                  Pause
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Study Plan View */}
      {!isStudyActive && !loading && (
        <>
          <div className="study-plan-banner">
            <div className="banner-text-content">
              <div className="banner-title">
                Study Plan
              </div>
              <div className="banner-subtitle">
                Your Smart RoadMap To Success
              </div>
            </div>
            <img
              src={studyPlanImg}
              alt="Study Plan Illustration"
              className="banner-image"
            />
          </div>
          <Container>
            {/* <div className="study-plan-header">
          <h1>Study Plan</h1>
          <p>Your Smart RoadMap To Success</p>
        </div> */}

            <Row className="month-selector-row">
              <Col lg={3} md={4} sm={6} xs={12}>
                <MonthSelector
                  selectedMonth={currentMonth}
                  selectedYear={currentYear}
                  onMonthChange={handleMonthChange}
                  onYearChange={handleYearChange}
                />
              </Col>
            </Row>

            <Row className="calendar-progress-row">
              <Col md={7}>
                <div className="calendar-container">
                  <div className="month-header">
                    <h3 className="calendar-month-year">{currentMonth} {currentYear}</h3>
                    <div className="month-nav">
                      <Button variant="light" className="month-nav-btn" onClick={navigatePrevMonth}>
                        &lt;
                      </Button>
                      <Button variant="light" className="month-nav-btn" onClick={navigateNextMonth}>
                        &gt;
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="react-calendar-custom"
                    onActiveStartDateChange={({ activeStartDate }) => {
                      setCurrentMonth(activeStartDate.toLocaleString('default', { month: 'long' }));
                      setCurrentYear(activeStartDate.getFullYear());
                    }}
                    showNeighboringMonth={false}
                    tileClassName={({ date: tileDate, view }) =>
                      tileDate.getDate() === 12 && tileDate.getMonth() === date.getMonth() ? 'selected-date' : null
                    }
                  />
                </div>
              </Col>
              <Col md={5}>
                <div className="progress-container">
                  <div className="progress-item">
                    <h4>Daily Progress</h4>
                    <ProgressBar now={dailyProgress} className="custom-progress-bar" />
                    <div className="progress-percentage">{dailyProgress}%</div>
                  </div>
                  <div className="progress-item">
                    <h4>Weekly Progress</h4>
                    <ProgressBar now={weeklyProgress} className="custom-progress-bar" />
                    <div className="progress-percentage">{weeklyProgress}%</div>
                  </div>
                  <Button
                    variant="primary"
                    className="performance-btn"
                    onClick={() => navigate('/skills/study-plan/performance')}
                  >
                    Performance Trends
                  </Button>
                </div>
              </Col>
            </Row>


            {/* Study Plans List with Pagination */}
            <div className="study-plans-list" style={{ margin: '32px 0' }}>
              <h3>Your Study Plans</h3>
              {studyPlans.length === 0 ? (
                <div>No study plans found.</div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {studyPlans.map((plan, idx) => (
                    <li key={plan._id || idx} style={{ marginBottom: 16, padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
                      <strong>{plan.title || 'Untitled Plan'}</strong>
                      <div>{plan.description}</div>
                      {/* Add more plan details as needed */}
                    </li>
                  ))}
                </ul>
              )}
              {/* Pagination Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
                <Button variant="outline-secondary" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>&lt; Prev</Button>
                <span>Page {page} of {totalPages}</span>
                <Button variant="outline-secondary" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next &gt;</Button>
                <span style={{ marginLeft: 16 }}>
                  Show
                  <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} style={{ margin: '0 8px' }}>
                    {[5, 10, 20, 50].map(size => <option key={size} value={size}>{size}</option>)}
                  </select>
                  per page
                </span>
              </div>
            </div>

            <div className="study-guide-section">
              <h3>Your Smart Study Guide</h3>
              <p>Boost your focus, Stay on Track, Learn Smarter</p>
              <Row>
                {studyGuides.map((guide, index) => (
                  <Col key={index} lg={3} md={6} sm={6} xs={12} className="mb-4">
                    <StudyGuideCard {...guide} />
                  </Col>
                ))}
              </Row>
            </div>

            <div className="action-buttons">
              {/* <Button 
            variant="outline-primary" 
            className="edit-btn"
            onClick={() => setShowEditModal(true)}
          >
            Edit Plan
          </Button> */}
              <Button
                variant="outline-secondary"
                className="download-btn"
                onClick={() => setShowDownloadModal(true)}
              >
                Download
              </Button>
              <Button
                variant="primary"
                className="start-btn"
                onClick={() => setIsStudyActive(true)}
              >
                Start Study
              </Button>
            </div>
          </Container>

          {/* Modals */}
          <EditPlanModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
          />
          <DownloadPlanModal
            show={showDownloadModal}
            handleClose={() => setShowDownloadModal(false)}
            studyPlanData={{
              userName: (() => {
                try {
                  const token = localStorage.getItem('token');
                  if (token) {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    return payload.name || payload.username || payload.email || 'Student';
                  }
                } catch (_) {}
                return 'Student';
              })(),
              generatedDate: new Date().toLocaleDateString(),
              goalName: studyPlans[0]?.title || '',
              category: studyPlans[0]?.category || 'STUDY',
              priority: studyPlans[0]?.priority || 'MEDIUM',
              status: studyPlans[0]?.status || 'PENDING',
              targetDate: studyPlans[0]?.targetDate,
              estimatedHours: studyPlans[0]?.estimatedHours,
              actualHours: studyPlans[0]?.actualHours,
              tags: studyPlans[0]?.tags || [],
              subtasks: studyPlans[0]?.subtasks || [],
              progressHistory: studyPlans[0]?.progressHistory || [],
              notes: studyPlans[0]?.notes || '',
              dailyProgress,
              weeklyProgress,
              overallProgress: studyPlans[0]?.progress ?? 0,
              performanceInsights: dashboardStats ? {
                accuracy: dashboardStats.completionRate != null ? `${dashboardStats.completionRate}%` : 'N/A',
                skillGrowth: dashboardStats.averageProgress != null ? `${Math.round(dashboardStats.averageProgress)}%` : 'N/A',
                timeSpent: dashboardStats.totalActualHours != null ? `${dashboardStats.totalActualHours} hrs` : 'N/A',
              } : null,
              allPlans,
              totalPlans: dashboardStats?.total ?? allPlans.length,
            }}
          />
        </>
      )}
    </div>
  );
};

export default StudyPlan;