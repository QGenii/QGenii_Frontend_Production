import React from "react";

const Announcement = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="bg-gray-500 rounded-full h-12 w-12 shrink-0"></div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-gray-600 text-xs font-medium">
              Instructor Name
            </div>
            <div className="text-gray-500 text-[10px] font-normal">
              11 days ago. Announcement
            </div>
          </div>
        </div>

      <div className="mt-4 w-full">

        <h4 className="text-[0.75rem] font-medium text-gray-800 ">
          This Online Bootcamp Is A Compact And Accelerated Version Of Our
          400-Hour In-Person Master's Program.
        </h4>
        <div className="text-gray-700 text-base">
          <h4 className="mb-4 font-poppins font-medium text-[0.75rem]">It Has Four Parts:</h4>
          <div className="list-inside list-decimal mb-4">
            <div className="mb-2 font-medium text-[0.75rem]">
              <span className="font-medium text-[0.75rem] text-zinc-700">- In Part 1,You Will Learn The Keys To Artificial Intelligence And The New
              Generative AI, As Well As Its Potential To Revolutionize
              Businesses, Startups, And Employment. </span>
              
            </div>
            <div className="mb-2 font-medium text-[0.75rem]">
              <span className="font-medium text-[0.75rem] text-zinc-700">- In Part 2, 
              You Will Learn To Build Professional-Level LLM Applications, The
              Most Potential Applications Of Generative AI. You Will Also Learn
              How To Build Advanced RAG LLM Apps, Multimodal LLM Apps, AI
              Agents, Multi-Agent LLM Apps, And How To Manage LLMOps.
              </span>
            </div>
            <div className="mb-2 font-medium text-[0.75rem]">
              <span className="font-medium text-[0.75rem] text-zinc-700">- In Part 3,
              You Will Learn How To Build Traditional And Gen AI Apps Without
              Coding Using Cursor AI And The New AI Coding Assistants. You Will
              Learn What Are AI Coding Assistants Like Cursor AI, Claude AI, V0,
              OI, Replit Agent, Etc, And How To Increase Their Performance By
              Combining Them.
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
