import React, { useState, useEffect } from 'react';
import Expertlayout from './Expertlayout';
import './Experthome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const Experthome = () => {
  const [sessionActive, setSessionActive] = useState(true);
  const navigate = useNavigate();

  // Function to check session on component mount
  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkexpertsession`, { withCredentials: true });
      alert(response.data)
      setSessionActive(response.data); // Assuming backend returns a boolean indicating session validity
      if (response.data==0) {
        alert("Session expired. Please log in again.");
        navigate('/expertsignin');
      }
    } catch (error) {
      console.error("Error checking session:", error);
      alert("Error checking sessionx");
      navigate('/expertsignin');
    }
  };

  useEffect(() => {
    checkSession() // Check session when component mounts
  }
    ,[]);

  if (!sessionActive) {
    alert("sessions is no active bro!!!") // Optionally, you can show a loading spinner or a message while checking the session
  }

  return (
    <Expertlayout>
      <header className="expert-header">
        <div className="expert-overlay">
          <h2 className="title">Welcome, Expert!!</h2>
          <p className="description">
            Thank you for being a vital part of the AgriConnect community. Continue managing resources, guiding users, and driving impactful decisions to support farming excellence.
          </p>
        </div>
      </header>
    </Expertlayout>
  );
};

export default Experthome;
