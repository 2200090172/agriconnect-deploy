import React, { useState, useEffect } from 'react';
import Expertlayout from './Expertlayout';
import './Expertinrequest.css';
import axios from 'axios';
import config from './../../config';
import { useNavigate, useLocation } from 'react-router-dom';

const Expertinrequest = () => {
  const [responseDetails, setResponseDetails] = useState('');
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expertProfile, setExpertProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('date'); // Default sort by date

  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallfarmerrequests`);
      const pendingRequests = response.data.filter(request => request.status === "Pending");
      setRequests(pendingRequests);
      setFilteredRequests(pendingRequests);
      console.log(pendingRequests);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkexpertsession`, { withCredentials: true });
      if (!response.data) {
        alert("Session expired. Please log in again.");
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error checking session:", error);
      navigate('/expertsignin');
    }
  };

  const getExpertProfile = async () => {
    try {
      const response = await axios.get(`${config.url}/getexpertprofile`, { withCredentials: true });
      setExpertProfile(response.data);
    } catch (error) {
      console.error("Error fetching expert profile:", error);
      alert("Failed to fetch expert profile");
    }
  };

  const handleSendResponseClick = async (request) => {
    setSelectedRequest(request);
    if (!expertProfile) {
      await getExpertProfile();
    }

    try {
      const status = "Resolved";
      await axios.post(`${config.url}/sendexpertresponse`, 
        null,
        {
          params: {
            requestId: request.requestid,
            expertEmail: expertProfile?.email,
            responseDetails,
            status,
          },
          withCredentials: true,
        }
      );
      alert("Response sent successfully.");
      setRequests(prevRequests => prevRequests.filter(req => req.requestid !== request.requestid));
      setFilteredRequests(prevRequests => prevRequests.filter(req => req.requestid !== request.requestid));
      setResponseDetails("");
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error sending expert response:", error);
    }
  };

  const handleWeatherClick = (location) => {
    navigate(`/expertweather/${encodeURIComponent(location)}`, {
      state: { selectedRequest },
    });
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = requests.filter(request =>
      request.fullname.toLowerCase().includes(query) ||
      request.croptype.toLowerCase().includes(query) ||
      request.location.toLowerCase().includes(query)
    );
    setFilteredRequests(filtered);
  };

  const handleSort = (criteria) => {
    setSortType(criteria);
    const sorted = [...filteredRequests].sort((a, b) => {
      if (criteria === 'date') {
        return new Date(a.requestdate) - new Date(b.requestdate);
      } else if (criteria === 'name') {
        return a.fullname.localeCompare(b.fullname);
      } else if (criteria === 'cropType') {
        return a.croptype.localeCompare(b.croptype);
      }
      return 0;
    });
    setFilteredRequests(sorted);
  };

  useEffect(() => {
    checkSession();
    fetchRequests();
  }, []);

  return (
    <Expertlayout>
      <header className="expert-header">
        <div className="expert-in-overlay">
          <div className="controls">
            <input
              type="text"
              placeholder="Search by name, crop type, or location..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-bar"
            />
            <select onChange={(e) => handleSort(e.target.value)} className="sort-dropdown" value={sortType}>
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="cropType">Sort by Crop Type</option>
            </select>
          </div>

          <div className="requests-container">
            {filteredRequests.map((request) => (
              <div key={request.requestid} className="request-card">
                <h3>{request.fullname}</h3>
                <p><strong>Phone:</strong> {request.phone}</p>
                <p><strong>RequestID:</strong> {request.requestid}</p>
                <p><strong>Email:</strong> {request.email}</p>
                <p><strong>Crop Type:</strong> {request.croptype}</p>
                <span
                  className="send-response"
                  onClick={() => setSelectedRequest(request)}
                >
                  See Complete Request
                </span>
              </div>
            ))}
          </div>

          {selectedRequest && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={closeModal}>✖</button>
                <h3>{selectedRequest.fullname}</h3>
                <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                <p><strong>Email:</strong> {selectedRequest.email}</p>
                <p><strong>Crop Type:</strong> {selectedRequest.croptype}</p>
                <p><strong>Request Details:</strong> {selectedRequest.requestdetails}</p>
                <p><strong>Request Date:</strong> {
                                  new Date(...selectedRequest.requestdate).toLocaleDateString()
                                }</p>
                <p><strong>Location:</strong> {selectedRequest.location}</p>
                <p><strong>Status:</strong> {selectedRequest.status}</p>
                
                <textarea
                  placeholder="Enter your response here..."
                  rows="4"
                  className="response-input"
                  value={responseDetails}
                  onChange={(e) => setResponseDetails(e.target.value)}
                />
                <button
                  className="response-button"
                  onClick={() => handleSendResponseClick(selectedRequest)}
                >
                  Send Response
                </button>
                <button
                  className="weather-button"
                  onClick={() => handleWeatherClick(selectedRequest.location)}
                >
                  Check Weather
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </Expertlayout>
  );
};

export default Expertinrequest;
