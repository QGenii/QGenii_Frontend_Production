import React, { useState } from "react";
import "../Style/MailPage.css";
import MailConfirmPage from "../pages/MailConfirmationPage.jsx";
import emailjs from '@emailjs/browser';

const MailPage = ({onClose}) => {

  
const [email, setEmail] = useState("")


   const [showMailConfirmPage, setShowMailConfirmPage] = useState(false)


   
const sendEmail = async (e) => {
  e.preventDefault()

  // console.log("Resending OTP email with value:", otpValue);

  try {
    // emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,   // ✅ Service ID
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // ✅ Template ID
      {
              // must match variable in template
        email
        
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    console.log(" email sent successfully ✅");
  } catch (error) {
    console.error("Failed to send email ❌", error);
  }
};

  

  return (
    <div className="mail-page">
    <div className="mail-page-container">
      <div className="mail-page-header">
        <h2>CodeIQGenius Bussiness</h2>
      </div>

      <div className="mail-page-Content">
        <form action="" className="mail-page-form" onSubmit={sendEmail}>
          <div className="mail-page-input">
            {" "}
            <label>
              {" "}
              Work Email <span>*</span>
            </label>
            <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Work Email Address"  />
          </div>

          <div className="btn-container">
            <button type="submit" className="send-btn" onClick={() => setShowMailConfirmPage(true)}>
              Send
            </button>
          </div>
          {showMailConfirmPage && <MailConfirmPage onClose={onClose} />}
        </form>
      </div>
    </div>
    </div>
  );
};

export default MailPage;
