import React, { useState } from "react";
// import Signup_page from "../../../public/Signup_page.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import {useNavigate} from 'react-router-dom'



const Signup = ()=> {
    
    const [form, setForm] = useState({
    name:"",
    email:"",
   
});
    const navigate=   useNavigate()

   



    const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value})
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();

         const data=new FormData()
       data.append("name",form.name);
       data.append("email",form.email);

      


        // you can send signup data here
    navigate("/otp", { state: { email: "xyz@gmail.com" } }); 
      
      };
 

      
       


  return (
    <div className="w-full py-16 px-6 flex flex-col items-center ">
      {/* Heading */}
      <h2 className="text-[1.875rem] md:text-3xl font-semibold text-center mb-10">
        Start Your premium Learning Journey
      </h2>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-[15rem] items-center max-w-5xl w-full ">
        {/* Signup Form */}
        <div className=" shadow-lg rounded-2xl p-8 h-[30.75rem] w-[30.75rem] ">
          <h4 className="text-[1.5rem] font-medium text-center mb-6">
            Sign up with Email
          </h4>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[0.875rem] font-medium block ">Full Name</label>
              <input onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 outline-none text-[0.875rem] "
              />
            </div>

            <div>
              <label className="text-[0.875] font-medium block ">Email</label>
              <input onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 outline-none  text-[0.875rem]"
              />
            </div>
 

 <div className="flex  flex-col justify-center items-center">
            <button
              type="submit"
              className="   bg-[#0D2A66] text-white font-medium py-3 rounded-lg  transition  gap-2"
               >
              Continue →
            </button>
</div>

          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-[#1f1f1f]" />
            <span className="px-2 text-sm text-[#1f1f1f]">Or</span>
            <hr className="flex-1 border-[#1f1f1f]" />
          </div>

          {/* Social Signup */}
          <div className="flex justify-center gap-[3.12rem]">
            
              <FcGoogle size={22}  />
          
            
              <FaApple size={22} className="text-black" />
           
            
              <FaFacebook size={22}  />
            
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Login Link */}
          <p className="text-[0.75rem] text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="#" className="text-[#0C316E] text-[0.75rem] font-medium ">
              Login
            </a>
          </p>
        </div>

        {/* Illustration (replace with your image) */}
        <div className="flex  h-[33.5rem] w-[33.5rem] aspect-square ">
          <img
            src='../../../public/Signup_page.png'
            alt="Learning signup"
            className="w-80 md:w-[400px]"
          />
        </div>


      </div>


     




    </div>
  );
}

export default Signup