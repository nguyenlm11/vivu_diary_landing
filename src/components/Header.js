import React, { useContext, useState } from 'react';
import { Button, Dropdown, message, Modal, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeContext';

function Header({ admin, setAdmin }) {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
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
                <Link to="#profile" style={{ color: isDarkTheme ? '#111' : '#fff', fontWeight: 'bold' }}>
                    <UserOutlined /> Hồ sơ
                </Link>
            ),
        },
        {
            key: 'logout',
            label: (
                <div onClick={showLogoutModal} style={{ color: isDarkTheme ? '#111' : '#fff', fontWeight: 'bold' }}>
                    <LogoutOutlined /> Đăng xuất
                </div>
            ),
        },
        {
            key: 'Mode',
            label: (
                <Switch
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                    checkedChildren="Tối"
                    unCheckedChildren="Sáng"
                    style={{
                        backgroundColor: isDarkTheme ? '#000' : '#ddd',
                        alignItems: 'center'
                    }}
                />
            ),
        }
    ];

    const items_2 = [
        {
            key: 'Mode',
            label: (
                <Switch
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                    checkedChildren="Tối"
                    unCheckedChildren="Sáng"
                    style={{
                        backgroundColor: isDarkTheme ? '#000' : '#ddd',
                    }}
                />
            ),
        },
    ];

    return (
        <header style={{
            ...styles.header,
            backgroundImage: isDarkTheme ? 'url(images/background.jpg)' : 'url(images/.jpg)',
        }}>
            <div style={styles.logoContainer}>
                <Link to="/" style={styles.logoLink}>
                    <img style={styles.logo} src={!isDarkTheme ? "images/logo.jpg" : "images/logo_2.jpg"} alt="Vivu Diary Logo" />
                    <span style={{ ...styles.brand, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>Vivu Diary</span>
                </Link>
            </div>
            <nav style={styles.navbar}>
                {admin && (
                    <>
                        <Link to="/admin" style={{ ...styles.navLink, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>Quản lý</Link>
                    </>
                )}
                <Link to="/about" style={{ ...styles.navLink, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>Giới thiệu</Link>
                <Link to="/travel-destinations" style={{ ...styles.navLink, color: isDarkTheme ? '#FFFFFF' : '#8EACCD' }}>Mẹo du lịch</Link>

                {admin ? (
                    <Dropdown menu={{ items, style: { backgroundColor: isDarkTheme ? '#FFFFFF' : '#8EACCD' } }} placement="bottomRight">
                        <Button style={{
                            ...styles.navButton,
                            backgroundColor: isDarkTheme ? '#FFFFFF' : '#8EACCD',
                            color: isDarkTheme ? '#111' : '#fff',
                        }}>
                            {admin.userName}
                        </Button>
                    </Dropdown>
                ) : (
                    <Dropdown menu={{
                        items: [items_2[0]], style: {
                            backgroundColor: isDarkTheme ? '#FFFFFF' : '#8EACCD',
                            color: isDarkTheme ? '#111' : '#fff'
                        }
                    }} placement="bottomRight">
                        <Link to="/login">
                            <Button style={{
                                ...styles.navButton,
                                backgroundColor: isDarkTheme ? '#FFFFFF' : '#8EACCD',
                                color: isDarkTheme ? '#111' : '#fff'
                            }}>
                                Đăng nhập
                            </Button>
                        </Link>
                    </Dropdown>
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
        </header >
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 8px',
        position: 'relative',
        zIndex: 1000,
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
        fontWeight: '850',
    },
    navbar: {
        display: 'flex',
        alignItems: 'center',
    },
    navLink: {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#FFA500',
        fontWeight: '850',
        fontSize: '16px',
        transition: 'color 0.3s',
    },
    navButton: {
        marginLeft: '15px',
        color: '#222',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        fontWeight: 'bold'
    },
};

export default Header;
