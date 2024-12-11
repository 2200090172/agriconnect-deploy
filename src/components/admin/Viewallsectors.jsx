import React, { useState, useEffect } from 'react';
import './Viewallsectors.css';
import AdminLayout from './Adminlayout';
import axios from 'axios';
import config from '../../config';

const Viewallsectors = () => {
  const [financiers, setFinanciers] = useState([]);

  const fetchFinanciers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallfinanciers`);
      setFinanciers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFinanciers();
  }, []);

  return (
    <AdminLayout>
      <div className="viewallsectors-container">
        <div className="viewallsectors-overlay">
          <div className="viewallsectors-content">
            <h2>View All Financiers</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Organization Name</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {financiers.map((financier, index) => (
                  <tr key={index}>
                    <td>{financier.name}</td>
                    <td>{financier.email}</td>
                    <td>{financier.contact}</td>
                    <td>{financier.organizationname}</td>
                    <td>{financier.location}</td>
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

export default Viewallsectors;
