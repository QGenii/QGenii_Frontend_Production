import React from 'react'

import DcserviceteamRequestDemo from "../../assets/assets/DedicatedCustomerSuccessTeam/DcserviceteamRequestDemo.jpg";
import Header from '../../Components/Header';
import FormSection from '../../Components/FormSection';
import TestimonialSection from '../../Components/TestimonialSection';



const RequestDemo = () => {
  return (
    <div className="page-content">
      <Header />
      <section className="main-section">
        <div className="main-container">
          {/* Left Content */}
          <div className="main-left">
            <h2 className="main-title ">Accelerate your success</h2>
            {/* <h4 className="main-subtitle text-[1.25rem] font-medium">
               
              </h4> */}

            <p className="main-highlight">
              You have goals. Our Professional Services team can help you achieve them.
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
                  Seamlessly launch and sustain effective learning and development initiatives
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
                  Elevate your organization’s learning ecosystem with tailored strategic guidance
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
                  Boost skills development with curated content from 30,000+ courses in 16 languages
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
                  Gain end-to-end strategy and support from a learning program manager
                </li>
              </div>


            </ul>
          </div>

          {/* Right Image */}
          <div className="main-right">
            <img src={DcserviceteamRequestDemo} alt="handshake" />
          </div>
        </div>
      </section>


      {/* import from component */}
      <div>
        <FormSection />
      </div>

      {/* import from component */}
      <div > <TestimonialSection /></div>

    </div>

  )
}

export default RequestDemo