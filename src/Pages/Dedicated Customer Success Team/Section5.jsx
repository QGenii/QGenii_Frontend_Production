import React from "react";
import {Link} from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="text-center py-12 px-6 mt-5">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Achieve your learning goals with Professional Services
      </h2>
      <h4 className="text-gray-600 text-[1.25rem]  font-normal max-w-4xl mx-auto mb-6 ">
        Want to level up your learning strategy and execution? Ask your Udemy
        representative about Professional Services today.
      </h4>

      <div className="flex justify-center gap-4">
        <button className="bg-blue-900 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition">
         <Link to='/requestdemo'>Request a Demo</Link>
        </button>
       <input type="button" value="Learn More" className="flex px-10 py-3 text-[#0C316E] justify-center items-center gap-2.5 rounded-md border-2 border-[var(--Brand-Color,#0C316E)] shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]" />
      </div>
    </section>
  );
}
