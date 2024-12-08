import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const Financierlayout = ({ children }) => {
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
            <NavLink to="/financierhome" activeClassName="active" style={{ "--i": "0.25s" }}>
              Financier Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/addloan" activeClassName="active" style={{ "--i": "0.25s" }}>
              Add Loan
            </NavLink>
          </li>
          <li>
            <NavLink to="/viewallloans" activeClassName="active" style={{ "--i": "0.25s" }}>
              View All Loans
            </NavLink>
          </li>
          <li>
            <NavLink to="/viewallloanrequests" activeClassName="active" style={{ "--i": "0.25s" }}>
              View Loan Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/viewloans" activeClassName="active" style={{ "--i": "0.25s" }}>
              View Farmer Loans
            </NavLink>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Financierlayout;
