



import { useState } from "react";

import { Link } from "react-router-dom";


import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/FinancialService/Img1.jpg';
import Img2 from '../../../../../assets/assets/WhatWedo/ByIndustry/FinancialService/Img2.jpg';
import Img3 from '../../../../../assets/assets/WhatWedo/ByIndustry/FinancialService/Img3.jpg';
import Img4 from '../../../../../assets/assets/WhatWedo/ByIndustry/FinancialService/Img4.jpg';
import Img5 from '../../../../../assets/assets/WhatWedo/ByIndustry/FinancialService/Img5.jpg';


export default function FinancialServiceSection3() {
    const [activeTab, setActiveTab] = useState("Banking");

    console.log(activeTab)

    const tabs = [
        'Banking',
        'Investment & Wealth Management',
        'Insurance',
        'Fintech & Payments',
        'Financial services Consulting'
    ];

    return (
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]   ">


            <div className="w-[69.25rem] flex flex-col items-center gap-[1.88rem]">

                <h4 className="text-[1.875rem] font-semibold text-center  ">Transforming Financial Services</h4>

                {/* Top Tabs */}
                <div className=" flex gap-6 flex-wrap justify-center   w-[69.25rem] ">
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
            {activeTab === "Banking" && (
                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1.5rem] font-normal text-center ">Upskilling banking talent for a digital era</h2>

                        <div className="flex  w-[69.25rem]  gap-[1.875rem] ">
                            <div className=" flex flex-col gap-[1rem] w-[33.875rem]">



                                <h4 className="text-[.875rem] font-normal">Maintaining the digital status quo is not an option. Banks need a workforce capable of updating or upgrading their existing IT estate and driving cloud transformation. See how Capital One achieved a 12% increase in retention across high-value technical roles by upskilling their team.</h4>
                                <div>

                                    <h5 className='text-[1rem] font-medium'>AI/ML</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Enhance customer experience, detect fraud, and manage compliance
                                    </h4>
                                </div>



                                <div className='text-[1.25rem] font-medium'>
                                    <h5 className='text-[1rem] font-medium'>Blockchain</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Automate processes, reduce costs, and improve security
                                    </h4>
                                </div>

                                <div className="text-[1.25rem] font-medium">
                                    <h5 className='text-[1rem] font-medium' >Cybersecurity</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Protect financial data and critical systems
                                    </h4>
                                </div>
                            </div>

                            <div >
                                <img className="w-[31.25rem] h-[20.25rem] aspect-square" src={Img1} alt="Learning Illustration" />
                            </div>
                        </div>


                    </div>
                    <button><Link to='/transformationstory'>Explore XYZ company transformation story</Link></button>
                </div>
            )
            }
            {/* // Investment & Wealth Management */}
            {activeTab === "Investment & Wealth Management" && (
                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1.5rem] font-normal text-center ">Scaling Expertise to Navigate Global Market Complexities</h2>

                        <div className="flex  w-[69.25rem]  gap-[1.875rem] ">
                            <div className=" flex flex-col gap-[1rem] w-[33.875rem]">



                                <h4 className="text-[.875rem] font-normal">To thrive amid talent gaps and increasing market volatility, wealth management firms must invest in data-driven insights and client-centric strategies. Learn how XP Inc. realized a $240K savings and 93% satisfaction rate by modernizing its learning approach..</h4>
                                <div>

                                    <h5 className='text-[1rem] font-medium'>AI/ML</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Streamline data ingestion and investment operations
                                    </h4>
                                </div>



                                <div className='text-[1.25rem] font-medium'>
                                    <h5 className='text-[1rem] font-medium'>Communication & Relationship Management</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Drive client acquisition and superior experiences
                                    </h4>
                                </div>

                                <div className="text-[1.25rem] font-medium">
                                    <h5 className='text-[1rem] font-medium' >Investment & Risk Management</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Improve client servicing
                                    </h4>
                                </div>
                            </div>

                            <div >
                                <img className="w-[31.25rem] h-[20.25rem] aspect-square" src={Img2} alt="Learning Illustration" />
                            </div>
                        </div>


                    </div>
                    <button><Link to='/successstory'> Explore XYZ company Success story</Link></button>
                </div>
            )
            }

            {/* Insurance */}

            {activeTab === "Insurance" && (
                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1.5rem] font-normal text-center ">Upskilling banking talent for a digital era</h2>

                        <div className="flex  w-[69.25rem]  gap-[1.875rem] ">
                            <div className=" flex flex-col gap-[1rem] w-[33.875rem]">



                                <h4 className="text-[.875rem] font-normal">Embracing innovation is essential for insurers determined to overcome legacy system hurdles and enhance operational efficiency. Discover how Global Life Insurance achieved a 35% upskilling increase to drive digital advancement in 30 days.</h4>
                                <div>

                                    <h5 className='text-[1rem] font-medium'>AI/ML</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Modernize claims processing and adjudication
                                    </h4>
                                </div>



                                <div className='text-[1.25rem] font-medium'>
                                    <h5 className='text-[1rem] font-medium'>Blockchain</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Ensure data immutability and build customer trust
                                    </h4>
                                </div>

                                <div className="text-[1.25rem] font-medium">
                                    <h5 className='text-[1rem] font-medium' >Data Analytics</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Personalize experiences, pinpoint risk and fraud
                                    </h4>
                                </div>
                            </div>

                            <div >
                                <img className="w-[31.25rem] h-[20.25rem] aspect-square" src={Img3} alt="Learning Illustration" />
                            </div>
                        </div>


                    </div>
                    <button><Link to='/companysuccess'>Uncover a XYZ company success</Link></button>
                </div>
            )
            }

            {/* Fintech & Payments */}

            {activeTab === "Fintech & Payments" && (
                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1.5rem] font-normal text-center ">Elevating FinTech growth through strategic learning</h2>

                        <div className="flex  w-[69.25rem]  gap-[1.875rem] ">
                            <div className=" flex flex-col gap-[1rem] w-[33.875rem]">



                                <h4 className="text-[.875rem] font-normal">Adapting to regulatory complexities is vital for fintech firms aiming to innovate while ensuring compliance. Uncover how Kushki improved onboarding times by 66% and realized $21,000 in cost savings from reduced certification training expenses.</h4>
                                <div>

                                    <h5 className='text-[1rem] font-medium'>Blockchain & Cryptocurrency</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Enable transparent, multi-currency payments
                                    </h4>
                                </div>



                                <div className='text-[1.25rem] font-medium'>
                                    <h5 className='text-[1rem] font-medium'>Cybersecurity</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Secure payment pipelines and financial data
                                    </h4>
                                </div>

                                <div className="text-[1.25rem] font-medium">
                                    <h5 className='text-[1rem] font-medium' >Data Science</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Improve analytics, forecasting, and decision-making
                                    </h4>
                                </div>
                            </div>

                            <div >
                                <img className="w-[31.25rem] h-[20.25rem] aspect-square" src={Img4} alt="Learning Illustration" />
                            </div>
                        </div>


                    </div>
                   <button><Link to='/trainingtransformation'>Explore XYZ company training transformation</Link></button>
                </div>
            )
            }


            {/* Financial services Consulting */}


            {activeTab === "Financial services Consulting" && (
                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1.5rem] font-normal text-center ">Leading transformation with agile learning strategies</h2>

                        <div className="flex  w-[69.25rem]  gap-[1.875rem] ">
                            <div className=" flex flex-col gap-[1rem] w-[33.875rem]">



                                <h4 className="text-[.875rem] font-normal">In a rapidly evolving consulting landscape, firms need to swiftly adapt to client demands and regulatory challenges. Discover how 4most accelerated soft skills content development by 80%, quickly equipping a third of their consultants to deliver greater value to clients.</h4>
                                <div>

                                    <h5 className='text-[1rem] font-medium'>Blockchain & Cryptocurrency</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Understand blockchain and crypto benefits for clients
                                    </h4>
                                </div>



                                <div className='text-[1.25rem] font-medium'>
                                    <h5 className='text-[1rem] font-medium'>Communication & Relationship Management</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Deliver superior experiences that improve client satisfaction
                                    </h4>
                                </div>

                                <div className="text-[1.25rem] font-medium">
                                    <h5 className='text-[1rem] font-medium' >Financial Analysis & Modeling</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Interpret data and build effective models
                                    </h4>
                                </div>
                            </div>

                            <div >
                                <img className="w-[31.25rem] h-[20.25rem] aspect-square" src={Img5} alt="Learning Illustration" />
                            </div>
                        </div>


                    </div>
                    <button><Link to='/trainingtransformation'>Uncover XYZ company success story</Link></button>
                </div>
            )
            }




        </div>
    );
}

