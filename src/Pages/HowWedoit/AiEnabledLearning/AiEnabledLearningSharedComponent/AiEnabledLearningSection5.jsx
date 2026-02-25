import React from "react";
// import Vector from "../../../../../assets/assets/OnDemandLearning/BusinessSkill/Vector.svg";
// import Star from "../../../../../assets/assets/OnDemandLearning/BusinessSkill/Star.svg";

const AiEnabledLearningSection5 = () => {
    const courses = [
        {
            id: 1,
            title: "How Devoteam Rapidly Upskilled its Workforce in AI",
            subtitle: "Case Study",
            button: "Read Case Study"

        },

        {
            id: 2,
            title: "Get a glimpse into the future of learning: CodeIQGenius AI",
            subtitle: "Video",
            button: "Watch Now"

        },
        {
            id: 3,
            title: "An L&D Leader's Cheat Sheet to Supercharge Learning With GenAI",
            subtitle: "Guide",
            button: "Download Guide"
        },
    ];
    return (
        <div className="mt-[3rem] bg-gray-50 text-center">
            <div className="flex flex-col justify-center items-center w-[69.375rem]  mx-auto gap-[1.875rem]">

                <h2 className="text-[1.875rem]  font-semibold text-center w-[40rem]">
                    Accelerate your skills journey with AI    </h2>

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

                                    <h4 className="text-[0.55rem] py-[0.08706rem] px-[0.21763rem] text-gray-600  ">{course.subtitle}</h4>
                                </div>

                                <div className="flex justify-end w-full">

                                    <span className="py-[0.3125rem] px-[0.625rem] bg-[#0c316e] text-white font-poppins font-semibold text-[0.625rem] rounded-md shadow-md transition">
                                        {course.button}
                                    </span>
                                </div>



                            </div>
                        </div>
                    ))}
                </div>
                {/* Button */}
                <button className="bg-blue-700 text-white px-[2.5rem]  rounded-md  transition">
                    Request a demo
                </button>
            </div>
        </div>
    );
};

export default AiEnabledLearningSection5;
