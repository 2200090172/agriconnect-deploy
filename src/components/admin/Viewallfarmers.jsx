import './Viewallfarmers.css';
import AdminLayout from './Adminlayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const Viewallfarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  const fetchFarmers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallfarmers`);
      setFarmers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Check admin session when the component mounts
    const checkSession = async () => {
      try {
        const response = await axios.get(`${config.url}/checkadminsession`, {
          withCredentials: true,
        });

        if (response.data === 0) {
          alert("You are no longer accessible to this page, Please Login again!!");
          navigate('/adminlogin');
        } else {
          // Fetch farmers data if session is active
          fetchFarmers();
        }
      } catch (error) {
        console.error("Error checking session:", error);
        alert("Error checking session. Please try again.");
        navigate('/adminlogin');
      } finally {
        setLoading(false); // Set loading to false after session check is complete
      }
    };

    checkSession();
  }, [navigate]);

  // Render a loading indicator or nothing until session check is complete
  if (loading) {
    return null; // or return <div>Loading...</div> if you want to show a loading message
  }

  return (
    <AdminLayout>
      <div className="viewallfarmers-container">
        <div className="viewallfarmers-overlay">
          <div className="farmers-container">
            <h2>View All Farmers</h2>
            {error && <p className="error-message">{error}</p>}
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Farm Size</th>
                  <th>Crops Grown</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((farmer, index) => (
                  <tr key={index}>
                    <td>{farmer.name}</td>
                    <td>{farmer.email}</td>
                    <td>{farmer.phone}</td>
                    <td>{farmer.location}</td>
                    <td>{farmer.farmsize}</td>
                    <td>{farmer.crops}</td>
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

export default Viewallfarmers;
