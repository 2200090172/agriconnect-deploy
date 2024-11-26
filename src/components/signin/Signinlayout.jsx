import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Signinlayout.css";

const Signinlayout = ({children}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`new-signin-container ${isActive ? "new-signin-active" : ""}`}>
      <div className="new-signin-navbar">
        <div className="new-signin-menu">
          <h3 className="new-signin-logo">
            Agri<span>Connect</span>
          </h3>
          <div className="new-signin-hamburger-menu" onClick={toggleMenu}>
            <div className="new-signin-bar"></div>
          </div>
        </div>
      </div>
      <div className="new-signin-main-container">
        <div className="new-signin-main">
          <header className="new-signin-header">
            <div className="new-signin-overlay">
              {children}
            </div>
          </header>
        </div>
        <div className="new-signin-shadow new-signin-one"></div>
        <div className="new-signin-shadow new-signin-two"></div>
      </div>
      <div className="new-signin-links">
        <ul>
          <li>
            <a href="/" style={{ "--i": "0.05s" }}>
              Home
            </a>
          </li>
          <li>
            <Link to="/adminsignin" style={{ "--i": "0.15s" }}>
              Sign In as Admin
            </Link>
          </li>
          <li>
            <Link to="/farmersignin" style={{ "--i": "0.2s" }}>
              Sign In as Farmer
            </Link>
          </li>
          <li>
            <Link to="/publiclogin" style={{ "--i": "0.25s" }}>
              Sign In as Public
            </Link>
          </li>
          <li>
            <Link to="/expertsignin" style={{ "--i": "0.3s" }}>
              Sign In as Expert
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Signinlayout;
