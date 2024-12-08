import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Adminlayout.css";
import axios from "axios";
import config from "../../config"; // Adjust the path if needed

const AdminLayout = ({ children }) => {
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
        `${config.url}/adminlogout`, // Replace with your logout API endpoint
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert("You have been logged out.");
        navigate("/signin");
      } else {
        alert("Failed to remove session in backend, Contact Administrator!");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkadminsession`, {
        withCredentials: true,
      });
      setSessionActive(response.data);
      if (!response.data) {
        alert("Session expired. Please log in again.");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      alert("Error verifying session. Redirecting to login.");
      navigate("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="admin-gemini-loading-container">
        <p className="admin-gemini-loading-message">
          Verifying your session. Please wait...
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
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="bar"></div>
          </div>
        </div>
        <span className="logout-button" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <div className="main-container">
        <div className="main">{children}</div>
        <div className="shadow one"></div>
        <div className="shadow two"></div>
      </div>
      <div className="links">
        <ul>
          <li className="active">
            <a href="/adminhome" style={{ "--i": "0.05s" }}>
              Admin Home
            </a>
          </li>
          <li>
            <Link to="/addfarmer" style={{ "--i": "0.15s" }}>
              Add Farmer
            </Link>
          </li>
          <li>
            <Link to="/viewallfarmers" style={{ "--i": "0.2s" }}>
              View All Farmers
            </Link>
          </li>
          <li>
            <Link to="/addexpert" style={{ "--i": "0.25s" }}>
              Add Expert
            </Link>
          </li>
          <li>
            <Link to="/approveexpert" style={{ "--i": "0.2s" }}>
              Approve Experts
            </Link>
          </li>
          <li>
            <Link to="/viewallexperts" style={{ "--i": "0.25s" }}>
              View All Experts
            </Link>
          </li>
          <li>
            <Link to="/addfinancier" style={{ "--i": "0.25s" }}>
              Add Financier
            </Link>
          </li>
          <li>
            <Link to="/viewallfinanciers" style={{ "--i": "0.25s" }}>
              View All Financiers
            </Link>
          </li>
          <li>
            <Link to="/admindashboard" style={{ "--i": "0.25s" }}>
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
