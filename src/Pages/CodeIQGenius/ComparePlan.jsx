import React from 'react'

import { FaUsers, FaPhone } from "react-icons/fa";
import Header from '../../Components/Header'
import Section2 from './sharedComponentCodeIqBussiness/Section2'
import Section3 from './sharedComponentCodeIqBussiness/Section3'

import { Link } from 'react-router-dom'

const ComparePlan = () => {
    return (
        <div className='h-[321.4375rem] w-full bg-[#fff]'>

            <div>
                <Header />
            </div>

            {/* section 1 */}

            <div className=' flex items-center justify-center flex-col gap-[1.88rem]'>

                <div>
                    <h1 className='text-[1.5rem] font-semibold text-center'>Scalable learning for organizations of every size</h1>
                </div>

                <div className='flex w-[72rem] items-center justify-center bg gap-[1.875rem]'>


                    {/* column  1  */}

                    {/* Personal Plan */}
                    <div
                        className="bg-[#fff] text-white rounded-2xl shadow-lg py-[3.625rem] px-[0.8125rem] relative w-[22.75rem] h-[51.625rem] "
                    >
                        <div className=" w-[21.0625rem] flex flex-col gap-[1.25rem] ">
                            {/* Best Plan Badge */}

                            <div className="absolute top-4 right-4 rounded-[0.625rem]  border-[0.5px] border-[rgba(30,30,30,0.07)] bg-[linear-gradient(90deg,#F9EEDE_0%,#F9A21E_100%)] text-black px-3 py-1  flex items-center gap-2 text-sm font-medium">
                                {/* <Shield size={16} /> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <path
                                        d="M12 2.2959L4 5.2959V11.3859C4 16.4359 7.41 21.1459 12 22.2959C16.59 21.1459 20 16.4359 20 11.3859V5.2959L12 2.2959ZM10.94 15.8359L7.4 12.2959L8.81 10.8859L10.93 13.0059L15.17 8.7659L16.58 10.1759L10.94 15.8359Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>
                                <span className="text-[0.75rem] font-poppins">Best For Team</span>
                            </div>

                            <div className="flex flex-col items-flex-start w-[20.54163rem] ">
                                <div className="flex flex-col justify-flex-start py-1">

                                    <div className=' flex flex-col items-center justify-center gap-[1.25rem]'>

                                        <div className='flex flex-col items-center justify-center gap-[0.31rem] '>
                                            <h4 className="text-2xl font-medium  text-black text-[1.562rem]">
                                                Team Plan
                                            </h4>
                                            <h4 className="text-gray-3800 text-[0.75rem] font-light ">
                                                For your whole organization
                                            </h4>

                                            <div className='flex items-center gap-[0.625rem] justify-center '>
                                                <span className='w-6 h-[1.2rem] aspect-[24/19.2] '>

                                                    <svg className='w-6 h-[1.2rem] aspect-[24/19.2] text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                        <path d="M12 1C13.0343 1 14.0263 1.41089 14.7577 2.14228C15.4891 2.87368 15.9 3.86566 15.9 4.9C15.9 5.93434 15.4891 6.92632 14.7577 7.65772C14.0263 8.38911 13.0343 8.8 12 8.8C10.9657 8.8 9.97368 8.38911 9.24228 7.65772C8.51089 6.92632 8.1 5.93434 8.1 4.9C8.1 3.86566 8.51089 2.87368 9.24228 2.14228C9.97368 1.41089 10.9657 1 12 1ZM3.6 3.7C3.95457 3.7 4.30567 3.76984 4.63325 3.90553C4.96082 4.04121 5.25847 4.24009 5.50919 4.49081C5.75991 4.74153 5.95879 5.03918 6.09448 5.36675C6.23016 5.69433 6.3 6.04543 6.3 6.4C6.3 6.75457 6.23016 7.10567 6.09448 7.43324C5.95879 7.76082 5.75991 8.05847 5.50919 8.30919C5.25847 8.55991 4.96082 8.75879 4.63325 8.89447C4.30567 9.03016 3.95457 9.1 3.6 9.1C3.24543 9.1 2.89433 9.03016 2.56675 8.89447C2.23918 8.75879 1.94153 8.55991 1.69081 8.30919C1.44009 8.05847 1.24121 7.76082 1.10553 7.43324C0.969838 7.10567 0.9 6.75457 0.9 6.4C0.9 6.04543 0.969838 5.69433 1.10553 5.36675C1.24121 5.03918 1.44009 4.74153 1.69081 4.49081C1.94153 4.24009 2.23918 4.04121 2.56675 3.90553C2.89433 3.76984 3.24543 3.7 3.6 3.7ZM0 16C0 13.3487 2.14875 11.2 4.8 11.2C5.28 11.2 5.745 11.2712 6.18375 11.4025C4.95 12.7825 4.2 14.605 4.2 16.6V17.2C4.2 17.6275 4.29 18.0325 4.45125 18.4H1.2C0.53625 18.4 0 17.8637 0 17.2V16ZM19.5487 18.4C19.71 18.0325 19.8 17.6275 19.8 17.2V16.6C19.8 14.605 19.05 12.7825 17.8163 11.4025C18.255 11.2712 18.72 11.2 19.2 11.2C21.8513 11.2 24 13.3487 24 16V17.2C24 17.8637 23.4638 18.4 22.8 18.4H19.5487ZM17.7 6.4C17.7 5.68392 17.9845 4.99716 18.4908 4.49081C18.9972 3.98446 19.6839 3.7 20.4 3.7C21.1161 3.7 21.8028 3.98446 22.3092 4.49081C22.8155 4.99716 23.1 5.68392 23.1 6.4C23.1 7.11608 22.8155 7.80284 22.3092 8.30919C21.8028 8.81554 21.1161 9.1 20.4 9.1C19.6839 9.1 18.9972 8.81554 18.4908 8.30919C17.9845 7.80284 17.7 7.11608 17.7 6.4ZM6 16.6C6 13.285 8.685 10.6 12 10.6C15.315 10.6 18 13.285 18 16.6V17.2C18 17.8637 17.4638 18.4 16.8 18.4H7.2C6.53625 18.4 6 17.8637 6 17.2V16.6Z" fill="black" />
                                                    </svg>
                                                </span>
                                                <h4 className='text-[0.875rem] font-normal text-gray-800'>20+ People</h4>

                                            </div>

                                        </div>

                                        <h4 className="text-lg text-white font-semibold">

                                            <span className="text-[#0C316E] font-bold text-[1rem]">
                                                ₹24,000.00 per license per year
                                            </span>

                                        </h4>
                                    </div>
                                </div>
                                {/* Features */}
                                <ul className="mt-6 space-y-3 text-sm  w-[20.675rem]">
                                    <li className="flex items-center gap-2 text-black ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                            <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                        </svg>

                                        <h4 className="text-[0.75rem] font-normal text-black">
                                            {" "}
                                            Access to 13,000+ top courses
                                        </h4>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                            <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                        </svg>
                                        <h4 className="text-[0.75rem] font-normal text-black">
                                            Certification prep for 200+ exams
                                        </h4>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                            <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                        </svg>
                                        <h4 className="text-[0.75rem] font-normal text-black">
                                            Practice tests and AI-powered coding exercises
                                        </h4>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                            <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                        </svg>
                                        <h4 className="text-[0.75rem] font-normal text-black">
                                            Goal-focused recommendations
                                        </h4>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                            <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                            <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                        </svg>
                                        <h4 className="text-[0.75rem] font-normal text-black">
                                            Analytics and adoption reports
                                        </h4>
                                    </li>
                                </ul>
                            </div>
                            {/* CTA Button */}
                            <div className='flex items-center justify-between  flex-col'>



                                <span className="flex w-[18.125rem] h-12 px-[4.375rem] py-[0.5625rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem] bg-[#0C316E] text-white">

                                    <svg className='w-[1.5rem] h-[1.5rem] aspect-square flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M15 2V11L22.5 6.5L15 2Z" fill="white" />
                                        <path d="M21 11V17H3V5H10.5V3.5H3C2.60218 3.5 2.22064 3.65804 1.93934 3.93934C1.65804 4.22064 1.5 4.60218 1.5 5V17C1.5 17.3978 1.65804 17.7794 1.93934 18.0607C2.22064 18.342 2.60218 18.5 3 18.5H9V21.5H6V23H18V21.5H15V18.5H21C21.3978 18.5 21.7794 18.342 22.0607 18.0607C22.342 17.7794 22.5 17.3978 22.5 17V11H21ZM13.5 21.5H10.5V18.5H13.5V21.5Z" fill="white" />
                                    </svg>

                                    <Link
                                        to="/requestdemo"
                                        className="text-white"
                                    >
                                        <h4 className="text-[0.75rem] font-normal text-white"> Request a Demo</h4>
                                    </Link>


                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2 column */}

                    {/* Personal Plan */}
                    <div
                        className="bg-[#0C316E] text-white rounded-2xl shadow-lg py-[3.625rem] px-[0.8125rem] relative w-[22.75rem] h-[51.625rem] "
                    >


                        <div className=" w-[21.0625rem] flex flex-col gap-[1.25rem] ">
                            {/* Best Plan Badge */}

                            <div className="absolute top-4 right-4 rounded-[0.625rem]  border-[0.5px] border-[rgba(30,30,30,0.07)] bg-[linear-gradient(90deg,#F9EEDE_0%,#F9A21E_100%)] text-black px-3 py-1  flex items-center gap-2 text-sm font-medium">
                                {/* <Shield size={16} /> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <path
                                        d="M12 2.2959L4 5.2959V11.3859C4 16.4359 7.41 21.1459 12 22.2959C16.59 21.1459 20 16.4359 20 11.3859V5.2959L12 2.2959ZM10.94 15.8359L7.4 12.2959L8.81 10.8859L10.93 13.0059L15.17 8.7659L16.58 10.1759L10.94 15.8359Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>
                                <span className="text-[0.75rem] font-poppins">Best Plan</span>
                            </div>

                            <div className="flex flex-col items-flex-start w-[20.54163rem] ">
                                <div className="flex flex-col justify-flex-start py-1">

                                    <div className=' flex flex-col items-center justify-center gap-[1.25rem]'>

                                        <div className='flex flex-col items-center justify-center gap-[0.31rem] '>
                                            <h4 className="text-2xl font-medium  text-white text-[1.562rem]">
                                                Enterprise Plan
                                            </h4>
                                            <h4 className="text-gray-300 text-[0.75rem] font-light ">
                                                For your whole organization
                                            </h4>

                                            <div className='flex items-center gap-[0.625rem] justify-center '>
                                                <span className='w-6 h-[1.2rem] aspect-[24/19.2]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                                                        <path d="M12 1C13.0343 1 14.0263 1.41089 14.7577 2.14228C15.4891 2.87368 15.9 3.86566 15.9 4.9C15.9 5.93434 15.4891 6.92632 14.7577 7.65772C14.0263 8.38911 13.0343 8.8 12 8.8C10.9657 8.8 9.97368 8.38911 9.24228 7.65772C8.51089 6.92632 8.1 5.93434 8.1 4.9C8.1 3.86566 8.51089 2.87368 9.24228 2.14228C9.97368 1.41089 10.9657 1 12 1ZM3.6 3.7C3.95457 3.7 4.30567 3.76984 4.63325 3.90553C4.96082 4.04121 5.25847 4.24009 5.50919 4.49081C5.75991 4.74153 5.95879 5.03918 6.09448 5.36675C6.23016 5.69433 6.3 6.04543 6.3 6.4C6.3 6.75457 6.23016 7.10567 6.09448 7.43324C5.95879 7.76082 5.75991 8.05847 5.50919 8.30919C5.25847 8.55991 4.96082 8.75879 4.63325 8.89447C4.30567 9.03016 3.95457 9.1 3.6 9.1C3.24543 9.1 2.89433 9.03016 2.56675 8.89447C2.23918 8.75879 1.94153 8.55991 1.69081 8.30919C1.44009 8.05847 1.24121 7.76082 1.10553 7.43324C0.969838 7.10567 0.9 6.75457 0.9 6.4C0.9 6.04543 0.969838 5.69433 1.10553 5.36675C1.24121 5.03918 1.44009 4.74153 1.69081 4.49081C1.94153 4.24009 2.23918 4.04121 2.56675 3.90553C2.89433 3.76984 3.24543 3.7 3.6 3.7ZM0 16C0 13.3487 2.14875 11.2 4.8 11.2C5.28 11.2 5.745 11.2712 6.18375 11.4025C4.95 12.7825 4.2 14.605 4.2 16.6V17.2C4.2 17.6275 4.29 18.0325 4.45125 18.4H1.2C0.53625 18.4 0 17.8637 0 17.2V16ZM19.5487 18.4C19.71 18.0325 19.8 17.6275 19.8 17.2V16.6C19.8 14.605 19.05 12.7825 17.8163 11.4025C18.255 11.2712 18.72 11.2 19.2 11.2C21.8513 11.2 24 13.3487 24 16V17.2C24 17.8637 23.4638 18.4 22.8 18.4H19.5487ZM17.7 6.4C17.7 5.68392 17.9845 4.99716 18.4908 4.49081C18.9972 3.98446 19.6839 3.7 20.4 3.7C21.1161 3.7 21.8028 3.98446 22.3092 4.49081C22.8155 4.99716 23.1 5.68392 23.1 6.4C23.1 7.11608 22.8155 7.80284 22.3092 8.30919C21.8028 8.81554 21.1161 9.1 20.4 9.1C19.6839 9.1 18.9972 8.81554 18.4908 8.30919C17.9845 7.80284 17.7 7.11608 17.7 6.4ZM6 16.6C6 13.285 8.685 10.6 12 10.6C15.315 10.6 18 13.285 18 16.6V17.2C18 17.8637 17.4638 18.4 16.8 18.4H7.2C6.53625 18.4 6 17.8637 6 17.2V16.6Z" fill="white" />
                                                    </svg>
                                                </span>
                                                <h4 className='text-[0.875rem] font-normal text-gray-300'>20+ People</h4>

                                            </div>

                                        </div>

                                        <h4 className="text-lg text-white font-semibold">

                                            <span className="text-[#F9A21E] font-bold text-2xl">
                                                Contact sales for pricing
                                            </span>

                                        </h4>
                                    </div>
                                </div>

                                <div className=' flex flex-col gap-[2.5rem] '>
                                    {/* Features */}
                                    <ul className="flex flex-col gap-[1.25rem] text-sm  w-[20.675rem]">
                                        <li className="flex items-center gap-2 ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>

                                            <h4 className="text-[0.75rem] font-normal text-white">
                                                {" "}
                                                Access to 30,000+ top courses
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-[#fff]">
                                                Certification prep for 200+ exams
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-[#fff]">
                                                Goal-focused recommendations and customizable content
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-white">
                                                Advanced analytics and insights
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-white">
                                                Multi-Language course collection
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-white">
                                                Dedicated customer success team
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-white">
                                                Assessments, workspaces, labs, and pre-built learning paths with add-on
                                            </h4>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <line
                                                    x1="1.21797"
                                                    y1="10.3875"
                                                    x2="6.41877"
                                                    y2="15.4923"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                                <line
                                                    x1="4.29766"
                                                    y1="15.5118"
                                                    x2="14.7626"
                                                    y2="4.84997"
                                                    stroke="#F9A21E"
                                                    stroke-width="3"
                                                />
                                            </svg>{" "}
                                            <h4 className="text-[0.75rem] font-normal text-white">
                                                GenAI features for learners and organizations
                                            </h4>
                                        </li>

                                    </ul>
                                    {/* CTA Button */}
                                    <button >

                                        <Link to='/'>
                                            <span className="flex w-[18.125rem] h-12 px-[4.375rem] py-[0.5625rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem] bg-[#F9A21E] text-black cursor-pointer">Request a Demo</span>
                                        </Link>
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* column 3 */}
                    <div
                        className="bg-[#fff] text-white rounded-2xl shadow-lg py-[3.625rem] px-[0.8125rem] relative w-[22.75rem] h-[51.625rem] "
                    >
                        <div className=" w-[21.0625rem] flex flex-col gap-[1.25rem] ">
                            {/* Best Plan Badge */}

                            <div className="absolute top-4 right-4 rounded-[0.625rem]  border-[0.5px] border-[rgba(30,30,30,0.07)] bg-[linear-gradient(90deg,#F9EEDE_0%,#F9A21E_100%)] text-black px-3 py-1  flex items-center gap-2 text-sm font-medium">
                                {/* <Shield size={16} /> */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <path
                                        d="M12 2.2959L4 5.2959V11.3859C4 16.4359 7.41 21.1459 12 22.2959C16.59 21.1459 20 16.4359 20 11.3859V5.2959L12 2.2959ZM10.94 15.8359L7.4 12.2959L8.81 10.8859L10.93 13.0059L15.17 8.7659L16.58 10.1759L10.94 15.8359Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>
                                <span className="text-[0.75rem] font-poppins"> AI Best Plan </span>
                            </div>

                            <div className="flex flex-col items-flex-start w-[20.54163rem] ">
                                <div className="flex flex-col justify-flex-start py-1">

                                    <div className=' flex flex-col items-center justify-center gap-[1.25rem]'>

                                        <div className='flex flex-col items-center justify-center gap-[0.31rem] '>
                                            <h4 className="text-2xl font-medium  text-black text-[1.562rem]">
                                                AI Fluency
                                            </h4>
                                            <h4 className="text-gray-3800 text-[0.75rem] font-light ">
                                                From AI foundations to Enterprise transformation
                                            </h4>



                                        </div>


                                    </div>
                                </div>
                                {/* Features */}
                                <ul className="mt-6 space-y-3 text-sm  w-[20.675rem]">


                                    <h4 className="text-[0.75rem] text-black font-semibold">


                                        AI Readiness Collection


                                    </h4>
                                    <div >
                                        <li className="flex  gap-[0.80rem] text-black w-[18rem] ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 17" fill="none">
                                                <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                                <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                            </svg>

                                            <h4 className="text-[0.75rem] font-normal text-black w-[18.875rem]">
                                                {" "}
                                                Build org-wide AI fluency fast with 50 curated courses + AI Assistant to accelerate learning.
                                            </h4>
                                        </li>
                                    </div>


                                    <div className='flex flex-col justify-start  gap-[1.12rem]'>
                                        <h4 className="text-[0.75rem] text-black font-semibold">


                                            AI Growth Collection


                                        </h4>

                                        <li className="flex justify-start gap-[0.80rem]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 17" fill="none">
                                                <line x1="1.21784" y1="10.0916" x2="6.41865" y2="15.1964" stroke="#0C316E" stroke-width="3" />
                                                <line x1="4.29742" y1="15.2149" x2="14.7623" y2="4.55309" stroke="#0C316E" stroke-width="3" />
                                            </svg>
                                            <h4 className="text-[0.75rem] font-normal text-black w-[18.875rem]">
                                                Scale AI and technical expertise with 800+ specialized courses and 30+ role-specific learning paths in multiple languages.
                                            </h4>
                                        </li>
                                    </div>


                                </ul>
                            </div>
                            {/* CTA Button */}
                            <div className='flex items-center justify-between  flex-col'>



                                <span className="flex w-[18.125rem] h-12 px-[4.375rem] py-[0.5625rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem] bg-[#0C316E] text-white">


                                    <svg className='w-[1.5rem] h-[1.5rem] aspect-square flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M20.45 21.5C18.3667 21.5 16.3083 21.046 14.275 20.138C12.2417 19.23 10.3917 17.9423 8.725 16.275C7.05833 14.6077 5.771 12.7577 4.863 10.725C3.955 8.69233 3.50067 6.634 3.5 4.55C3.5 4.25 3.6 4 3.8 3.8C4 3.6 4.25 3.5 4.55 3.5H8.6C8.83333 3.5 9.04167 3.57933 9.225 3.738C9.40833 3.89667 9.51667 4.084 9.55 4.3L10.2 7.8C10.2333 8.06667 10.225 8.29167 10.175 8.475C10.125 8.65833 10.0333 8.81667 9.9 8.95L7.475 11.4C7.80833 12.0167 8.204 12.6123 8.662 13.187C9.12 13.7617 9.62433 14.316 10.175 14.85C10.6917 15.3667 11.2333 15.846 11.8 16.288C12.3667 16.73 12.9667 17.134 13.6 17.5L15.95 15.15C16.1 15 16.296 14.8877 16.538 14.813C16.78 14.7383 17.0173 14.7173 17.25 14.75L20.7 15.45C20.9333 15.5167 21.125 15.6377 21.275 15.813C21.425 15.9883 21.5 16.184 21.5 16.4V20.45C21.5 20.75 21.4 21 21.2 21.2C21 21.4 20.75 21.5 20.45 21.5Z" fill="white" />
                                    </svg>

                                    <Link to='/aicontact'> <h4 className="text-[0.75rem] font-normal text-white cursor-pointer"> Contact us</h4></Link>



                                </span>
                            </div>
                        </div>
                    </div>





                </div>

                <div className="flex  w-[32.71875rem] h-[11.20313rem] p-[1.92188rem_5.25rem] 
           justify-center items-center gap-[1rem] 
            rounded-[9.60938rem] border-[0.75px] border-[#F9A21E] bg-[#0C316E]">
                    {/* Left Icon */}
                    <div className="text-6xl">
                        <span className="flex items-center justify-center">
                            <svg className='w-[6.84375rem] h-[6.84375rem] aspect-square' xmlns="http://www.w3.org/2000/svg" width="110" height="111" viewBox="0 0 110 111" fill="none">
                                <g clip-path="url(#clip0_2683_8179)">
                                    <path d="M62.6992 51.4546C64.0537 51.9893 65.3726 52.5774 66.6558 53.219C67.939 53.8606 69.1865 54.5913 70.3984 55.4111C69.6143 56.2666 68.9014 57.1577 68.2598 58.0845C67.6182 59.0112 67.03 60.0093 66.4954 61.0786C63.7507 59.2964 60.8279 57.9419 57.7268 57.0151C54.6257 56.0884 51.4355 55.625 48.1562 55.625C45.0195 55.625 41.9897 56.0349 39.0669 56.8547C36.144 57.6746 33.4172 58.8152 30.8865 60.2766C28.3557 61.738 26.0566 63.5203 23.9893 65.6233C21.9219 67.7263 20.1396 70.0432 18.6426 72.574C17.1455 75.1047 15.9871 77.8315 15.1672 80.7544C14.3474 83.6772 13.9375 86.707 13.9375 89.8438H7.09375C7.09375 85.5664 7.71753 81.4495 8.96509 77.4929C10.2126 73.5364 12.0127 69.8828 14.3652 66.5322C16.7178 63.1816 19.498 60.2053 22.7061 57.6033C25.9141 55.0012 29.5498 52.9517 33.6133 51.4546C29.5854 48.8169 26.4487 45.502 24.2031 41.5098C21.9575 37.5176 20.8169 33.0977 20.7812 28.25C20.7812 24.4717 21.4941 20.925 22.9199 17.6101C24.3457 14.2952 26.2883 11.3901 28.7478 8.89502C31.2073 6.3999 34.1123 4.43945 37.4629 3.01367C40.8135 1.58789 44.3779 0.875 48.1562 0.875C51.9346 0.875 55.4812 1.58789 58.7961 3.01367C62.1111 4.43945 65.0161 6.38208 67.5112 8.84155C70.0063 11.301 71.9668 14.2061 73.3926 17.5566C74.8184 20.9072 75.5312 24.4717 75.5312 28.25C75.5312 30.6025 75.2461 32.9016 74.6758 35.1472C74.1055 37.3928 73.25 39.5137 72.1094 41.5098C70.9688 43.5059 69.6321 45.3416 68.0994 47.0168C66.5667 48.6921 64.7666 50.1714 62.6992 51.4546ZM27.625 28.25C27.625 31.1016 28.1597 33.7571 29.229 36.2166C30.2983 38.676 31.7598 40.8503 33.6133 42.7395C35.4668 44.6287 37.6411 46.1079 40.1362 47.1772C42.6313 48.2466 45.3047 48.7812 48.1562 48.7812C50.9722 48.7812 53.6277 48.2466 56.1228 47.1772C58.6179 46.1079 60.7922 44.6465 62.6458 42.793C64.4993 40.9395 65.9785 38.7651 67.0835 36.27C68.1885 33.7749 68.7231 31.1016 68.6875 28.25C68.6875 25.4341 68.1528 22.7786 67.0835 20.2834C66.0142 17.7883 64.5527 15.614 62.6992 13.7605C60.8457 11.907 58.6536 10.4277 56.1228 9.32275C53.592 8.21777 50.9365 7.68311 48.1562 7.71875C45.3047 7.71875 42.6492 8.25342 40.1897 9.32275C37.7302 10.3921 35.5559 11.8535 33.6667 13.707C31.7776 15.5605 30.2983 17.7527 29.229 20.2834C28.1597 22.8142 27.625 25.4697 27.625 28.25ZM106.328 72.7344C106.328 74.5879 106.043 76.3879 105.473 78.1345C104.902 79.8811 104.047 81.5029 102.906 83V110.375L89.2188 103.531L75.5312 110.375V83C74.4263 81.5029 73.5886 79.8811 73.0183 78.1345C72.448 76.3879 72.145 74.5879 72.1094 72.7344C72.1094 70.3818 72.5549 68.1719 73.446 66.1045C74.3372 64.0371 75.5491 62.2371 77.0818 60.7043C78.6145 59.1716 80.4324 57.9419 82.5354 57.0151C84.6384 56.0884 86.8662 55.625 89.2188 55.625C91.5713 55.625 93.7812 56.0706 95.8486 56.9617C97.916 57.8528 99.7161 59.0825 101.249 60.6509C102.781 62.2192 104.011 64.0371 104.938 66.1045C105.865 68.1719 106.328 70.3818 106.328 72.7344ZM89.2188 62.4688C87.793 62.4688 86.4563 62.7361 85.2087 63.2708C83.9612 63.8054 82.874 64.5361 81.9473 65.4629C81.0205 66.3896 80.2898 67.4768 79.7551 68.7244C79.2205 69.9719 78.9531 71.3086 78.9531 72.7344C78.9531 74.1602 79.2205 75.4968 79.7551 76.7444C80.2898 77.9919 81.0205 79.0791 81.9473 80.0059C82.874 80.9326 83.9612 81.6633 85.2087 82.198C86.4563 82.7327 87.793 83 89.2188 83C90.6445 83 91.9812 82.7327 93.2288 82.198C94.4763 81.6633 95.5635 80.9326 96.4902 80.0059C97.417 79.0791 98.1477 77.9919 98.6824 76.7444C99.217 75.4968 99.4844 74.1602 99.4844 72.7344C99.4844 71.3086 99.217 69.9719 98.6824 68.7244C98.1477 67.4768 97.417 66.3896 96.4902 65.4629C95.5635 64.5361 94.4763 63.8054 93.2288 63.2708C91.9812 62.7361 90.6445 62.4688 89.2188 62.4688ZM96.0625 99.3074V88.4001C93.9238 89.3625 91.6426 89.8438 89.2188 89.8438C86.7949 89.8438 84.5137 89.3625 82.375 88.4001V99.3074C83.5156 98.7371 84.6562 98.1846 85.7969 97.6499C86.9375 97.1152 88.0781 96.5271 89.2188 95.8855C90.3594 96.4915 91.5 97.0618 92.6406 97.5964C93.7812 98.1311 94.9219 98.7014 96.0625 99.3074Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2683_8179">
                                        <rect width="109.5" height="109.5" fill="white" transform="translate(0.25 0.875)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </div>

                    {/*Right Content */}
                    <div className='flex flex-col   gap-[0.3rem]'>
                        <div className="flex flex-col ">
                            <h4 className="text-[1.125rem] font-normal text-white text-center">Leadership Academy</h4>
                            <h4 className="text-[0.65rem] text-gray-200 w-[13.9rem]  text-nowrap">
                                Cohort learning that drives transformation
                            </h4>
                            <div className="flex items-center justify-center gap-2 text-[0.65rem] mt-2">
                                <FaUsers className="text-white" />
                                <span className='  text-white text-[0.65rem]'>Group of 25+</span>
                            </div>
                        </div>

                        {/* Button */}
                        <span className="bg-[#F4A51C] text-[0.75rem] text-black font-medium px-[3.28125rem] py-[0.42188rem] rounded-lg flex items-center gap-2 h-[2.25rem] transition-all">
                            <svg className='w-[1.125rem] h-[1.125rem] aspect-square' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M15.0875 16.125C13.525 16.125 11.9812 15.7845 10.4562 15.1035C8.93125 14.4225 7.54375 13.4567 6.29375 12.2062C5.04375 10.9557 4.07825 9.56825 3.39725 8.04375C2.71625 6.51925 2.3755 4.9755 2.375 3.4125C2.375 3.1875 2.45 3 2.6 2.85C2.75 2.7 2.9375 2.625 3.1625 2.625H6.2C6.375 2.625 6.53125 2.6845 6.66875 2.8035C6.80625 2.9225 6.8875 3.063 6.9125 3.225L7.4 5.85C7.425 6.05 7.41875 6.21875 7.38125 6.35625C7.34375 6.49375 7.275 6.6125 7.175 6.7125L5.35625 8.55C5.60625 9.0125 5.903 9.45925 6.2465 9.89025C6.59 10.3213 6.96825 10.737 7.38125 11.1375C7.76875 11.525 8.175 11.8845 8.6 12.216C9.025 12.5475 9.475 12.8505 9.95 13.125L11.7125 11.3625C11.825 11.25 11.972 11.1657 12.1535 11.1097C12.335 11.0538 12.513 11.038 12.6875 11.0625L15.275 11.5875C15.45 11.6375 15.5938 11.7282 15.7062 11.8597C15.8187 11.9913 15.875 12.138 15.875 12.3V15.3375C15.875 15.5625 15.8 15.75 15.65 15.9C15.5 16.05 15.3125 16.125 15.0875 16.125Z" fill="black" />
                            </svg>
                            Contact Us
                        </span>
                    </div>
                </div>
            </div>

            {/* section 2 */}

            <Section2/>

            {/* section 3 */}
            <Section3/>



        </div>
    )
}

export default ComparePlan