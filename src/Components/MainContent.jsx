import React from "react";
import "../style/MainContent.css";


import ContentImage1 from "../assets/ContentImage1.jpg";

import FormSection from './FormSection';




const MainContent = () => {
 

  return (
    <>
        {/* <Navbar/> */}
      <div className="page-content">
        <section className="main-section">
          <div className="main-container">
            {/* Left Content */}
            <div className="main-left">
              <h2 className="main-title ">Get Your Demo</h2>
              <p className="main-subtitle">
                Tell us your needs and we'll start off a custom plan to drive
                results.
              </p>

              <p className="main-highlight">
                With CodeIQGenius as your learning partner, you can:
              </p>

              <ul className="main-list">
                <div className="main-list-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      fill="#1AA639"
                      fillOpacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <li>
                    Train your entire workforce with over 30,000+ courses in 16
                    languages
                  </li>
                </div>

                <div className="main-list-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      fill="#1AA639"
                      fillOpacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <li>
                    Prep employees for over 200 industry-recognized
                    certification exams
                  </li>
                </div>

                <div className="main-list-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      fill="#1AA639"
                      fillOpacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <li>
                    Develop highly skilled tech teams in risk-free practice
                    environments
                  </li>
                </div>

                <div className="main-list-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      fill="#1AA639"
                      fillOpacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <li>
                    Identify emerging skills gaps, learning trends, and industry
                    benchmarks
                  </li>
                </div>

                <div className="main-list-div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      fill="#1AA639"
                      fillOpacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <li>
                    Integrate content with your existing learning management
                    system
                  </li>
                </div>
              </ul>
            </div>

            {/* Right Image */}
            <div className="main-right">
              <img src={ContentImage1 } alt="handshake" />
            </div>
          </div>
        </section>

      
{/* import formsection  from component */}
       <FormSection/>
      </div>



    </>
  );
};

export default MainContent;
