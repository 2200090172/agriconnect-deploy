import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Applyloan.css';
import Farmerlayout from './Farmerlayout';
import axios from 'axios';
import config from '../../config';

const ApplyLoan = () => {
    const { state } = useLocation();
    const { loan } = state;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [applicantName, setApplicantName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [error, setError] = useState(null);

    // Check session on component load
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${config.url}/checkfarmersession`, {
                    withCredentials: true,
                });
                if (response.data === 0) {
                    alert(t('sessionExpired'));
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Error checking session:', error);
                alert(t('sessionCheckError'));
                navigate('/signin');
            }
        };
        checkSession();
    }, [navigate, t]);

    // Fetch profile data on component load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${config.url}/getfarmerprofile`, {
                    withCredentials: true,
                });
                if (response.data) {
                    const { fullname, email, phone } = response.data;
                    setApplicantName(fullname);
                    setEmail(email);
                    setContactNumber(phone);
                    console.log("Farmer email=>", email)
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError(t('profileFetchError'));
            }
        };
        fetchProfile();
    }, [t]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedImages([...uploadedImages, ...files]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create FormData to send the form data and files
            const formData = new FormData();

            // Append the non-file form fields to FormData
            formData.append('loanId', loan.loanid);  // Ensure 'loanId' matches the parameter in your backend controller
            formData.append('farmerphone', contactNumber);
            formData.append('farmerEmail', email);

            // Handling images
            const imageFields = ['document1', 'document2', 'document3'];

            uploadedImages.forEach((file, index) => {
                formData.append(imageFields[index], file);
            });

            for (let i = uploadedImages.length; i < 3; i++) {
                formData.append(imageFields[i], null); 
            }

            // Send the request with FormData
            const response = await axios.post(`${config.url}/applyloan`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                alert(t('formSubmissionSuccess'));
                // navigate('/farmer-dashboard');
            }
        } catch (error) {
            console.error('Error submitting loan application:', error);
            alert(t('formSubmissionError'));
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Farmerlayout>
            <header className="farmer-applyloan-header">
                <div className="farmer-applyloan-overlay">
                    <h1 style={{ color: '#f8f9fc' }}>{t('applyLoan')}</h1>

                    <div className="farmer-applyloan-loan-details-row">
                        <p className="farmer-applyloan-loan-summary">
                            {t('youAreApplyingForLoan')} <strong>{loan.loantype}</strong>, 
                            {t('withInterestRate')} <strong>{loan.interestrate}%</strong>. 
                            {t('maximumAmount')} <strong>${loan.maxamount}</strong>, 
                            {t('repaymentPeriod')} <strong>{loan.repaymentperiod}</strong> {t('months')}.
                        </p>
                    </div>

                    <form className="farmer-applyloan-form" onSubmit={handleFormSubmit}>
                        <div className="farmer-applyloan-form-group">
                            <label htmlFor="applicantName">{t('applicantName')}</label>
                            <input
                                type="text"
                                id="applicantName"
                                className="farmer-applyloan-input"
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="farmer-applyloan-form-group">
                            <label htmlFor="email">{t('email')}</label>
                            <input
                                type="email"
                                id="email"
                                className="farmer-applyloan-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="farmer-applyloan-form-group">
                            <label htmlFor="contactNumber">{t('contactNumber')}</label>
                            <input
                                type="tel"
                                id="contactNumber"
                                className="farmer-applyloan-input"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="farmer-applyloan-form-group">
                            <label htmlFor="images">{t('uploadDocuments')}</label>
                            <input
                                type="file"
                                id="images"
                                className="farmer-applyloan-input"
                                multiple
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                        </div>
                        <button type="submit" className="farmer-applyloan-submit-btn">
                            {t('submitApplication')}
                        </button>
                    </form>
                </div>
            </header>
        </Farmerlayout>
    );
};

export default ApplyLoan;
