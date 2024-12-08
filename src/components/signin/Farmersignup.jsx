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

  const validate = () => {
    // Full Name validation
    if (!/^[A-Za-z\s]+$/.test(farmer.fullname)) {
      alert('Full Name should only contain alphabets.');
      return false;
    }

    // Email validation (optional)
    if (farmer.email && !/\S+@\S+\.\S+/.test(farmer.email)) {
      alert('Invalid email format.');
      return false;
    }

    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(farmer.phone)) {
      alert('Phone number should start with 6-9 and be 10 digits long.');
      return false;
    }

    // Password validation
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(farmer.password)
    ) {
      alert(
        'Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.'
      );
      return false;
    }

    // Location validation
    // Location validation
if (!/^[A-Za-z\s]+$/.test(farmer.location)) {
  alert('Location must only contain alphabets and spaces (e.g., "City").');
  return false;
}


    // Farm size validation
    if (!/^\d+(\.\d+)?$/.test(farmer.farmsize) || parseFloat(farmer.farmsize) <= 0) {
      alert('Farm size must be a positive number.');
      return false;
    }

    // Crops validation
    if (!farmer.crops.trim()) {
      alert('Please specify the primary crops grown.');
      return false;
    }

    // Preferred language validation (optional)
    if (farmer.preferredlanguage && !/^[A-Za-z\s]+$/.test(farmer.preferredlanguage)) {
      alert('Preferred language must only contain alphabets.');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer({
      ...farmer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(`${config.url}/addfarmer`, farmer);

      if (response.status === 200) {
        alert("Farmer Added Successfully!");
        setFarmer(initialFormState);
        setMessage("Registered Successfully!!");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      alert("An error occurred: " + error.message);
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
              <input
                type="text"
                name="fullname"
                value={farmer.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email (Optional):</label>
              <input
                type="email"
                name="email"
                value={farmer.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={farmer.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={farmer.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location (City):</label>
              <input
                type="text"
                name="location"
                value={farmer.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Farm Size (in acres/hectares):</label>
              <input
                type="text"
                name="farmsize"
                value={farmer.farmsize}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Primary Crops Grown:</label>
              <input
                type="text"
                name="crops"
                value={farmer.crops}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Preferred Language (Optional):</label>
              <input
                type="text"
                name="preferredlanguage"
                value={farmer.preferredlanguage}
                onChange={handleChange}
              />
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
