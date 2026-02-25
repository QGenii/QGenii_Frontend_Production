


import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TrainingCategories() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      <div
        onMouseEnter={() => setShowContent(true)}
        onMouseLeave={() => setShowContent(false)}
      >
        <h4 className="text-[1rem] font-medium">What we Do</h4>

        {showContent && (
          <div className="bg-white shadow-md rounded-lg p-6 w-[40rem] mx-auto absolute z-10">
            <div className="grid grid-cols-3 gap-8 divide-x divide-gray-300">
              {/* By Need */}
              <div className="pr-4">
                <h4 className="text-lg font-semibold mb-4">By need</h4>
                <ul className="space-y-2 text-sm text-black font-normal">
                  <li>
                    <Link to="/enterprisewide">Enterprise-wide training</Link>
                  </li>
                  <li>
                    <Link to="/smalltrainingpage">Small Training Team</Link>
                  </li>
                  <Link to="/techtrainingpage"> <li>Tech Training</li></Link>
                  <Link to="/remoteandhybridtraning"> <li>Remote & Hybrid Team Training</li></Link>
                  <li>
                    <Link to="/dedicatedcustomersuccessteam">
                      Dedicated Customer Success Team
                    </Link>
                  </li>
                 <Link to="/downloadcertificate"> <li>Remote & Hybrid Team Training</li></Link>
                  <li>Certification Prep & Badges</li>
                  <li>AI Upskilling</li>
                </ul>
              </div>

              {/* By Team */}
              <div className="px-4">
                <h4 className="text-lg font-semibold mb-4">By Team</h4>
                <ul className="space-y-2 text-sm text-black font-normal">
                 <Link to="/leaderandexecutivepage"> <li>Leader & Executive</li></Link>
                  <Link to="/learninganddevelopment"> <li>Learning & Development</li></Link>
                 <Link to="/humanresources"> <li>Human Resources</li></Link>
                  <Link to="/enginerring"> <li>Engineering</li></Link>
                  <li>IT Operations</li>
                  <li>Data Science</li>
                </ul>
              </div>

              {/* By Industry */}
              <div className="pl-4">
                <h4 className="text-lg font-semibold mb-4">By Industry</h4>
                <ul className="space-y-2 text-sm text-black font-normal">
                  <li>Technology</li>
                  <li>Professional Services</li>
                  <li>Financial Services</li>
                  <li>Manufacturing</li>
                  <li>Government</li>
                  <li>Higher Ed</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

