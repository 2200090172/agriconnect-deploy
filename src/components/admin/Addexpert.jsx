import React, { useState } from 'react';
import Adminlayout from './Adminlayout';
import './Addexpert.css'; // Include your form styling here
import axios from 'axios';

const Addexpert = () => {
  const [expert, setExpert] = useState({
    fullname: '',
    email: '',
    phone: '',
    experience: '',
    fieldofexpertise: '',
    qualification: '',
    languagesspoken: '', // Changed to match expected format
    certifications: '', // New field for certifications
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpert({
      ...expert,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2005/addexpert", expert);
      
      if (response.data === 1) {
        alert("Expert added successfully");
        // Reset the form fields
        setExpert({
          fullname: '',
          email: '',
          password:'',
          phone: '',
          experience: '',
          fieldofexpertise: '',
          qualification: '',
          languagesspoken: '',
          certifications: '',
        });
      } else {
        alert("Failed to add expert. Please try again.");
      }
    } catch (error) {
      console.error("Error adding expert:", error);
      alert("An error occurred: " + error.message);
    }
};


  return (
    <Adminlayout>
      <div className="addexpert-container">
        <div className="addexpert-overlay">
          <form className="addexpert-form" onSubmit={handleSubmit}>
            <h2>Expert Sign-up</h2>
            <div>
              <label>Full Name:</label>
              <input type="text" name="fullname" value={expert.fullname} onChange={handleChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={expert.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={expert.password} onChange={handleChange} required />
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={expert.phone} onChange={handleChange} required />
            </div>
            <div>
              <label>Experience (in years):</label>
              <input type="text" name="experience" value={expert.experience} onChange={handleChange} required />
            </div>
            <div>
              <label>Field of Expertise:</label>
              <input type="text" name="fieldofexpertise" value={expert.fieldofexpertise} onChange={handleChange} required />
            </div>
            <div>
              <label>Qualification:</label>
              <input type="text" name="qualification" value={expert.qualification} onChange={handleChange} required />
            </div>
            <div>
              <label>Languages Spoken:</label>
              <input type="text" name="languagesspoken" value={expert.languagesspoken} onChange={handleChange} required />
            </div>
            <div>
              <label>Certifications:</label>
              <input type="text" name="certifications" value={expert.certifications} onChange={handleChange} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </Adminlayout>
  );
};

export default Addexpert;
