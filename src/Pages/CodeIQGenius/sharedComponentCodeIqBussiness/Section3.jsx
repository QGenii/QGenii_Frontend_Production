import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-[#1E1E1E] to-[#000080] py-16 px-6 text-center mt-32">
  <div className="flex flex-col items-center justify-center h-full gap-6">
    
    <h5 className="text-2xl md:text-3xl font-semibold text-white max-w-[44rem]">
      Get instant access to the Multi-Language collection with your Enterprise subscription.
    </h5>
    
    <h4 className="text-sm md:text-base text-white font-normal text-left max-w-[60rem]">
      Train your people in their native language. Our Multi-Language course content includes 17,000+ courses in Arabic, French, German, Hindi, Indonesian, Italian, Japanese*, Korean*, Mandarin, Polish, Portuguese, Russian, Spanish, Turkish, and Vietnamese.
    </h4>

    <h4 className="text-white text-sm font-normal">
      *Note: Available only with the Premium collection add-on
    </h4>

    <Link to="/">
      <button className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition">
        Request a Demo
      </button>
    </Link>

  </div>
</section>

  );
}
