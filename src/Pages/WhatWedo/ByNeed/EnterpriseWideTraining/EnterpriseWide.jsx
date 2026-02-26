import React from "react";
import '../../../../Style/EnterpriseWide.css';
import Header from "../../../../Components/Header";
import Img1 from '../../../../assets/assets/WhatWedo/Enterpriseimage/Img1.jpg';
import Img2 from "../../../../assets/assets/WhatWedo/Enterpriseimage/Img2.png";
import featureImg1 from "../../../../assets/assets/WhatWedo/Enterpriseimage/featureImg1.png";
import featureImg2 from "../../../../assets/assets/WhatWedo/Enterpriseimage/featureImg2.png";
import featureImg3 from "../../../../assets/assets/WhatWedo/Enterpriseimage/featureImg3.png";
import Img3 from "../../../../assets/assets/WhatWedo/Enterpriseimage/Img3.png";
import Img4 from "../../../../assets/assets/WhatWedo/Enterpriseimage/Img4.png";
import Img5 from "../../../../assets/assets/WhatWedo/Enterpriseimage/Img5.png";
import Img6 from "../../../../assets/assets/WhatWedo/Enterpriseimage/Img6.png";
import { Link } from "react-router-dom";

// const EnterpriseWide = () => {
//   return (
//     <>
//       <div className="enterprise-wide-page">
//         <Header />
//         <div className="enterprise-wide-container ">
//           <div className="enterprise-wide-content bg-[lightgray] bg-[50%]"  style={{backgroundImage:`url(${Img1})`}}>
//             <div className="enterprise-wide-content-container">
//               <div className=" enterprise-wide-left-side">
//                 <h4>ENTERPRISE-WIDE TRAINING</h4>
//                 <h2>Upskill your entire workforce</h2>
//                 <div>Keep your people engaged and help them grow.</div>
//                 <Link to="/">
//                   <button>Request a Demo</button>
//                 </Link>
//               </div>

//               <div className="enterprise-wide-right-side">
//                 <img src={Img2} alt="" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* testimonials */}

//         <div className="enterprise-wide-container2">
//           <div className="enterprise-wide-container2-content">
//             <h1>Testimonials</h1>
//           </div>
//         </div>

//         <div className="enterprise-wide-container3">
//           <h2 className="enterprise-wide-title">
//             Empower Everyone to Level up with Learning
//           </h2>
//           <p className="enterprise-wide-subtitle">
//             Motivate and support employees with training and guidance.
//           </p>

//           <div className="enterprise-wide-grid">
//             {/* Card 1 */}
//             <div className="enterprise-wide-card">
//               <img
//                 src={featureImg1}
//                 alt="Boost employee engagement"
//                 className="enterprise-wide-img1"
//               />
//               <div>Boost employee engagement</div>
//               <p>
//                 Build a culture of learning at your organization with an
//                 extensive collection of in-demand courses that are ready when
//                 they are.
//               </p>

//              {/* button */}

//               <div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]' >
//                 {/* view courses open */}
//               <span>Learn More</span>
//             </div>
//             </div>

//             {/* Card 2 */}
//             <div className="enterprise-wide-card2">
//               <img
//                 src={featureImg2}
//                 alt="Support growth with on-demand courses"
//                 className="enterprise-wide-img2"
//               />
//               <div>Support growth with on-demand courses</div>
//               <p>
//                 Grow your people and your business by offering top-rated courses
//                 on the topics they need to stay current, develop, and grow.
//               </p>
//               {/*   on demand course page open */}

//              <button> <Link to='/ondemandcourse' >Learn More</Link> </button>
//             </div>

//             {/* Card 3 */}
//             <div className="enterprise-wide-card3">
//               <img
//                 src={featureImg3}
//                 alt="Build next-level programs"
//                 className="enterprise-wide-img3"
//               />
//               <div>Build next-level programs</div>
//               <p>
//                 We'll work with you to develop and implement plans to improve
//                 skills development and employee retention.
//               </p>
//              {/* button */}
//              < div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]' >
//              {/*  dedicated customer success team page open */}
//               <span><Link to='/dedicatedcustomersuccessteam'>  Learn More</Link></span>
//             </div>
//             </div>
//           </div>
//         </div>

//         {/* container 4 */}

//         <div className="enterprise-wide-container4">
//           <div className="enterprise-wide-container4-content">
//             <div className="enterprise-wide-container4-content-left">
//               <h2>Tour the CodeIQGenius Business platform</h2>
//               <div>
//                 Take the interactive tour to see how our platform can transform
//                 the way your team learns and grows.
//               </div>
//               <button>Start Tour</button>
//             </div>

//             <div className="enterprise-wide-container4-content-right">
//               <img src={Img3} alt="" />
//             </div>
//           </div>
//         </div>


