import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function Section5() {
  const dummyCourses = Array.from({ length: 10 }, (_, i) => ({
    name: `Course ${i + 1}: Full Stack Bootcamp with real-world examples.`,
    rating: (4 + (i % 2) * 0.1).toFixed(1),
    reviews: 100 + i * 10,
    price: `$${499 + i * 10}`,
    original: `$${2999 + i * 100}`,
    image: 'https://via.placeholder.com/150x100.png?text=Course+Image'
  }));

  const renderCourseCards = () =>
    dummyCourses.map((course, index) => (
      <div
        key={index}
        className="bg-[#0C316E] text-white p-4 rounded-lg w-60 shadow-md flex-shrink-0 cursor-pointer" onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/course-detail')}
      >
        {/* Image section */}
        <div className="bg-white rounded-md overflow-hidden mb-4 h-24 w-full flex items-center justify-center">
          <img src={course.image} alt="Course" className="h-full object-contain" />
        </div>

        {/* Description */}
        <p className="text-sm mb-2 break-words whitespace-normal">
          {course.name}
        </p>

        {/* Rating */}
        <div className="flex items-center text-sm mb-1">
          <FaStar className="text-yellow-400 mr-1" />
          {course.rating}
          <span className="ml-1 text-gray-300">| {course.reviews} reviews</span>
        </div>

        {/* Price */}
        <div className="flex justify-between text-sm font-semibold">
          <span>{course.price}</span>
          <span>({course.reviews})</span>
          <span>{course.original}</span>
        </div>
      </div>
    ));

  return (
    <div className="bg-gray-100 py-10">
      {['Suggestion For You', 'Trending Course For You', 'Short And Sweet Course For You'].map(
        (sectionTitle, i) => (
          <div key={i} className="w-full mb-12 px-4">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
              {sectionTitle}
            </h3>

            {/* Full-width horizontal scroll container */}
            <div className="overflow-x-auto w-full">
              <div className="inline-flex gap-4 pb-2 pl-2">
                {renderCourseCards()}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
