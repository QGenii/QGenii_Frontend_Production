// import React, { useState } from "react";
import { useEffect } from "react";
import "../style/MailConfirmationPage.css";

const 
MailConfirmationPage = ({onClose}) => {



    // useEffect(() => {
        
    //       onClose();
        
    //   }, []);

  return (

   <div  onClick={onClose} className='flex justify-center fixed top-0 left-0 w-full h-full bg-black/50  items-center justify-content-center z-1 '  >
    <div className="mail-confirmation-page ">
    <div className="mail-confirmation-page-container">
      <div className="mail-confirmation-page-header">
        <h2>CodeIQGenius Bussiness</h2>
      </div>

      <div className="mail-confirmation-page-Content">
           <div id="checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" width="89" height="90" viewBox="0 0 89 90" fill="none">
<path d="M88.2905 43.3332C88.2905 67.2655 68.8895 86.6666 44.9572 86.6666C21.0249 86.6666 1.62378 67.2655 1.62378 43.3332C1.62378 19.4009 21.0249 0 44.9572 0C68.8895 0 88.2905 19.4009 88.2905 43.3332Z" fill="#1AA639"/>
<path d="M25.8281 43.4064L38.5318 56.1102L64.0863 30.5557" stroke="white" stroke-width="6.875" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
           </div>
           
           <h4>Please check your mail inbox</h4>
           <p>If you have a CodeIQBusiness account associated with entered email address, we will email you a log in link.</p>
           <p>If you haven't received the email in 30 minutes, please double check your junk or spam folder. </p>
        
      </div>
    </div>
    </div>
    </div>
  );
};

export default MailConfirmationPage;
