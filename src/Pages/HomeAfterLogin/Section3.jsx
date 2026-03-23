import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Section3() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/practice/categories?limit=5")
      .then(res => res.json())
      .then(res => setCategories((res.data?.categories || []).slice(0, 5)));

    fetch("http://localhost:5000/courses?limit=5")
      .then(res => res.json())
      .then(res => setCourses((res.data || []).slice(0, 5)));

    fetch("http://localhost:5000/skills?limit=5")
      .then(res => res.json())
      .then(res => setSkills((res.data || []).slice(0, 5)));

    fetch("http://localhost:5000/contests?limit=5")
      .then(res => res.json())
      .then(res => setContests((res.data || []).slice(0, 5)));
  }, []);

  const renderCards = (items, type) => {
    const arr = Array.isArray(items) ? items : [];

    if (arr.length === 0) {
      return (
        <div className="text-center w-full py-8 text-lg text-gray-500">
          No items found.
        </div>
      );
    }

    return (
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {arr.map(item => (
          <div
            key={item._id || item.id || item.slug}
            className="relative bg-white border-2 border-[#6D28D9] rounded-2xl shadow-md p-4 flex flex-col items-center text-center flex-shrink-0 w-60 hover:shadow-lg hover:border-[#7C3AED] transition-all duration-300"
          >
            {/* Level Badge */}
            <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
              {item.level
                ? item.level.charAt(0).toUpperCase() + item.level.slice(1)
                : "Beginner"}
            </div>

            {/* Icon/Thumbnail */}
            <div className="mb-4 ">
              <img
                src={item.icon || item.thumbnail || "/default-icon.png"}
                alt={item.name || item.title}
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 h-10">
              {item.name || item.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-700 mb-4 line-clamp-3 h-12 leading-relaxed">
              {item.description || item.shortDescription}
            </p>

            {/* Rating and Learners */}
            <div className="flex items-center justify-between w-full mb-5 px-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-800">{item.rating || "4.0"}</span>
                <span className="text-[#6D28D9] text-sm">★</span>
              </div>
              <span className="text-xs text-gray-600">
                {item.learners || item.enrollmentCount || "230.5k"} Learners
              </span>
            </div>

            {/* Button */}
            <button
              className="w-full border-2 border-[#6D28D9] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-purple-50 transition-all duration-200 active:scale-95"
              onClick={() => {
                if (type === "category")
                  navigate(`/practice/categories/${item.slug}`);
                else if (type === "course")
                  navigate(`/courses/course-detail?id=${item._id}`);
                else if (type === "skill")
                  navigate(`/practicetests/${item.name}`);
                else if (type === "contest")
                  navigate(`/contests/${item._id}`);
              }}
            >
              {type === "category"
                ? "Start Practice"
                : type === "course"
                ? "View this Course"
                : type === "skill"
                ? "Take Test"
                : "Take Challenge"}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start justify-center gap-8 py-[-1rem]">
      <div className="sm:px-6 md:px-8 m-auto w-full">
        {/* Courses */}
        <div className="w-full mb-10 pt-8">
          <h2 className="text-[1.75rem] font-bold text-gray-900 mb-6">
            Study To Course
          </h2>
          {renderCards(courses, "course")}
        </div>

        {/* View All Courses Button */}
        <div className="flex justify-center w-full mb-12">
          <button
            className="px-8 py-3 text-white rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
            style={{ backgroundColor: "#0C2D73" }}
            onClick={() => navigate("/coursecatalog")}
          >
            View All Courses
          </button>
        </div>

        {/* Practice Categories */}
        <div className="w-full mb-10">
          <h2 className="text-[1.75rem] font-bold text-gray-900 mb-6">
            Practice Coding Challenge
          </h2>
          {renderCards(categories, "category")}
        </div>

        {/* View All Skills Button */}
        <div className="flex justify-center w-full pb-4">
          <button
            className="px-8 py-3 text-white rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
            style={{ backgroundColor: "#0C2D73" }}
            onClick={() => navigate("/practice")}
          >
            View All Practice
          </button>
        </div>
      
        {/* Contests */}
        <div className="w-full mb-10">
          <h2 className="text-[1.75rem] font-bold text-gray-900 mb-6">
            Future Coding Challenge
          </h2>
          {renderCards(contests, "contest")}
        </div>

        {/* View All Skills Button */}
        <div className="flex justify-center w-full pb-8">
          <button
            className="px-8 py-3 text-white rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
            style={{ backgroundColor: "#0C2D73" }}
            onClick={() => navigate("/contest")}
          >
            View All Contest
          </button>
        </div>
      
        {/* Skills */}
        <div className="w-full mb-10">
          <h2 className="text-[1.75rem] font-bold text-gray-900 mb-6">
            Skill Check Test
          </h2>
          {renderCards(skills, "skill")}
        </div>

        {/* View All Skills Button */}
        <div className="flex justify-center w-full pb-8">
          <button
            className="px-8 py-3 text-white rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
            style={{ backgroundColor: "#0C2D73" }}
            onClick={() => navigate("/courses/allCourses?section=skilltest")}
          >
            View All Skill Test
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}