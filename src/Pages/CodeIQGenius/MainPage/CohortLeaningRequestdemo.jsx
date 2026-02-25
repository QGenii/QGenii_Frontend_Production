import React from 'react'

import Img1 from '../../../assets/CodeIQGenius/MainPage/CohortLearningRequestDemo/Img1.jpg';

import Header from '../../../Components/Header';
import FormSection from './CohortLearnRequestdemoComponent/FormSection';
import TestimonialSection from '../../../Components/TestimonialSection';



const RequestDemo = () => {
  return (
       <div className="page-content">
        <Header/>
        <section className="main-section">
          <div className="main-container">
            {/* Left Content */}
            <div className="main-left">
              <h2 className="main-title w-[35.2rem] text-[1.5rem] font-normal ">Develop your leaders at scale with IQ Business Leadership Academys</h2>
              {/* <h4 className="main-subtitle text-[1.25rem] font-medium">
               
              </h4> */}
              <h4 className='main-subtitle'>See why leading organizations choose Udemy Business as their destination for leadership development.</h4>

              <p className="main-highlight">
          Speak with us today to discuss:
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
                    How our Leadership Academy programs help you drive business results
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
           A potentially cheaper, faster, and better alternative to in-person, instructor-led training
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
                  The critical skills your leaders need to build high-performance cultures across hybrid teams
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
                  More information and pricing for our virtual cohort solution
                  </li>
                </div>

               
              </ul>
            </div>

            {/* Right Image */}
            <div className="main-right">
              <img src={Img1} alt="handshake" />
            </div>
          </div>
        </section>

      
{/* import from component */}
    <div>
    <FormSection/>
    </div>

{/* import from component */}
<div > <TestimonialSection/></div>
       
      </div>

  )
}

export default RequestDemo