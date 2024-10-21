import React, { useState } from 'react';
import { Button, Dropdown, message, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

function Header({ admin, setAdmin }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        message.success('Đăng xuất thành công!');
        setAdmin(null);
        navigate('/');
    };

    const showLogoutModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleConfirmLogout = () => {
        handleLogout();
        setIsModalVisible(false);
    };

    const items = [
        {
            key: 'profile',
            label: (
                <Link to="#profile" style={{ color: '#2E5C8A', fontWeight: 'bold' }}>
                    <UserOutlined /> Profile
                </Link>
            ),
        },
        {
            key: 'logout',
            label: (
                <div onClick={showLogoutModal} style={{ color: '#2E5C8A', fontWeight: 'bold' }}>
                    <LogoutOutlined /> Logout
                </div>
            ),
        },
    ]

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <Link to="/" style={styles.logoLink}>
                    <img style={styles.logo} src="images/logo.jpg" alt="Vivu Dairy Logo" />
                    <span style={styles.brand}>Vivu Dairy</span>
                </Link>
            </div>
            <nav style={styles.navbar}>
                {admin && (
                    <>
                        <Link to="/admin" style={styles.navLink}>Người dùng</Link>
                        <Link to="/payment" style={styles.navLink}>Giao dịch</Link>
                    </>
                )}
                <Link to="/about" style={styles.navLink}>Giới thiệu</Link>
                <Link to="/travel-destinations" style={styles.navLink}>Mẹo du lịch</Link>

                {admin ? (
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Button style={styles.navButton}>
                            {admin.userName}
                        </Button>
                    </Dropdown>
                ) : (
                    <Link to="/login">
                        <Button style={styles.navButton}>Đăng nhập</Button>
                    </Link>
                )}
            </nav>

            <Modal
                title="Xác nhận đăng xuất"
                open={isModalVisible}
                onOk={handleConfirmLogout}
                onCancel={handleCancel}
                okText="Đăng xuất"
                cancelText="Hủy bỏ"
            >
                <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            </Modal>
        </header>
    );
}

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
        alignItems: 'center',
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
    logo: {
        height: '65px',
        marginRight: '10px',
    },
    brand: {
        fontSize: '24px',
        color: '#8EACCD',
        fontWeight: 'bold',
    },
    navbar: {
        display: 'flex',
        alignItems: 'center',
    },
    navLink: {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#2E5C8A',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'color 0.3s',
    },
    navButton: {
        marginLeft: '15px',
        backgroundColor: '#2E5C8A',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
    },
};

export default Header;
