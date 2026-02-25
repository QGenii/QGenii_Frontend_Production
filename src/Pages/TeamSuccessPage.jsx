import React from "react";
import Header from "../Components/Header";
import teamsuccessImage1 from "../assets/assets/images/teamsuccessImage1.png";
import ContentImage3 from "../assets/assets/ContentImage3.png";
import { useForm } from "react-hook-form";
import "../style/TeamSuccessPage.css";
import ContentImage2 from "../assets/assets/ContentImage2.jpg";


const TeamSuccessPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      companyName: data.companyName,
      NumberOfPeople: data.NumberOfPeople,
      password: data.password,
      jobLevel: data.jobLevel,
      trainingNeed: data.trainingNeed,
    };

    console.log(userData);
  };
  return (
    <>
      <div className="team-success-page">
        <Header />
        <section className="team-success-section">
          <div className="team-success-container">
            {/* Left Content */}
            <div className="team-success-left">
              <h2 className="team-success-title ">Drive your team's success</h2>
              <div className="team-success-subtitle">
                Join Team Plan today and upskill your employees.
              </div>

              <ul className="team-success-list">
                <div className="flex ">
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
                      fill-opacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      stroke-width="1.2"
                    />
                  </svg>
                  <li>For teams and organizations of 2-20 people</li>
                </div>

                <div className="flex">
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
                      fill-opacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      stroke-width="1.2"
                    />
                  </svg>

                  <li>On-demand access to 13,000+ top courses</li>
                </div>

                <div className="flex">
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
                      fill-opacity="0.21"
                    />
                    <path
                      d="M8.5 11L11.394 13.894C11.4221 13.9221 11.4602 13.9379 11.5 13.9379C11.5398 13.9379 11.5779 13.9221 11.606 13.894L19.5 6"
                      stroke="#1AA639"
                      stroke-width="1.2"
                    />
                  </svg>
                  <li>Custom logo and URL</li>
                </div>
              </ul>
            </div>

            {/* Right Image */}
            <div className="team-success-right">
              <img src={teamsuccessImage1} alt />
            </div>
          </div>
        </section>

        <div className="relative">
          <div className=" absolute  bottom-20  left-60 w-200 ">
            <p className="terms ">
              By signing up, you agree to our <a href="#">Terms of Use</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </p>
            <p className="terms">
              {" "}
              By signing up, you agree to our <a href="#"> Use</a> and{" "}
              <a href="#">Privacy Policy</a>. You agree that we can contact you
              about CodeIQGenius and use data from third parties to personalize
              your experience.
            </p>
          </div>

          <section className="team-success-form-section bg-[lightgray] bg-[50%] bg-cover bg-no-repeat " style={{backgroundImage:`url(${ContentImage2})`
          }}>
            <div className=" team-success-form-container">
              {/* Left Image */}
              <div className="team-success-form-left">
                <img src={ContentImage3} alt="" />
              </div>

              {/* Right Form */}
              <div className="team-success-form-right">
                <h2 className="team-success-form-title">Fill Your Details</h2>
                <form
                  className="team-success-details-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* Row 1 */}
                  <div className="team-success-form-row">
                    <div className="team-success-form-group ">
                      <label>
                        First Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your First Name"
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && (
                        <p className="error">First Name is required</p>
                      )}
                    </div>

                    <div className="team-success-form-group">
                      <label>
                        Last Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Last Name"
                        {...register("lastName", { required: true })}
                      />
                      {errors.lastName && (
                        <p className="error">Last Name is required</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="team-success-form-row">
                    <div className="team-success-form-group">
                      <label>
                        Work Email<span>*</span>
                      </label>
                      <input
                        className="email-input"
                        type="email"
                        placeholder="Enter Your Work Email Address"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      {errors.email && (
                        <p className="error">Valid Email is required</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="team-success-form-row">
                    <div className="team-success-form-group">
                      <label>
                        Phone Number<span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Phone Number"
                        {...register("phone", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      {errors.phone && (
                        <p className="error">Phone Number is required</p>
                      )}
                    </div>
                    <div className="team-success-form-group">
                      <label>
                        Job Title<span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Job Title"
                        {...register("password", { required: true })}
                      />
                      {errors.password && (
                        <p className="error">Job Title is required</p>
                      )}
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="team-success-form-row">
                    <div className="team-success-form-group">
                      <label>
                        Company Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Company Name ,City"
                        {...register("companyName", { required: true })}
                      />
                      {errors.companyName && (
                        <p className="error">{errors.companyName.message}</p>
                      )}
                    </div>

                    <div className="team-success-form-group">
                      <label>
                        Number of people to train<span>*</span>
                      </label>
                      <select
                        {...register("NumberOfPeople", { required: true })}
                      >
                        <option value="">Select number of people</option>
                        <option value="1-50">1-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="500+">500+</option>
                      </select>
                      {errors.NumberOfPeople && (
                        <p className="error">
                          <span>Number of people to train is required</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="team-success-form-row">
                    
                    <div className="team-success-form-group   ">
                      <label className=" absolute -top-4 left-17">
                        Custom Account Subdomain<span>*</span>
                        
                      </label>
                      <div className="custom-account flex items-center  gap-1 mt-3">
                         <span className=" ">https://</span>  <input type="email"  className="email-input " placeholder="Enter Your Work Email Address" {...register("jobLevel", { required: true })}>
                      
                      </input>
                      <span className=" ">codeiqgenious.com</span>
                      </div>
                      
                      {errors.jobLevel && (
                        <p className="error">Job Level is required</p>
                      )}
                    </div>
                  </div>
                  {/* <div className="subdomain-container">
                    <label className="subdomain-label">
                      Custom Account Subdomain*
                    </label>
                    <div className="subdomain-box">
                      <span className="prefix">https://</span>
                      <input
                        type="text"
                        placeholder="Enter Your Work Email Address"
                        className="subdomain-input"
                      />
                      <span className="suffix">.codeiqgenius.com</span>
                    </div>
                  </div> */}

                  {/* Row 6 */}
                  <div className="team-success-form-group full-width">
                   <div className="team-success-form-group">
                      <label>
                        Password(min 6 digits)<span>*</span>
                      </label>
                      <input className="password-input"
                        type="password"
                        placeholder="Enter Your Password"
                        {...register("password", { required: true })}
                      />
                      {errors.password && (
                        <p className="error">Password is required</p>
                      )}
                    </div>
                  </div>

                  <div className="team-success-form-footer">
                    <div className="team-success-submit-btn">
                      <button type="submit">Sign Up</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TeamSuccessPage;
