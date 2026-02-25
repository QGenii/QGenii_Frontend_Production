import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'AI-assisted coding (GitHub Copilot, Tabnine, Cursor)',
    'Prompt engineering for developers',
    'Full-stack application development with Vibe coding approach',
    'API integration and automation',
    'Python, JavaScript, and Java development with AI',
    'AI-powered debugging and code refactoring',
    'Best practices for AI tool adoption',


];


const AiDrivenForDeveloper = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>AI-Driven Developer Productivity</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path introduces AI-powered tools to boost developer productivity, including GitHub Copilot, ChatGPT, Cursor, Tabnine, and Vibe Coding. Learners will explore AI-assisted coding, prompt engineering, full-stack development automation, API integration, and best practices for leveraging generative AI in software development. The path covers practical applications across Python, JavaScript, Java, and modern frameworks, emphasizing real-world projects and workflow enhancements.</h5>

                </div>

                {/* section 2 */}
                <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


                    <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

                        <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

                        {/* Top Tabs */}
                        <div className=" flex gap-[1.5rem] flex-wrap justify-center items-center  w-[71.15rem]  ">
                            {tabs.map((tab) => (
                                <span
                                    key={tab}

                                    className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.75rem] cursor-pointer bg-[lightgray] bg-center bg-cover max-w-[17rem] text-center" style={{ backgroundImage: `url(${bgimg1}) `, }}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>

                    </div>







                </div>

                {/* section 3 */}
                <div >
                    <div className='w-[71.871rem]  flex flex-col justify-center item-start  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Target audience:</h4>
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for software developers, engineers, and tech enthusiasts seeking to enhance their productivity with AI-driven tools. It is suitable for both beginners and experienced programmers interested in automating workflows, accelerating coding tasks, and building AI-powered applications using modern development environments.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Leverage AI Coding Assistants: Utilize GitHub Copilot, Tabnine, and Cursor to accelerate code generation, automate boilerplate, and enhance code quality across multiple programming languages.</li>
                            <li className='text-[0.875rem] font-normal '>Apply Prompt Engineering Techniques: Master prompt engineering with ChatGPT to improve code generation, debugging, and iterative development workflows.</li>
                            <li className='text-[0.875rem] font-normal '>Automate Full-Stack Development: Build and deploy full-stack applications using AI tools like Cursor, integrating APIs, authentication, and deployment pipelines.</li>
                            <li className='text-[0.875rem] font-normal  '>Integrate and Utilize APIs: Employ Python and JavaScript libraries to automate tasks, interact with external APIs, and create AI-driven applications such as chatbots and data analysis tools.</li>
                            <li className='text-[0.875rem] font-normal  '>Implement Best Practices for AI-Driven Development: Understand privacy, security, and productivity considerations when integrating AI tools into software development processes.</li>



                        </div>
                    </div>


                </div>



            </div>
            {/* section 4 */}
            <div className=" mt-[8rem]  bg-[lightgray] bg-gradient-to-r from-[#1E1E1E] to-[#000080]">
                {/* <div className=' '> */}
                <div className="flex flex-col justify-center items-center h-[19rem] gap-[2.5rem] w-full">
                    <h2 className=' w-full text-[2rem]  text-center text-white'>
                        Make AI your ally with an AI Starter Path
                    </h2>
                    <button className="learn-more-btn"><Link to='/requestdemo'>Contact now</Link></button>
                </div>

            </div>

        </div>
    )
}

export default AiDrivenForDeveloper;
