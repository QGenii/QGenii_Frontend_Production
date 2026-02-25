import React from 'react';

// Sample review data
const reviewsData = [
  {
    id: 1,
    name: "Anonymous",
    rating: 5,
    review: "I have nice experience for my up & down my first time doing something like this, finally, i got placed. since day 1 after logging in into this platform I know that I'll come the most on the first day. I am literally very Happy. Thanks for this."
  },
  {
    id: 2,
    name: "Anonymous",
    rating: 5,
    review: "I have nice experience for my up & down my first time doing something like this, finally, i got placed. since day 1 after logging in into this platform I know that I'll come the most on the first day. I am literally very Happy. Thanks for this."
  },
  {
    id: 3,
    name: "Anonymous",
    rating: 5,
    review: "I have nice experience for my up & down my first time doing something like this, finally, i got placed. since day 1 after logging in into this platform I know that I'll come the most on the first day. I am literally very Happy. Thanks for this."
  }
];

// Stats data
const statsData = [
  {
    id: 1,
    number: "25M+",
    label: "Job & Internships",
    color: "bg-green-100",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 2,
    number: "30K+",
    label: "Verified Recruiters",
    color: "bg-blue-100",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 3,
    number: "6.6M+",
    label: "Applications",
    color: "bg-pink-100",
    icon: (
      <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )
  }
];

// Post Jobs section data
const postJobsData = {
  title: "Post Your Jobs & Internships",
  description: "Find the right candidate from a diverse talent pool for your role.",
  buttonText: "Post Jobs",
  image: "/assets/post-jobs-illustration.png"
};

const ReviewSection = () => {
  return (
    <>
      {/* Reviews Section */}
      <div className="bg-amber-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-8">
            <span className="text-indigo-600">Top Reviews</span> Of CodeIQGenius
          </h2>
          
          {/* Reviews Carousel */}
          <div className="relative">
            {/* Arrow Left */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </button>
            
            {/* Reviews Cards */}
            <div className="flex overflow-x-auto pb-4 hide-scrollbar">
              {reviewsData.map(review => (
                <div 
                  key={review.id} 
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-3"
                >
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{review.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div>
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Arrow Right */}
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center mt-10 gap-6">
            {statsData.map(stat => (
              <div 
                key={stat.id} 
                className={`${stat.color} p-8 rounded-full flex flex-col items-center justify-center w-40 h-40 text-center`}
              >
                {stat.icon}
                <div className="mt-2 font-bold text-xl">{stat.number}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Post Jobs & Internships Section */}
      <div className="relative bg-purple-100 py-12">
        {/* Wave pattern background */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E')",
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 50px'
          }}
        ></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{postJobsData.title}</h2>
              <p className="text-gray-700 mb-6">{postJobsData.description}</p>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                </svg>
                {postJobsData.buttonText}
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={postJobsData.image}
                alt="Post Jobs Illustration"
                className="max-w-md w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=Post+Jobs+Illustration";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
