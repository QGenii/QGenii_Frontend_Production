// StudyCard component fetches enrollment data
import { useRef, useState, useEffect } from 'react';
function StudyCard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIdx, setStartIdx] = useState(0);
  const cardsToShow = 2;
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchEnrollment() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/enrollments', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch enrollment');
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setEnrollments(data.data);
        } else {
          setEnrollments([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEnrollment();
  }, []);
const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + 1, enrollments.length - cardsToShow < 0 ? 0 : enrollments.length - cardsToShow)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center border border-blue-500 rounded-md overflow-hidden bg-white w-full max-w-[250px]">
        <div className="bg-[#cce5ff] px-6 py-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M5 6h14M5 18h14" />
          </svg>
        </div>
        <div className="p-3 text-sm font-medium text-gray-700">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center border border-blue-500 rounded-md overflow-hidden bg-white w-full max-w-[250px]">
        <div className="bg-[#cce5ff] px-6 py-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M5 6h14M5 18h14" />
          </svg>
        </div>
        <div className="p-3 text-sm font-medium text-red-500">{error}</div>
      </div>
    );
  }
  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="flex items-center border border-blue-500 rounded-md overflow-hidden bg-white w-full max-w-[250px]">
        <div className="bg-[#cce5ff] px-6 py-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M5 6h14M5 18h14" />
          </svg>
        </div>
        <div className="p-3 text-sm font-medium text-gray-700">No enrollments found.</div>
      </div>
    );
  }

  const canScrollPrev = startIdx > 0;
  const canScrollNext = enrollments.length > cardsToShow && startIdx < enrollments.length - cardsToShow;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrev}
        disabled={!canScrollPrev}
        className={`p-3 rounded-full border-2 border-blue-500 bg-blue-500 shadow-md transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 hover:border-blue-600 active:scale-95`}
        aria-label="Previous"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="20" 
          height="20" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-hidden py-2 w-full max-w-full"
      >
        {enrollments.slice(startIdx, startIdx + cardsToShow).map((enrollment, idx) => (
          <div
            key={enrollment._id || idx}
            className="flex-shrink-0 flex items-center border border-blue-500 rounded-md overflow-hidden bg-white w-[280px] sm:w-[320px] shadow-md"
          >
            <div className="bg-[#cce5ff] px-6 py-4 flex items-center justify-center">
              <img src={enrollment.course?.thumbnail} alt="Course Thumbnail" className="w-12 h-12 rounded object-cover" />
            </div>
            <div className="p-3 text-sm font-medium text-gray-700">
              <div className="font-bold text-base mb-1">{enrollment.course?.title || 'Course'}</div>
              <div className="text-xs text-gray-500 mb-1">{enrollment.course?.shortDescription || enrollment.course?.description || ''}</div>
              <div className="text-xs text-gray-600">Progress: {enrollment.progress || 0}%</div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!canScrollNext}
        className={`p-3 rounded-full border-2 border-blue-500 bg-blue-500 shadow-md transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 hover:border-blue-600 active:scale-95`}
        aria-label="Next"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="20" 
          height="20" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
// ...existing code...
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  User,
  Flag,
  GraduationCap,
  Calendar,
  Wrench,
  Layout,
  BookText,
  Monitor,
  Plus,

} from "lucide-react";

const menuItems = [
  {
    name: "Jobs",
    icon: <Briefcase size={20} />,
    className: "border border-[#3B82F6] bg-white",
    color: "#1D4ED8",
    link: "/coming-soon",
  },
  {
    name: "Internship",
    icon: <User size={20} />,
    className: "border border-[#22C55E] bg-white",
    color: "#15803D",
    link: "/coming-soon",
  },
  {
    name: "Competition",
    icon: <Flag size={20} />,
    className: "border border-[#F97373] bg-white",
    color: "#DC2626",
    link: "/coming-soon",
  },
  {
    name: "Scholarship",
    icon: <GraduationCap size={20} />,
    className: "border border-[#FBBF24] bg-white",
    color: "#D97706",
    link: "/coming-soon",
  },
  
  {
    name: "Workshops",
    icon: <Wrench size={20} />,
    className: "border border-[#2DD4BF] bg-white",
    color: "#0F766E",
    link: "/coming-soon",
  },
  {
    name: "Conferences",
    icon: <Layout size={20} />,
    className: "border border-[#EC4899] bg-white",
    color: "#9D174D",
    link: "/coming-soon",
  },
  {
    name: "Blogs",
    icon: <BookText size={20} />,
    className: "border border-[#FACC15] bg-white",
    color: "#A16207",
    link: "/blog",
  },
  {
    name: "Teach On QGenii",
    icon: <Monitor size={20} />,
    className: "border border-[#38BDF8] bg-white",
    color: "#0369A1",
    link: "/coming-soon",
  },
  {
    name: "Create Contest",
    icon: <Plus size={20} />,
    className: "border border-transparent bg-transparent",
    color: "#111827",
    link: "/coming-soon",
  },
];

export default function Section1() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#f2f2f2] w-full py-8 px-4 ">
      <Container fluid="md">

      
             
      {/* Toggle Button + Dropdown */}
      <div className="w-full flex justify-end px-2 py-0">
        <div className="relative inline-block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-white font-medium bg-blue-700 border border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z"
                fill="currentColor"
              />
            </svg>
            Host
          </button>

          {/* Sidebar Options (overlay, tight under button) */}
          {isOpen && (
            <div className="absolute right-0 mt-1 bg-white w-64 rounded-2xl shadow-lg p-4 transition-all duration-300 z-30">
              <ul className="flex flex-col gap-3 justify-end">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => navigate(item.link)}
                    className={`flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 ${item.className}`}
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ color: item.color }}>{item.icon}</span>
                      <span className="font-semibold text-sm" style={{ color: item.color }}>
                        {item.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    


        <Row className="flex flex-col md:flex-row justify-between items-start md:items-center ">
          
         
        
          {/* Left Section */}
          <Col className="mb-6 md:mb-0 md:w-1/2">
            
            <div className="flex items-center w-full mb-6 whitespace-nowrap gap-2 ">
              <h2 className="text-3xl font-bold">Let’s Start Studying</h2>
             
            </div>






            {/* Study Card (Dynamic) */}
            <StudyCard />

          </Col>

          {/* Right Section: Welcome */}
          <Col className="flex items-center gap-4 justify-center md:justify-end w-full md:w-1/2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base font-semibold">Welcome Back, {user && user.name ? user.name : "User"}</p>
            </div>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
}
