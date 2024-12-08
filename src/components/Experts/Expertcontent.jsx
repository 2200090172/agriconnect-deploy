import React, { useState, useEffect } from 'react';
import Expertlayout from './Expertlayout';
import './Expertcontent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const Expertcontent = () => {
  const [sessionActive, setSessionActive] = useState(true);
  const [farmingContent, setFarmingContent] = useState({
    title: '',
    description: '',
    author: '',
    contenttype: '',
    category: '',
    media: null, // This will store the file as a byte array
    mediaPreview: null, // This will store the file preview
    mediaName: '', // To store the media file name
  });

  const [expertProfile, setExpertProfile] = useState(null);
  const navigate = useNavigate();

  // Check session on component mount
  const checkSession = async () => {
    try {
      const response = await axios.get(`${config.url}/checkexpertsession`, { withCredentials: true });
      setSessionActive(response.data);
      if (response.data === 0) {
        alert('Session expired. Please log in again.');
        navigate('/expertsignin');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      alert('Error checking session');
      navigate('/expertsignin');
    }
  };

  const getExpertProfile = async () => {
    try {
      const response = await axios.get(`${config.url}/getexpertprofile`, { withCredentials: true });
      setExpertProfile(response.data);
      setFarmingContent((prevState) => ({
        ...prevState,
        author: response.data.email, // Set the author as the email from response
      }));
    } catch (error) {
      console.error('Error fetching expert profile:', error);
      alert('Error fetching expert profile');
    }
  };

  useEffect(() => {
    checkSession(); // Check session when component mounts
    getExpertProfile(); // Fetch expert profile
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmingContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes (image/video)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const mediaPreview = reader.result; // This is the Data URL
      setFarmingContent((prevState) => ({
        ...prevState,
        mediaPreview, // Save the preview as Data URL
        mediaName: file.name, // Save the file name
      }));
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as Data URL (this works for images and videos)
    }
  };

  // Submit the content to backend
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', farmingContent.title);
      formData.append('description', farmingContent.description);
      formData.append('author', farmingContent.author);
      formData.append('contenttype', farmingContent.contenttype);
      formData.append('category', farmingContent.category);
      formData.append('media', new Blob([farmingContent.media])); // Append media as Blob
      formData.append('createddate', new Date().toISOString());

      const response = await axios.post(`${config.url}/insertfarmingcontent`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert('Content successfully saved!');

      // Reset fields after submission
      setFarmingContent({
        title: '',
        description: '',
        author: '',
        contenttype: '',
        category: '',
        media: null,
        mediaPreview: null,
        mediaName: '',
      });
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  return (
    <Expertlayout>
      <header className="expert-content-header">
        <div className="expert-content-overlay">
          <div className="content-creator">
            <h2>Create Farming Content</h2>
            <div className="content-fields">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={farmingContent.title}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={farmingContent.description}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={farmingContent.author}
                readOnly
              />
              <select
                name="contenttype"
                value={farmingContent.contenttype}
                onChange={handleInputChange}
              >
                <option value="">Select Content Type</option>
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Image">Image</option>
              </select>
              <select
                name="category"
                value={farmingContent.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Farming Tips">Farming Tips</option>
                <option value="Technology">Technology</option>
              </select>
              
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />

              {/* Displaying the preview of uploaded media */}
              {farmingContent.mediaPreview && (
                <div className="media-preview">
                  {farmingContent.contenttype === 'Image' ? (
                    <img src={farmingContent.mediaPreview} alt="Preview" className="preview-image" />
                  ) : farmingContent.contenttype === 'Video' ? (
                    <video width="200" controls>
                      <source src={farmingContent.mediaPreview} type="video/*" />
                    </video>
                  ) : null}
                  <p>{farmingContent.mediaName}</p>
                </div>
              )}
            </div>
            <span className="expert-content-btn" onClick={handleSubmit}>
              Save Content
            </span>
          </div>
        </div>
      </header>
    </Expertlayout>
  );
};

export default Expertcontent;
    