import React from 'react'
import Header from '../../../Components/Header'
import { Link } from 'react-router-dom'
import { useState } from 'react';

import Logo from '../../../assets/assets/HowDoWeIt/CaseStudies/Logo.png';
import bgimg from '../../../assets/assets/HowDoWeIt/CaseStudies/bgImg.jpg';

const integrations = new Array(12).fill({
    name: "How Devoteam Rapidly Upskilled its Workforce in AI",
    category: "Case Study",
    button: "Read More"
});
const CaseStudies = () => {

    const [search, setSearch] = useState("");

    return (
        <div className='w-full h-[282rem] bg-[#fff]'>

            <Header />

            {/* section 1 */}
            <div
                style={{
                    backgroundImage: `url(${bgimg}) `,
                }}
                className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
            >
                <div className="learning-eco-system-content flex items-center  justify-center  ">
                    {/* Left Side */}
                    <div className="learning-eco-system-left-side font-poppins flex flex-col  w-[57.4rem] items-center   ">
                        <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                            RESOURCE HUB             </h4>
                        <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize  mb-1">

                            Let the learning begin
                        </h2>
                        <div
                            style={{ fontSize: "0.875rem" }}
                            className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[49rem] text-center "
                        >
                            Resources designed to help you and your teams level up. </div>
                        {/* <div className="flex items-center justify-center w-[30rem]  gap-3">

                            <button className="px-[2.5rem] py-3 bg-[#2800AE] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                                <Link to='/partnerwithus' className='px-3'>Partner with us</Link>
                            </button>

                        </div> */}
                    </div>

                    {/* Right Side */}
                    <div className=" w-[26.15625rem] h-[25.4rem]  aspect-[195/188] flex-shrink-0  overflow-hidden mr-3 ">
                        <img
                            src={Logo}
                            alt=""
                            className="object-cover rounded-lg shadow"
                        />
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className="min-h-screen bg-white text-[#1A1A1A] p-6">
                {/* Header Search Bar */}
                <div className="flex justify-center mb-3 gap-3">
                    <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-lg  shadow-sm">
                        <input
                            type="text"
                            placeholder="Search integrations"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-6 py-3 rounded-full focus:outline-none"
                        />

                    </div>
                    <button className="bg-[#3E00FF] text-white font-medium px-6 py-3 rounded">
                        Search
                    </button>
                </div>

                {/* Top Filter */}
                <div className=''>
                    <div className='w-[90%]   mx-auto underline'>
                        <a href="#" className="text-sm text-[#2800AE]">
                            Clear Filters
                        </a>
                    </div>
                    <div className=' w-[90%] mx-auto py-2'>
                        <h4 className="font-semibold mb-2">Resource Styles</h4>
                        <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm">
                            {[
                                "Articles",
                                "Case Study",
                                "eBooks",
                                "Events",
                                "Guides",
                                "Infographics",
                                "Podcasts",
                                "Reports",

                            ].map((filter) => (
                                <label key={filter} className="flex items-center gap-2">
                                    <input type="radio" name="tech" className="accent-[#3E00FF]" />
                                    {filter}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex  justify-between w-[80%]  mx-auto ">
                    {/* Left Sidebar Filters */}
                    <div className=" md:col-span-1">




                        <div>
                            <h4 className="font-semibold mb-2">Strategic Partnerships</h4>
                            <div className="flex flex-col gap-2 text-sm">
                                {["Al Transformation", "Cohort learning", "Immersive learning", "Integrated learning",
                                    "L&D best practices", "Learning culture", "Learning insights", "Management", "On-demand learning", "Technical upskilling", "Leadership development"]
                                .map((item) => (
                                <label key={item} className="flex items-center gap-2">
                                    <input type="radio" name="partnership" className="accent-[#3E00FF]" />
                                    {item}
                                </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3  w-[50.3rem]">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-semibold">
                                Explore All Partnerships & Integrations
                            </h2>
                            <span className="text-sm text-[#3E00FF] cursor-pointer">
                                60 Results Found
                            </span>
                        </div>


                        <div className="mt-[1rem]  text-center ">
                            <div className="flex flex-col justify-between items-center w-[50.375rem]  mx-auto gap-[1.875rem]">



                                {/* Course Cards */}
                                <div className="flex flex-wrap justify-center gap-x-[1.88rem] gap-y-[2.25rem] mb-10 ">
                                    {integrations.map((course) => (
                                        <div
                                            //   key={course.id}
                                            className="flex w-[14.3875rem] p-[0.5625rem_0.5075rem] flex-col h-[14.3875rem]  justify-center items-start gap-[0.46138rem] rounded-[0.46138rem] border-[0.738px] border-[#8686A1] bg-white shadow-[-0.738px_2.953px_8.858px_0_rgba(12,49,110,0.10)] "
                                        >
                                            <div className='rounded-[0.17581rem] bg-[#6218D9] flex px-[0.35156rem] py-[0.125rem] justify-center items-center gap-[0.21094rem]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
  <path d="M6.00454 0.23543L7.26641 3.11355C7.3139 3.22185 7.38958 3.31543 7.48555 3.38452C7.58152 3.45361 7.69427 3.49569 7.81204 3.50637L10.8861 3.78199C11.2339 3.83262 11.3727 4.25918 11.1205 4.5048L8.80485 6.45012C8.61735 6.60762 8.53204 6.85512 8.5836 7.09418L9.25672 10.2451C9.31579 10.5911 8.95297 10.8554 8.64172 10.6914L5.9586 9.12012C5.85741 9.06069 5.74219 9.02936 5.62485 9.02936C5.5075 9.02936 5.39229 9.06069 5.2911 9.12012L2.60797 10.6904C2.29766 10.8536 1.93391 10.5901 1.99297 10.2442L2.6661 7.09324C2.71672 6.85418 2.63235 6.60668 2.44485 6.44918L0.128286 4.50574C-0.122964 4.26105 0.015786 3.83355 0.362661 3.78293L3.43672 3.5073C3.55449 3.49663 3.66724 3.45455 3.76321 3.38546C3.85918 3.31637 3.93486 3.22279 3.98235 3.11449L5.24422 0.236367C5.40079 -0.0786327 5.84891 -0.0786327 6.00454 0.23543Z" fill="#FDD835"/>
</svg>
                                                
                                                <h4 className='text-[0.5rem] text-white font-medium'>Popular</h4>

                                            </div>

                                            {/* Image Placeholder */}
                                            <div className="w-full h-[7rem] bg-gray-200 mb-4 rounded-md"></div>

                                            <div className="flex flex-col items-start justify-start gap-[0.28363rem] w-full ">
                                                {/* Title */}
                                                <h4 className="text-start text-[0.713rem] font-medium ">
                                                    {course.name}
                                                </h4>

                                                {/* category */}
                                                <div className="bg-[#ECEEF6] text-start flex items-center justify-center">

                                                    <h4 className="text-[0.55rem] py-[0.08706rem] px-[0.21763rem] text-gray-600  ">{course.category}</h4>
                                                </div>

                                                <div className="flex justify-end w-[100%] ">

                                                    <span className="py-[0.3125rem] px-[0.625rem] bg-[#2800AE] text-white font-poppins font-semibold text-[0.625rem] rounded-md shadow-md transition">
                                                        {course.button}
                                                    </span>
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

        </div>
    )
}

export default CaseStudies

