import React from "react";


import { useForm } from "react-hook-form";


import { useNavigate } from "react-router-dom";

import Img2 from '../../../../assets/CodeIQGenius/MainPage/CohortLearningRequestDemo/Img2.jpg';



const MainContentForm = () => {
  const navigate = useNavigate();
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
      companySize: data.companySize,
      jobTitle: data.jobTitle,
     
      trainingNeed: data.trainingNeed,
      noOfPeople: data.noOfPeople,

    };
    // alert("successfully submitted");
    navigate('/successpage');
      window.scrollTo(0, 0); // scroll to top after navigation

    console.log(userData);
  };
  return (
    <>
      
    
       

        <div className="relative">
          <div className=" absolute  bottom-9  left-80 w-200 ">
            <p className="terms ">
              By signing up, you agree to our <a href="#">Terms of Use</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </p>
         
          </div>

          <div className=" bg-[lightgray] bg-[50%] bg-cover bg-no-repeat w-[60rem] h-[35rem] mx-auto border-1 rounded-[0.625rem]" style={{backgroundImage:`url(${Img2})`}}>
            <div    className=" w-[60rem] h-[35rem]  px-[4rem]">
              {/* Left Image
              <div className="form-left">
                <img src='' alt="" />
              </div> */}

              {/* Right Form */}
              <div className="form-right" >
                <h2 className="form-title">Fill Your Details</h2>
                <form
                  className="details-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* Row 1 */}
                  <div className="form-row">
                    <div className="form-group ">
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

                    <div className="form-group">
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
                  <div className="form-row">
                    <div className="form-group">
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
                  <div className="form-row">
                    <div className="form-group">
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
                    <div className="form-group">
                      <label>
                        Location<span>*</span>
                      </label>
                      <select {...register("location", { required: true })}>
                        <option value="">Select Your Location</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>  
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>

                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        
                      </select>
                      {errors.location && (
                        <p className="error">Location is required</p>
                      )}
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Company Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Company Name"
                        {...register("companyName", { required: true })}
                      />
                      {errors.companyName && (
                        <p className="error">Company Name is required</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        Company Size<span>*</span>
                      </label>
                      <select {...register("companySize", { required: true })}>
                        <option value="Freelancer/Contractor">Freelancer/Contractor</option>
                        <option value="1-199">1-199</option>
                        <option value="200-299">200-299</option>
                        <option value="300-399">300-399</option>
                        <option value="1000-5000">1000-5000</option>
                        <option value="1000-5000">5001+</option>
                      </select>
                      {errors.companySize && (
                        <p className="error">Company Size is required</p>
                      )}
                    </div>
                  </div>

                 

                  {/* Row 5 */}
                  <div className="form-row">
                     <div className="form-group">
                      <label>
                        No of people to train<span>*</span>
                      </label>
                      <select  className="noOfPeople-select"

                        {...register("noOfPeople", { required: true })}>
                        <option value="My Self">My Self</option>
                        <option value="2-20">2-20</option>
                        <option value="21-40">21-40</option>
                        <option value="41-60">41-60</option>
                        <option value="100-500">100-500</option>
                        <option value="501-5000">501-5000</option>
                        <option value="5000=+">5000+</option>
                        
                      </select>
                      {errors.noOfPeople && (
                        <p className="error">No of pepole is required</p>
                      )}
                    </div>
                  </div>






                  <div className="form-footer">
                    <div className="submit-btn">
                      <button type="submit">Submit Form</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

       {/* <Form1/> */}
     



    </>
  );
};

export default MainContentForm;
