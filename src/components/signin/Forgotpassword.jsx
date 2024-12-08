import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import config from './../../config';
import './Forgotpassword.css';
import Signinlayout from './Signinlayout';

const Forgotpassword = () => {
  const [role, setRole] = useState('expert'); // Default role (set to user)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [otpSent, setOtpSent] = useState(false); // State to control OTP display
  const [otp, setOtp] = useState(''); // OTP state
  const [otpStatus, setOtpStatus] = useState(null); // OTP verification status

  const navigate = useNavigate(); // Initialize navigate function

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ name: '', email: '' }); // Reset form fields when role changes
    setOtpSent(false); // Reset OTP status
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { name, email } = formData;

      let response;
      response = await axios.post(`${config.url}/sendotp/${name}/${email}`, {
        withCredentials: true,
      });

      if (response.data === 1) {
        setOtpSent(true); // Display OTP input if OTP is sent
      } else {
        alert('Error in sending OTP.');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      alert('Error during sending OTP.');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${config.url}/forgotpassword/verifyotp/${otp}`, {}, {
        withCredentials: true,
      });

      if (response.data === 1) {
        setOtpStatus('OTP verified successfully!');
        alert('OTP verified successfully! Please proceed to reset your password.');

        // Pass email and role to reset password page via navigate
        navigate('/resetpassword', { state: { email: formData.email, role } });
      } else {
        setOtpStatus('Invalid OTP. Please try again.');
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('Error during OTP verification.');
    }
  };

  return (
    <Signinlayout>
      <div className="forgotpassword-normal-signin-container">
        <div className="forgotpassword-signin-form">
          <h2 className="forgotpassword-signin-title">Forgot Password</h2>
          <div className="forgotpassword-signin-field">
            <label htmlFor="role" style={{ color: 'white' }}>Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="forgotpassword-signin-input"
            >
              <option value="expert">Expert</option>
              <option value="user">User</option>
              <option value="financier">Financier</option>
            </select>
          </div>

          <div className="forgotpassword-signin-field">
            <label htmlFor="name" style={{ color: 'white' }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="forgotpassword-signin-input"
            />
          </div>

          <div className="forgotpassword-signin-field">
            <label htmlFor="email" style={{ color: 'white' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="forgotpassword-signin-input"
            />
          </div>

          <div className="forgotpassword-signin-actions">
            <span className="forgotpassword-signin-btn" onClick={handleSubmit}>
              Send OTP
            </span>

            {otpSent && (
              <div className="forgotpassword-signin-field">
                <label htmlFor="otp" style={{ color: 'white' }}>Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="forgotpassword-signin-input"
                />
              </div>
            )}

            {otpSent && (
              <span className="forgotpassword-signin-btn" onClick={handleOtpSubmit}>
                Verify OTP
              </span>
            )}

            {otpStatus && <div style={{ color: 'red' }}>{otpStatus}</div>}
          </div>
        </div>
      </div>
    </Signinlayout>
  );
};

export default Forgotpassword;
