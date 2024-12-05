import React, { useState } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import "./Home.css";

// import backgroundImage from '../assets/images/background.jpg'; 

const Home = ({children}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`home-container ${isActive ? "home-active" : ""}`}
    // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="home-navbar">
        <div className="home-menu">
          <h3 className="home-logo">
            Agri<span>Connect</span>
          </h3>
          <div className="home-hamburger-menu" onClick={toggleMenu}>
            <div className="home-bar"></div>
          </div>
        </div>
      </div>
      <div className="home-main-container">
        <div className="home-main">
          <header className="home-header">
            <div className="home-overlay">
              <h2 className="home-title">Empowering Farmers for a Sustainable Future</h2>
              <p className="home-description">
                “Together, we can cultivate success and resilience through knowledge, innovation, and community.”
              </p>
              {/* <a href="#" className="home-btn">
                Read More
              </a> */}
            </div>
          </header>
        </div>
        <div className="home-shadow home-one"></div>
        <div className="home-shadow home-two"></div>
      </div>
      <div className="home-links">
        <ul>
          <li>
            <a href="/" style={{ "--i": "0.05s" }}>
              Home
            </a>
          </li>
          <li>
            <a href="/signin" style={{ "--i": "0.05s" }}>
              Signin
            </a>
          </li>
          <li>
            <a href="#" style={{ "--i": "0.1s" }}>
              About
            </a>
          </li>
          {/* <li>
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
            <Link to="/publicsignin" style={{ "--i": "0.25s" }}>
              Sign In as Public
            </Link>
          </li>
          <li>
            <Link to="/expertsignin" style={{ "--i": "0.25s" }}>
              Sign In as Expert
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Home;
