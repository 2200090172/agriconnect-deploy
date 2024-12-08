import React, { useEffect, useState } from 'react';
import Financierlayout from './Financierlayout';
import './Viewallloanrequests.css';
import axios from 'axios';
import config from './../../config';

export const Viewallloanrequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching loan requests...');
    axios
      .get(`${config.url}/financier/loanrequests`)
      .then((response) => {
        console.log('Loan requests fetched successfully:', response.data);
        setLoanRequests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching loan requests:', err);
        setError('Failed to load loan requests. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleAccept = (id) => {
    axios
      .post(`${config.url}/financier/loanrequests/${id}/accept`)
      .then(() => {
        alert('Loan accepted successfully');
        setLoanRequests((prev) =>
          prev.map((request) =>
            request.id === id ? { ...request, status: 'Approved' } : request
          )
        );
      })
      .catch((err) => {
        console.error('Error accepting loan request:', err);
        alert('Failed to accept loan request. Please try again.');
      });
  };

  const handleReject = (id) => {
    axios
      .post(`${config.url}/financier/loanrequests/${id}/reject`)
      .then(() => {
        alert('Loan rejected successfully');
        setLoanRequests((prev) =>
          prev.map((request) =>
            request.id === id ? { ...request, status: 'Rejected' } : request
          )
        );
      })
      .catch((err) => {
        console.error('Error rejecting loan request:', err);
        alert('Failed to reject loan request. Please try again.');
      });
  };

  return (
    <Financierlayout>
      <header className="financier-viewallloanrequests-header">
        <div className="financier-viewallloanrequests-overlay">
          <h1>All Loan Requests</h1>
        </div>
      </header>

      <div className="viewallloanrequests-container">
        {/* Sidebar */}
        <div className="viewallloanrequests-sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/viewallloanrequests">View Loan Requests</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>

        {/* Table of Loan Requests */}
        <div>
          {loading ? (
            <p className="viewallloanrequests-loading">Loading loan requests...</p>
          ) : error ? (
            <p className="viewallloanrequests-error">{error}</p>
          ) : loanRequests.length > 0 ? (
            <table className="viewallloanrequests-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Farmer Phone</th>
                  <th>Application Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.farmerphone}</td>
                    <td>
                      {request.applicationDate
                        ? new Date(request.applicationDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>{request.status || 'Pending'}</td>
                    <td>
                      <button
                        className="viewallloanrequests-accept-button"
                        onClick={() => handleAccept(request.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="viewallloanrequests-reject-button"
                        onClick={() => handleReject(request.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="viewallloanrequests-no-data">No loan requests available</p>
          )}
        </div>
      </div>
    </Financierlayout>
  );
};
