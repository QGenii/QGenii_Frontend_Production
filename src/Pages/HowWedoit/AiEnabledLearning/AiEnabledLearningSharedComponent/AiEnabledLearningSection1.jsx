



import React from 'react'
import Logo from '../../../../assets/assets/HowDoWeIt/AiEnabledLearning/Logo.png';
import bgimg from '../../../../assets/assets/HowDoWeIt/AiEnabledLearning/bgimg.jpg';
import { Link } from 'react-router-dom';
const AiEnabledLearningSection1 = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${bgimg}) `,
            }}
            className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
        >
            <div className="learning-eco-system-content flex items-center justify-evenly gap-[5rem]   ">
                {/* Left Side */}
                <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
                    <h4 className="text-[#2800AE] font-poppins text-[1rem] font-semibold uppercase mb-1">
                        AI-ENABLED LEARNING                 </h4>
                    <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[39.75rem] mb-1">

                        Upskill faster and smarter with Qgenii AI             </h2>
                    <div
                        style={{ fontSize: "0.875rem" }}
                        className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[40.4rem]"
                    >
                        Our AI features help organizations personalize, streamline, and scale skills development.     </div>
                    <div className="flex w-[30rem]  gap-3">
                        <button className="px-[2.5rem] py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                            <Link to='/requestdemo'>Request a demo</Link>
                        </button>

                    </div>
                </div>

                {/* Right Side */}
                <div className="learning-eco-system-right-side w-[24.35625rem] h-[23.4rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
                    <img
                        src={Logo}
                        alt="Enterprise Training"
                        className="object-cover rounded-lg shadow overflow-auto"
                    />
                </div>
            </div>
        </div>
    )
}


export default AiEnabledLearningSection1