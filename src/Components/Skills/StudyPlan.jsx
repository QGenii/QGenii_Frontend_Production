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
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [studyPlans, setStudyPlans] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyProgress, setDailyProgress] = useState(65);
  const [weeklyProgress, setWeeklyProgress] = useState(75);

  const studyGuides = [
    {
      title: "Set Priorities",
      description: "20 min break after 25 min study to improve focus and retention",
      image: "/skills/Rectangle_699.png"
    },
    {
      title: "Build Better Focus",
      description: "Use the Pomodoro Technique for maximum focus and productivity",
      image: "/skills/Rectangle_699_1.png"
    },
    {
      title: "Weekly Plan",
      description: "Create a simple weekly planner to break down your study goals",
      image: "/skills/Rectangle_699_2.png"
    },
    {
      title: "Track your progress",
      description: "Measure your improvement through regular assessments and reviews",
      image: "/skills/Rectangle_699_3.png"
    }
  ];

  // Timer effect
  React.useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 25 * 60; // Reset to 25 minutes
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Fetch study plan data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch study plans and dashboard stats
        const [plansResponse, statsResponse] = await Promise.all([
          studyPlanService.getStudyPlans(),
          studyPlanService.getDashboardStats()
        ]);

        // Backend returns: { success: true, data: { studyPlans: [...], pagination: {...} } }
        if (plansResponse.success && plansResponse.data) {
          setStudyPlans(plansResponse.data.studyPlans || []);
        } else {
          setStudyPlans([]);
        }

        // Backend returns: { success: true, data: { total, completed, ... } }
        if (statsResponse.success && statsResponse.data) {
          setDashboardStats(statsResponse.data);
          // Calculate progress percentages if needed
          // The backend doesn't return dailyProgress/weeklyProgress directly
          // You may need to calculate these from the stats or add them to the backend response
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching study plan data:', err);
        setError(err.message || 'Failed to load study plan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setCurrentMonth(newDate.toLocaleString('default', { month: 'long' }));
    setCurrentYear(newDate.getFullYear());
  };

  // Function to navigate to the previous month
  const navigatePrevMonth = () => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    handleDateChange(prevMonth);
  };

  // Function to navigate to the next month
  const navigateNextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    handleDateChange(nextMonth);
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
        <div style={{
          width: "100%",
          background: "#ffffff",
          padding: "40px",
          minHeight: "600px"
        }}>
          <div style={{
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
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
              <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
                Focus time: 25 minutes | Break time: 5 minutes
              </p>
              <div style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#007bff",
                marginBottom: "20px"
              }}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
              <Button
                variant="primary"
                size="lg"
                style={{ marginRight: "10px" }}
                onClick={() => setIsRunning(true)}
              >
                Start Session
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => setIsRunning(false)}
              >
                Pause
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Study Plan View */}
      {!isStudyActive && !loading && (
        <>
          <div
            style={{
              width: "100%",
              background: "#f7ede3",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "28px 38px 28px 38px",
              borderRadius: "0 0 0 0",
              marginBottom: 24,
              height: 300,
            }}
          >
            <div >
              <div style={{ fontWeight: 700, fontSize: 45, marginBottom: 6, marginLeft: 343 }}>
                Study Plan
              </div>
              <div style={{ fontWeight: 500, fontSize: 35, marginLeft: 225 }}>
                Your Smart RoadMap To Success
              </div>
            </div>
            <img
              src="/skills/4871715_1.png"
              alt="Study Plan Illustration"
              style={{
                height: 300,
                width: 400,
                objectFit: "contain",
                marginLeft: 18,
                display: "block",
                marginRight: 300
              }}
            />
          </div>
          <Container>
            {/* <div className="study-plan-header">
          <h1>Study Plan</h1>
          <p>Your Smart RoadMap To Success</p>
        </div> */}

            <Row className="month-selector-row">
              <Col xs={4}>
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
                    <h3>{currentMonth} {currentYear}</h3>
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

            <div className="study-guide-section">
              <h3>Your Smart Study Guide</h3>
              <p>Boost your focus, Stay on Track, Learn Smarter</p>
              <Row>
                {studyGuides.map((guide, index) => (
                  <Col key={index} md={3}>
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
          />
        </>
      )}
    </div>
  );
};

export default StudyPlan;