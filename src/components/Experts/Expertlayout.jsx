import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Expertlayout.css";
import axios from "axios";
import config from "../../config"; // Adjust the path if needed

const Expertlayout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLogout = async () => {
    try {
     const response= await axios.get(
        `${config.url}/expertlogout`, // Replace with your logout API endpoint
        
        { withCredentials: true }
      );
      if(response.data==1)
      { 
      alert("You have been logged out.");
      }
      else
      {
        alert("failed to remove session in backend, Contact Administrator!")
      }
      navigate("/signin");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkexpertsession`, {
        withCredentials: true,
      });
      setSessionActive(response.data);
      if (!response.data) {
        alert("Session expired. Please log in again.");
        navigate("/expertsignin");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      alert("Error verifying session. Redirecting to login.");
      navigate("/expertsignin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="expert-gemini-loading-container">
        <p className="expert-gemini-loading-message">
          Verifying your session. Please wait...
        </p>
      </div>
    );
  }

  if (!sessionActive) {
    return null;
  }

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
        <span className="expert-logout-button" onClick={handleLogout}>
          Logout
        </span>
      </div>

      <div className="expert-main-container">
        <div className="expert-main">{children}</div>
        <div className="expert-shadow expert-one"></div>
        <div className="expert-shadow expert-two"></div>
      </div>

      <div className="expert-links">
        <ul>
          <li>
            <NavLink
              to="/experthome"
              activeClassName="active"
              style={{ "--i": "0.25s" }}
            >
              My Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expertinrequests"
              activeClassName="active"
              style={{ "--i": "0.15s" }}
            >
              Farmer Incoming Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expertresponses"
              activeClassName="active"
              style={{ "--i": "0.25s" }}
            >
              My Responses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expertcontent"
              activeClassName="active"
              style={{ "--i": "0.2s" }}
            >
              Create Content
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/expertgemini"
              activeClassName="active"
              style={{ "--i": "0.2s" }}
            >
              Get Gemini Assistance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/interactivemap"
              activeClassName="active"
              style={{ "--i": "0.25s" }}
            >
              Expore Interactive Map
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Expertlayout;
