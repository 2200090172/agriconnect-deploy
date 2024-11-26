import React, { useState, useEffect } from 'react';
import './Approveexpert.css';
import AdminLayout from './Adminlayout';
import axios from 'axios';
import config from '../../config';

const Approveexpert = () => {
  const [experts, setExperts] = useState([]);

  const fetchExperts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallexpertsignin`);
      setExperts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAction = async (email, action) => {
    try {
      const response = await axios.post(`${config.url}/expertaction`, null, {
        params: {
          email,
          action
        }
      });
      if (response.status === 200) {
        alert(`Expert ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
        fetchExperts(); // Refresh the list after the action
      }
    } catch (error) {
      console.log(error.message);
      alert('Failed to update expert status.');
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return (
    <AdminLayout>
      <div className="approve-expert-container">
        <div className="approve-expert-overlay">
          <div className="approve-expert-content">
            <h2>View All Experts</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Experience</th>
                  <th>Field of Expertise</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {experts.map((expert, index) => (
                  <tr key={index}>
                    <td>{expert.fullname}</td>
                    <td>{expert.email}</td>
                    <td>{expert.phone}</td>
                    <td>{expert.experience}</td>
                    <td>{expert.fieldofexpertise}</td>
                    <td>{expert.status === 'pending' ? 'Pending' : expert.status}</td>
                    <td>
                      {expert.status === 'pending' ? (
                        <>
                          <span
                            onClick={() => handleAction(expert.email, 'accept')}
                            className="approve-expert-accept"
                            role="button"
                          >
                            Accept
                          </span>
                          <span
                            onClick={() => handleAction(expert.email, 'reject')}
                            className="approve-expert-reject"
                            role="button"
                          >
                            Reject
                          </span>
                        </>
                      ) : (
                        <span className={`approve-expert-status ${expert.status}`}>
                          {expert.status === 'accept' ? 'Accepted' : 'Rejected'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Approveexpert;
