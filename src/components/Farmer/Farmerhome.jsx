import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Farmerlayout from './Farmerlayout';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Farmerhome = () => {
    const [sessionStatus, setSessionStatus] = useState(null); // null initially, 1 for active, 0 for inactive
    const [error, setError] = useState(null); // Track any error messages
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:2005/checkfarmersession', {
                    withCredentials: true,
                });
                setSessionStatus(response.data);
                if (response.data === 0) {
                    alert(t("sessionExpired"));
                    navigate('/farmerlogin'); // Redirect to login if session is inactive
                }
            } catch (error) {
                console.error("Error checking session status:", error);
                setError(t("sessionCheckError")); // Set an error message
            }
        };
        checkSession();
    }, [navigate, t]);

    if (sessionStatus === null) {
        return <div>{t("loading")}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Farmerlayout>
            <header className='farmer-header'>
                <div className="overlay">
                    <h2 className="title">{t("farmerhome-welcomefarmer")}</h2>
                    <p className="description">
                        {t("farmerHome-description")}
                    </p>
                </div>
            </header>
        </Farmerlayout>
    );
};

export default Farmerhome;
