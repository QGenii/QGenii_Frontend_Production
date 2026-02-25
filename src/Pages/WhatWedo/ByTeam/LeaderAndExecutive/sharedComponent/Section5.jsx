import React from "react";
import Vector from "../../../../../assets/assets/OnDemandLearning/BusinessSkill/Vector.svg";
import Star from "../../../../../assets/assets/OnDemandLearning/BusinessSkill/Star.svg";

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "The Complete Full-Stack Web Development Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 5000,
      duration: "28 Hrs",
      lectures: 42,
    },

    {
      id: 2,
      title: "The Complete Full-Stack Web Development Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 5000,
      duration: "28 Hrs",
      lectures: 42,
    },
    {
      id: 3,
      title: "The Complete Full-Stack Web Development Bootcamp",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      rating: 4.7,
      reviews: 5000,
      duration: "28 Hrs",
      lectures: 42,
    },
  ];
  return (
    <div className="mt-[3rem] bg-gray-50 text-center">
      <div className="flex flex-col justify-center items-center w-[69.375rem]  mx-auto gap-[1.875rem]">
       
        <h2 className="text-[1.875rem]  font-semibold text-center ">
Empower with learning        </h2>

        {/* Course Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 ">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex w-[20.1875rem] p-[0.5625rem_0.5075rem] flex-col justify-center items-start gap-[0.46138rem] rounded-[0.46138rem] border-[0.738px] border-[#8686A1] bg-white shadow-[-0.738px_2.953px_8.858px_0_rgba(12,49,110,0.10)] "
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gray-200 mb-4 rounded-md"></div>
              <div className="flex flex-col items-start justify-start gap-[0.55363rem]">
                {/* Title */}
                <h4 className="text-start text-[0.713rem] font-medium mb-1 ">
                  {course.title}
                </h4>

                {/* Instructor */}
                <div className="bg-[#ECEEF6] text-start flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M7.56348 6.09961C8.84549 6.09961 9.88477 5.06034 9.88477 3.77832C9.88477 2.49631 8.84549 1.45703 7.56348 1.45703C6.28147 1.45703 5.24219 2.49631 5.24219 3.77832C5.24219 5.06034 6.28147 6.09961 7.56348 6.09961Z"
                      fill="#1E1E1E"
                    />
                    <path
                      d="M12.207 10.4533C12.207 11.8954 12.207 13.0647 7.56446 13.0647C2.92188 13.0647 2.92188 11.8954 2.92188 10.4533C2.92188 9.01115 5.00059 7.8418 7.56446 7.8418C10.1283 7.8418 12.207 9.01115 12.207 10.4533Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                  <p className="text-sm text-gray-600  ">{course.instructor}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center text-sm ">
                  <span className=" mr-1 flex items-center justify-center">
                    <img src={Vector} alt="" />
                    <img src={Vector} alt="" />
                    <img src={Vector} alt="" />
                    <img src={Vector} alt="" />
                    <img src={Star} alt="" />
                  </span>
                  <span className="text-[0.5536rem] font-poppins font-normal">
                    {course.rating} ({course.reviews})
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="bg-[#C5E2F6] px-[0.41525rem] py-[0.125rem] rounded-2  flex justify-center items-center gap-[0.35156rem] rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M8.76562 15.4297C4.90563 15.4297 1.76562 12.2897 1.76562 8.42969C1.76562 4.56969 4.90563 1.42969 8.76562 1.42969C12.6256 1.42969 15.7656 4.56969 15.7656 8.42969C15.7656 12.2897 12.6256 15.4297 8.76562 15.4297ZM8.76562 2.42969C5.45563 2.42969 2.76562 5.11969 2.76562 8.42969C2.76562 11.7397 5.45563 14.4297 8.76562 14.4297C12.0756 14.4297 14.7656 11.7397 14.7656 8.42969C14.7656 5.11969 12.0756 2.42969 8.76562 2.42969Z"
                        fill="#1E1E1E"
                      />
                      <path
                        d="M10.7656 10.9297C10.6756 10.9297 10.5856 10.9097 10.5056 10.8597L8.00563 9.35969C7.93192 9.31482 7.87108 9.25163 7.82903 9.17628C7.78697 9.10093 7.76513 9.01598 7.76563 8.92969V4.92969C7.76563 4.64969 7.98563 4.42969 8.26563 4.42969C8.54563 4.42969 8.76563 4.64969 8.76563 4.92969V8.64969L11.0256 9.99969C11.1187 10.0567 11.1907 10.1426 11.2306 10.2442C11.2705 10.3458 11.2762 10.4577 11.2468 10.5629C11.2174 10.668 11.1545 10.7607 11.0677 10.8269C10.9809 10.8931 10.8748 10.9292 10.7656 10.9297Z"
                        fill="#1E1E1E"
                      />
                    </svg>
                    <span className="text-[0.4168rem] ">{course.duration}</span>
                  </div>
                  <div className="bg-[#C5E2F6] px-[0.41525rem] py-[0.125rem] rounded-2  flex justify-center items-center gap-[0.35156rem] rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
  <g clip-path="url(#clip0_3347_10229)">
    <path d="M6.19401 3.09603C5.93137 3.09603 5.67129 3.14776 5.42864 3.24827C5.18599 3.34878 4.96551 3.4961 4.7798 3.68182C4.59408 3.86753 4.44676 4.08801 4.34625 4.33066C4.24574 4.57331 4.19401 4.83338 4.19401 5.09603C4.19401 5.35867 4.24574 5.61874 4.34625 5.8614C4.44676 6.10405 4.59408 6.32453 4.7798 6.51024C4.96551 6.69596 5.18599 6.84328 5.42864 6.94379C5.67129 7.0443 5.93137 7.09603 6.19401 7.09603C6.72444 7.09603 7.23315 6.88532 7.60822 6.51024C7.9833 6.13517 8.19401 5.62646 8.19401 5.09603C8.19401 4.5656 7.9833 4.05689 7.60822 3.68182C7.23315 3.30674 6.72444 3.09603 6.19401 3.09603ZM2.86068 5.09603C2.86068 4.21197 3.21187 3.36413 3.83699 2.73901C4.46211 2.11388 5.30996 1.7627 6.19401 1.7627C7.07807 1.7627 7.92591 2.11388 8.55103 2.73901C9.17615 3.36413 9.52734 4.21197 9.52734 5.09603C9.52734 5.98008 9.17615 6.82793 8.55103 7.45305C7.92591 8.07817 7.07807 8.42936 6.19401 8.42936C5.30996 8.42936 4.46211 8.07817 3.83699 7.45305C3.21187 6.82793 2.86068 5.98008 2.86068 5.09603ZM14.2427 4.1947L14.574 4.7727C14.9803 5.48025 15.194 6.28196 15.1938 7.09787C15.1935 7.91378 14.9794 8.71537 14.5727 9.4227L14.24 10.0007L13.0847 9.33603L13.4167 8.75803C13.7072 8.25284 13.8602 7.68031 13.8605 7.09754C13.8607 6.51477 13.7081 5.94211 13.418 5.4367L13.086 4.8587L14.2427 4.1947ZM12.2193 5.35603L12.5507 5.9347C12.7539 6.28837 12.8608 6.68914 12.8608 7.09703C12.8608 7.50492 12.7539 7.90568 12.5507 8.25936L12.2173 8.83736L11.062 8.1727L11.394 7.5947C11.4812 7.44307 11.527 7.27125 11.527 7.09636C11.527 6.92148 11.4812 6.74965 11.394 6.59803L11.0627 6.02003L12.2193 5.35603ZM0.527344 13.096C0.527344 12.212 0.878533 11.3641 1.50365 10.739C2.12878 10.1139 2.97662 9.7627 3.86068 9.7627H8.52734C9.4114 9.7627 10.2592 10.1139 10.8844 10.739C11.5095 11.3641 11.8607 12.212 11.8607 13.096V14.4294H10.5273V13.096C10.5273 12.5656 10.3166 12.0569 9.94156 11.6818C9.56649 11.3067 9.05778 11.096 8.52734 11.096H3.86068C3.33024 11.096 2.82154 11.3067 2.44646 11.6818C2.07139 12.0569 1.86068 12.5656 1.86068 13.096V14.4294H0.527344V13.096Z" fill="#1E1E1E"/>
  </g>
  <defs>
    <clipPath id="clip0_3347_10229">
      <rect width="16" height="16" fill="white" transform="translate(0.527344 0.429688)"/>
    </clipPath>
  </defs>
</svg>
                    <span className="text-[0.4168rem] ">{course.lectures} lectures</span>
                  </div>

                  
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Button */}
        <button className="bg-blue-700 text-white px-6  rounded-md  transition">
          View our course catalog
        </button>
      </div>
    </div>
  );
};

export default CoursesSection;
