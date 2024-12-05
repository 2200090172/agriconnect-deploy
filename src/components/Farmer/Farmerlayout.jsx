import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Farmerlayout.css";
import LanguageSelector from "../Languageselector";
import { useTranslation } from "react-i18next";
import axios from "axios";
import config from "../../config"; // Adjust the path if necessary

const Farmerlayout = ({ children }) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${config.url}/farmerlogout`, // Replace with your logout API endpoint
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert(t("farmer-logoutsuccess")); // Use translation for success message
        navigate("/farmersignin");
      } else {
        alert(t("farmer-logoutfailure")); // Use translation for failure message
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("logout error"); // Use translation for error message
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkfarmersession`, {
        withCredentials: true,
      });
      setSessionActive(response.data);
      if (!response.data) {
        alert(t("farmerlayout-sessionexpired"));
        navigate("/farmersignin");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      alert(t("farmerlayout-sessionerror"));
      navigate("/farmersignin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="farmer-gemini-loading-container">
        <p className="farmer-gemini-loading-message">
          {t("farmerlayout-verifying")}
        </p>
      </div>
    );
  }

  if (!sessionActive) {
    return null;
  }

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      <div className="navbar">
        <div className="menu">
          <h3 className="logo">
            Agri<span>Connect</span>
          </h3>
          <LanguageSelector />
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="bar"></div>
          </div>
        </div>
        <span className="logout-button" onClick={handleLogout}>
          {t("farmer-logout")} {/* Use translation for Logout button */}
        </span>
      </div>

      <div className="main-container">
        <div className="main">{children}</div>
        <div className="shadow one"></div>
        <div className="shadow two"></div>
      </div>

      <div className="links">
        <ul>
          <li>
            <NavLink
              to="/farmerhome"
              activeClassName="active"
              style={{ "--i": "0.25s" }}
            >
              {t("farmerlayout-myhome")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sendrequest"
              activeClassName="active"
              style={{ "--i": "0.15s" }}
            >
              {t("farmerlayout-mysuggestionrequest")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmerresponses"
              activeClassName="active"
              style={{ "--i": "0.25s" }}
            >
              {t("farmerlayout-myresponses")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/connectwithsectors"
              activeClassName="active"
              style={{ "--i": "0.2s" }}
            >
              {t("farmerlayout-connectwithsectors")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmerexplorecontent"
              activeClassName="active"
              style={{ "--i": "0.2s" }}
            >
              {t("farmerlayout-farmerexplorecontent")}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Farmerlayout;
