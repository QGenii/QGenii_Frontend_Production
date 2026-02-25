import React from "react";

export default function Suscription({ onSubscribe }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-8">
      <h2 className="text-lg font-semibold mb-6">Manage your Qgenii subscriptions</h2>

      <div className=" rounded-lg  p-8">
        <h3 className="text-sm font-medium text-gray-800 mb-1">Active Plans</h3>
        <div className="text-sm text-red-600 mb-6">You don't have any Active Plans</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: feature list */}
          <div>
            <h4 className="text-base font-semibold mb-4">Subscription plans available</h4>

            <div className="mt-4">
              <h5 className="text-sm font-medium mb-3">Personal Plans</h5>

              <ul className="space-y-3 text-gray-700">
                {[
                  "Access to 30,000+ top courses",
                  "Practice tests and AI-powered coding exercises",
                  "Certification prep for 200+ exams",
                  "Multi-language course collection",
                  "GenAI features for learners and organizations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm  border border-gray-100 rounded-lg p-6 ">
              <div className="text-sm text-gray-500 mb-3">Take personal plan</div>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => onSubscribe?.()}
                  className="flex-1 px-4 py-2 rounded-md bg-[#2D00F7] text-white text-sm font-semibold shadow-sm"
                >
                  Subscribe now
                </button>
                <button className="px-4 py-2 rounded-md border border-gray-300 text-sm">Learn More</button>
              </div>

              <div className="text-sm text-gray-600">Starting at <span className="font-semibold">₹375</span> <span className="line-through text-gray-400">₹560</span> per month. Cancel anytime.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
