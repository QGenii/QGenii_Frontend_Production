import React from 'react'
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Star from "../assets/assets/SmallTrainingTeam/Star.svg";
import Vector from "../assets/assets/SmallTrainingTeam/Star.svg";

const courses = [
    {
        id: 1,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"

    },

    {
        id: 2,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
    {
        id: 3,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
    {
        id: 4,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
    {
        id: 5,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
    {
        id: 6,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
    {
        id: 7,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
    {
        id: 8,
        title: "The Complete Full-Stack Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 5000,
        duration: "28 Hrs",
        student: "14990 student",
        discountPrice: "499",
        price: "2000"
    },
];
const InstructionDetails = () => {
    return (
        <div className='w-full h-[114rem] mt-[4rem]'>
            <div className=' flex flex-col items-center  gap-[1.25rem] rounded-[1.25rem] h-[56rem] bg-red-499 shadow-[-0.75px_0_9px_0_rgba(0,0,0,0.10)] w-[61.625rem] px-[2.5rem] pt-[0.6875rem] pb-[2.65656rem] mx-auto'>



                <div className=' '>
                    {/* Title */}
                    <h2 className="text-center text-xl font-semibold mb-8">Instructor</h2>





                    {/* section 1 */}
                    <div className="flex flex-col items-start  w-full ">
                        {/* Stats + Socials Row */}
                        <div className="flex flex-col  items-center justify-between w-full gap-4 mb-6">
                            {/* Stats Box */}
                            <div className="  flex items-center justify-between gap-[7.5rem] w-[56.56rem]">
                                <div className="flex  justify-center items-center h-[6.25rem] w-[20rem]  gap-[0.62rem]">
                                    <div className="w-[6.25rem] h-[6.25rem] rounded-full bg-gray-100 flex items-center justify-center text-gray-499 ">
                                        Image
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-lg text-[0.875rem]">Name of the Person</h4>
                                        <h4 className="text-sm text-black mb-2 text-[0.75rem]">His profession</h4>
                                        <h4 className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 text-nowrap rounded-full text-[0.625rem]">

                                            CodeQGenius Instructor Partner
                                        </h4>
                                    </div>
                                </div>
                                <div className='flex items-center gap-[0.5625rem] rounded-[0.625rem] bg-white shadow-[-0.75px_0_9px_0_rgba(0,0,0,0.10)] px-[1.125rem] py-[0.625rem]'>
                                    <div className="text-center  bg-red-499">
                                        <p className="text-lg font-semibold">522,021</p>
                                        <p className="text-[0.75rem] text-nowrap text-black">Total learners</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-lg font-semibold">65,116</p>
                                        <p className="text-xs text-black">Reviews</p>
                                    </div>
                                </div>

                                {/* Social Icons */}
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm w-[8.375rem] h-[6.25rem]">
                                    <a href="#" className="text-[#3E00FF] text-xl hover:opacity-80">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="text-[#3E00FF] text-xl hover:opacity-80">
                                        <FaLinkedin />
                                    </a>
                                    <a href="#" className="text-[#3E00FF] text-xl hover:opacity-80">
                                        <FaGlobe />
                                    </a>
                                </div>
                            </div>


                        </div>


                    </div>

                    {/* section2 */}
                    {/* Description */}
                    <div className="text-sm  flex flex-col items-start text-gray-700 space-y-4  w-[54.125rem]">
                        <p>
                            My name is Julian, and I am a full-time teacher and bestselling
                            instructor who is truly dedicated to helping students realize their
                            full potential. With the honor of teaching over 500,000 students from
                            130+ countries across the globe, I have honed my skills and become an
                            expert in my field.
                        </p>
                        <p>
                            My focus is on unlocking your potential to 10x your creativity and
                            productivity with AI tools and filmmaking techniques I've learned over
                            the years creating countless amounts of content for clients from many
                            industries.
                        </p>
                        <p>
                            Join me on this journey, and together let's unleash your creativity
                            and take your skills to the next level!
                        </p>
                    </div>

                    {/* section 3 */}


                    <div className="py-2 bg-gray-50 text-center">
                        <div className="flex flex-col  items-start  gap-[1.07rem] ">

                            <h4 className='text-[1rem] font-semibold'>All My 7 Courses</h4>

                            <div className="flex flex-wrap gap-[1.07rem] mb-10 ">
                                {courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex w-[13.345rem] h-[13.70rem] p-[0.5625rem_0.5075rem] flex-col justify-center items-start gap-[0.24138rem] rounded-[0.46138rem] border-[0.738px] border-[#8686A1] bg-white shadow-[-0.738px_2.953px_8.858px_0_rgba(12,49,110,0.10)] "
                                    >
                                         <div className=' w-full flex justify-end'>
                                             <div className='flex justify-end items-center gap-[0.305rem] rounded-[0.1525rem] w-[3.80144rem] h-[0.90906rem] px-[0.305rem] py-[0.41319rem] bg-[linear-gradient(319deg,#0C316E_48.28%,#0288E7_106.13%)]'><h4 className='text-white font-[Poppins] text-[0.366rem] font-normal leading-normal capitalize'> Premium course</h4></div>
                                         </div>

                                          
                                        <div className="w-full h-40 bg-gray-200 mb-4 rounded-md"></div>
                                        <div className="flex flex-col items-start justify-start gap-[0.24363rem] w-full">
                                            {/* Title */}
                                            <h4 className="text-start text-[0.488rem] font-medium mb-1 ">
                                                {course.title}
                                            </h4>

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
                                                <p className="text-[0.366rem] text-gray-600  ">{course.instructor}</p>
                                            </div>


                                            <div className="flex items-center text-sm ">
                                                <span className=" mr-1 flex items-center justify-center">
                                                    <img src={Vector} alt="" />
                                                    <img src={Vector} alt="" />
                                                    <img src={Vector} alt="" />
                                                    <img src={Vector} alt="" />
                                                    <img src={Star} alt="" />
                                                </span>
                                                <span className="text-[0.366rem] font-poppins font-normal">
                                                    {course.rating} ({course.reviews})
                                                </span>
                                            </div>


                                            <div className="flex flex-wrap gap-2 text-xs">

                                                <div className="bg-[#C5E2F6] px-[0.41525rem] py-[0.125rem] rounded-2  flex justify-center items-center gap-[0.35156rem] rounded-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path d="M0.574219 1.19558L2.85564 0.365967L5.13707 1.19558L4.10006 1.81778V2.43999C4.10006 2.43999 3.82338 2.23259 2.85564 2.23259C1.8879 2.23259 1.61123 2.43999 1.61123 2.43999V1.81778L0.574219 1.19558ZM0.574219 1.19558V2.85479" stroke="black" stroke-width="0.732025" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M4.09847 2.23231V2.60107C4.09847 3.3137 3.54139 3.89153 2.85406 3.89153C2.16673 3.89153 1.60965 3.3137 1.60965 2.60107V2.23231M5.8896 3.28176C5.8896 3.28176 6.09078 3.13534 6.7947 3.13534C7.49862 3.13534 7.6998 3.28135 7.6998 3.28135M5.8896 3.28176V2.85452L5.13548 2.43971L6.7947 1.8175L8.45392 2.43971L7.6998 2.85452V3.28135M5.8896 3.28176V3.40123C5.8896 3.64128 5.98496 3.87149 6.1547 4.04123C6.32444 4.21097 6.55465 4.30633 6.7947 4.30633C7.03475 4.30633 7.26497 4.21097 7.43471 4.04123C7.60445 3.87149 7.6998 3.64128 7.6998 3.40123V3.28135M6.17249 7.00256H7.70935C8.02999 7.00256 8.28468 6.84659 8.51365 6.62841C8.98238 6.18208 8.21292 5.82534 7.91965 5.65071C7.65884 5.49677 7.36924 5.39795 7.06873 5.36035C6.76822 5.32275 6.46319 5.34717 6.17249 5.43211M1.35454 5.31265C0.963382 5.53125 -0.0624293 5.97716 0.562266 6.53507C0.867562 6.8076 1.20729 7.00256 1.63495 7.00256H4.07317C4.50042 7.00256 4.84056 6.8076 5.14585 6.53507C5.77055 5.97716 4.74474 5.53125 4.35358 5.31265C3.43603 4.80036 2.27209 4.80036 1.35454 5.31265Z" stroke="black" stroke-width="0.732025" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className="text-[0.4168rem] ">{course.student} </span>
                                                </div>


                                            </div>

                                            <div className='flex 
                                             w-full gap-3 justify-end'>
                                                <h4 className="text-[0.49581rem] text-[#2800AE] font-semibold flex justify-center items-center"><FaIndianRupeeSign />{course.discountPrice} </h4>
                                                <h4 className="text-[0.49581rem] text-[#2800AE] line-through font-normal">{course.price} </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default InstructionDetails