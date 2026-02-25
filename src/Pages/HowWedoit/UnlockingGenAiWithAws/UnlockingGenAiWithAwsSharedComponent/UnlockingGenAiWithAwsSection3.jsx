
import React from 'react'


export default function UnlockingGenAiWithAwsSection3() {
    const items = [
        {
            title: "Name of the Person",
            body:
                "About the people",


        },
        {
            title: "Name of the Person",
            body:
                "About the people",


        },
        {
            title: "Name of the Person",
           body:
                "About the people",


        },
        {
            title: "Name of the Person",
           body:
                "About the people",


        },
        
     
    ];

    return (
        <section className="w-full mx-auto mt-[4rem] py-[2.12rem] bg-[linear-gradient(103deg,#59BAFF_-1.77%,#FF87FB_103.86%)] min-h-screen " >
            <div className="flex flex-col items-center justify-center gap-[1.88rem]">
                {/* Heading */}
                <header className=" flex flex-col items-center justify-center ">
                    
<h1 className=' text-[1.5rem] font-medium '>Authors</h1>
                </header>

                {/* Cards */}
                <div className="flex flex-wrap justify-center items-center gap-x-[2.5rem] gap-y-[1.88rem]">
                    {items.map((item, idx) => (
                        <article
                            key={idx}
                            className={` flex flex-col items-end gap-[0.62rem] w-[22.5rem] h-[16.9375rem] p-[1.5rem_2.625rem_2.25rem_2.625rem] rounded-[1.25rem] border border-[rgba(40,0,174,0.17)] bg-[#F9FAFB] shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10)]`}

                        >

                            <div>
                               
                            </div>

                            <div className="flex flex-col items-center justify-center gap-[0.937rem] w-[17.1875rem] ">
                                <div className='w-[8.6875rem] gap-[0.937rem] flex flex-col justify-center items-center '>
                                    <div className='w-[6.25rem] h-[6.25rem] rounded-[6.25rem] border border-[#2800AE]  bg-[lightgray] bg-center bg-cover bg-no-repeat shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)]'></div>

                                    <h4 className='text-[0.875rem] font-poppins font-normal'>Name of the Person</h4>
                                </div>

                                <div className='flex flex-col justify-center items-start  w-full '>
                                   
                                    <h4 className="text-[0.625rem] font-normal  text-[#1E1E1E] ">
                                        {item.body}
                                    </h4>
                                </div>

                            </div>

                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
