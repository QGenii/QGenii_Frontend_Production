import React from "react";

export default function FederalSection2() {
    const features = [
        {
            title: "Information Security in support of FISMA",
            description: "Qgenii’s robust collection of information security courses can support annual FISMA-mandated role-based training requirements.",
            color: "bg-yellow-400 text-black w-[15.78rem] h-[9.14rem]",
            position: "firstrow",
        },
        {
            title: "Information Assurance in support of DOD 8570/8140",
            description:
                "Our information security course offerings align well to the certifications associated with this framework.",
            color: "bg-[#C78ABA] text-white w-[15.68rem] h-[9.14rem]",
            position: "firstrow",
        },
        {

            title: "Cybersecurity aligned with National Initiative for Cybersecurity Education (NICE)",
            description:
                "Qgenii cybersecurity content matches the technical specialty areas of this DHS- and Navy-developed framework.",
            color: "bg-[#50D86D] text-white w-[14.78rem] h-[11.14rem]",
            position: "firstrow",
        },
        {

            title: "Soft-Skill Competencies for maintaining the CEUs required for FAI Certification",
            description:
                "We offer course content that supports FAI’s soft-skill competency models for Contractors, Contracting Officer Representatives, and Program/Project Managers.",
            position: "secondrow",
            color: "bg-[#EDEAFB] w-[15.90rem] h-[11.38rem]",
        },
        {

            title: "Leadership Competencies for OPM ECQs",
            description:
                "Qgenii courses can bridge the employee competency gaps identified by the Executive Core Qualifications model.",
            position: "secondrow",
            color: "bg-[#FF9085] text-white w-[15.68rem] h-[9.14rem]",
        },
        {

            title: "Supervisor Training in support of CFR 412",
            description:
                "Our leadership courses coordinate with the competency framework laid out in this federally required training initiative.",
            position: "secondrow",
            color: "bg-[#9EBDFF] text-white w-[15.68rem] h-[9.14rem]",
        },
        {

            title: "Data Analytics in support of the Federal Data Strategy Action Plan",
            description:
                "Our courses help learners of all expertise levels fulfill the data analytics training requirement, with topics ranging from Microsoft Excel to Python.",
            position: "center",
            color: "bg-[#F49EFF] text-white w-[16.48rem] h-[11.39rem]",
        },
    ];

    return (
        <div className=" flex flex-col items-center py-[1.62rem] w-full  gap-[1.88rem]  mt-[4rem] bg-white shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] ">
            {/* Heading */}
            <div className="text-center  mx-auto">
                <h2 className="text-[1.5rem] font-normal text-black w-[59rem] ">
                    Upskill and reskill your diverse workforce
                </h2>
                <h4 className="mt-2 text-black text-[0.875rem]  font-normal md:text-base w-[66.4rem]">
                    Give your team the technical and soft skills they need to keep up with your evolving technology and processes.
                    Qgenii Business offers courses on crucial topics like IT, data analytics, cybersecurity, and leadership that prepare your team for what’s next and fulfill agency-specific requirements, from technical skills to supervisor training.
                </h4>
            </div>

            {/* Middle Section */}
            <div className="relative flex flex-col items-center justify-between gap-[1rem] w-[64.5rem] ">
                {/* Cards */}
                <div className="flex items-center justify-between gap-[7.81rem]  ">
                    {features
                        .filter((f) => f.position.includes("firstrow"))
                        .map((f, index) => (
                            <div
                                key={index}
                                className={`p-[1.08rem] rounded-xl shadow-md w-[12.78rem] h-[9.14rem] ${f.color}`}
                            >
                                <div className="flex flex-col justify-center items-center h-full ">
                                    <h4 className="text-[.75rem] font-medium text-center">{f.title}</h4>
                                    <h4 className="font-normal   font-poppins text-black text-[0.75rem]">{f.description}</h4>
                                </div>               </div>
                        ))}
                </div>



                <div className="flex gap-[7.81rem]  items-center justify-between   ">
                    {features
                        .filter((f) => f.position.includes("secondrow"))
                        .map((f, index) => (
                            <div
                                key={index}
                                className={`p-[1.08rem] rounded-xl shadow-md w-[15.9rem] h-[10.28rem] ${f.color}`}
                            >

                                <div className="flex flex-col justify-center items-center h-full">
                                    <h4 className="text-[.75rem] font-medium text-center">{f.title}</h4>
                                    <h4 className="font-normal   font-poppins text-black text-[0.75rem]">{f.description}</h4>
                                </div>

                            </div>
                        ))}
                </div>
            </div>

            <div className="flex  justify-between gap-8 h-[25rem] ">
                {features
                    .filter((f) => f.position.includes("center"))
                    .map((f, index) => (
                        <div
                            key={index}
                            className={`p-[1.08rem] rounded-xl shadow-md w-[15.9rem] h-[9.14rem] ${f.color}`}
                        >
                            <div className="flex flex-col justify-center items-center h-full">
                                <h4 className="text-[.75rem] font-medium text-center">{f.title}</h4>
                                <h4 className="font-normal  text-center font-poppins text-black text-[0.75rem] w-[13.5rem]">{f.description}</h4>
                            </div>               </div>
                    ))}
            </div>





        </div>
    );
}
