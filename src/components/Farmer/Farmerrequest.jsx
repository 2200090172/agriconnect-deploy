import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Farmerlayout from './Farmerlayout';
import './Farmerrequest.css';
import axios from 'axios';
import config from '../../config';
import { useTranslation } from 'react-i18next';

const FarmerRequest = () => {
  const {t} =useTranslation();
  const navigate = useNavigate();

  const initialFormState = {
    croptype: '',
    requestdetails: '',
    location: '',
  };

  const [request, setRequest] = useState(initialFormState);

  // Check session on component load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:2005/checkfarmersession', {
          withCredentials: true,
        });
        if (response.data === 0) {
          alert(t("sessionExpired"));
          navigate('/signin');
        }
      } catch (error) {
        console.error("Error checking session:", error);
        alert(t('sessionCheckError'));
        navigate('/signin');
      }
    };
    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profileResponse = await axios.get(`${config.url}/getfarmerprofile`, {
        withCredentials: true,
      });

      if (profileResponse && profileResponse.data) {
        const { fullname, phone, email } = profileResponse.data;

        const requestData = {
          ...request,
          fullname,
          phone,
          email,
          requestdate: new Date(), 
        };

        const response = await axios.post("http://localhost:2005/sendrequest", requestData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          alert(t('requestSuccess'));
          setRequest(initialFormState);
        }
      }
    } catch (error) {
      console.log(error.message);
      alert("Failed to submit request: " + error.message);
    }
  };

  return (
    <Farmerlayout>
      <div className="farmer-request-container">
        <div className="farmer-request-overlay">
          <form className="farmer-request-form" onSubmit={handleSubmit}>
          <h2>{t('farmerrequest-sendRequestTitle')}</h2>
            <div>
            <label>{t('farmerrequest-cropType')}</label>
              <input
                type="text"
                name="croptype"
                value={request.croptype}
                onChange={handleChange}
                required
              />
            </div>
            <div>
            <label>{t('farmerrequest-requestDetails')}</label>
              <textarea
                name="requestdetails"
                value={request.requestdetails}
                onChange={handleChange}
                required
              />
            </div>
            <div>
            <label>{t('farmerrequest-location')}</label>
              <input
                type="text"
                name="location"
                value={request.location}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">{t('farmerrequest-submitRequest')}</button>
          </form>
        </div>
      </div>
    </Farmerlayout>
  );
};

export default FarmerRequest;
