import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the passed state
import axios from 'axios';
import Signinlayout from './Signinlayout';
// import './Resetpassword.css'

const Resetpassword = () => {
    const location = useLocation(); // Get the passed state
    const { email, role } = location.state || {}; // Destructure email and role from state

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(`/updatepassword?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`);

            if (response.status === 200) {
                alert('Password updated successfully!');
            } else {
                alert('Failed to update password.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred while updating the password.');
        }
    };

    const handleReset = () => {
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Signinlayout>
            <div className="forgotpassword-normal-signin-container">
                <div className="forgotpassword-signin-form">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div>
                        <span
                            onClick={handleSubmit}
                            style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}
                        >
                            Submit
                        </span>
                        <span
                            onClick={handleReset}
                            style={{ cursor: 'pointer', color: 'red' }}
                        >
                            Reset
                        </span>
                    </div>
                </div>
            </div>
        </Signinlayout>
    );
};

export default Resetpassword;
