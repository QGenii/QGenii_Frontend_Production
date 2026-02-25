import React from 'react';

// Sample Rust Course Data
const courses = Array(10).fill({
  title: 'Learn Rust Programming',
  level: 'Beginner',
  description:
    'Learn Rust programming language within a month using our practical course. Understand the basic syntax of Rust using our online tutorial. Prepare for a future in data science...',
  rating: 4.6,
  reviews: 60898,
  learners: '359.4k',
  totalCourses: 6,
  badgeColor: 'bg-purple-700 text-white',
  iconBg: 'bg-amber-500',
});

// ⭐ Reusable Card Component
function CourseCard({ course }) {
  return (
    <div className="bg-[#90E0EFB2] rounded-xl p-5 shadow-md hover:shadow-lg transition-all font-sans">
      {/* Top Section: Icon + Title (vertical) */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`bg-[#FFE379] w-10 h-10 rounded-md  flex items-center justify-center`}>
          {/* need to be changed */}
          <img alt="Learn Rust" className="w-10 h-10" src="https://img.icons8.com/color/48/000000/rust-programming-language.png"></img>
          {/* <img src="/rust.png" alt="Rust" className="w-9 h-9" /> */}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1E3A8A]">{course.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-md font-medium mt-1 inline-block text-[#f1f1f1] ${course.badgeColor}`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-800 mb-4 line-clamp-2 leading-relaxed">
        {course.description}
      </p>

      {/* Rating and Review */}
      <div className="flex items-center text-sm text-gray-700 gap-2 mb-1">
        <span className="text-yellow-400 text-[15px]">★★★★☆</span>
        <span className="text-sm text-[#1E3A8A] font-medium">
          {course.rating.toFixed(1)} ({course.reviews.toLocaleString()})
        </span>
      </div>

      {/* Course Count + Learners */}
      <p className="text-sm text-gray-700 font-normal">
        {course.totalCourses} Courses • {course.learners} learners
      </p>
    </div>
  );
}

// 🔷 Main Page
export default function LearnRust() {
  return (
    <div className="w-full px-4 py-8 md:px-16 bg-white font-sans">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn Rust</h1>
        <p className="text-gray-600 max-w-3xl text-[15px] leading-relaxed">
          Rust is a versatile and user-friendly programming language known for its readability and
          efficiency. It’s widely used for web development, data analysis, artificial intelligence,
          and more.
        </p>
      </div>

      {/* Top Highlighted Card */}
      <div className="mb-10">
        <p className="font-semibold mb-2 text-[15px] text-gray-800">New to Rust? Start here</p>
        <div className="bg-[#0D71CF] text-white rounded-lg p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="flex flex-col md:w-2/3 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#FFE5B4]" />
              <div>
                <h3 className="text-white font-semibold text-[17px] leading-tight">
                  Learn Rust Programming
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md mt-1 inline-block">
                  Beginner
                </span>
              </div>
            </div>
            <div className="text-sm text-white mt-3 flex items-center gap-3">
              <span className="text-yellow-400">★★★★☆</span>
              <span>4.6 ({courses[0].reviews})</span>
            </div>
            <p className="text-sm text-white">
              {courses[0].totalCourses} Courses • {courses[0].learners} learners
            </p>
            <button className="bg-yellow-400 hover:bg-orange-400 text-black font-semibold text-sm mt-4 px-6 py-2 rounded-md w-64">
              Start Learning
            </button>
          </div>
          <div className="bg-[#0C2D57] p-4 rounded-md text-sm text-white md:w-1/3">
            <p className="italic mb-3 leading-relaxed">
              “This module is excellent for both learning and practicing simultaneously. It provides a clear and deep understanding of concepts, unlike traditional learning methods.”
            </p>
            <div>
              <p className="font-semibold text-white text-sm">yashsingh18</p>
              <p className="text-xs text-gray-300">Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rust Course Cards */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic of Rust (10)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}
