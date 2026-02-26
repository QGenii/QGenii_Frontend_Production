
import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // import useLocation
import "../Style/LoginHover.css";
import MailPage from "../Pages/MailPage.jsx";
const LoginHover = () => {
  const [showContent, setShowContent] = useState(false);
  const [showEmailPage, setShowEmailPage] = useState(false)
  const location = useLocation(); // get current route path

  // condition: disable hover if current route is "/enterprisewide"
  // const disableHover = location.pathname === "/enterprisewide";
   // list of routes where hover should be disabled
  const disabledRoutes = ["/enterprisewide","/successpage","/ondemandcourse","/teamsuccesspage","/enterprisewide" ,"/firstlinkpage","/learningecosystem","/dedicatedcustomersuccessteam","/requestdemo","/businessSkill","/techSkill","/leadershipandmanagement","/wellnessSkill","/codeiqgenius","/codeiqgeniusbussiness"];
  const disableHover = disabledRoutes.includes(location.pathname);

  return (
    <div>
      <div
       className={`login-container ${disableHover ? "disabled" : ""}`}
        onMouseEnter={() => !disableHover && setShowContent(true)}
        onMouseLeave={() => !disableHover && setShowContent(false)}
      >
        <button className="login-btn">Login</button>

        <div className="login-content">
          {!disableHover && showContent && (
            <div>
              <p onClick={()=> setShowEmailPage(true)}>On-Demand Studying</p>
              <p>Cohort Studing</p>
            </div>
          )}
        </div>
      </div>
      {showEmailPage &&( <MailPage onClose={() => setShowEmailPage(false)} />)}

    </div>
  );
};

export default LoginHover;

