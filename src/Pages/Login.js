import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const apiURL = "https://653d1d13f52310ee6a99e3b7.mockapi.io/user";

function LoginPage({ setAdmin }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch(apiURL);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error("Failed to fetch users.");
            }
        } catch (error) {
            console.error(error);
            message.error("Có lỗi xảy ra khi kết nối đến server.");
            return [];
        }
    };

    const onFinish = async (values) => {
        setLoading(true);

        const usersData = await fetchUsers();
        const user = usersData.find(
            (u) => u.email === values.email && u.password === values.password
        );

        if (user) {
            if (user.isAdmin) {
                message.success('Đăng nhập thành công!');
                localStorage.setItem('admin', JSON.stringify(user));
                setAdmin(user);
                navigate('/');
            } else {
                message.error('Chỉ có Admin mới được đăng nhập!');
            }
        } else {
            message.error('Email hoặc mật khẩu không chính xác!');
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
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input style={styles.input} placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
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
        background: 'linear-gradient(135deg, #8EACCD, #D2E0FB)',
    },
    loginBox: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        color: '#2E5C8A',
        marginBottom: '30px',
        fontWeight: '600',
    },
    form: {
        width: '100%',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
    },
    loginButton: {
        backgroundColor: '#2E5C8A',
        color: '#fff',
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '5px',
    },
};

export default LoginPage;
