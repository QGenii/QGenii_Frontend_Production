import React, { useState } from 'react';
import VideoModal from './VideoModal';
import { FaInstagram, FaLinkedinIn, FaGlobeAsia, FaPlay } from 'react-icons/fa';
// import MainNavbar from '../MainNavbar';   

const InstructorDetails = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  const instructorData = {
    name: "Name of the Person",
    profession: "His profession",
    badge: "CodeIQGenius Instructor Partner",
    totalLearners: "522,021",
    reviews: "65,116",
    bio: "My name is Julian, and I am a full-time teacher and bestselling instructor who is truly dedicated to helping students realize their full potential. With the honor of teaching over 500,000 students from 130+ countries across the globe, I have honed my skills and become an expert in my field.",
    additionalBio: "My focus is on unlocking your potential to 10x your creativity and productivity with AI tools and filmmaking techniques I've learned over the years creating countless amounts of content for clients from many industries.",
    callToAction: "Join me on this journey, and together let's unleash your creativity and take your skills to the next level!"
  };

  const courses = [
    {
      id: 1,
      title: "The Complete Full-Stack Web Development Bootcamp",
      rating: 4.8,
      reviews: 1200,
      price: 499,
      originalPrice: 3999,
      students: "2,000+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video1.mp4"
    },
    {
      id: 2,
      title: "Mastering React - The Complete Guide",
      rating: 4.7,
      reviews: 980,
      price: 299,
      originalPrice: 1999,
      students: "1,500+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video2.mp4"
    },
    {
      id: 3,
      title: "Node.js API Masterclass",
      rating: 4.9,
      reviews: 760,
      price: 399,
      originalPrice: 2999,
      students: "1,200+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video3.mp4"
    },
    {
      id: 4,
      title: "Python for Data Science and Machine Learning Bootcamp",
      rating: 4.8,
      reviews: 850,
      price: 349,
      originalPrice: 2499,
      students: "1,800+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video4.mp4"
    },
    {
      id: 5,
      title: "The Web Developer Bootcamp 2023",
      rating: 4.6,
      reviews: 1100,
      price: 199,
      originalPrice: 1999,
      students: "3,000+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video5.mp4"
    },
    {
      id: 6,
      title: "Java Programming Masterclass covering Java 11 & Java 17",
      rating: 4.7,
      reviews: 670,
      price: 399,
      originalPrice: 2999,
      students: "900+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video6.mp4"
    },
    {
      id: 7,
      title: "Ultimate Guide to Game Development with Unity 2023",
      rating: 4.8,
      reviews: 540,
      price: 499,
      originalPrice: 3999,
      students: "1,100+",
      isPremium: true,
      image: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png",
      videoUrl: "https://example.com/video7.mp4"
    }
  ]; 

  const handleVideoClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };

  const handleCourseClick = (course) => {
    setSelectedVideoUrl(course.videoUrl || 'https://example.com/sample-video.mp4'); // Replace with actual video URL
    setIsVideoModalOpen(true);
  };

  return (
    <>
      {/* <MainNavbar /> */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Instructor Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Profile Image & Social Links */}
            <div className="md:w-1/4">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <div className="flex gap-2">
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <FaInstagram className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <FaLinkedinIn className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <FaGlobeAsia className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>

            {/* Right Column - Instructor Info */}
            <div className="md:w-3/4">
              {/* Header Section */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">{instructorData.name}</h2>
                <p className="text-gray-600 mb-2">{instructorData.profession}</p>
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  {instructorData.badge}
                </span>
              </div>

              {/* Stats Section */}
              <div className="flex gap-8 mb-6">
                <div>
                  <div className="text-lg font-bold">{instructorData.totalLearners}</div>
                  <div className="text-sm text-gray-600">Total learners</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{instructorData.reviews}</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4 text-gray-700">
                <p>{instructorData.bio}</p>
                <p>{instructorData.additionalBio}</p>
                <p className="font-medium">{instructorData.callToAction}</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Courses Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">All My 7 Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleCourseClick(course)}
              >
                {/* Course Thumbnail with Play Button Overlay */}
                <div className="relative group">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <FaPlay className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                  {course.isPremium && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {course.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{course.rating}</span>
                    </div>
                    <span className="mx-1">•</span>
                    <span>({course.reviews} reviews)</span>
                  </div>

                  {/* Students */}
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"/>
                    </svg>
                    <span>{course.students} students</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{course.price}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ₹{course.originalPrice}
                      </span>
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
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={selectedVideoUrl}
      />
    </>
  );
};

export default InstructorDetails;
