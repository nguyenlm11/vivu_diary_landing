import { Button, Modal, QRCode } from 'antd';
import React, { useState, useEffect } from 'react';

function Hero() {
    const images = [
        'images/1.jpg',
        // 'images/2.jpg',
        // 'images/3.jpg',
        // 'images/4.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
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
        <section style={{
            ...styles.hero, backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div style={styles.heroContent}>
                <Button style={styles.heroButton} onClick={showModal}>Bắt đầu</Button>
            </div>

            <Modal title="Tải ứng dụng Vivu Dairy" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <QRCode value={'https://vivu-dairy/donwload'} />
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
        backgroundPosition: 'center',
        height: '500px',
        color: '#fff',
        textAlign: 'center',
        transition: 'background-image 1s ease-in-out',
    },
    heroContent: {
        maxWidth: '600px',
        margin: '0 auto',
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
