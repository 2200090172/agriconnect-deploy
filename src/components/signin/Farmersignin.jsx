import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Farmerlogin.css'; // Add your custom CSS or use Tailwind CSS
// import Farmerlayout from './Farmerlayout';
import './Farmersignin.css'
import axios from 'axios';
import Signinlayout from './Signinlayout';

const Farmersignin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contact: '',
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
        const { contact, password } = formData;
    
        try {
            console.log("Attempting login with contact:", contact, "and password:", password); // Debugging line
    
            const response = await axios.get(`http://localhost:2005/farmerlogin`, {
                params: {
                    fcontact: contact, 
                    fpwd: password     
                },
                withCredentials: true // Enable cookies with request
            });
    
            console.log("Response:", response); // Debugging line
    
            if (response.status === 200 && response.data === "Login Success") {
                // alert("Login successful!");
                navigate('/farmerhome'); // Redirect to the farmer's home page after successful login
            } else {
                alert("Invalid contact or password.");
            }
        } catch (error) {
            console.error("Error during login:", error); // This will log the exact error message to the console
            alert("Failed to login. Please try again.");
        }
    };
    
    return (
        <Signinlayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="card bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">Farmer Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group mb-4">
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                id="contact"
                                name="contact"
                                placeholder="Enter your contact number"
                                required
                                type="text"
                                onChange={handleChange}
                                value={formData.contact}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
                            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition ease-in-out duration-150"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-cente text-blackr">
                        Don’t have an account?{' '}
                        {/* Modify the signup uri */}
                        <Link to="/farmersignup" className="text-green-600 hover:text-green-800 font-medium">Sign Up</Link>
                    </p>
                
                </div>
            
            </div>
            </Signinlayout>
    );
};

export default Farmersignin;
