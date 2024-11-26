import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./Farmerlayout.css";
import LanguageSelector from "../Languageselector";
import { useTranslation } from "react-i18next";

const Farmerlayout = ({ children }) => {
  const {t}=useTranslation();
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
          <LanguageSelector /> {/* Language selector within the navbar menu */}
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
             {t("farmerlayout-myhome")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/sendrequest" activeClassName="active" style={{ "--i": "0.15s" }}>
              {t("farmerlayout-mysuggestionrequest")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/farmerresponses" activeClassName="active" style={{ "--i": "0.25s" }}>
              {t("farmerlayout-myresponses")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/connectwithsectors" activeClassName="active" style={{ "--i": "0.2s" }}>
              {t("farmerlayout-connectwithsectors")}
              </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Farmerlayout;
