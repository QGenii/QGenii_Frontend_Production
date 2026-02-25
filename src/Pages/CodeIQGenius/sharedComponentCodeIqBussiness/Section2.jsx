import React from "react";

const PricingComparison = () => {
  const data = [
    {
     
      features: [
        { name: "Course assignment with custom messaging", enterprise: true, team: true },
        { name: "Custom user groups", enterprise: true, team: false },
        { name: "Automated pace management", enterprise: true, team: false },
        { name: "Assign tasks, announcements, and QuickCheck polls (Requires Pro add-on)", enterprise: true, team: false },
      ],
    },
    {
      category: "Analytics & Reports",
      features: [
        { name: "User analytics", enterprise: true, team: true },
        { name: "Individual user engagement", enterprise: true, team: true },
        { name: "Skill insights", enterprise: true, team: false },
        { name: "Course insights", enterprise: true, team: false },
        { name: "Growth over activity", enterprise: true, team: false },
        { name: "Lab and assessment activity reports (Requires Pro add-on)", enterprise: true, team: false },
        { name: "Advanced engagement reporting and dashboard for measurement (Requires Pro add-on)", enterprise: true, team: false },
      ],
    },
    {
      category: "Learner Experience",
      features: [
        { name: "Personalized course recommendations", enterprise: true, team: true },
        { name: "Coding workspaces", enterprise: true, team: true },
        { name: "Quizzes", enterprise: true, team: true },
        { name: "Practice tests", enterprise: true, team: true },
        { name: "Notes", enterprise: true, team: true },
        { name: "Q&A", enterprise: true, team: true },
        { name: "Pre-built QuickCheck polls (Requires Pro add-on)", enterprise: true, team: false },
        { name: "Multi-modal labs (Requires Pro add-on)", enterprise: true, team: false },
        { name: "Assessments (Requires Pro add-on)", enterprise: true, team: false },
        { name: "Workspaces technical environments (Requires Pro add-on)", enterprise: true, team: false },
      ],
    },
    {
      category: "Integrations",
      features: [
        { name: "Single sign-on", enterprise: true, team: false },
        { name: "Reporting API", enterprise: true, team: false },
        { name: "Course API", enterprise: true, team: false },
        { name: "User API", enterprise: true, team: false },
        { name: "LMS integration", enterprise: true, team: false },
        { name: "Slack integration", enterprise: true, team: false },
        { name: "Workplace integration", enterprise: true, team: false },
      ],
    },
    {
      category: "Support",
      features: [
        { name: "24/7 customer support", enterprise: true, team: false },
        { name: "Dedicated customer success partner", enterprise: true, team: false },
      ],
    },
  ];

  return (

    <div className="mt-10">
        
          <div className="w-[72rem] mx-auto grid h-[8.4375rem] px-[1.875rem] py-[0.6875rem] self-stretch
                grid-cols-3 rounded-t-[1.25rem] border-t-2 border-r-2 border-l-2 border-[#8686A1] 
                shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]  gap-4">

  <div className="flex items-center justify-center">
    <h4 className="text-[1.5rem] font-semibold text-black">Course Management</h4>
  </div>

  <div className="flex flex-col items-center justify-center">
    <h4 className="py-3 px-4 text-[1.5rem]  font-normal">Enterprise Plan</h4>
    <span className="text-[0.93rem] text-[#0C316E]">Free demo →</span>
  </div>

  <div className="flex flex-col items-center justify-center">
    <h4 className="py-3 px-4 text-[1.5rem]  font-normal">Team Plan</h4>
    <span className="text-[0.93rem] text-[#0C316E]">Sign up →</span>
  </div>

</div>

    
    <div className="w-[72rem] grid h-[133.43225rem]  mx-auto self-stretch 
                grid-cols-3 rounded-b-[1.25rem] border-r-2 border-b-2 border-l-2 border-[#8686A1] 
                bg-white shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]">

  <table className="w-[72rem] text-left table-fixed border-collapse">
    

    <tbody>
      {data.map((section, i) => (
        <React.Fragment key={i}>
          {/* Category Row */}
          <tr className="bg-gray-50">
            <td  className="py-2 px-4 text-[1.5rem]  text-center font-semibold text-black">
              {section.category}
            </td>
          </tr>

          {/* Features */}
          {section.features.map((f, j) => (
            <tr key={j} className="border-b last:border-0">
              <td className="w-1/3 py-2 px-4  text-[1rem] font-light text-black">{f.name}</td>
              <td className="w-1/3 py-2 px-4 text-center ">
                {f.enterprise ? <div className="flex justify-center"><svg  className="text-center" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
  <line y1="-1" x2="19.2571" y2="-1" transform="matrix(-0.713666 0.700486 0.700486 0.713666 21.6251 7.4707)" stroke="#0C316E" stroke-width="2"/>
  <line y1="-1" x2="10.0024" y2="-1" transform="matrix(-0.700486 -0.713666 -0.713666 0.700486 7.88197 20.959)" stroke="#0C316E" stroke-width="2"/>
</svg> </div>: "—"}
              </td>
              <td className="w-1/3 py-2 px-4 text-center">
                {f.team ?  <div className="flex justify-center"><svg  className="text-center" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
  <line y1="-1" x2="19.2571" y2="-1" transform="matrix(-0.713666 0.700486 0.700486 0.713666 21.6251 7.4707)" stroke="#0C316E" stroke-width="2"/>
  <line y1="-1" x2="10.0024" y2="-1" transform="matrix(-0.700486 -0.713666 -0.713666 0.700486 7.88197 20.959)" stroke="#0C316E" stroke-width="2"/>
</svg> </div>: "—"}
              </td>
            </tr>
          ))}
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default PricingComparison;
