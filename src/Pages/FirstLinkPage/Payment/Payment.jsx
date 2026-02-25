import React from "react";
import PlanSelection from "./Components/PlanSelection";
import OrderSummary from "./Components/OrderSummary";
import BillingForm from "./Components/BillingForm";
import PaymentMethods from "./Components/PaymentMethods";
import SummaryBox from "./Components/SummaryBox";
import Img from '../../../assets/FirstLinkPage/Img.png'

export default function PaymentPage() {
  return (
    <div className=" p-6 flex flex-col items-center   ">
      <h1 className="text-[1.25rem]   font-semibold mb-10">Payment Details</h1>


      <div className="relative flex flex-col items-center gap-[3rem] w-[71.1rem]  h-[56.8rem] rounded-[1.25rem] bg-white shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)]">

        <img src={Img} alt="" className="w-[13.18rem] h-[10.67rem] absolute right-[-5rem] top-[-5rem]" />
{/* section1 */}
        <div className="flex flex-col gap-[2rem] w-[45.875rem]  h-[23.5rem] mt-[1.63rem]">
          <h1 className="text-[1rem] font-semibold">Choose Your Plan</h1>
          <PlanSelection />

          <div>

            <h4 className="flex gap-2 flex-col text-black font-poppins text-base not-italic font-semibold leading-6 capitalize">we provide these in annual Plan
            </h4>
            <div className="text-black font-poppins text-[0.875rem] font-normal not-italic leading-6 capitalize list-inside">
              <li> Access To Over 26,000 Of Our Top Courses In Tech, Business, And More</li>
              <li> Hands-On Learning Experiences To Build Your Skills</li>
              <li> Course Recommendations To Help You Start Learning Faster</li>
            </div>
          </div>
          <div className=" flex flex-col gap-[2rem]">

          </div>
        </div>

{/* section2 */}
        <div className="w-[51rem]">

          <OrderSummary />
        </div>
{/* section3 */}
        <div >
          <div className="w-[24rem] h-[11rem] bg-[#CDE9FF] rounded-lg p-4 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
            <h2 className="font-semibold text-lg mb-3">Summary</h2>

            <div className="flex justify-between text-sm font-medium mb-2">
              <span>Total Due:</span>
              <span className="font-semibold">₹ 3,999</span>
            </div>

            <hr className="border-gray-400 mb-2" />

            <div className="flex justify-between text-sm">
              <span className="text-[0.875rem]">Yearly Access:</span>
              <span className="font-semibold">₹ 3,999</span>
            </div>
          </div>
        </div>

      </div>


    </div>

  );
}
