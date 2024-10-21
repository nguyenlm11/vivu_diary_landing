import { Button, Modal, QRCode } from 'antd';
import React, { useState, useEffect } from 'react';

function Hero() {
    const images = [
        'images/1.jpg',
        'images/7.jpg',
        'images/6.jpg',
        'images/5.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsSliding(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsSliding(false);
            }, 1000); // Thời gian phù hợp với thời gian animation
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                <Button style={styles.heroButton} onClick={showModal}>
                    Bắt đầu
                </Button>
            </div>

            <Modal title="Tải ứng dụng Vivu Dairy" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <QRCode value={'https://vivu-dairy/download'} />
            </Modal>
        </section>
    );
}

const styles = {
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        height: '500px',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
    },
    heroContent: {
        maxWidth: '600px',
        margin: '0 auto',
        zIndex: 1,
    },
    heroButton: {
        padding: '20px 35px',
        marginTop: '250px',
        fontSize: '18px',
        backgroundColor: '#2E5C8A',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default Hero;
