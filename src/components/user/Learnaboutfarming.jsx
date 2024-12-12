import React from 'react';
import Signinlayout from '../signin/Signinlayout';
import Userlayout from './Userlayout';

const LearnFarming = () => {
    const videos = [
        {
            id: 1,
            title: 'How to Start Organic Farming',
            url: 'https://www.youtube.com/embed/WhOrIUlrnPo', // Replace with actual organic farming video
        },
        {
            id: 2,
            title: 'Crop Rotation Basics',
            url: 'https://www.youtube.com/embed/5SzJkL7czI0', // Replace with a crop rotation video
        },
        {
            id: 3,
            title: 'Irrigation Techniques for Beginners',
            url: 'https://www.youtube.com/embed/lRyXlvIJFWI', // Replace with irrigation video
        },
        
    ];

    return (
        <Userlayout>
              <header className="user-header">
              <div className="user-overlay">
        <div style={styles.container}>
            <h2 style={styles.title}>Learn Farming</h2>
            <p style={styles.description}>
                Explore farming techniques through these videos. Learn step by step!
            </p>
            <div style={styles.videoGrid}>
                {videos.map((video) => (
                    <div key={video.id} style={styles.videoCard}>
                        <iframe
                            src={video.url}
                            title={video.title}
                            style={styles.videoFrame}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <h3 style={styles.videoTitle}>{video.title}</h3>
                    </div>
                ))}
            </div>
        </div>
        </div>
        </header>
        </Userlayout>
       
    );
};

const styles = {
    container: {
        padding: '1.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '2rem',
    },
    title: {
        fontSize: '2rem',
        color: '#4caf50',
        textAlign: 'center',
        marginBottom: '1rem',
    },
    description: {
        fontSize: '1.2rem',
        color: '#555',
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    videoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
    },
    videoCard: {
        background: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
        textAlign: 'center',
    },
    videoCardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    },
    videoFrame: {
        width: '100%',
        height: '180px',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    videoTitle: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#333',
    },
};

export default LearnFarming;
