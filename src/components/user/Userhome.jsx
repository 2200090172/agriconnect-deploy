import React, { useEffect, useState } from 'react';
import Userlayout from './Userlayout';
import './Userhome.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Userhome = () => {
    const [user, setUser] = useState(null); // Store user data
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

  
    return (
        <Userlayout>
            <header className="user-header">
                <div className="user-overlay">
                    <h1>{t("Welcome")}, {user?.name || t("user")}!</h1> {/* Display user's name or fallback to "user" */}
                </div>
            </header>
        </Userlayout>
    );
};

export default Userhome;
