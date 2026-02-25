import React, { useState, useEffect } from "react";

import Img6 from "../../../assets/Profile/Img6.png";
import Img7 from "../../../assets/Profile/Group.svg";

import "../../../Style/FirstLinkPage.css";
import api from "../../../lib/api";
import WishlistButton from "../../../Components/WishlistButton";

export default function Wishlist() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("courses");
  const [courses, setCourses] = useState([]);
  const tabs = [
    { key: "courses", label: "Courses" },
    { key: "contests", label: "Contests" },
  ];

  
  const fetchWishlist = () => {
    api
      .get("/wishlist")
      .then((res) => {
        console.log(res.data.data.wishlist?.courses);
        setCourses(res.data.data.wishlist?.courses || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleWishlistChange = () => {
    // Refresh wishlist after add/remove
    fetchWishlist();
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(()=>{
    // console.log(courses)
  },[courses])

  return (
    <div className="py-6 w-[52.06rem] mx-auto  min-h-screen ">
      {/* Tabs */}
      <div className="flex gap-4 justify-center mb-8">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <span
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-6 py-3 rounded-full shadow-sm transition
                ${
                  isActive
                    ? "bg-[#2800AE] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:shadow"
                }
              `}
            >
              {t.label}
            </span>
          );
        })}
      </div>
      {/* Search Bar */}
      <div className="mb-6 w-[52rem]">
        <div className="flex items-center w-full bg-white border border-gray-200 rounded-full shadow-sm px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search Language"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      <div
        className="courses-grid cursor-pointer"
        // onClick={() =>
        //   (window.location.href =
        //     "https://codeiqgenius-frontend-nitesh.vercel.app/course-detail")
        // }
      >
        {Array.isArray(filteredCourses) && filteredCourses.map((course) => (
          <div className="course-card" key={course._id} style={{ position: 'relative' }}>
            <div className="course-badge">
              <span className="premium-badge">
                <div>Premium Course</div>
              </span>
            </div>
            <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
              <WishlistButton
                type="courses"
                itemId={course._id}
                size="sm"
                onToggle={handleWishlistChange}
              />
            </div>
            <div className="course-image">
              <img
                src={
                  course.thumbnail ||
                  "https://via.placeholder.com/250x150?text=Course+Image"
                }
                alt={course.title}
              />
            </div>
            <h6 className="course-title">{course.title}</h6>
            <div className="flex items-center justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M9.83546 3.29798C9.83546 4.74008 9.83546 5.90943 5.19288 5.90943C0.550293 5.90943 0.550293 4.74008 0.550293 3.29798C0.550293 1.85587 2.62901 0.686523 5.19288 0.686523C7.75674 0.686523 9.83546 1.85587 9.83546 3.29798Z"
                  fill="#1E1E1E"
                />
              </svg>
              <p className="course-instructor">{course.mentor?.name}</p>
            </div>

            <div className="course-rating">
              {/* ⭐ {course.rating} ({course.reviews.toLocaleString()}) */}
            </div>
            <div className="enroll-count">
              <img src={course.gropusvg} alt="" />
              <div>14,000 students</div>
            </div>
            <div className="course-price  flex align-center justify-between">
              <span className="discount text-xl"> ₹{course.price}</span>
              <span className="original">2999</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
