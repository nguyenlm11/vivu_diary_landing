import React from 'react';
import { Row, Col, Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

function About() {
    return (
        <section id="about-section" style={styles.aboutSection}>
            <Row justify="center" gutter={[32, 32]} align="middle">
                <Col xs={24} md={12} style={{ textAlign: 'center' }}>
                    <img
                        src="images/logo.jpg"
                        alt="Ứng dụng Vi vu Diary"
                        style={styles.aboutImage}
                    />
                </Col>

                <Col xs={24} md={12}>
                    <Card bordered={false} style={styles.card}>
                        <Title level={2} style={styles.aboutTitle}>Giới Thiệu Về Chúng Tôi</Title>
                        <Paragraph style={styles.aboutText}>
                            <strong>Vi vu Diary</strong> là người bạn đồng hành đáng tin cậy trong mỗi chuyến đi, giúp bạn ghi lại những kỷ niệm du lịch và cung cấp các gợi ý về điểm đến du lịch, cùng với các tiện ích liên quan.
                        </Paragraph>
                        <Title level={3} style={styles.aboutSubtitle}>Tầm Nhìn Của Chúng Tôi</Title>
                        <Paragraph style={styles.aboutText}>
                            <strong>Vi vu Diary</strong> mong muốn trở thành ứng dụng du lịch hàng đầu dành cho giới trẻ tại Việt Nam, kết nối những người yêu thích du lịch và thúc đẩy sự phát triển bền vững của ngành du lịch.
                        </Paragraph>
                        <Title level={3} style={styles.aboutSubtitle}>Sứ Mệnh Của Chúng Tôi</Title>
                        <Paragraph style={styles.aboutText}>
                            Nền tảng của chúng tôi hướng đến việc lưu trữ dễ dàng những kỷ niệm du lịch, cung cấp giải pháp du lịch toàn diện, tạo ra một cộng đồng năng động và thúc đẩy sự trao đổi văn hóa giữa các thành viên.
                        </Paragraph>
                        <Title level={3} style={styles.aboutSubtitle}>Giá Trị Cốt Lõi</Title>
                        <Paragraph style={styles.aboutText}>
                            <strong>Khám Phá</strong> - Mở rộng tầm nhìn với những điểm đến mới.<br />
                            <strong>Kết Nối</strong> - Xây dựng cộng đồng du lịch đoàn kết.<br />
                            <strong>Lưu Trữ</strong> - Dễ dàng lưu giữ những khoảnh khắc đáng nhớ.<br />
                            <strong>Chia Sẻ</strong> - Truyền tải những trải nghiệm du lịch độc đáo.
                        </Paragraph>
                        <Title level={3} style={styles.aboutSubtitle}>Điểm Khác Biệt Của Vi vu Diary</Title>
                        <Paragraph style={styles.aboutText}>
                            Chúng tôi không chỉ là một ứng dụng lưu trữ kỷ niệm mà còn là một người bạn đường, giúp bạn khám phá những góc nhìn mới, kết nối với những người bạn mới và cùng nhau tạo nên một hành trình tuyệt vời.
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}

const styles = {
    aboutSection: {
        padding: '80px 20px',
    },
    aboutTitle: {
        color: '#8EACCD',
        textAlign: 'left',
        marginBottom: '20px',
    },
    aboutSubtitle: {
        color: '#8EACCD',
        marginTop: '15px',
        fontWeight: 'bold',
    },
    aboutText: {
        fontSize: '16px',
        color: '#333',
        textAlign: 'justify',
        lineHeight: '1.8',
    },
    aboutImage: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    card: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '20px',
    },
};

export default About;
