// GlobalSupportSection.jsx
import React from "react";
import Img2 from "../../assets/assets/DedicatedCustomerSuccessTeam/Img2.jpg";

const GlobalSupportSection = () => {
  return (
    <section className="bg-[#E8EEFE] py-12 px-6 md:px-16 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}

        <div className="flex-1 text-center md:text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            24/7 Global Support
          </h2>
          <h4 className="text-gray-600 mb-4 text-[1rem] font-normal">
            Everyone in your organization (including learners, admins, and executives) will have access to our 24/7 global customer support team of specialists.
          </h4>
          <h4 className="text-lg font-medium text-gray-800">
            Develop skills with a cohort for incredible growth.
          </h4>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src={Img2}
            alt="Customer support illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default GlobalSupportSection;
