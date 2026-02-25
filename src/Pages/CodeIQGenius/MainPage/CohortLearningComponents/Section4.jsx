import React from "react";
import Img5 from "../../../../assets/CodeIQGenius/MainPage/CohortLearning/Img5.png";
export default function CourseAccessSection() {
  const features = [
    {

      description: "Further develop leadership capabilities",
      color: "bg-yellow-400 text-black",
      position: "top-left",
    },
    {

      description:
        "Challenge ideas and learn from each other",
      color: "bg-pink-400 text-white",
      position: "top-right",
    },
    {

      description:
        "Manage change better and align teams on key initiatives",
      color: "bg-purple-400 text-white",
      position: "bottom-left",
    },
    {

      description:
        "Accelerate leadership-wide adoption of positive change",
      position: "bottom-right",
      color: "bg-[#EDEAFB]",
    },
    {

      description:
        "Reduce friction and organizational silos",
      position: "bottom-center",
      color: "bg-red-400 text-white",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-12 px-6">
      {/* Heading */}
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-[1.25rem] md:text-2xl font-normal text-black">
          When leaders learn together, they can:
        </h2>
        <h4 className="mt-2 text-black text-[1.25rem ]  font-normal md:text-base">

        </h4>
      </div>

      {/* Middle Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 ">
        {/* Cards */}
        <div className="flex flex-col justify-between gap-6 h-[25rem] ">
          {features
            .filter((f) => f.position.includes("left"))
            .map((f, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-md w-[12rem] h-[6rem] ${f.color}`}
              >
 <div className="flex flex-col justify-center items-center h-full">         
                         <p className="font-normal  text-center font-poppins text-black text-[0.875rem]">{f.description}</p>
                </div>               </div>
            ))}
        </div>

        {/* Center Image */}
        <div className="w-[28.75rem] md:w-[22rem] h-[28.5rem] flex flex-col justify-center items-center">
          <img
            src={Img5}
            alt="Learning illustration"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-6 justify-between h-[25rem] ">
          {features
            .filter((f) => f.position.includes("right"))
            .map((f, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-md w-[15.9rem] h-[6rem] ${f.color}`}
              >

                <div className="flex flex-col justify-center items-center h-full">         
                         <p className="font-normal  text-center font-poppins text-black text-[0.875rem]">{f.description}</p>
                </div>            
                
                  </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 h-[25rem] ">
          {features
            .filter((f) => f.position.includes("center"))
            .map((f, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-md w-[15.9rem] h-[6rem] ${f.color}`}
              >
 <div className="flex flex-col justify-center items-center h-full">         
                         <p className="font-normal  text-center font-poppins text-black text-[0.875rem] w-[13.5rem]">{f.description}</p>
                </div>               </div>
            ))}
        </div>





    </div>
  );
}
