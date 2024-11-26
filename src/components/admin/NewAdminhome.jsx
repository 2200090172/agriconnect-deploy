import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminlayout from './Adminlayout';
import './Addfarmer.css';
import axios from 'axios';

const Addfarmer = () => {
  const navigate = useNavigate();
  const initialFormState = {
    fullname: '',
    email: '',
    phone: '',
    password: '',
    location: '',
    farmsize: '',
    crops: '',
    preferredlanguage: '',
  };

  const [farmer, setFarmer] = useState(initialFormState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:2005/checkadminsession', {
          withCredentials: true,
        });

        if (response.data === 0) {
          alert("Session Expired, Please Login again!!");
          navigate('/adminlogin');
        }
      } catch (error) {
        console.error("Error checking session:", error);
        alert("Error checking session. Please try again.");
        navigate('/adminlogin');
      }
    };
    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer({
      ...farmer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2005/addfarmer", farmer);
      if (response.status === 200) {
        alert("Farmer Added Successfully!");
        setFarmer(initialFormState); // Reset form fields after successful submission
      }
    } catch (error) {
      console.error("Error adding farmer:", error);
      alert("Failed to add farmer. Please try again.");
    }
  };

  return (
    <Adminlayout>
      <div className="addfarmer-container">
        <div className="addfarmer-overlay">
          <form className="addfarmer-form" onSubmit={handleSubmit}>
            <h2>Farmer Sign-up</h2>
            <div>
              <label>Full Name:</label>
              <input type="text" name="fullname" value={farmer.fullname} onChange={handleChange} required />
            </div>
            <div>
              <label>Email (Optional):</label>
              <input type="email" name="email" value={farmer.email} onChange={handleChange} />
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={farmer.phone} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={farmer.password} onChange={handleChange} required />
            </div>
            <div>
              <label>Location (District, State):</label>
              <input type="text" name="location" value={farmer.location} onChange={handleChange} required />
            </div>
            <div>
              <label>Farm Size (in acres/hectares):</label>
              <input type="text" name="farmsize" value={farmer.farmsize} onChange={handleChange} required />
            </div>
            <div>
              <label>Primary Crops Grown:</label>
              <input type="text" name="crops" value={farmer.crops} onChange={handleChange} required />
            </div>
            <div>
              <label>Preferred Language (Optional):</label>
              <input type="text" name="preferredlanguage" value={farmer.preferredlanguage} onChange={handleChange} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </Adminlayout>
  );
};

export default Addfarmer;