// {/* constiner 5 */}
//         <div className="enterprise-wide-container5">
//           <div className="enterprise-wide-container5-content">
//             {/* left side */}
//             <div className="enterprise-wide-container5-content-left">
//               <h2>Scale AI fluency across your organization</h2>
//               <p>
//                 Our new AI Packages help employees at all levels understand,
//                 communicate about, and implement AI solutions with confidence
//                 and ethical awareness.
//               </p>
//               <button><Link to='/aicontact'> Contact  Us</Link></button>
//             </div>

// {/* right side */}
//             <div className="enterprise-wide-container5-content-right">
//               <img src={Img4} alt="" />
//             </div>
//           </div>
//         </div>

// {/* container 6 */}
//         <div className="learning-container">
//           {/* Top Box */}
//           <div className="learning-box">
//             <h2 className="learning-heading">Scale learning the easy way</h2>

//             <div className="learning-content">
//               <div className="learning-text">
//                 <div className="">
//                   <h5>Boost learning and reduce training costs</h5>
//                   <div>
//                     When you choose a learning partner with integrated solutions
//                     to meet all of your needs, you'll be able to stop managing
//                     multiple learning providers and start saving tons of time.
//                   </div>
//                 </div>

//                 <h5>Identify and bridge skills gaps with support from data</h5>
//                 <div>
//                   With assessments, skills mapping, and user engagement
//                   insights, you can easily identify areas for development across
//                   your entire organization. Then train employees on exactly what
//                   they need to learn next to help drive business results.
//                 </div>
//                 <div className="">
//                   <h5>Improve employee retention and mobility</h5>
//                   <div>
//                     Help drive professional and business growth with
//                     personalized learning paths and team training for
//                     future-focused skills development.
//                   </div>
//                 </div>
//               </div>

//               <div className="learning-image">
//                 <img src={Img5} alt="Learning Illustration" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Gradient Section  7 or container 7 */}
//         <div className="gradient-section bg-[lightgray] bg-[position:50%] bg-cover bg-no-repeat shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]" style={{backgroundImage:`url(${Img6})`}}>
//           <div className=" flex flex-col justify-center items-center h-96">
//             <h2>
//               Explore Our Integrated Learning Solutions For Everyone At Your
//               Organization
//             </h2>
//             <button className="learn-more-btn">Learn More</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EnterpriseWide;

