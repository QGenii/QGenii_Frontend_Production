import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import MainNavbar from "../../MainNavbar";
import { FaHome } from 'react-icons/fa';
import { userProfileAPI, practiceAPI, contestsAPI, enrollmentsAPI, badgesAPI, skillsAPI, publicAPI } from '../../../services/api';


const ProblemDashboard = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [activeRatingTab, setActiveRatingTab] = useState('current');
    const [timeRange, setTimeRange] = useState('6 Months');

    // State for API data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [activitySummary, setActivitySummary] = useState(null);
    const [solvedQuestions, setSolvedQuestions] = useState([]);
    const [contests, setContests] = useState([]);
    const [courses, setCourses] = useState([]);
    const [practiceCategories, setPracticeCategories] = useState([]);
    const [badges, setBadges] = useState([]);
    const [skillTests, setSkillTests] = useState([]);

    // Fetch all data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                let rawData;
                // 1. Fetch User Profile
                if (username) {
                    try {
                        const profileRes = await publicAPI.getProfile(username);
                        // Response structure: { success: true, data: { user: {...}, stats: {...}, ... } }
                        rawData = profileRes.data.data;
                    } catch (e) {
                        console.warn("Failed to fetch public profile", e);
                        throw new Error(`User ${username} not found`);
                    }
                } else {
                    const profileRes = await userProfileAPI.getProfile();
                    // Response structure: { success: true, data: { user: {...} } }
                    rawData = profileRes.data.data;
                }

                // Flatten the data so component can access properties directly (e.g. userData.name, userData.rating)
                const flatUserData = {
                    ...rawData,
                    ...(rawData.user || {})
                };

                setUserData(flatUserData);

                // 2. Fetch other data in parallel
                // Use the ID from the fetched profile
                const targetUserId = flatUserData._id || flatUserData.id;

                const [
                    activityRes,
                    solvedRes,
                    contestsRes,
                    coursesRes,
                    categoriesRes,
                    badgesRes,
                    skillsRes
                ] = await Promise.all([
                    userProfileAPI.getActivitySummary(),
                    practiceAPI.getSolved(),
                    contestsAPI.getMine(),
                    userProfileAPI.getCourses(),
                    practiceAPI.getCategories(),
                    // Fetch badges for the specific user if username is present, otherwise my progress
                    username ? badgesAPI.getUserBadges(targetUserId) : badgesAPI.getMyBadgeProgress(),
                    skillsAPI.getAll()
                ]);

                setActivitySummary(activityRes.data);
                setSolvedQuestions(solvedRes.data || []);
                setContests(contestsRes.data || []);
                setCourses(coursesRes.data || []);
                setPracticeCategories(categoriesRes.data || []);
                setBadges(badgesRes.data || []);
                setSkillTests(skillsRes.data || []);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [username]);

    // Draw the rating graph - MUST be before conditional returns to maintain hook order
    useEffect(() => {
        const drawGraph = () => {
            const canvas = document.getElementById('rating-graph');
            if (!canvas || !activitySummary?.ratingsHistory) return;

            const ctx = canvas.getContext('2d');
            const ratings = activitySummary.ratingsHistory.map(r => r.rating);

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set canvas dimensions
            const width = canvas.width;
            const height = canvas.height;

            // Graph area
            const padding = 40;
            const graphWidth = width - 2 * padding;
            const graphHeight = height - 2 * padding;

            // Find min and max ratings
            const minRating = Math.min(...ratings) - 100;
            const maxRating = Math.max(...ratings) + 100;
            const ratingRange = maxRating - minRating;

            // Background
            ctx.fillStyle = "#e7f9ef";
            ctx.fillRect(padding, padding, graphWidth, graphHeight);

            // Draw grid lines
            ctx.strokeStyle = "#ccc";
            ctx.lineWidth = 0.5;

            // Horizontal grid lines
            for (let i = 0; i <= 5; i++) {
                const y = padding + (i / 5) * graphHeight;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(padding + graphWidth, y);
                ctx.stroke();

                // Label
                const rating = Math.round(maxRating - (i / 5) * ratingRange);
                ctx.fillStyle = "#666";
                ctx.font = "10px Arial";
                ctx.textAlign = "right";
                ctx.fillText(rating, padding - 5, y + 3);
            }

            // Vertical grid lines (years)
            const years = ["2022", "2023", "2024", "2025"];
            for (let i = 0; i < years.length; i++) {
                const x = padding + ((i) / (years.length - 1)) * graphWidth;
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, padding + graphHeight);
                ctx.stroke();

                // Label
                ctx.fillStyle = "#666";
                ctx.font = "10px Arial";
                ctx.textAlign = "center";
                ctx.fillText(years[i], x, padding + graphHeight + 15);
            }

            // Plot the line
            ctx.beginPath();
            activitySummary.ratingsHistory.forEach((point, index) => {
                const x = padding + (index / (activitySummary.ratingsHistory.length - 1)) * graphWidth;
                const normalizedRating = (point.rating - minRating) / ratingRange;
                const y = padding + (1 - normalizedRating) * graphHeight;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            // Style the line
            ctx.strokeStyle = "#1976d2";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Plot the points
            activitySummary.ratingsHistory.forEach((point, index) => {
                const x = padding + (index / (activitySummary.ratingsHistory.length - 1)) * graphWidth;
                const normalizedRating = (point.rating - minRating) / ratingRange;
                const y = padding + (1 - normalizedRating) * graphHeight;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "#1976d2";
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        };

        drawGraph();
        window.addEventListener('resize', drawGraph);

        return () => {
            window.removeEventListener('resize', drawGraph);
        };
    }, [activitySummary]);

    // Show loading state
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#f8faff'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '18px',
                        color: '#666',
                        marginBottom: '10px'
                    }}>Loading dashboard...</div>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #0096FF',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }}></div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#f8faff'
            }}>
                <div style={{
                    background: '#fff',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '500px'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
                    <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px', color: '#333' }}>
                        Error Loading Dashboard
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                        {error}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            backgroundColor: '#0096FF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Generate heat map data from solved questions
    const generateHeatMapFromData = () => {
        // If we have solved questions with timestamps, use them
        // Otherwise, generate random data for now
        const days = ['Mon', 'Wed', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
        const heatMapData = {};

        days.forEach(day => {
            heatMapData[day] = {};
            months.forEach(month => {
                heatMapData[day][month] = Math.floor(Math.random() * 5);
            });
        });

        return heatMapData;
    };

    const heatMapData = generateHeatMapFromData();

    // Function to render heat map cell with appropriate color
    const renderHeatMapCell = (level) => {
        let backgroundColor;
        switch (level) {
            case 0: backgroundColor = "#ebedf0"; break;
            case 1: backgroundColor = "#c6e48b"; break;
            case 2: backgroundColor = "#7bc96f"; break;
            case 3: backgroundColor = "#239a3b"; break;
            case 4: backgroundColor = "#196127"; break;
            default: backgroundColor = "#ebedf0";
        }

        return (
            <div
                style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor,
                    margin: "2px",
                    borderRadius: "2px"
                }}
            />
        );
    };


    return (
        <div>
            {/* <MainNavbar /> */}

            {/* Breadcrumb navigation */}
            <div style={{ background: "#f8faff", padding: "10px 20px", borderBottom: "1px solid #e1e4e8" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center" }}>
                    <FaHome style={{ color: "#0366d6", marginRight: "5px" }} />
                    <span
                        onClick={() => navigate("/")}
                        style={{ color: "#0366d6", cursor: "pointer", fontSize: "14px" }}
                    >
                        Home
                    </span>
                    <span style={{ margin: "0 5px", color: "#586069" }}>›</span>
                    <span style={{ color: "#586069", fontSize: "14px" }}>{userData?.username || username}</span>
                </div>
            </div>

            <div style={{ background: "#f8faff", minHeight: "100vh", padding: "20px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {/* Left column */}
                    <div style={{ flex: "1", minWidth: "300px" }}>
                        {/* User Profile Card */}
                        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                                <div style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    background: "#f0f0f0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "15px",
                                    overflow: "hidden"
                                }}>
                                    {userData?.profileImage ? (
                                        <img src={userData.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="#555">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontWeight: "500", fontSize: "16px" }}>{userData?.name || 'User'}</div>
                                    <div style={{ fontSize: "13px", color: "#666", marginTop: "3px" }}>{userData?.username}</div>
                                </div>
                                <button style={{
                                    marginLeft: "auto",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "6px 12px",
                                    fontSize: "12px",
                                    cursor: "pointer"
                                }}>
                                    Edit
                                </button>
                            </div>

                            <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: "15px", height: "15px", backgroundColor: "#ebedf0", margin: "0 5px 0 0" }}></div>
                                    <span>{activitySummary?.subscription || 'No Active Plan'}</span>
                                </div>
                            </div>

                            <div style={{
                                border: "1px solid #ebedf0",
                                padding: "10px",
                                borderRadius: "5px",
                                backgroundColor: "#f9f9f9",
                                marginTop: "10px"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#4CAF50",
                                        borderRadius: "50%",
                                        marginRight: "5px"
                                    }}></div>
                                    <div style={{ fontSize: "12px" }}>{userData?.country || 'India'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Rating Stats */}
                        {/* <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "15px" }}>Rating Stats</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                <div style={{ 
                  background: "#f8f8f8", 
                  borderRadius: "5px", 
                  padding: "15px", 
                  textAlign: "center",
                  position: "relative"
                }}>
                  <svg style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px" }} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#4CAF50" strokeWidth="10" strokeDasharray="251" strokeDashoffset="60" />
                    <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#4CAF50" fontWeight="bold">75</text>
                  </svg>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>Current Rating</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>{userData.rating}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>(Max: {userData.highest_rating})</div>
                </div>
                <div style={{ 
                  background: "#f8f8f8", 
                  borderRadius: "5px", 
                  padding: "15px", 
                  textAlign: "center",
                  position: "relative"
                }}>
                  <svg style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px" }} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F44336" strokeWidth="10" strokeDasharray="251" strokeDashoffset="150" />
                    <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#F44336" fontWeight="bold">35</text>
                  </svg>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>Global Rank</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>{userData.global_rank}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>(Max: Top 15%)</div>
                </div>
                <div style={{ 
                  background: "#f8f8f8", 
                  borderRadius: "5px", 
                  padding: "15px", 
                  textAlign: "center",
                  position: "relative"
                }}>
                  <svg style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px" }} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2196F3" strokeWidth="10" strokeDasharray="251" strokeDashoffset="180" />
                    <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#2196F3" fontWeight="bold">22</text>
                  </svg>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>Country Rank</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>{userData.country_rank}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>(Max: Top 5%)</div>
                </div>
                <div style={{ 
                  background: "#f8f8f8", 
                  borderRadius: "5px", 
                  padding: "15px", 
                  textAlign: "center",
                  position: "relative"
                }}>
                  <svg style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px" }} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#FF9800" strokeWidth="10" strokeDasharray="251" strokeDashoffset="100" />
                    <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#FF9800" fontWeight="bold">55</text>
                  </svg>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>Contests</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>{userData.contests_participated}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>(Total)</div>
                </div>
              </div>
            </div> */}

                        {/* Badges Section */}
                        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e1e4e8" }}>
                            <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid #eaecef", paddingBottom: "8px" }}>Badges ({badges?.length || 0})</h3>

                            {badges && badges.length > 0 ? (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                                    {badges.map((badge, index) => {
                                        // Determine badge color based on level or type
                                        const getBadgeColor = (badgeData) => {
                                            if (badgeData.color) return badgeData.color;
                                            if (badgeData.level?.toLowerCase().includes('diamond')) return '#5460fe';
                                            if (badgeData.level?.toLowerCase().includes('gold')) return '#FFD700';
                                            if (badgeData.level?.toLowerCase().includes('silver')) return '#C0C0C0';
                                            if (badgeData.level?.toLowerCase().includes('bronze')) return '#CD7F32';
                                            // Alternate colors for variety
                                            const colors = ['#5460fe', '#ff8264', '#4CAF50', '#2196F3', '#FF9800', '#ff5252'];
                                            return colors[index % colors.length];
                                        };

                                        return (
                                            <div key={badge._id || badge.id || `badge-${index}`} style={{
                                                padding: "0",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                border: "1px solid #e1e4e8"
                                            }}>
                                                <div style={{
                                                    backgroundColor: getBadgeColor(badge),
                                                    padding: "10px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start"
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginBottom: "5px"
                                                    }}>
                                                        <div style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            marginRight: "8px"
                                                        }}>
                                                            <svg viewBox="0 0 24 24" fill="white">
                                                                <path d="M20.2 5H22C22 3.34 20.66 2 19 2H5C3.34 2 2 3.34 2 5H3.8C3.4 5.84 3 7.34 3 8.5 3 11.08 4.23 13.73 7 14.8V22H17V14.8C19.77 13.73 21 11.08 21 8.5 21 7.34 20.6 5.84 20.2 5zM19 5H5C5 4.45 5.45 4 6 4H18C18.55 4 19 4.45 19 5z" />
                                                            </svg>
                                                        </div>
                                                        <span style={{ color: "white", fontWeight: "500", fontSize: "14px" }}>{badge.title || badge.name || 'Badge'}</span>
                                                    </div>
                                                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>{badge.level || badge.tier || 'Badge'}</div>
                                                </div>
                                                <div style={{ padding: "8px", textAlign: "center", backgroundColor: "white", fontSize: "11px", color: "#666" }}>
                                                    {badge.description || badge.criteria || 'Achievement unlocked'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                                    No badges earned yet
                                </div>
                            )}
                        </div>

                        {/* Contest Stats */}
                        {/* <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "10px" }}>Contest Stats</h3>
              
              {[
                {label: "Rating For Division 3 Badge", value: "1515", info: "Achieved"},
                {label: "Rating For Division 2 Badge", value: "1800", info: "Required"},
                {label: "Rating For Division 1 Badge", value: "2100", info: "Required"},
                {label: "Current Contest Rating", value: "1515", info: ""},
                {label: "Highest Contest Rating", value: "1518", info: ""},
                {label: "Rank in last rated contest", value: "8,112", info: ""},
                {label: "Contests participated", value: "35", info: ""},
                {label: "Total Problems Solved", value: "1568", info: ""}
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  padding: "6px 0",
                  borderBottom: index < 7 ? "1px solid #eee" : "none"
                }}>
                  <div style={{ fontSize: "13px", color: "#555" }}>{item.label}</div>
                  <div style={{ fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center" }}>
                    {item.value}
                    {item.info && <span style={{ 
                      marginLeft: "5px", 
                      fontSize: "11px", 
                      color: item.info === "Achieved" ? "#4CAF50" : "#F44336" 
                    }}>
                      ({item.info})
                    </span>}
                  </div>
                </div>
              ))}
            </div> */}

                        {/* Skill Tests Section */}
                        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e1e4e8" }}>
                            <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid #eaecef", paddingBottom: "8px" }}>Skill Tests ({skillTests?.length || 0})</h3>

                            {skillTests && skillTests.length > 0 ? (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
                                    {skillTests.map((skill, index) => {
                                        // Calculate progress (placeholder - adjust based on actual API data structure)
                                        const progress = skill.progress || skill.completionRate || 80;
                                        const attemptDate = skill.attemptedDate || skill.createdAt || 'Recently';

                                        return (
                                            <div key={skill._id || skill.id || `skill-${index}`} style={{
                                                backgroundColor: "#E3F2FD",
                                                borderRadius: "8px",
                                                border: "1px solid #90CAF9",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "10px 15px",
                                                position: "relative"
                                            }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: "500", fontSize: "14px" }}>{skill.name || skill.title || 'Skill Test'}</div>
                                                    <div style={{ fontSize: "12px", color: "#666" }}>
                                                        {typeof attemptDate === 'string' ? attemptDate : `Attempted on ${new Date(attemptDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    position: "relative"
                                                }}>
                                                    <div style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#fff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                                                        position: "relative",
                                                        zIndex: 2
                                                    }}>
                                                        <div style={{
                                                            position: "relative",
                                                            width: "52px",
                                                            height: "52px",
                                                            borderRadius: "50%"
                                                        }}>
                                                            <svg width="52" height="52" viewBox="0 0 52 52">
                                                                <circle
                                                                    cx="26"
                                                                    cy="26"
                                                                    r="24"
                                                                    fill="none"
                                                                    stroke="#E0E0E0"
                                                                    strokeWidth="4"
                                                                />
                                                                <circle
                                                                    cx="26"
                                                                    cy="26"
                                                                    r="24"
                                                                    fill="none"
                                                                    stroke="#0096FF"
                                                                    strokeWidth="4"
                                                                    strokeDasharray={`${2 * Math.PI * 24 * progress / 100} ${2 * Math.PI * 24 * (1 - progress / 100)}`}
                                                                    strokeDashoffset={2 * Math.PI * 24 * 0.25}
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                            <div style={{
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                fontSize: "16px",
                                                                fontWeight: "bold",
                                                                color: "#0096FF"
                                                            }}>
                                                                {progress}%
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                                    No skill tests available yet
                                </div>
                            )}
                        </div>

                        {/* Contests Section */}
                        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "15px" }}>Contests ({contests?.length || 0})</h3>

                            {contests && contests.length > 0 ? (
                                contests.slice(0, 10).map((contest, index) => (
                                    <div key={contest._id || index} style={{
                                        padding: "10px 0",
                                        borderBottom: index < Math.min(contests.length - 1, 9) ? "1px solid #eee" : "none"
                                    }}>
                                        <div style={{ fontWeight: "500", fontSize: "14px" }}>{contest.title || contest.name}</div>
                                        <div style={{ fontSize: "12px", color: "#666" }}>
                                            {contest.rank ? `Finish, Ranked ${contest.rank}` : 'Participated'}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                                    No contests participated yet
                                </div>
                            )}

                            <div style={{ marginTop: "15px", textAlign: "right", fontWeight: "500", fontSize: "14px" }}>
                                Total Problems Solved: {solvedQuestions?.length || 0}
                            </div>
                        </div>
                    </div>

                    {/* Right column (wider) */}
                    <div style={{ flex: "2", minWidth: "500px" }}>
                        {/* Top row: Submissions Heat Map */}
                        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <h3 style={{ margin: 0, fontSize: "16px" }}>Submissions Heat Map</h3>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontSize: "13px", color: "#666" }}>Activity graph</span>
                                    <select
                                        value={timeRange}
                                        onChange={(e) => setTimeRange(e.target.value)}
                                        style={{
                                            padding: "4px 8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            background: "#fff",
                                            fontSize: "12px"
                                        }}
                                    >
                                        <option>6 Months</option>
                                        <option>3 Months</option>
                                        <option>1 Year</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: "flex" }}>
                                {/* Heat map grid */}
                                <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(53, 1fr)", gap: "2px" }}>
                                        {Array.from({ length: 7 * 53 }).map((_, index) => {
                                            // Generate random level for heat map visualization
                                            const level = Math.floor(Math.random() * 5);
                                            let bgColor;
                                            switch (level) {
                                                case 0: bgColor = "#D2E2FC"; break;
                                                case 1: bgColor = "#0288E7"; break;
                                                case 2: bgColor = "#0288E7"; break;
                                                case 3: bgColor = "#0288E7"; break;
                                                case 4: bgColor = "#D2E2FC"; break;
                                                default: bgColor = "#D2E2FC";
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        width: "10px",
                                                        height: "10px",
                                                        backgroundColor: bgColor,
                                                        borderRadius: "2px"
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rating Graph */}
                        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                            <div style={{
                                flex: "1",
                                background: "#fff",
                                padding: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <h3 style={{ margin: 0, fontSize: "16px" }}>Rating Graph</h3>
                                    <div style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        overflow: "hidden",
                                        display: "inline-flex",
                                        fontSize: "12px"
                                    }}>
                                        <div
                                            onClick={() => setActiveRatingTab('current')}
                                            style={{
                                                padding: "5px 15px",
                                                cursor: "pointer",
                                                background: activeRatingTab === 'current' ? "#133b77" : "#f5f8fc",
                                                color: activeRatingTab === 'current' ? "#fff" : "#23406e"
                                            }}
                                        >
                                            Current Ratings Graph
                                        </div>
                                        <div
                                            onClick={() => setActiveRatingTab('old')}
                                            style={{
                                                padding: "5px 15px",
                                                cursor: "pointer",
                                                background: activeRatingTab === 'old' ? "#133b77" : "#f5f8fc",
                                                color: activeRatingTab === 'old' ? "#fff" : "#23406e"
                                            }}
                                        >
                                            Old Ratings Graph
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                                    <div style={{
                                        backgroundColor: "#4caf50",
                                        padding: "8px 15px",
                                        borderRadius: "4px",
                                        color: "white",
                                        marginRight: "15px"
                                    }}>
                                        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                                            1515 <span style={{ fontSize: "14px", fontWeight: "normal" }}>(↑3)</span>
                                        </div>
                                        <div style={{ fontSize: "12px" }}>Rating</div>
                                    </div>

                                    <div style={{
                                        padding: "8px 15px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "13px"
                                    }}>
                                        <div style={{ fontWeight: "500" }}>Starters 91 Division 4 (Rated)</div>
                                        <div style={{ fontSize: "12px", color: "#666", marginTop: "3px" }}>(2023-05-14 22:00:00)</div>
                                        <div style={{ marginTop: "3px" }}>Global Rank: <span style={{ fontWeight: "500" }}>1740</span></div>
                                    </div>
                                </div>

                                <div>
                                    <canvas id="rating-graph" width="500" height="200" style={{ width: "100%", height: "auto" }}></canvas>
                                </div>
                            </div>
                        </div>

                        {/* Learning Paths section */}
                        <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "10px" }}>Learning Paths ({courses?.length || 0})</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "20px" }}>
                            {courses && courses.length > 0 ? courses.slice(0, 4).map((course, index) => {
                                const progress = course.progress || course.completionPercentage || 0;
                                const status = progress === 100 ? "Completed" : "In Progress";
                                const icon = course.language?.toLowerCase() || "python";

                                return (
                                    <div key={course._id || index} style={{
                                        background: "#fff",
                                        borderRadius: "8px",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                        overflow: "hidden",
                                        position: "relative",
                                        border: "1px solid #e1e4e8"
                                    }}>
                                        {/* Wave background with gradient */}
                                        <div style={{
                                            position: "relative",
                                            height: "110px",
                                            overflow: "hidden",
                                            backgroundColor: "#0096FF",
                                            background: "linear-gradient(90deg, #0096FF 0%, #80D0C7 100%)"
                                        }}>
                                            {/* Wave shape */}
                                            <svg
                                                viewBox="0 0 500 150"
                                                preserveAspectRatio="none"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "0",
                                                    width: "100%",
                                                    height: "40px",
                                                    fill: "#fff"
                                                }}
                                            >
                                                <path d="M0.00,49.98 C152.36,122.24 271.49,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
                                            </svg>

                                            {/* Circular progress indicator */}
                                            <div style={{
                                                position: "absolute",
                                                right: "30px",
                                                top: "30px",
                                                width: "65px",
                                                height: "65px",
                                                borderRadius: "50%",
                                                backgroundColor: "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                                            }}>
                                                <div style={{
                                                    width: "55px",
                                                    height: "55px",
                                                    borderRadius: "50%",
                                                    border: "3px solid #eee",
                                                    borderTopColor: progress === 100 ? "#4CAF50" : "#0096FF",
                                                    borderRightColor: progress === 100 ? "#4CAF50" : "#0096FF",
                                                    borderBottomColor: progress >= 50 ? (progress === 100 ? "#4CAF50" : "#0096FF") : "#eee",
                                                    borderLeftColor: progress >= 75 ? (progress === 100 ? "#4CAF50" : "#0096FF") : "#eee",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    transform: "rotate(-45deg)",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    color: progress === 100 ? "#4CAF50" : "#0096FF"
                                                }}>
                                                    <span style={{ transform: "rotate(45deg)" }}>{progress}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content part */}
                                        <div style={{ padding: "15px 20px" }}>
                                            {/* Icon box */}
                                            <div style={{
                                                display: "flex",
                                                marginBottom: "5px"
                                            }}>
                                                <div style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "8px",
                                                    backgroundColor: icon === "python" ? "#FFD43B" :
                                                        icon === "cpp" || icon === "c++" ? "#42A5F5" :
                                                            icon === "java" ? "#FF5722" : "#26C6DA",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginRight: "10px",
                                                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                                                }}>
                                                    {icon === "python" ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                                            <path fill="#3572A5" d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912h2.396v-3.328s-.13-4.013 3.95-4.013h6.83s3.835.033 3.835-3.713v-6.242S23.56 2.1 15.885 2.1zm-3.703 2.05a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7z" />
                                                            <path fill="#3572A5" d="M16.085 29.91c7.1 0 6.651-3.08 6.651-3.08v-3.19h-6.752v-1h9.441S30 23.195 30 15.99s-4.013-6.912-4.013-6.912h-2.396v3.328s.13 4.013-3.95 4.013h-6.83s-3.835-.033-3.835 3.713v6.242s-.437 3.536 7.109 3.536zm3.703-2.05a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7z" />
                                                        </svg>
                                                    ) : icon === "cpp" || icon === "c++" ? (
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                            <path d="M10.5 15.97L10.91 18.41C10.65 18.55 10.23 18.68 9.67 18.8C9.1 18.93 8.43 19 7.66 19C5.45 18.96 3.79 18.3 2.68 17.04C1.56 15.77 1 14.16 1 12.21C1.05 9.9 1.72 8.13 3 6.89C4.32 5.64 5.96 5 7.94 5C8.69 5 9.34 5.07 9.88 5.19C10.42 5.31 10.82 5.44 11.08 5.59L10.5 8.08L9.44 7.74C9.04 7.64 8.58 7.59 8.05 7.59C6.89 7.58 5.93 7.95 5.18 8.69C4.42 9.42 4.03 10.54 4 12.03C4 13.39 4.37 14.45 5.08 15.23C5.79 16 6.79 16.4 8.07 16.41L9.4 16.29C9.83 16.21 10.19 16.1 10.5 15.97M11 11H13V9H15V11H17V13H15V15H13V13H11V11Z" />
                                                        </svg>
                                                    ) : icon === "java" ? (
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 .001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                            <path d="M16 8.5l4-4-4-4v3h-12v2h12v3zm-16 2.5v2h12v3l4-4-4-4v3h-12z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: "16px", fontWeight: "500" }}>{course.title || course.name}</div>
                                                    <div style={{
                                                        fontSize: "13px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: status === "Completed" ? "#4CAF50" : "#666"
                                                    }}>
                                                        {status === "Completed" ? "✓" : null} {status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666", padding: "20px" }}>
                                    No learning paths enrolled yet
                                </div>
                            )}
                        </div>

                        {/* Practice Paths section */}
                        <h3 style={{ fontSize: "16px", marginTop: 0, marginBottom: "10px" }}>Practice Paths ({practiceCategories?.length || 0})</h3>

                        {practiceCategories && practiceCategories.length > 0 ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "20px" }}>
                                {practiceCategories.map((category, index) => {
                                    // Determine icon based on category name
                                    const determineIcon = (name) => {
                                        const lowerName = (name || '').toLowerCase();
                                        if (lowerName.includes('python')) return 'python';
                                        if (lowerName.includes('c++') || lowerName.includes('cpp')) return 'cpp';
                                        if (lowerName.includes('java')) return 'java';
                                        if (lowerName.includes('c') && !lowerName.includes('c++')) return 'c';
                                        return 'default';
                                    };

                                    const icon = determineIcon(category.name || category.title);
                                    const progress = category.progress || category.completionRate || 0;
                                    const status = progress >= 100 ? 'Completed' : 'In Progress';

                                    return (
                                        <div key={category._id || category.id || `path-${index}`} style={{
                                            background: "#fff",
                                            borderRadius: "8px",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                            overflow: "hidden",
                                            position: "relative",
                                            border: "1px solid #e1e4e8"
                                        }}>
                                            {/* Wave background with gradient */}
                                            <div style={{
                                                position: "relative",
                                                height: "110px",
                                                overflow: "hidden",
                                                backgroundColor: "#0096FF",
                                                background: "linear-gradient(90deg, #0096FF 0%, #80D0C7 100%)"
                                            }}>
                                                {/* Wave shape */}
                                                <svg
                                                    viewBox="0 0 500 150"
                                                    preserveAspectRatio="none"
                                                    style={{
                                                        position: "absolute",
                                                        bottom: "0",
                                                        width: "100%",
                                                        height: "40px",
                                                        fill: "#fff"
                                                    }}
                                                >
                                                    <path d="M0.00,49.98 C152.36,122.24 271.49,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
                                                </svg>

                                                {/* Circular progress indicator */}
                                                <div style={{
                                                    position: "absolute",
                                                    right: "30px",
                                                    top: "30px",
                                                    width: "65px",
                                                    height: "65px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                                                }}>
                                                    <div style={{
                                                        width: "55px",
                                                        height: "55px",
                                                        borderRadius: "50%",
                                                        border: "3px solid #eee",
                                                        borderTopColor: progress === 100 ? "#4CAF50" : "#0096FF",
                                                        borderRightColor: progress === 100 ? "#4CAF50" : "#0096FF",
                                                        borderBottomColor: progress >= 50 ? (progress === 100 ? "#4CAF50" : "#0096FF") : "#eee",
                                                        borderLeftColor: progress >= 75 ? (progress === 100 ? "#4CAF50" : "#0096FF") : "#eee",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transform: "rotate(-45deg)",
                                                        fontSize: "16px",
                                                        fontWeight: "bold",
                                                        color: progress === 100 ? "#4CAF50" : "#0096FF"
                                                    }}>
                                                        <span style={{ transform: "rotate(45deg)" }}>{progress}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content part */}
                                            <div style={{ padding: "15px 20px" }}>
                                                {/* Icon box */}
                                                <div style={{
                                                    display: "flex",
                                                    marginBottom: "5px"
                                                }}>
                                                    <div style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        borderRadius: "8px",
                                                        backgroundColor: icon === "python" ? "#FFD43B" :
                                                            icon === "cpp" ? "#42A5F5" :
                                                                icon === "java" ? "#FF5722" : "#26C6DA",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        marginRight: "10px",
                                                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                                                    }}>
                                                        {icon === "python" ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                                                <path fill="#3572A5" d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912h2.396v-3.328s-.13-4.013 3.95-4.013h6.83s3.835.033 3.835-3.713v-6.242S23.56 2.1 15.885 2.1zm-3.703 2.05a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7z" />
                                                                <path fill="#3572A5" d="M16.085 29.91c7.1 0 6.651-3.08 6.651-3.08v-3.19h-6.752v-1h9.441S30 23.195 30 15.99s-4.013-6.912-4.013-6.912h-2.396v3.328s.13 4.013-3.95 4.013h-6.83s-3.835-.033-3.835 3.713v6.242s-.437 3.536 7.109 3.536zm3.703-2.05a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7z" />
                                                            </svg>
                                                        ) : icon === "cpp" ? (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                                <path d="M10.5 15.97L10.91 18.41C10.65 18.55 10.23 18.68 9.67 18.8C9.1 18.93 8.43 19 7.66 19C5.45 18.96 3.79 18.3 2.68 17.04C1.56 15.77 1 14.16 1 12.21C1.05 9.9 1.72 8.13 3 6.89C4.32 5.64 5.96 5 7.94 5C8.69 5 9.34 5.07 9.88 5.19C10.42 5.31 10.82 5.44 11.08 5.59L10.5 8.08L9.44 7.74C9.04 7.64 8.58 7.59 8.05 7.59C6.89 7.58 5.93 7.95 5.18 8.69C4.42 9.42 4.03 10.54 4 12.03C4 13.39 4.37 14.45 5.08 15.23C5.79 16 6.79 16.4 8.07 16.41L9.4 16.29C9.83 16.21 10.19 16.1 10.5 15.97M11 11H13V9H15V11H17V13H15V15H13V13H11V11Z" />
                                                            </svg>
                                                        ) : icon === "java" ? (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                                <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 .001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
                                                            </svg>
                                                        ) : (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                                <path d="M16 8.5l4-4-4-4v3h-12v2h12v3zm-16 2.5v2h12v3l4-4-4-4v3h-12z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: "16px", fontWeight: "500" }}>{category.name || category.title || 'Practice Path'}</div>
                                                        <div style={{
                                                            fontSize: "13px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            color: status === "Completed" ? "#4CAF50" : "#666"
                                                        }}>
                                                            {status === "Completed" ? "✓" : null} {status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", color: "#666", padding: "20px", marginBottom: "20px", background: "#fff", borderRadius: "8px", border: "1px solid #e1e4e8" }}>
                                No practice paths available yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDashboard;