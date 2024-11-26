import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import "./Expertlayout.css";

const Expertlayout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`expert-container ${isActive ? "expert-active" : ""}`}>
      <div className="expert-navbar">
        <div className="expert-menu">
          <h3 className="expert-logo">
            Agri<span>Connect</span>
          </h3>
          <div className="expert-hamburger-menu" onClick={toggleMenu}>
            <div className="expert-bar"></div>
          </div>
        </div>
      </div>

      <div className="expert-main-container">
        <div className="expert-main">
          {children}
        </div>
        <div className="expert-shadow expert-one"></div>
        <div className="expert-shadow expert-two"></div>
      </div>

      //Need to change the links 
      <div className="expert-links">
        <ul>
          <li>
            <NavLink to="/experthome" activeClassName="active" style={{ "--i": "0.25s" }}>
              My Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/expertinrequests" activeClassName="active" style={{ "--i": "0.15s" }}>
              Farmer Incoming Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/expertresponses" activeClassName="active" style={{ "--i": "0.25s" }}>
              My Responses
            </NavLink>
          </li>
          <li>
            <NavLink to="/createcontent" activeClassName="active" style={{ "--i": "0.2s" }}>
              Create Content
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Expertlayout;
