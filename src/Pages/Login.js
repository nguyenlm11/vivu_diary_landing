import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { ThemeContext } from '../context/ThemeContext';

const apiURL = "https://vivudiaryapi.azurewebsites.net/api/Auth/login";

function LoginPage({ setAdmin }) {
    const { isDarkTheme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check token expiration and handle automatic logout
    useEffect(() => {
        const adminData = localStorage.getItem('admin');
        const token = localStorage.getItem('accessToken');

        if (adminData && token) {
            const parsedData = JSON.parse(adminData);
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < Date.now()) {
                // Token expired
                message.warning('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                handleLogout();
            } else if (parsedData.userRoleId.includes("Admin")) {
                setAdmin(parsedData);
                navigate('/');
            }
        }
    }, [navigate, setAdmin]);

    const handleLogout = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('accessToken');
        setAdmin(null);
        navigate('/login');
    };

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await axios.post(apiURL, {
                userName: values.userName,
                password: values.password,
            });

            if (response.status === 200) {
                const { data } = response.data;

                if (data.userRoleId.includes("Admin")) {
                    message.success('Đăng nhập thành công!');
                    localStorage.setItem('admin', JSON.stringify(data));
                    localStorage.setItem('accessToken', data.token);
                    setAdmin(data);
                    navigate('/');
                } else {
                    message.error('Chỉ có Admin mới được đăng nhập!');
                }
            } else {
                message.error('Email hoặc mật khẩu không chính xác!');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                message.error('Email hoặc mật khẩu không chính xác!');
            } else {
                message.error('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!');
            }
        }

        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ ...styles.container, backgroundImage: isDarkTheme ? 'url(images/1_2.jpg)' : 'url(images/1.jpg)' }}>
            <div style={styles.loginBox}>
                <h2 style={{ ...styles.title, color: isDarkTheme ? '#F9F1AA' : '#195F98' }}>Đăng nhập</h2>
                <Form
                    name="login"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={styles.form}
                >
                    <Form.Item
                        label={<span style={{ color: '#000' }}>Tên người dùng</span>}
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input style={styles.input} placeholder="Nhập tên người dùng của bạn" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#000' }}>Mật khẩu</span>}
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password style={styles.input} placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}
                            style={{
                                ...styles.loginButton,
                                color: isDarkTheme ? '#000' : '#fff',
                                backgroundColor: isDarkTheme ? '#F9F1AA' : '#195F98'
                            }}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '115vh',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    loginBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
        width: '400px',
        textAlign: 'center',
        // backgroundColor: 'transparent'
    },
    title: {
        fontSize: '28px',
        color: '#800080',
        marginBottom: '30px',
        fontWeight: 'bold'
    },
    form: {
        width: '100%',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: '#800080',
        color: '#fff',
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '5px',
    },
};

export default LoginPage;
