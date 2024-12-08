import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Farmerlayout from './Farmerlayout';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Farmerexplorecontent.css';
import config from '../../config';

const Farmerexplorecontent = () => {
    const [sessionStatus, setSessionStatus] = useState(null); // null initially, 1 for active, 0 for inactive
    const [contentList, setContentList] = useState([]); // To store all farming content data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling
    const [imageUrls, setImageUrls] = useState({}); // Map to store image URLs for content IDs
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [itemsPerPage, setItemsPerPage] = useState(4); // Show 4 items per page
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Check session on load
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${config.url}/checkfarmersession`, {
                    withCredentials: true,
                });
                setSessionStatus(response.data);
                if (response.data === 0) {
                    alert(t("sessionExpired"));
                    navigate('/signin'); // Redirect to login if session is inactive
                }
            } catch (error) {
                console.error("Error checking session status:", error);
                setError(t("sessionCheckError")); // Set an error message
            }
        };
        checkSession();
    }, [navigate, t]);

    // Fetch all farming content metadata
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${config.url}/getAllFarmingContent`);
                setContentList(response.data); // Store the metadata
                setLoading(false); // Stop loading

                console.log(response.data)
                // Fetch images for all content IDs
                response.data.forEach(async (content) => {
                    const imageUrl = await fetchImage(content.contentid);
                    setImageUrls((prev) => ({ ...prev, [content.contentid]: imageUrl }));
                });
            } catch (err) {
                setError('Error fetching content data');
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    // Function to fetch the image by content id
    const fetchImage = async (id) => {
        try {
            const response = await axios.get(`${config.url}/getImage/${id}`, { responseType: 'arraybuffer' });
            
            // Extract the MIME type from the response headers
            const contentType = response.headers['content-type'] || 'application/octet-stream';
            
            // Create a Blob using the correct content type
            const imageBlob = new Blob([response.data], { type: contentType });
            
            // Generate and return a local URL for the image
            return URL.createObjectURL(imageBlob);
        } catch (err) {
            console.error('Error fetching image:', err);
            return null;
        }
    };
    

    // Navigate to content details page with full content
    const handleShowFull = (content) => {
        const imageUrl = imageUrls[content.contentid];  // Get the corresponding image URL
        navigate(`/content/${content.contentid}`, {
            state: { content: { ...content, image: imageUrl } }  // Pass the image URL with other content details
        });
    };
    

    // Pagination: Get content for current page
    const indexOfLastContent = currentPage * itemsPerPage;
    const indexOfFirstContent = indexOfLastContent - itemsPerPage;
    const currentContent = contentList.slice(indexOfFirstContent, indexOfLastContent);

    // Change page number
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(contentList.length / itemsPerPage);

    if (sessionStatus === null || loading) {
        return <div>{t("loading")}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Farmerlayout>
            <header className='farmer-content-header'>
                <div className="farmer-content-overlay">
                    <h3>All Farming Content</h3>
                    <div className="farmer-content-cards">
                        {currentContent.map((content) => (
                            <div key={content.contentid} className="farmer-content-card">
                                <img 
                                    src={imageUrls[content.contentid]} 
                                    alt={content.title} 
                                    className="farmer-content-image"
                                />
                                <h4>{content.title}</h4>
                                <button
                                    onClick={() => handleShowFull(content)}
                                    className="farmer-content-button"
                                >
                                    {t("showFull")}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className="pagination">
                        <button
                            className="pagination-button"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="pagination-button"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </header>
        </Farmerlayout>
    );
};

export default Farmerexplorecontent;
