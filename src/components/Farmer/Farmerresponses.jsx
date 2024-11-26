import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Farmerlayout from './Farmerlayout';
import './Farmerresponses.css';
import axios from 'axios';
import config from '../../config';

const Farmerresponses = () => {
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [farmerPhone, setFarmerPhone] = useState('');

  useEffect(() => {
    const checkSessionAndFetchPhone = async () => {
      try {
        const sessionResponse = await axios.get(`${config.url}/checkfarmersession`, {
          withCredentials: true,
        });

        if (sessionResponse.data === 0) {
          alert("Session expired. Please log in again.");
          navigate('/farmersignin');
          return;
        }

        const profileResponse = await axios.get(`${config.url}/getfarmerprofile`, {
          withCredentials: true,
        });

        const phone = profileResponse.data?.phone;
        if (!phone) {
          throw new Error("Farmer phone number not found in profile.");
        }
        setFarmerPhone(phone);

        const responsesResponse = await axios.get(`${config.url}/getfarmerresponses`, {
          params: { phone },
          withCredentials: true,
        });
        setResponses(responsesResponse.data);
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Error loading data. Please log in again.");
        // navigate('/farmersignin');
      }
    };

    checkSessionAndFetchPhone();
  }, [navigate]);

  return (
    <Farmerlayout>
      <div className="farmer-responses-container">
        <div className="farmer-responses-overlay">
          <h2>Your Responses</h2>
          {responses.length === 0 ? (
            <p>No responses available at the moment.</p>
          ) : (
            <div className="responses-list">
              {responses.map((response) => (
                <div key={response.responseId} className="response-card">
                  <p><strong>Expert Email:</strong> {response.expertEmail}</p>
                  <p><strong>Response Details:</strong> {response.responseDetails}</p>
                  <p><strong>Date:</strong> {new Date(response.responseDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {response.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Farmerlayout>
  );
};

export default Farmerresponses;
