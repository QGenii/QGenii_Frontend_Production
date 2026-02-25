import bgimg from '../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/bgimg.jpg'

export default function LearningPathForLeaderSection1() {

    const tabs = [
        'AI Imperative',
        'Strategy Development',
        'Risks & Opportunities',
        'Leading Through Change',
       
    ];

    return (
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


            <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

                <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

                {/* Top Tabs */}
                <div className=" flex gap-6 flex-wrap justify-center   w-[69.25rem]  ">
                    {tabs.map((tab) => (
                        <span
                            key={tab}
                            
                            className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.873rem] cursor-pointer bg-[lightgray] bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${bgimg}) ` ,backgroundPosition:"cover" , backgroundRepeat:"no-repeat"}}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

            </div>


     




        </div>
    );
}
