import React from 'react';

const InstructorAllCourses = () => {
  const courses = [
    {
      id: 1,
      title: "The Complete Full-Stack Web Development BootCamp",
      rating: 4.8,
      reviews: 1200,
      students: 5000,
      price: 499,
      originalPrice: 3599,
      isPremium: true,
      thumbnail: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png"
    },
    // Duplicate this object 7 more times for the grid
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold">All My 7 Courses</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative aspect-video">
              <img 
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Premium
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-4">
              <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">
                {course.title}
              </h3>

              <div className="flex items-center text-xs text-gray-500 mb-2">
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {course.rating}
                </span>
                <span className="mx-1">•</span>
                <span>{course.reviews} reviews</span>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-3">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"/>
                </svg>
                <span>{course.students} students</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹{course.price}</span>
                  <span className="text-gray-500 line-through text-sm">₹{course.originalPrice}</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Premium
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorAllCourses;
