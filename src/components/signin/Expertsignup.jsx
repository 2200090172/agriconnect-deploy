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

  const [otpSent, setOtpSent] = useState(false); // Track if OTP was sent
  const [otp, setOtp] = useState(''); // OTP input
  const [otpVerified, setOtpVerified] = useState(false); // Track if OTP was verified

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpert({
      ...expert,
      [name]: value,
    });
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${config.url}/sendotp/${expert.fullname}/${expert.email}`, 
      {
        withCredentials: true
      });

      console.log(`${config.url}/sendotp/${expert.fullname}/${expert.email}`);
      console.log(response.data)
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
      const response = await axios.post(`${config.url}/verifyotp/${otp}`, {withCredentials:true});
      console.log(response.data);
      if (response.data === 1) {
        alert('OTP verified successfully.');
        setOtpVerified(true); // OTP verified, disable button
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
    if (!otpVerified) {
      alert('Please verify the OTP before signing up.');
      return;
    }
    try {
      const response = await axios.post(`${config.url}/expertsignuprequest`, expert);
      if (response.data === 1) {
        alert('Expert added successfully');
        // Reset the form fields
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
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={expert.email} onChange={handleChange} required />
              <span className="otp-button" onClick={handleSendOtp}>Send OTP</span>
            </div>
            {otpSent && (
              <div>
                <label>Enter OTP:</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </Signinlayout>
  );
};

export default Expertsignup;
