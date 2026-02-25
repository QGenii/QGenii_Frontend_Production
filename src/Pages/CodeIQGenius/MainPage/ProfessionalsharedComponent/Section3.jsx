
import React, { useState } from "react";
import Triangle from "./Triangle";

const ServicesSelector = () => {
    const [active, setActive] = useState("short");

    const challenges = [
        { key: "short", label: "Short on term" },
        { key: "expertise", label: "Limited Expertise" },
        { key: "resources", label: "Need More Resources" },
    ];

    const services = {
        short: [
            {
                title: "Project Management",
                desc: "Design and execution of your program to achieve goals faster",
                color: "border-blue-400 bg-blue-50 text-blue-800",
            },
            {
                title: "Learning architecture",
                desc: "Design and execution of your program to achieve goals faster",
                color: "border-orange-400 bg-orange-50 text-orange-800",
            },
        ],
        expertise: [
            {
                title: "Learning architecture",
                desc: "Collaboration with learning consultants to reach your goals efficiently",
                color: "border-pink-400 bg-pink-50 text-pink-800",
            },
            {
                title: "Content curation",
                desc: "Curated learning paths to establish or improve your learning program",
                color: "border-blue-400 bg-blue-50 text-blue-800",
            },
        ],
        resources: [
            {
                title: "Content curation",
                desc: "Curated learning paths to establish or improve your learning program",
                color: "border-green-400 bg-green-50 text-green-800",
            },
            {
                title: "Learning program management",
                desc: "Extra admin support for your day-to-day needs",
                color: "border-pink-400 bg-pink-50 text-pink-800",
            },
        ],
    };





    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <h2 className="text-xl font-semibold text-center">
                Select your challenges to discover what services are right for you
            </h2>

            {/* Challenge Buttons */}
            <div className="flex gap-4">
                {challenges.map((ch) => (
                    <span
                        key={ch.key}
                        onClick={() => setActive(ch.key)}
                        className={`px-6 py-2 rounded-full shadow-sm transition ${active === ch.key
                                ? "bg-blue-900 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {ch.label}
                    </span>
                ))}
            </div>

            <div className="flex gap-8 items-center justify-center">
                {/* import triangle */}
                <Triangle active={active} />
                <div className="flex  gap-4">
                    {/* Service Cards */}
                    <div className="flex flex-col gap-[2rem] w-[17.5rem] ">
                        {services[active].map((s, idx) => (
                            <div
                                key={idx}
                                className={` py-[1.74438rem] px-[1.40675rem] border rounded-lg ${s.color}`}
                            >
                                <h4 className="font-normal text-[0.875rem]">{s.title}</h4>
                                <h4 className="text-[0.75rem] font-light">{s.desc}</h4>
                            </div>
                        ))}
                    </div>

                    {/* Empty placeholders to align grid */}
                    <div className="w-[17.5rem] flex flex-col gap-[0.56269rem]">
                        {services[active].length < 4 &&
                            Array(4 - services[active].length)
                                .fill(null)
                                .map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className=" py-[1.74438rem] px-[1.40675rem]  border rounded-lg text-gray-400"
                                    >
                                        {}
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSelector;
