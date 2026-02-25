



import { useState } from "react";






export default function TraningTranformationSection1() {
    const [activeTab, setActiveTab] = useState("Challenge");

    console.log(activeTab)

    const tabs = [
        'Challenge',
        'Solutions',
        'Results',
        'Looking Forward',

    ];

    return (
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]   ">


            <div className="w-[72.435rem]  flex flex-col items-center gap-[1.88rem] bg-red">



                {/* Top Tabs */}
                <div className=" flex gap-[4.75rem] flex-wrap justify-center   w-[69.25rem]  mt-[3rem] ">
                    {tabs.map((tab) => (
                        <span
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-[1.4375rem] py-3 rounded-full border transition shadow-sm text-[0.873rem] cursor-pointer ${activeTab === tab
                                ? "bg-[#0c316e] text-white"
                                : "bg-white text-gray-800 border-gray-200"
                                }`}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

            </div>


            {/* Banking */}
            {activeTab === "Challenge" && (




                <div className=" flex flex-col gap-[1rem] w-[72.25rem] bg-[#E6F0FF] rounded-[1.25rem] p-[3rem]">




                    <div>

                        <h5 className='text-[1.25rem] font-semibold'>An established L&D program looking for further customization</h5>
                        <h4 className='text-[1rem] font-normal w-[65rem]'>
                            With a large workforce of over 50,000 spread across several countries, Capital One uses a mix of online and instructor-led Learning and Development (L&D) programming. Associates receive a wide range of innovative learning resources and experiences, helping Capital One attract, develop, and retain the best talent and deliver on its business strategies.
                            One of the ways Capital One has invested in L&D is through Tech College. Developed in 2017, Tech College serves as the company's internal tech-learning program and was designed as a way to keep engineers, product managers, and designers up-to-date on cutting-edge technology skills that could aid in the development of new products and applications.
                            <br />
                            <br />

                            Led by Capital One's Senior Director of Technology Learning, Eric Lawson, Tech College has expanded in size and scope since achieving the company's cloud-based transformation. As Lawson explains, “We use Tech College to help reskill and upskill our associates and ensure all new Capital One tech associates — both recent college graduates and experienced hires — are equipped with the right resources and training for success.”
                        </h4>
                    </div>



                    <div className='text-[1.25rem] font-medium'>
                        <h5 className='text-[1.5rem] font-medium w-[56.0625rem]'>Our CodeIQGenius Business adoption has grown significantly since first launch — specifically, over 63K hours of course content consumed. And with our monthly 'Invest in Yourself' program, this rises to 600K learning minutes each Friday.</h5>

                    </div>

                     <div className="flex items-center mt-[4rem] space-x-3">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div className="space-y-0">
              <span className="font-medium font-[.75rem]  text-black">Company person name</span>
              <h6 className="font-normal text-black text-[0.625rem] ">Role of the person in that company</h6>
            </div>
          </div>


                </div>






            )
            }

            {/* Solutions */}

             {activeTab === "Solutions" && (




                <div className=" flex flex-col gap-[1rem] w-[72.25rem] bg-[#E6F0FF] rounded-[1.25rem] p-[3rem]">




                    <div>

                        <h5 className='text-[1.25rem] font-semibold'>An established L&D program looking for further customization</h5>
                        <h4 className='text-[1rem] font-normal w-[65rem]'>
                            With a large workforce of over 50,000 spread across several countries, Capital One uses a mix of online and instructor-led Learning and Development (L&D) programming. Associates receive a wide range of innovative learning resources and experiences, helping Capital One attract, develop, and retain the best talent and deliver on its business strategies.
                            One of the ways Capital One has invested in L&D is through Tech College. Developed in 2017, Tech College serves as the company's internal tech-learning program and was designed as a way to keep engineers, product managers, and designers up-to-date on cutting-edge technology skills that could aid in the development of new products and applications.
                            <br />
                            <br />

                            Led by Capital One's Senior Director of Technology Learning, Eric Lawson, Tech College has expanded in size and scope since achieving the company's cloud-based transformation. As Lawson explains, “We use Tech College to help reskill and upskill our associates and ensure all new Capital One tech associates — both recent college graduates and experienced hires — are equipped with the right resources and training for success.”
                        </h4>
                    </div>



                    <div className='text-[1.25rem] font-medium'>
                        <h5 className='text-[1.5rem] font-medium w-[56.0625rem]'>Our CodeIQGenius Business adoption has grown significantly since first launch — specifically, over 63K hours of course content consumed. And with our monthly 'Invest in Yourself' program, this rises to 600K learning minutes each Friday.</h5>

                    </div>

                     <div className="flex items-center mt-[4rem] space-x-3">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div className="space-y-0">
              <span className="font-medium font-[.75rem]  text-black">Company person name</span>
              <h6 className="font-normal text-black text-[0.625rem] ">Role of the person in that company</h6>
            </div>
          </div>


                </div>






            )
            }

            {/* Results */}

             {activeTab === "Results" && (




                <div className=" flex flex-col gap-[1rem] w-[72.25rem] bg-[#E6F0FF] rounded-[1.25rem] p-[3rem]">




                    <div>

                        <h5 className='text-[1.25rem] font-semibold'>An established L&D program looking for further customization</h5>
                        <h4 className='text-[1rem] font-normal w-[65rem]'>
                            With a large workforce of over 50,000 spread across several countries, Capital One uses a mix of online and instructor-led Learning and Development (L&D) programming. Associates receive a wide range of innovative learning resources and experiences, helping Capital One attract, develop, and retain the best talent and deliver on its business strategies.
                            One of the ways Capital One has invested in L&D is through Tech College. Developed in 2017, Tech College serves as the company's internal tech-learning program and was designed as a way to keep engineers, product managers, and designers up-to-date on cutting-edge technology skills that could aid in the development of new products and applications.
                            <br />
                            <br />

                            Led by Capital One's Senior Director of Technology Learning, Eric Lawson, Tech College has expanded in size and scope since achieving the company's cloud-based transformation. As Lawson explains, “We use Tech College to help reskill and upskill our associates and ensure all new Capital One tech associates — both recent college graduates and experienced hires — are equipped with the right resources and training for success.”
                        </h4>
                    </div>



                    <div className='text-[1.25rem] font-medium'>
                        <h5 className='text-[1.5rem] font-medium w-[56.0625rem]'>Our CodeIQGenius Business adoption has grown significantly since first launch — specifically, over 63K hours of course content consumed. And with our monthly 'Invest in Yourself' program, this rises to 600K learning minutes each Friday.</h5>

                    </div>

                     <div className="flex items-center mt-[4rem] space-x-3">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div className="space-y-0">
              <span className="font-medium font-[.75rem]  text-black">Company person name</span>
              <h6 className="font-normal text-black text-[0.625rem] ">Role of the person in that company</h6>
            </div>
          </div>


                </div>






            )
            }


{/* Looking Forward */}

             {activeTab === "Looking Forward" && (




                <div className=" flex flex-col gap-[1rem] w-[72.25rem] bg-[#E6F0FF] rounded-[1.25rem] p-[3rem]">




                    <div>

                        <h5 className='text-[1.25rem] font-semibold'>An established L&D program looking for further customization</h5>
                        <h4 className='text-[1rem] font-normal w-[65rem]'>
                            With a large workforce of over 50,000 spread across several countries, Capital One uses a mix of online and instructor-led Learning and Development (L&D) programming. Associates receive a wide range of innovative learning resources and experiences, helping Capital One attract, develop, and retain the best talent and deliver on its business strategies.
                            One of the ways Capital One has invested in L&D is through Tech College. Developed in 2017, Tech College serves as the company's internal tech-learning program and was designed as a way to keep engineers, product managers, and designers up-to-date on cutting-edge technology skills that could aid in the development of new products and applications.
                            <br />
                            <br />

                            Led by Capital One's Senior Director of Technology Learning, Eric Lawson, Tech College has expanded in size and scope since achieving the company's cloud-based transformation. As Lawson explains, “We use Tech College to help reskill and upskill our associates and ensure all new Capital One tech associates — both recent college graduates and experienced hires — are equipped with the right resources and training for success.”
                        </h4>
                    </div>



                    <div className='text-[1.25rem] font-medium'>
                        <h5 className='text-[1.5rem] font-medium w-[56.0625rem]'>Our CodeIQGenius Business adoption has grown significantly since first launch — specifically, over 63K hours of course content consumed. And with our monthly 'Invest in Yourself' program, this rises to 600K learning minutes each Friday.</h5>

                    </div>

                     <div className="flex items-center mt-[4rem] space-x-3">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div className="space-y-0">
              <span className="font-medium font-[.75rem]  text-black">Company person name</span>
              <h6 className="font-normal text-black text-[0.625rem] ">Role of the person in that company</h6>
            </div>
          </div>


                </div>

            )
            }

        </div>
    );
}

