import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <Link to="/" style={styles.logoLink}>
                    <img style={styles.logo} src='images/logo.jpg' alt='Vivu Dairy Logo' />
                    <span style={styles.brand}>Vivu Dairy</span>
                </Link>
            </div>
            <nav style={styles.navbar}>
                <Link to="/admin" style={styles.navLink}>Chức năng</Link>
                <Link to="/about" style={styles.navLink}>Giới thiệu</Link>
                <Link to="#contract" style={styles.navLink}>Liên hệ</Link>
                <Button style={styles.navButton}>Đăng nhập</Button>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px 20px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit'
    },
    logo: {
        height: '65px',
        marginRight: '10px'
    },
    brand: {
        fontSize: '24px',
        color: '#8EACCD',
        fontWeight: 'bold'
    },
    navbar: {
        display: 'flex',
        alignItems: 'center'
    },
    navLink: {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#2E5C8A',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'color 0.3s'
    },
    navButton: {
        marginLeft: '15px',
        backgroundColor: '#2E5C8A',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px'
    },
};

export default Header;
