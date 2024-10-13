import { Button } from 'antd';
import React from 'react';

const features = [
    {
        buttonLabel: "TÌM HIỂU CÁCH HOẠT ĐỘNG",
        imageUrl: 'images/7.jpg',
        reverse: false,
    },
    {
        buttonLabel: "THÔNG TIN THÊM VỀ ỨNG DỤNG",
        imageUrl: 'images/6.jpg',
        reverse: true,
    },
    {
        buttonLabel: "TẢI ỨNG DỤNG",
        imageUrl: 'images/5.jpg',
        reverse: false,
    },
];

function Features() {
    return (
        <section style={styles.features}>
            {features.map((feature, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.featureItem,
                        flexDirection: feature.reverse ? 'row-reverse' : 'row',
                        backgroundImage: `url(${feature.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div
                        style={{
                            marginLeft: feature.reverse ? '250px' : '0px',
                            marginRight: feature.reverse ? '0px' : '250px',
                            ...styles.textContainer,
                            justifyContent: !feature.reverse ? 'flex-end' : 'flex-start',
                            textAlign: !feature.reverse ? 'right' : 'left',
                        }}
                    >
                        <Button style={styles.featureButton}>{feature.buttonLabel}</Button>
                    </div>
                </div>
            ))}
        </section>
    );
}

const styles = {
    features: {
        padding: '5px 0px',
    },
    featureItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        flexWrap: 'wrap',
        height: '750px',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
    },
    textContainer: {
        flex: '1',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        marginTop: 100
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

export default Features;
