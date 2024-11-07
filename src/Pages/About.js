import { Button } from 'antd';
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function About() {
    const { isDarkTheme } = useContext(ThemeContext);

    const features = isDarkTheme
        ? ['images/8_2.jpg', 'images/9_2.jpg', 'images/10_2.jpg', 'images/11_2.jpg', 'images/12_2.jpg',]
        : ['images/8.jpg', 'images/9.jpg', 'images/10.jpg', 'images/11.jpg', 'images/12.jpg',]
    return (
        <section style={styles.features}>
            {features.map((imageUrl, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.featureItem,
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundColor: isDarkTheme ? '#000841' : "#EEF5FF"
                    }}
                >
                </div>
            ))}
        </section>
    );
}

const styles = {
    features: {
        // padding: '10px 10px',
    },
    featureItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        flexWrap: 'wrap',
        height: '750px',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        // borderRadius: '10px'
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