const EnterpriseWide = () => {
  return (
    <div className="w-full bg-[#fafafa]">
      <Header />

      {/* Hero Section */}
      <div
        className="h-[441px] bg-cover bg-center flex items-center justify-evenly"
        style={{ backgroundImage: `url(${Img1})` }}
      >
        <div className="flex items-center justify-evenly w-full max-w-[1200px]">
          <div className="flex flex-col text-left">
            <h4 className="text-[#0c316e] text-[16px] font-semibold font-poppins">
              ENTERPRISE-WIDE TRAINING
            </h4>
            <h2 className="text-black text-[36px] font-medium font-poppins capitalize">
              Upskill your entire workforce
            </h2>
            <div className="text-black text-[14px] font-poppins mb-[30px] capitalize">
              Keep your people engaged and help them grow.
            </div>
            <Link to="/">
              <button className="inline-flex px-10 py-3 bg-[#2800AE] text-white font-semibold rounded-md shadow-[ -1px_4px_12px_rgba(12,49,110,0.1)]">
                Request a Demo
              </button>
            </Link>
          </div>
          <img src={Img2} alt="Training" className="w-[620px] h-[412px]" />
        </div>
      </div>

      {/* Testimonials */}
      <div className="h-[250px] flex justify-center items-center mt-40">
        <h1 className="text-[24px] font-semibold font-poppins text-black">
          Testimonials
        </h1>
      </div>

      {/* Cards Section */}
      <div className="text-center px-5 max-w-[1200px] mx-auto">
        <h2 className="text-[30px] font-semibold text-black font-poppins">
          Empower Everyone to Level up with Learning
        </h2>
        <p className="text-[20px] font-normal text-black font-poppins">
          Motivate and support employees with training and guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[118px] py-20">
          {/* Card 1 */}
          <div className="flex flex-col items-center gap-2">
            <img src={featureImg1} alt="Feature 1" className="w-[250px] h-[250px]" />
            <div className="text-[#1e1e1e] text-[16px] font-semibold font-poppins text-center">
              Boost employee engagement
            </div>
            <p className="w-[287px] text-[#1e1e1e] text-[12px] font-normal font-poppins text-center">
              Build a culture of learning at your organization with an extensive
              collection of in-demand courses that are ready when they are.
            </p>
            <div className="rounded-[4px] border border-[#0c316e] bg-white shadow-[ -0.75px_3px_9px_rgba(12,49,110,0.10)] flex justify-center items-center px-20 py-2.5">
              <span className="text-[#0c316e] text-[12px] font-medium">Learn More</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center gap-2 px-3">
            <img src={featureImg2} alt="Feature 2" className="w-[279px] h-[217px]" />
            <div className="text-[#1e1e1e] text-[16px] font-semibold font-poppins text-center w-4/5">
              Support growth with on-demand courses
            </div>
            <p className="w-[287px] text-[#1e1e1e] text-[12px] font-normal font-poppins text-center">
              Grow your people and your business by offering top-rated courses
              on the topics they need to stay current, develop, and grow.
            </p>
            <button className="px-20 py-2.5 bg-[#0c316e] text-white rounded-md shadow-[ -0.75px_3px_9px_rgba(12,49,110,0.10)]">
              <Link to="/ondemandcourse">Learn More</Link>
            </button>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center gap-8">
            <img src={featureImg3} alt="Feature 3" className="w-[325px] h-[190px]" />
            <div className="text-[#1e1e1e] text-[16px] font-semibold font-poppins text-center">
              Build next-level programs
            </div>
            <p className="w-[287px] text-[#1e1e1e] text-[12px] font-normal font-poppins text-center">
              We'll work with you to develop and implement plans to improve
              skills development and employee retention.
            </p>
            <div className="rounded-[4px] border border-[#0c316e] bg-white shadow-[ -0.75px_3px_9px_rgba(12,49,110,0.10)] flex justify-center items-center px-20 py-2.5">
              <Link
                to="/dedicatedcustomersuccessteam"
                className="text-[#0c316e] text-[12px] font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Container 4 */}
      <div className="w-[1129px] h-[373px] mx-auto rounded-[62px] bg-gradient-to-r from-[#2188e7] to-[#afe8f3] shadow-[ -1px_4px_12px_rgba(12,49,110,0.1)] flex justify-center items-center gap-12">
        <div className="flex flex-col justify-center items-center w-[676px]">
          <h2 className="text-black text-[36px] font-medium font-poppins text-center">
            Tour the CodeIQGenius Business platform
          </h2>
          <div className="w-[394px] text-[14px] text-black font-normal font-poppins text-center mb-4">
            Take the interactive tour to see how our platform can transform the
            way your team learns and grows.
          </div>
          <button className="px-4 py-2 bg-white border border-[#0c316e] rounded-md">
            Start Tour
          </button>
        </div>
        <img src={Img3} alt="Tour" className="w-[250px] h-[248px] rounded-[28px]" />
      </div>

      {/* Container 5 */}
      <div className="relative overflow-hidden flex h-[450px] px-[209px] py-[89px] bg-gradient-to-r from-[#1E1E1E] to-[#000080] mt-40">
        <div className="flex flex-col justify-center items-center text-center text-white z-10">
          <h2 className="text-[24px] font-medium font-poppins">
            Scale AI fluency across your organization
          </h2>
          <p className="w-[460px] text-[14px] font-normal font-poppins text-white">
            Our new AI Packages help employees at all levels understand,
            communicate about, and implement AI solutions with confidence and
            ethical awareness.
          </p>
          <button className="px-6 py-2 bg-white text-[#0c316e] rounded-md mt-2">
            <Link to="/aicontact">Contact Us</Link>
          </button>
        </div>
        <img
          src={Img4}
          alt="AI"
          className="absolute right-6 -top-[105px] w-[676px] h-[639px] rotate-[-16.944deg] rounded-sm"
        />
      </div>

      {/* Container 6 */}
      <div className="w-[1350px] mx-auto flex flex-col items-center gap-8 my-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-[36px] font-medium font-poppins text-center mb-8">
            Scale learning the easy way
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-6 px-6">
            <div className="flex flex-col gap-6 w-full lg:w-[542px]">
              <div>
                <h5 className="text-[24px] font-medium font-poppins">
                  Boost learning and reduce training costs
                </h5>
                <p className="text-[14px] font-normal font-poppins">
                  When you choose a learning partner with integrated solutions
                  to meet all your needs, you'll save time managing multiple
                  providers.
                </p>
              </div>
              <div>
                <h5 className="text-[24px] font-medium font-poppins">
                  Identify and bridge skills gaps with support from data
                </h5>
                <p className="text-[14px] font-normal font-poppins">
                  Use assessments, skills mapping, and insights to train
                  employees on what they need to learn next.
                </p>
              </div>
              <div>
                <h5 className="text-[24px] font-medium font-poppins">
                  Improve employee retention and mobility
                </h5>
                <p className="text-[14px] font-normal font-poppins">
                  Drive professional and business growth with personalized
                  learning paths and team training.
                </p>
              </div>
            </div>
            <img src={Img5} alt="Learning" className="w-[630px] h-[420px]" />
          </div>
        </div>
      </div>

      {/* Gradient Section 7 */}
      <div
        className="w-full h-[373px] bg-cover bg-center bg-no-repeat shadow-[ -1px_4px_12px_rgba(12,49,110,0.10)] flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${Img6})` }}
      >
        <h2 className="text-[22px] text-black mb-4 font-medium font-poppins max-w-[600px]">
          Explore Our Integrated Learning Solutions For Everyone At Your
          Organization
        </h2>
        <button className="px-4 py-2 bg-[#0C316E] text-white rounded-md">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default EnterpriseWide;
