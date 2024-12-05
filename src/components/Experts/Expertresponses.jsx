import React, { useState, useEffect } from 'react';
import Expertlayout from './Expertlayout';
import axios from 'axios';
import config from './../../config';
import { useNavigate } from 'react-router-dom';
import './Expertresponses.css';

const Expertresponses = () => {
  const [sessionActive, setSessionActive] = useState(true);
  const [expertresponses, setExpertResponses] = useState([]);
  const [expertProfile, setExpertProfile] = useState(null);
  const navigate = useNavigate();

  const viewResponses = async (expertEmail) => {
    try {
      const response = await axios.get(`${config.url}/getexpertresponses/${expertEmail}`, { withCredentials: true });
      setExpertResponses(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching responses:", error);
      alert("Failed to fetch responses");
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkexpertsession`, { withCredentials: true });
      if (!response.data) {
        alert("Session expired. Please log in again.");
        navigate('/expertsignin');
      }
    } catch (error) {
      console.error("Error checking session:", error);
      navigate('/expertsignin');
    }
  };

  const getExpertProfile = async () => {
    try {
      const prresponse = await axios.get(`${config.url}/getexpertprofile`, { withCredentials: true });
      setExpertProfile(prresponse.data);
      // alert(prresponse.data.email);
      viewResponses(prresponse.data.email);
    } catch (error) {
      console.error("Error fetching expert profile:", error);
      alert("Failed to fetch expert profile");
    }
  };

  useEffect(() => {
    checkSession();
    getExpertProfile();
  }, []);

  return (
    <Expertlayout>
      <header className="expert-responses-header">
        <div className="expert-responses-overlay">
          {expertresponses.length > 0 ? (
            <ul className="response-list">
              {expertresponses.map((response) => {
                const responseDateArray = response.responseDate;
                const correctedDate = new Date(
                  responseDateArray[0],           
                  responseDateArray[1] - 1,       
                  responseDateArray[2],           
                  responseDateArray[3],          
                  responseDateArray[4],         
                  responseDateArray[5],        
                  Math.floor(responseDateArray[6] / 1000000)  
                );

                return (
                  <li key={response.responseId} className="response-item">
                    <h3 className="response-detail">My Response: {response.responseDetails}</h3>
                    <p className="response-date">Date: {correctedDate.toLocaleString()}</p>
                    <p className="response-status">Status: {response.status}</p>
                    <p className="farmer-phone">Farmer Contact: {response.farmerphone}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No responses found.</p>
          )}
        </div>
      </header>
    </Expertlayout>
  );
};

export default Expertresponses;
