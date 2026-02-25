import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Header.css";
import LoginHover from "./LoginHover";
import WhatWeDo from "./WhatWeDo";
import HowWeDoIt from './HowWeDoIt';

const Header = () => {
  const location = useLocation();
  const disableSignup = location.pathname === "/successpage";
  const isHome1 = location.pathname.toLowerCase() === "/home1";

  return (
    <>
      <div className="Header-container ">
        <div className="Header ">
          <h3> CodeIQGenius Business</h3>
          <div className="header-list ">
            <WhatWeDo/>
            <div className="header-list "><HowWeDoIt/></div>
            <div>Resources</div>
            <div>Plans</div>
            <div>AI Transformations</div>
          </div>
          <div className="header-button">
            {isHome1 ? (
              <>
                <Link to="/secondlinklogin" className="login-link-btn">
                  Login
                </Link>
                {!disableSignup && (
                  <Link to="/secondlinksignup" className="signup-link-btn">
                    Sign Up
                  </Link>
                )}
              </>
            ) : (
              <>
                <LoginHover />
                {!disableSignup && <button>Sign Up</button>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
