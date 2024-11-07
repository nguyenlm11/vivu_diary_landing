import { Button, QRCode } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Hero() {
    const { isDarkTheme } = useContext(ThemeContext);

    const images = isDarkTheme
        ? ['images/1_2.jpg', 'images/7_2.jpg', 'images/6_2.jpg', 'images/5_2.jpg']
        : ['images/1.jpg', 'images/7.jpg', 'images/6.jpg', 'images/5.jpg'];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const [modalTransition, setModalTransition] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsSliding(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsSliding(false);
            }, 1000);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const showModal = () => {
        setIsModalVisible(true);
        setTimeout(() => setModalTransition(true), 10);
    };

    const closeModal = () => {
        setModalTransition(false);
        setTimeout(() => setIsModalVisible(false), 300);
    };

    return (
        <section style={styles.hero}>
            <div
                style={{
                    ...styles.slider,
                    transform: isSliding ? 'translateX(-50%)' : 'translateX(0)',
                    transition: isSliding ? 'transform 1s ease-in-out' : 'none',
                }}
                onTransitionEnd={() => {
                    if (isSliding) {
                        setIsSliding(false);
                    }
                }}
            >
                <div
                    style={{
                        ...styles.heroImage,
                        backgroundImage: `url(${images[currentImageIndex]})`,
                    }}
                />
                <div
                    style={{
                        ...styles.heroImage,
                        backgroundImage: `url(${images[(currentImageIndex + 1) % images.length]})`,
                    }}
                />
            </div>
            <div style={styles.heroContent}>
                <Button style={{
                    ...styles.heroButton,
                    backgroundColor: isDarkTheme ? '#F9F1AA' : '#195F98',
                    color: isDarkTheme ? '#000' : '#fff',
                    fontWeight: '620'
                }}
                    onClick={showModal}
                >
                    TẢI NGAY
                </Button>
            </div>

            {isModalVisible && (
                <div style={styles.customModal}>
                    <div
                        style={{
                            ...styles.modalContent,
                            opacity: modalTransition ? 1 : 0,
                            transform: modalTransition ? 'translateY(0)' : 'translateY(-20px)',
                        }}
                    >
                        <h2 style={{ color: "#295F98" }}>Tải ứng dụng Vivu Dairy</h2>
                        <div style={styles.qrWrapper}>
                            <QRCode
                                color='#000'
                                value={'https://expo.dev/accounts/mtphuc25032003/projects/vivu-diary/builds/a0a07629-937e-42f9-818a-987d05d5a4d1'}
                            />
                        </div>
                        <Button onClick={closeModal} style={styles.closeButton}>
                            Đóng
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}

const styles = {
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        height: '650px',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
    },
    slider: {
        display: 'flex',
        flexDirection: 'row',
        width: '200%',
        transition: 'transform 1s ease-in-out',
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
    },
    heroImage: {
        width: '100%',
        backgroundSize: '100% 750px',
        backgroundPosition: 'center',
        height: '100%',
    },
    heroContent: {
        maxWidth: '600px',
        margin: '0 auto',
        zIndex: 1,
    },
    heroButton: {
        padding: '32px 32px',
        marginTop: '250px',
        fontSize: '18px',
        backgroundColor: '#800080',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    customModal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '450px',
        width: '150%',
        color: '#fff',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
    },
    qrWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
    },
    closeButton: {
        backgroundColor: '#295F98',
        color: '#fff',
        marginTop: '15px',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default Hero;
