import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Signinlayout from './Signinlayout';
import config from '../../config';

const Adminlogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
    
        try {
            console.log("Attempting login with username:", username, "and password:", password);
    
            const response = await axios.get(`${config.url}/adminlogin`, {
                params: {
                    username: username,
                    password: password
                },
                withCredentials: true
            });
    
            console.log("Response:", response);
    
            if (response.data === 1) {
                navigate('/adminhome');
            } else {
                alert("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Failed to login. Please try again.");
        }
    };

    return (
        <Signinlayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="card bg-white bg-opacity-80 shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">Admin Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                required
                                type="text"
                                onChange={handleChange}
                                value={formData.username}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                required
                                type="password"
                                onChange={handleChange}
                                value={formData.password}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition ease-in-out duration-150"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </Signinlayout>
    );
};

export default Adminlogin;
