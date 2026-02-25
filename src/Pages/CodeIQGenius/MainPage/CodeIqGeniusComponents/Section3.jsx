import React from "react";

export default function LearningApproach() {
  return (
    <section className="text-center px-6 py-12 bg-white flex flex-col justify-center items-center">
      {/* Heading */}
      <h4 className="text-[1.5rem] font-medium text-gray-800">
        Modern skills need a modern learning approach
      </h4>
      <h4 className="w-[60.375rem] text-[1.25rem] font-normal text-gray-800 font-poppins">
        Learning solutions shouldn’t be one-size-fits-all. For effective training,
        you need the right skills and the right modalities. That’s where we come in.
      </h4>

      {/* Placeholder grid (for cards/images) */}
      <div className="border-1 rounded-[1.25rem]  border-[#0C316E] 
            w-[72.625rem] h-[27.0625rem] 
            shrink-0 mt-2">
                <video src="https://www.pexels.com/download/video/33655178/" controls
                muted
                loop
                className="w-full h-full object-cover rounded-[1.25rem] "
              ></video>
       
    
      </div>
    </section>
  );
}
