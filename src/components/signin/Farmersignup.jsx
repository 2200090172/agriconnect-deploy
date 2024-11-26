import React, { useState } from 'react';
import './Farmersignup.css';
import axios from 'axios';
import Signinlayout from './Signinlayout';
import config from './../../config';

const Farmersignup = () => {
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
  const [message, setMessage] = useState("");

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
      const response = await axios.post(`${config.url}/addfarmer`, farmer);

      if (response.status === 200) { // Corrected condition to use response.status
        alert("Farmer Added Successfully!");
        setFarmer(initialFormState);
        setMessage("Registered Successfully!!");
      } else {
        setMessage("Failed to register. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <Signinlayout>
      <div className="farmer-signup-container">
        <div className="farmer-signup-overlay">
          <form className="farmer-signup-form" onSubmit={handleSubmit}>
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
          {message && <p className="farmer-signup-message">{message}</p>}
        </div>
      </div>
    </Signinlayout>
  );
};

export default Farmersignup;
