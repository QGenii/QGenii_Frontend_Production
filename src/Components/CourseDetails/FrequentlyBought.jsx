import React from 'react';
import { Link } from 'react-router-dom';

const FrequentlyBought = () => {
  const bundleCourses = [
    {
      id: 1,
      title: "Video Title",
      description: "Description",
      price: 559,
      duration: "5 hours",
      rating: 4.7,
      updatedDate: "Updated Aug 28, 2023"
    },
    {
      id: 2,
      title: "Video Title",
      description: "Description",
      price: 559,
      duration: "5 hours",
      rating: 4.7,
      updatedDate: "Updated Aug 28, 2023"
    },
    {
      id: 3,
      title: "Video Title",
      description: "Description",
      price: 559,
      duration: "5 hours",
      rating: 4.7,
      updatedDate: "Updated Aug 28, 2023"
    }
  ];

  const relatedTopics = [
    "Chatgpt",
    "Office Productivity",
    "Other Productivity"
  ];

  const reviews = [
    {
      id: 1,
      name: "Name",
      rating: 4.0,
      content: "Customer Review Blah Blah Blah Blah Blah Blah Blah BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
    },
    {
      id: 2,
      name: "Name",
      rating: 4.0,
      content: "Customer Review Blah Blah Blah Blah Blah Blah Blah BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
    },
    {
      id: 3,
      name: "Name",
      rating: 4.0,
      content: "Customer Review Blah Blah Blah Blah Blah Blah Blah BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-bold mb-6">Frequently Purchased Course Bundles</h2>
          
          <div className="space-y-4">
            {bundleCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                    <img src="/placeholder.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>{course.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{course.rating} ⭐</span>
                        </div>
                      </div>
                      <button className="text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-bold">₹{course.price}</span>
                        <span className="text-yellow-500 ml-2">Premium</span>
                      </div>
                      <div className="text-xs text-gray-500">{course.updatedDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-bold">
              Total: ₹1,767 (₹2,273)
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-xl font-bold mb-6">Most Learners Bought Courses</h2>
          
          <div className="space-y-4">
            {bundleCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm">{course.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">{course.updatedDate}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-bold">₹{course.price}</span>
                      <span className="ml-2 text-yellow-500 text-xs">Premium</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button className="w-full border border-blue-600 text-blue-600 py-2 rounded">
              View All Courses
            </button>
          </div>

          {/* Ratings Section */}
          <div className="mt-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">4.3 Rating</h2>
                <div className="flex text-yellow-400">★★★★★</div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">5.3k Ratings</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">{review.name}</div>
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400 text-sm">★★★★</div>
                        <span className="text-sm text-gray-600">{review.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{review.content}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Is this review helpful?</span>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-gray-600">👍</button>
                      <button className="text-gray-400 hover:text-gray-600">👎</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button className="text-blue-600 px-4 py-2 text-sm font-medium">
                See More Reviews
              </button>
            </div>
          </div>

          {/* Related Topics */}
          <div className="mt-8">
            <h3 className="font-bold mb-4">Explore Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTopics.map((topic, index) => (
                <button key={index} className="bg-white px-4 py-2 rounded-full text-sm">
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBought;
