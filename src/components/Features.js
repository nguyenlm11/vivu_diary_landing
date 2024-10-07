import { Button } from 'antd';
import React from 'react';

const features = [
    {
        title: "Lưu lại kỷ niệm",
        description: "Dễ dàng lưu giữ những khoảnh khắc quý giá của bạn với tính năng tự động sao lưu hình ảnh và video. Bạn có thể tạo album riêng tư và chia sẻ những kỷ niệm của mình với bạn bè và gia đình chỉ với một vài thao tác.",
        buttonLabel: "TÌM HIỂU CÁCH HOẠT ĐỘNG",
        imageUrl: 'images/5.jpg',
        reverse: false,
    },
    {
        title: "Đề xuất được cá nhân hóa",
        description: "Nhận đề xuất thông minh dựa trên sở thích và thói quen sử dụng của bạn. Tính năng này giúp bạn khám phá nội dung mới và tìm trải nghiệm phù hợp nhất với sở thích của mình.",
        buttonLabel: "THÔNG TIN THÊM VỀ ỨNG DỤNG",
        imageUrl: 'images/6.jpg',
        reverse: true,
    },
    {
        title: "Trải nghiệm liền mạch",
        description: "Lập kế hoạch và theo dõi hành trình của bạn một cách dễ dàng với giao diện thân thiện với người dùng. Bạn có thể quản lý hành trình của mình, đặt chỗ và theo dõi vị trí của mình tất cả trong một ứng dụng.",
        buttonLabel: "TẢI ỨNG DỤNG",
        imageUrl: 'images/7.jpg',
        reverse: false,
    },
];

function Features() {
    return (
        <section style={styles.features}>
            {features.map((feature, index) => (
                <div key={index} style={{ ...styles.featureItem, flexDirection: feature.reverse ? 'row-reverse' : 'row' }}>
                    <div style={styles.imageContainer}>
                        <img src={feature.imageUrl} alt={feature.title} style={styles.featureImage} />
                    </div>
                    <div style={styles.textContainer}>
                        <h1 style={styles.featureTitle}>{feature.title}</h1>
                        <p style={styles.featureDescription}>{feature.description}</p>
                        <Button style={styles.featureButton}>{feature.buttonLabel}</Button>
                    </div>
                </div>
            ))}
        </section>
    );
};

const styles = {
    features: {
        padding: '50px 20px',
    },
    featureItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        margin: '0 auto 40px',
        flexWrap: 'wrap'
    },
    imageContainer: {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        overflow: 'hidden',
        borderRadius: '50%'
    },
    featureImage: {
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    textContainer: {
        flex: '2',
        padding: '0 20px',
        textAlign: 'left'
    },
    featureTitle: {
        fontSize: '35px',
        color: '#2E5C8A',
        marginBottom: '10px'
    },
    featureDescription: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#333',
        marginBottom: '20px'
    },
    featureButton: {
        backgroundColor: '#8EACCD',
        color: '#fff',
        padding: '20px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none'
    },
};

export default Features;
