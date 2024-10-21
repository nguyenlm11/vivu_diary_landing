import { Button } from 'antd';
import React from 'react';

const features = [
    'images/8.jpg',
    'images/9.jpg',
    'images/10.jpg',
    'images/11.jpg',
    'images/12.jpg',
];

function About() {
    return (
        <section style={styles.features}>
            {features.map((imageUrl, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.featureItem,
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                </div>
            ))}
        </section>
    );
}

const styles = {
    features: {
        padding: '10px 10px',
    },
    featureItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        flexWrap: 'wrap',
        height: '750px',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        borderRadius: '10px'
    },
    textContainer: {
        flex: '1',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    featureButton: {
        backgroundColor: '#8EACCD',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none'
    },
};

export default About;
