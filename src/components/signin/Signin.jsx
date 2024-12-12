import React, { useState } from "react";
import "./Signin.css";
import Signinlayout from "./Signinlayout";
import axios from "axios"; // Import axios for making requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import config from "./../../config";

const Signin = () => {
  const [role, setRole] = useState("farmer"); // Default role
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    username: "", // Added username for admin role
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData(
      e.target.value === "admin"
        ? { username: "", password: "" } // Fields for admin
        : { email: "", password: "", phoneNumber: "" } // Fields for other roles
    );
  };

  const handleSignupNavigation = () => {
    if (role === "admin") {
      alert("Signup is not available for Admin.");
    } else {
      const signupPath = role === "user" ? "publicsignup" : `${role}signup`; // Updated signup navigation logic
      window.location.href = `/${signupPath}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role === "farmer") {
        const { phoneNumber, password } = formData;

        const response = await axios.get(`${config.url}/farmerlogin`, {
          params: {
            fcontact: phoneNumber,
            fpwd: password,
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data === "Login Success") {
          navigate("/farmerhome");
        } else {
          alert("Invalid phone number or password.");
        }
      } else if (role === "expert") {
        const { email, password } = formData;

        const response = await axios.get(`${config.url}/expertlogin`, {
          params: {
            email: email,
            password: password,
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data === 1) {
          navigate("/experthome");
        } else {
          alert("Invalid email or password.");
        }
      } else if (role === "admin") {
        const { username, password } = formData;

        const response = await axios.get(`${config.url}/adminlogin`, {
          params: {
            username: username,
            password: password,
          },
          withCredentials: true,
        });

        if (response.data === 1) {
          navigate("/adminhome");
        } else {
          alert("Invalid username or password.");
        }
      } else if (role === "financier") {
        const { email, password } = formData;

        const response = await axios.get(`${config.url}/financierlogin`, {
          params: {
            email: email,
            password: password,
          },
          withCredentials: true,
        });

        if (response.data === 1) {
          navigate("/financierhome");
        } else {
          alert("Invalid email or password.");
        }
      } else if (role === "user") {
        const { email, password } = formData;

        const response = await axios.get(`${config.url}/userlogin`, {
          params: {
            uemail: email,
            upwd: password,
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data === "Login Success") {
          navigate("/userhome");
        } else {
          alert("Invalid email or password.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to login. Please try again.");
    }
  };

  const handleForgotPasswordNavigation = () => {
    navigate("/forgotpassword");
  };

  return (
    <Signinlayout>
      <div className="normal-signin-container">
        <div className="signin-form">
          <h2 className="signin-title">Sign In</h2>
          <div className="signin-field">
            <label htmlFor="role" style={{ color: "white" }}>Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="signin-input"
            >
              <option value="farmer">Farmer</option>
              <option value="user">User</option>
              <option value="expert">Expert</option>
              <option value="admin">Admin</option>
              <option value="financier">Financier</option>
            </select>
          </div>

          {role === "farmer" ? (
            <>
              <div className="signin-field">
                <label htmlFor="phoneNumber" style={{ color: "white" }}>Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="signin-input"
                />
              </div>
              <div className="signin-field">
                <label htmlFor="password" style={{ color: "white" }}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="signin-input"
                />
              </div>
            </>
          ) : role === "admin" ? (
            <>
              <div className="signin-field">
                <label htmlFor="username" style={{ color: "white" }}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="signin-input"
                />
              </div>
              <div className="signin-field">
                <label htmlFor="password" style={{ color: "white" }}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="signin-input"
                />
              </div>
            </>
          ) : (
            <>
              <div className="signin-field">
                <label htmlFor="email" style={{ color: "white" }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="signin-input"
                />
              </div>
              <div className="signin-field">
                <label htmlFor="password" style={{ color: "white" }}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="signin-input"
                />
              </div>
            </>
          )}

          <div className="signin-actions">
            <button className="signin-btn" onClick={handleSubmit}>
              Sign In
            </button>
            {role !== "admin" && (
              <div className="additional-actions">
                <div className="signup-message">
                  <p>
                    No account? Don't worry! Signup takes very little time.{" "}
                    <span
                      role="button"
                      onClick={handleSignupNavigation}
                      className="signup-link"
                    >
                      Sign Up Now
                    </span>
                  </p>
                </div>
              </div>
            )}

            {role !== "admin" && (
              <div className="additional-actions">
                <div className="forgot-password-message">
                  <p>
                    Forgot Password?{" "}
                    <span
                      role="button"
                      onClick={handleForgotPasswordNavigation}
                      className="signup-link"
                    >
                      Let’s change it!
                    </span>{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Signinlayout>
  );
};

export default Signin;
