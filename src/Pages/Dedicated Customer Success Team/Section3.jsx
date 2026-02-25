import React from "react";
import Img1 from "../../assets/assets/DedicatedCustomerSuccessTeam/Img1.png";
const Section3 = () => {
  return (
    <div>
      <div className="flex w-[84.375rem] flex-col items-center gap-[1.875rem] self-stretch my-[3.125rem] mx-auto">
        {/* Top Box */}
        <div className="m-[3.75rem] rounded-lg bg-white">
          <h2 className="text-black text-center font-poppins text-[1.875rem] font-medium leading-normal m-[1.875rem]">
            Align learning to critical business outcomes from the start
          </h2>

          <div className="flex px-6 items-center gap-[1.875rem] self-stretch">
            {/* Left Text Section */}
            <div className="flex w-[33.875rem] flex-col items-start gap-[1.875rem]">
              <div>
                <h5 className="text-black font-poppins text-[1.25rem] font-medium leading-normal">
                  Realize the value of your investment faster
                </h5>
                <div className="text-black font-poppins text-[0.875rem] font-normalleading-normal">
                  A customized plan and resources help you engage the right
                  stakeholders and integrate Udemy learning solutions into your
                  employees’ workflow.
                </div>
              </div>

              <div>
                <h5 className="text-black font-poppins text-[1.25rem] font-medium leading-normal">
                  Set your organization up for success
                </h5>
                <div className="text-black font-poppins text-[0.875rem] font-normal leading-normal">
                  Training sessions, engagement events, program strategy
                  consulting, and custom-built workshops keep employees involved
                  and learning.
                </div>
              </div>

              <div>
                <h5 className="text-black font-poppins text-[1.25rem] font-medium leading-normal">
                  Monitor the impact on your business goals
                </h5>
                <div className="text-black font-poppins text-[0.875rem] font-normal leading-normal">
                  Regular data-backed business reviews demonstrate the impact of
                  learning, helping you improve the efficacy of your learning
                  programs.
                </div>
              </div>

              <div>
                <h5 className="text-black font-poppins text-[1.25rem] font-medium leading-normal">
                  Use learning as a competitive advantage
                </h5>
                <div className="text-black font-poppins text-[0.875rem] font-normal leading-normal">
                  Our market expertise helps you use learning to accelerate
                  innovation, navigate change, and equip your team with the
                  skills they need to keep your organization ahead.
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div>
              <img
                src={Img1}
                alt="Learning Illustration"
                className="w-[39.375rem] h-[26.25rem] aspect-[3/2]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
