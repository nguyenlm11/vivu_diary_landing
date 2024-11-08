import React, { useContext } from 'react';
import { FaArrowUp, FaFacebookF, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

function Footer() {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <footer style={{
            ...styles.footer,
            backgroundImage: isDarkTheme ? 'url(images/background.jpg)' : 'url(images/.jpg',
        }}>
            <div style={{ ...styles.container, borderBottom: isDarkTheme ? '1px solid #FFFFFF' : '1px solid #8EACCD' }} >
                < div style={styles.logoSection}>
                    <img style={styles.logo} src={!isDarkTheme ? "images/logo.jpg" : "images/logo_2.jpg"} alt="Vivu Diary Logo" />
                </div>

                <div>
                    <h3 style={{ fontWeight: '900', color: isDarkTheme ? '#F9F1AA' : '#195F98' }}>Liên kết hữu ích</h3>
                    <p><Link style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }} to="/">● Trang chủ</Link></p>
                    <p><Link style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }} to="/about">● Giới thiệu</Link></p>
                    <p><Link style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }} to="/travel-destinations">● Mẹo du lịch</Link></p>
                </div>

                <div>
                    <h3 style={{ fontWeight: '900', color: isDarkTheme ? '#F9F1AA' : '#195F98' }}>Về chúng tôi</h3>
                    <p style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>● Tầm nhìn</p>
                    <p style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>● Sứ mệnh</p>
                    <p style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>● Giá trị cốt lõi</p>
                </div>

                <div>
                    <h3 style={{ fontWeight: '900', color: isDarkTheme ? '#F9F1AA' : '#195F98' }}>Theo dõi chúng tôi</h3>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=61566170517089"
                            style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>
                            <FaFacebookF size={20} />
                            Facebook
                        </a>
                    </p>
                    <p>
                        <a href="https://www.tiktok.com/@vivudiary.vivu"
                            style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>
                            <FaTiktok size={20} />
                            TikTok
                        </a>
                    </p>
                    <p>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vivudiary.vivuu@gmail.com"
                            style={{ ...styles.link, color: isDarkTheme ? '#FFFFFF' : '#8EACCD', }}>
                            <FaEnvelope size={20} />
                            Email
                        </a>
                    </p>
                </div>
            </div>

            {/* Bottom row */}
            <div style={styles.bottomRow}>
                <p style={{ ...styles.footerText, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>Terms of Service</p>
                <p style={{ ...styles.footerText, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>&copy; Vivu Diary 2024. All Rights Reserved.</p>
                <a href="#top" style={{ ...styles.backToTop, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>
                    Quay lại đầu trang <FaArrowUp />
                </a>
            </div>
        </footer >
    );
}

const styles = {
    footer: {
        padding: '20px',
        color: '#333',
        textAlign: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px -2px 8px',
        zIndex: 100,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingBottom: '30px',
    },
    logoSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '150px',
    },
    gridPattern: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 20px)',
        gap: '10px',
    },
    gridItem: {
        width: '20px',
        height: '20px',
        backgroundColor: '#333',
    },
    brandName: {
        marginTop: '15px',
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    bottomRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        fontSize: '0.9em',
        fontWeight: 'bold'
    },
    backToTop: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#333',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    logo: {
        height: 200,
    },
};

export default Footer;
