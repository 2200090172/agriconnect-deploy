import React, { useState } from 'react';
import './Expertsignup.css'; // Include your form styling here
import axios from 'axios';
import Signinlayout from './Signinlayout';
import config from '../../config';

const Expertsignup = () => {
  const [expert, setExpert] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
    experience: '',
    fieldofexpertise: '',
    qualification: '',
    languagesspoken: '',
    certifications: '',
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Full Name validation
    if (!/^[A-Za-z\s]+$/.test(expert.fullname)) {
      newErrors.fullname = 'Name should only contain alphabets.';
    }

// Email validation
const allowedDomains = [
  'gmail.com',
  'kluniversity.in',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'protonmail.com',
  'icloud.com',
  'aol.com'
];

const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)?[a-zA-Z]+$/; // Basic email format
const domainPattern = new RegExp(`@(${allowedDomains.join('|')})$`); // Restrict to allowed domains

if (!emailPattern.test(expert.email)) {
  newErrors.email = 'Invalid email format.';
} else if (!domainPattern.test(expert.email)) {
  newErrors.email = `Email must belong to one of these domains: ${allowedDomains.join(', ')}.`;
}


    if (!emailPattern.test(expert.email)) {
      newErrors.email = 'Invalid email format.';
    } else if (!domainPattern.test(expert.email)) {
      newErrors.email = `Email must belong to one of these domains: ${allowedDomains.join(', ')}.`;
    }
    // Password validation
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(expert.password)) {
      newErrors.password =
        'Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.';
    }

    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(expert.phone)) {
      newErrors.phone = 'Phone number should start with 6-9 and be 10 digits long.';
    }

    // Experience validation
    if (!/^\d+$/.test(expert.experience) || parseInt(expert.experience, 10) <= 0) {
      newErrors.experience = 'Experience must be a positive number.';
    }

    // Field of expertise validation
    if (!expert.fieldofexpertise.trim()) {
      newErrors.fieldofexpertise = 'Field of expertise is required.';
    }

    // Qualification validation
    if (!expert.qualification.trim()) {
      newErrors.qualification = 'Qualification is required.';
    }

    // Languages Spoken validation
    if (!expert.languagesspoken.trim()) {
      newErrors.languagesspoken = 'Languages spoken is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpert({
      ...expert,
      [name]: value,
    });
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${config.url}/sendotp/${expert.fullname}/${expert.email}`,
        { withCredentials: true }
      );
      if (response.data === 1) {
        alert('OTP sent to your email.');
        setOtpSent(true);
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending OTP: ' + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${config.url}/verifyotp/${otp}`, { withCredentials: true });
      if (response.data === 1) {
        alert('OTP verified successfully.');
        setOtpVerified(true);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!otpVerified) {
      alert('Please verify the OTP before signing up.');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/expertsignuprequest`, expert);
      if (response.data === 1) {
        alert('Expert added successfully');
        setExpert({
          fullname: '',
          email: '',
          password: '',
          phone: '',
          experience: '',
          fieldofexpertise: '',
          qualification: '',
          languagesspoken: '',
          certifications: '',
        });
        setOtpSent(false);
        setOtpVerified(false);
        setOtp('');
      } else {
        alert('Failed to add expert. Please try again.');
      }
    } catch (error) {
      console.error('Error adding expert:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <Signinlayout>
      <div className="addexpert-container">
        <div className="addexpert-overlay">
          <form className="addexpert-form" onSubmit={handleSubmit}>
            <h2>Expert Sign-up</h2>
            <div>
              <label>Full Name:</label>
              <input type="text" name="fullname" value={expert.fullname} onChange={handleChange} required />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={expert.email} onChange={handleChange} required />
              {errors.email && <p className="error">{errors.email}</p>}
              <span className="otp-button" onClick={handleSendOtp}>
                Send OTP
              </span>
            </div>
            {otpSent && (
              <div>
                <label>Enter OTP:</label>
                <input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <span
                  className={`otp-button ${otpVerified ? 'verified' : ''}`}
                  onClick={otpVerified ? null : handleVerifyOtp}
                  style={{ cursor: otpVerified ? 'not-allowed' : 'pointer' }}
                >
                  {otpVerified ? 'Verified' : 'Verify'}
                </span>
              </div>
            )}
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={expert.password} onChange={handleChange} required />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={expert.phone} onChange={handleChange} required />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div>
              <label>Experience</label>
              <input type="text" name="experience" value={expert.experience} onChange={handleChange} required />
              {errors.experience && <p className="error">{errors.experience}</p>}
            </div>
            <div>
              <label>Field of Expertise:</label>
              <input
                type="text"
                name="fieldofexpertise"
                value={expert.fieldofexpertise}
                onChange={handleChange}
                required
              />
              {errors.fieldofexpertise && <p className="error">{errors.fieldofexpertise}</p>}
            </div>
            <div>
              <label>Qualification:</label>
              <input type="text" name="qualification" value={expert.qualification} onChange={handleChange} required />
              {errors.qualification && <p className="error">{errors.qualification}</p>}
            </div>
            <div>
              <label>Languages :</label>
              <input
                type="text"
                name="languagesspoken"
                value={expert.languagesspoken}
                onChange={handleChange}
                required
              />
              {errors.languagesspoken && <p className="error">{errors.languagesspoken}</p>}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </Signinlayout>
  );
};

export default Expertsignup;


