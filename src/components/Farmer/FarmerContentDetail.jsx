// FarmerContentDetail.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Farmerlayout from './Farmerlayout';
import './FarmerContentDetail.css'; // Optional: Add styling specific to the content details page

const FarmerContentDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve the content from state passed during navigation
    const { content } = location.state || {}; // If no content, return empty object

    // Navigate back to the previous page
    const handleBack = () => {
        navigate(-1);
    };

    if (!content) {
        return <div>Content not found</div>;
    }

    return (
        <Farmerlayout>
        <div className='farmer-content-header'>
            <div className="farmer-content-overlay">
            <div className="farmer-content-detail-header">
                <button className="farmer-back-button" onClick={handleBack}>Back</button>
                <div className="farmer-content-detail">
                    <h2>{content.title}</h2>
                    <img 
                        src={content.image} 
                        alt={content.title} 
                        width="200" 
                        height="200" 
                    />
                    <p><strong>Author:</strong> {content.author}</p>
                    <p><strong>Category:</strong> {content.category}</p>
                    <p><strong>Created Date:</strong> {content.createddate}</p>
                    <p><strong>Description:</strong> {content.description}</p>
                    {/* Optionally, add any other content fields here */}
                </div>
            </div>
            </div>
            </div>
        </Farmerlayout>
    );
};

export default FarmerContentDetail;
