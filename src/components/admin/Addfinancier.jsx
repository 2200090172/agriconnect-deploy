import React, { useState, useEffect } from 'react';
import Adminlayout from './Adminlayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addfinancier.css'; // Include your form styling here
import config from '../../config';

const AddFinancier = () => {
  const [financier, setFinancier] = useState({
    name: '',
    email: '',
    contact: '',
    organizationname: '',
    location: '',
    password: '', // Added password field
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${config.url}/checkadminsession`, {
          withCredentials: true,
        });

        if (response.data === 0) {
          alert("You are no longer accessible to this page, Please Login again!!");
          navigate('/signin');
        }
      } catch (error) {
        console.error("Error checking session:", error);
        alert("Error checking session. Please try again.");
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancier({
      ...financier,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/addfinancier`, financier);
      console.log(response.data);
      alert("Financier added successfully");
      
      setFinancier({
        name: '',
        email: '',
        contact: '',
        organizationname: '',
        location: '',
        password: '', // Reset password field
      });
    } catch (error) {
      console.error("Error adding financier:", error);
      alert("Failed to add financier. Please try again.");
    }
  };

  if (loading) {
    return null; // or return <div>Loading...</div>
  }

  return (
    <Adminlayout>
      <div className="addfinancier-container">
        <div className="addfinancier-overlay">
          <form className="addfinancier-form" onSubmit={handleSubmit}>
            <h2>Add Financier</h2>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={financier.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={financier.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Contact:</label>
              <input type="text" name="contact" value={financier.contact} onChange={handleChange} />
            </div>
            <div>
              <label>Organization Name:</label>
              <input type="text" name="organizationname" value={financier.organizationname} onChange={handleChange} />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={financier.location} onChange={handleChange} />
            </div>
            <div>
              <label>Password:</label> {/* New password field */}
              <input type="password" name="password" value={financier.password} onChange={handleChange} required />
            </div>
            <button type="submit">Add Financier</button>
          </form>
        </div>
      </div>
    </Adminlayout>
  );
};

export default AddFinancier;
