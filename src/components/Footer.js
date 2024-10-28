import React from 'react';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';

function Footer() {
    return (
        <footer style={styles.footer}>
            <div>
                <a href="https://www.facebook.com/profile.php?id=61566170517089" style={styles.socialLink}>
                    <FaFacebookF size={24} />
                </a>
                <a href="https://www.tiktok.com/@vivudiary.vivu" style={styles.socialLink}>
                    <FaTiktok size={24} />
                </a>
            </div>
            <p style={styles.footerText}>&copy; Vivu Dairy 2024. All Rights Reserved.</p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        padding: '20px',
        textAlign: 'center',
        color: '#FFA500',
    },
    footerText: {
        marginBottom: '10px',
    },
    socialLink: {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#FFA500',
    },
};

export default Footer;
