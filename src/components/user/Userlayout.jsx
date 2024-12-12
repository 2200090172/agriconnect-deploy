import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./Userlayout.css";
import LanguageSelector from "../Languageselector";

const Userlayout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      <div className="navbar">
        <div className="menu">
          <h3 className="logo">
            Agri<span>Connect</span>
          </h3>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="main">
          {children}
        </div>
        <div className="shadow one"></div>
        <div className="shadow two"></div>
      </div>

      <div className="links">
        <ul>
          <li>
            <NavLink to="/farmerhome" activeClassName="active" style={{ "--i": "0.25s" }}>
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explorecontent" activeClassName="active" style={{ "--i": "0.25s" }}>
              Explore us
            </NavLink>
          </li>
          <li>
            <NavLink to="/Learnaboutfarming" activeClassName="active" style={{ "--i": "0.25s" }}>
              Way of Farming
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/forum" activeClassName="active" style={{ "--i": "0.25s" }}>
              Chat with us
            </NavLink>
          </li> */}
         
        </ul>
      </div>
    </div>
  );
};

export default Userlayout;
