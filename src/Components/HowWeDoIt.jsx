


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
        <h4 className="text-[1rem] font-medium">How We Do It</h4>

        {showContent && (
          <div className="bg-white shadow-md rounded-lg p-6 w-[54rem] mx-auto absolute z-10">
            <div className="grid grid-cols-3 gap-8 divide-x divide-gray-300">
              {/* By Need */}
              <div className="pr-4">
                <h4 className=" font-semibold mb-4 text-[0.875rem] text-center">Main</h4>
                <ul className="flex flex-col gap-2 text-sm text-black font-normal">
                  <li>
                    <Link to="/learningecosystem">Learning Ecosystem</Link>
                  </li>
                  <li>
                    <Link to="/">Immersive Learning</Link>
                  </li>
                  <Link to="/professionalservice"> <li>Professional Services
                  </li></Link>
                  <Link to="/aienabledlearning"> <li>AI- Enabled Learning</li></Link>
                  <li>
                    <Link to="/casestudies">
                      Case Studies
                    </Link>
                  </li>

                </ul>
              </div>

              {/* By Team */}
              <div className="px-4">
                <h4 className="text-[0.875rem] font-semibold mb-4 text-nowrap text-center">On- Demand Learning</h4>
                <ul className="flex flex-col gap-2 text-nowrap text-[0.875rem] text-black font-normal w-[13.1rem]">
                  <Link to="/enterprisewide"> <li>On -Demand learning</li></Link>
                  <Link to="/aistarterpath"> <li>NEW AI Starter Paths</li></Link>
                  <Link to="/realworldinstructor"> <li>Real world Instructors</li></Link>
                  <Link to="/multilanguagecollection"> <li>Multi Language Collections</li></Link>
                  <Link to="/learnaboutmorereporting"> <li>Analystics & Insights</li></Link>
                  <Link to="/usermanagement"> <li>Flexible User management</li></Link>
                 
                </ul>
                <h4 className=" font-semibold mb-4 text-center text-[0.875rem]">Courses</h4>
                <ul className="flex flex-col  items-start  justify-start gap-2 text-nowrap text-[0.875rem] text-black font-normal w-[13.1rem] ">
                  <Link to="/businessSkill"> <li>Business Skills</li></Link>
                  <Link to="/techSkill"> <li>Tech Skills</li></Link>
                  <Link to="/leadershipandmanagement"> <li>Leadership & management</li></Link>
                  <Link to="/wellnessSkill"> <li>Wellness  Skills</li></Link>
                  <Link to="/viewcourse"> <li>View course Collections</li></Link>
                  <Link to="/usermanagement"> <li>Flexible User management</li></Link>
                 
                </ul>
              </div>

              {/* By Industry */}
              <div className="pl-4">
                <h4 className=" font-semibold mb-4 text-center text-[0.875rem]">Cohot Learning</h4>
                <ul className="flex flex-col  items-start  justify-start gap-2 text-nowrap text-[0.875rem] text-black font-normal w-[14.1rem] ">
                  <Link to="/cohortlearning"> <li>Qgenii Business Leadership Academy</li></Link>
                  <Link to="/leadinggenaiinovationprogram"> <li>Leading GenAI Innovation Program</li></Link>
                  <Link to="/investleaderprogram"> <li>Invested Leadership Program</li></Link>
                  <Link to="/unlockinggenaiwithaws"> <li>Unlocking GenAI Opportunities with AWS</li></Link>
                  <Link to="/cohortlearning"> <li>About Cohort Learning</li></Link>
                  <Link to="/cohortlearning"> <li>Cohort Learning solutions AI & Analytics</li></Link>
                 
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

