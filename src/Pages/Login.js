import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiURL = "https://vivudiary.azurewebsites.net/api/Auth/login";

function LoginPage({ setAdmin }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const adminData = localStorage.getItem('admin');
        if (adminData) {
            const parsedData = JSON.parse(adminData);
            if (parsedData && parsedData.userRoleId.includes("Admin")) {
                setAdmin(parsedData);
                navigate('/');
            }
        }
    }, [navigate, setAdmin]);

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
                    localStorage.setItem('accessToken', data.token); // Store access token
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
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>Đăng nhập</h2>
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
                        <Button type="primary" htmlType="submit" block loading={loading} style={styles.loginButton}>
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
        height: '100vh',
        backgroundImage: 'url(images/2_1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // background: 'linear-gradient(135deg, #8EACCD, #D2E0FB)',
    },
    loginBox: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
        width: '400px',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    title: {
        fontSize: '28px',
        // color: '#2E5C8A',
        color: '#800080',
        marginBottom: '30px',
        fontWeight: '600',
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
