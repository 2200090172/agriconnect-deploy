import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PublicSignup.css';
import Signinlayout from './Signinlayout';
import axios from 'axios';
import config from '../../config';


const initialFormState = {
    userName: '',
    email: '',
    password: '',
};

const AuthPage = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.url}/addPublic`, formData);
            if (response.status === 200) {
                alert("Public Added Successfully!");
                setFormData(initialFormState);
                setMessage("Registered Successfully!!");
            } else {
                setMessage("Failed to register. Please try again.");
            }
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    return (
        <Signinlayout>
        <div className="signin-container">
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="signin-btn">Sign up</button>
            </form>

            <p className="signin-footer">
                By clicking continue, you agree to our{" "}
                <Link to="/termsofservice" className="underline hover:text-primary">Terms of Service</Link> and{" "}
                <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
            </p>
            <p className="signin-footer">
                Already have an account? <Link to="/signin">Login</Link>
            </p>
        </div>
        </Signinlayout>
    );
};

export default AuthPage;
