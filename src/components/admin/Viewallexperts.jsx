import React, { useState, useEffect } from 'react';
import './Viewallexperts.css';
import AdminLayout from './Adminlayout';
import axios from 'axios';
import config from '../../config';

const ViewallExperts = () => {
  const [experts, setExperts] = useState([]);

  const fetchExperts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallexperts`);
      setExperts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return (
    <AdminLayout>
      <div className="viewallexperts-container">
        <div className="viewallexperts-overlay">
          <div className="viewallexperts-content">
            <h2>View All Experts</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Experience</th>
                  <th>Field of Expertise</th>
                </tr>
              </thead>
              <tbody>
                {experts.map((expert, index) => (
                  <tr key={index}>
                    <td>{expert.name}</td>
                    <td>{expert.email}</td>
                    <td>{expert.phone}</td>
                    <td>{expert.experience}</td>
                    <td>{expert.field}</td>
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

export default ViewallExperts;
