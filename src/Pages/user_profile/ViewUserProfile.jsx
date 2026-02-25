import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody } from '../../Components/ui/Card';
import { Spinner } from '../../Components/ui/Spinner';
import api from '../../lib/api';
import { User, Award, BookOpen, TrendingUp, Calendar } from 'lucide-react';

const ViewUserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);
  const [skillTests, setSkillTests] = useState([]);
  const [contests, setContests] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [practicePaths, setPracticePaths] = useState([]);
  const [totalProblemsSolved, setTotalProblemsSolved] = useState(0);

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Fetch user profile by username
      const response = await api.get(`/users/${username}/profile`);
      setProfile(response.data.data);
      
      // Fetch additional data (badges, skill tests, contests, etc.)
      // For now, using dummy data as per the image
      setBadges([
        { id: 1, title: "Problem solver Diamond Badge", description: "Rewarded for solving 1000 Problems", icon: "diamond", color: "blue" },
        { id: 2, title: "5 Star Coder Diamond Badge", description: "Rewarded for solving 1000 Problems", icon: "diamond", color: "orange" },
        { id: 3, title: "Problem solver Diamond Badge", description: "Rewarded for solving 1000 Problems", icon: "diamond", color: "blue" },
        { id: 4, title: "Problem solver Diamond Badge", description: "Rewarded for solving 1000 Problems", icon: "diamond", color: "green" },
        { id: 5, title: "Problem solver Diamond Badge", description: "Rewarded for solving 1000 Problems", icon: "diamond", color: "purple" },
        { id: 6, title: "Problem solver Diamond Badge", description: "Rewarded for solving 1000 Problems", icon: "diamond", color: "red" }
      ]);
      
      setSkillTests([
        { id: 1, percentage: 80, date: "August 2025" },
        { id: 2, percentage: 80, date: "August 2025" },
        { id: 3, percentage: 80, date: "August 2025" },
        { id: 4, percentage: 80, date: "August 2025" },
        { id: 5, percentage: 80, date: "August 2025" },
        { id: 6, percentage: 80, date: "August 2025" }
      ]);
      
      setContests([
        { id: 1, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 2, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 3, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 4, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 5, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 6, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 7, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 8, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" },
        { id: 9, name: "Starters 55 Division 4 (Rated)", date: "Fever, Broken Phone" }
      ]);
      
      setLearningPaths([
        { id: 1, title: "Problem Solving in Python", status: "Completed", progress: 80, icon: "green" },
        { id: 2, title: "Beginner DSA C++", status: "In Progress", progress: 80, icon: "blue" },
        { id: 3, title: "Problem Solving in Java", status: "In Progress", progress: 80, icon: "orange" },
        { id: 4, title: "Problem Solving In C", status: "In Progress", progress: 80, icon: "blue" }
      ]);
      
      setPracticePaths([
        { id: 1, title: "Problem Solving in Python", status: "Completed", progress: 80, icon: "green" },
        { id: 2, title: "Problem Solving In C++", status: "In Progress", progress: 80, icon: "blue" },
        { id: 3, title: "Problem Solving in Java", status: "In Progress", progress: 80, icon: "orange" },
        { id: 4, title: "Problem Solving In C", status: "In Progress", progress: 80, icon: "blue" },
        { id: 5, title: "Problem Solving in Python", status: "Completed", progress: 80, icon: "green" },
        { id: 6, title: "Problem Solving in C++", status: "In Progress", progress: 80, icon: "blue" },
        { id: 7, title: "Problem Solving in Java", status: "In Progress", progress: 80, icon: "orange" },
        { id: 8, title: "Problem Solving In C", status: "In Progress", progress: 80, icon: "blue" },
        { id: 9, title: "Problem Solving in Python", status: "Completed", progress: 80, icon: "green" },
        { id: 10, title: "Problem Solving In C++", status: "In Progress", progress: 80, icon: "blue" },
        { id: 11, title: "Problem Solving in Java", status: "In Progress", progress: 80, icon: "orange" },
        { id: 12, title: "Problem Solving In C", status: "In Progress", progress: 80, icon: "blue" }
      ]);
      
      setTotalProblemsSolved(1929);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Set default profile if API fails
      setProfile({
        name: username || "Name of the user",
        profession: "Profession here",
        location: "India"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  const getBadgeColorClass = (color) => {
    const colors = {
      blue: "#3b82f6",
      orange: "#f97316",
      green: "#10b981",
      purple: "#a855f7",
      red: "#ef4444"
    };
    return colors[color] || "#6b7280";
  };

  const getPathIconColor = (icon) => {
    const colors = {
      green: "bg-green-500",
      orange: "bg-orange-500",
      blue: "bg-blue-500"
    };
    return colors[icon] || "bg-gray-500";
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "32px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: "24px", fontSize: "14px", color: "#666" }}>
          Home &gt; {username || "Username"}
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left Column */}
          <div>
            {/* User Profile Card */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ 
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "50%", 
                    background: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <User size={40} color="#666" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>
                      {profile?.name || "Name of the user"}
                    </h2>
                    <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
                      {profile?.profession || "Profession here"}
                    </p>
                    <p style={{ fontSize: "14px", color: "#666", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>🇮🇳</span>
                      {profile?.location || "India"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                      No Active Plan
                    </div>
                    <button style={{
                      background: "#10b981",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 500
                    }}>
                      Get Pro
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Badges Section */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Badges</h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(3, 1fr)", 
                  gap: "12px" 
                }}>
                  {badges.map((badge) => (
                    <div key={badge.id} style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      background: "#f9fafb"
                    }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: getBadgeColorClass(badge.color),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px"
                      }}>
                        <Award size={18} color="#fff" />
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                        {badge.title}
                      </div>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        {badge.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Skill Tests Levels */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Skill Tests Levels</h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(2, 1fr)", 
                  gap: "16px" 
                }}>
                  {skillTests.map((test) => (
                    <div key={test.id} style={{ textAlign: "center" }}>
                      <div style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 8px",
                        position: "relative"
                      }}>
                        <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#e0e0e0"
                            strokeWidth="6"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="6"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - test.percentage / 100)}`}
                          />
                        </svg>
                        <div style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "14px",
                          fontWeight: 600
                        }}>
                          {test.percentage}%
                        </div>
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        Python Skill List
                      </div>
                      <div style={{ fontSize: "11px", color: "#999" }}>
                        Attempted on {test.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Contests Section */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
                  Contests ({contests.length})
                </h3>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {contests.map((contest) => (
                    <div key={contest.id} style={{
                      padding: "12px",
                      borderBottom: "1px solid #e0e0e0",
                      fontSize: "14px"
                    }}>
                      <div style={{ fontWeight: 500, marginBottom: "4px" }}>
                        {contest.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {contest.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Total Problems Solved */}
            <Card>
              <CardBody>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>
                  Total Problems Solved: {totalProblemsSolved}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            {/* Submissions Heat Map */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600 }}>Submissions Heat Map</h3>
                  <select style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                    fontSize: "14px"
                  }}>
                    <option>Last 6 Months</option>
                  </select>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                    <div style={{ width: "20px", fontSize: "10px", color: "#666" }}></div>
                    {Array.from({ length: 26 }).map((_, i) => (
                      <div key={i} style={{ width: "12px", fontSize: "10px", color: "#666", textAlign: "center" }}>
                        {i % 7 === 0 && ["Sat", "Mon", "Wed", "Fri"][Math.floor(i / 7) % 4]}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(26, 1fr)",
                    gap: "4px"
                  }}>
                    {Array.from({ length: 182 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: "12px",
                          height: "12px",
                          background: i % 7 === 0 ? "#10b981" : i % 3 === 0 ? "#34d399" : "#d1fae5",
                          borderRadius: "2px"
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666", marginTop: "8px" }}>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </CardBody>
            </Card>

            {/* Rating Graph */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>Rating Graph</h3>
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 600
                  }}>
                    36
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                  <button style={{
                    padding: "6px 12px",
                    background: "#9ca3af",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}>
                    Current Ratings Graph
                  </button>
                  <button style={{
                    padding: "6px 12px",
                    background: "#a855f7",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}>
                    Old Ratings Graph
                  </button>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    background: "#10b981",
                    color: "#fff",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginRight: "8px"
                  }}>
                    1515 (-3) Rating
                  </div>
                </div>
                <div style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}>
                  Starters 91 Division 3 (Rated)
                </div>
                <div style={{ marginBottom: "16px", fontSize: "12px", color: "#666" }}>
                  Rank: 2000-2500 | Global Rank: 1740
                </div>
                <div style={{
                  height: "250px",
                  background: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  padding: "16px",
                  position: "relative"
                }}>
                  {/* Y-axis labels */}
                  <div style={{ position: "absolute", left: "8px", top: "16px", bottom: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
                    <span>1800</span>
                    <span>1400</span>
                    <span>1000</span>
                    <span>600</span>
                  </div>
                  {/* Graph area */}
                  <div style={{ marginLeft: "40px", height: "100%", position: "relative" }}>
                    {/* X-axis labels */}
                    <div style={{ position: "absolute", bottom: "-20px", left: 0, right: 0, display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
                      <span>2022</span>
                      <span>2023</span>
                      <span>2024</span>
                      <span>2025</span>
                    </div>
                    {/* Grid lines */}
                    <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                      {[0, 1, 2, 3].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={`${(i / 3) * 100}%`}
                          x2="100%"
                          y2={`${(i / 3) * 100}%`}
                          stroke="#e0e0e0"
                          strokeWidth="1"
                        />
                      ))}
                      {/* Sample line graph */}
                      <polyline
                        points="0,80% 25%,60% 50%,40% 75%,35% 100%,30%"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <a href="#" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "underline" }}>
                    How the rating System Works?
                  </a>
                </div>
              </CardBody>
            </Card>

            {/* Learning Paths */}
            <Card style={{ marginBottom: "24px" }}>
              <CardBody>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
                  Learning Paths ({learningPaths.length})
                </h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(2, 1fr)", 
                  gap: "12px" 
                }}>
                  {learningPaths.map((path) => (
                    <div key={path.id} style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      background: "#f9fafb",
                      position: "relative"
                    }}>
                      <div style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 600
                      }}>
                        {path.progress}%
                      </div>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: getPathIconColor(path.icon),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px"
                      }}>
                        <BookOpen size={18} color="#fff" />
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                        {path.title}
                      </div>
                      <div style={{ fontSize: "12px", color: path.status === "Completed" ? "#10b981" : "#f59e0b" }}>
                        {path.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Practice Paths */}
            <Card>
              <CardBody>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
                  Practice Paths ({practicePaths.length})
                </h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(2, 1fr)", 
                  gap: "12px",
                  maxHeight: "400px",
                  overflowY: "auto"
                }}>
                  {practicePaths.map((path) => (
                    <div key={path.id} style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      background: "#f9fafb",
                      position: "relative"
                    }}>
                      <div style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 600
                      }}>
                        {path.progress}%
                      </div>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: getPathIconColor(path.icon),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px"
                      }}>
                        <BookOpen size={18} color="#fff" />
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                        {path.title}
                      </div>
                      <div style={{ fontSize: "12px", color: path.status === "Completed" ? "#10b981" : "#f59e0b" }}>
                        {path.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;

