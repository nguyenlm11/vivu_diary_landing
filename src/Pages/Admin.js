import React, { useState, useEffect } from 'react';
import { Table, Tag, message, Button, Popconfirm, Pagination, Modal, Select } from 'antd';
import { DeleteOutlined, LockFilled, UnlockFilled } from '@ant-design/icons';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const { Option } = Select;

function AdminAndPayment() {
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [userNames, setUserNames] = useState({});
    const [revenueData, setRevenueData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [premiumCount, setPremiumCount] = useState(0);
    const [regularCount, setRegularCount] = useState(0);
    const [viewMode, setViewMode] = useState('payments');
    const [dateViewMode, setDateViewMode] = useState('day');

    useEffect(() => {
        fetchPayments();
        fetchUsers();
        fetchUserStatistics();
    }, []);

    useEffect(() => {
        if (viewMode === 'payments') {
            fetchPayments();
        } else {
            fetchUsers();
        }
        calculateRevenueData(payments);
    }, [viewMode, pageNumber, pageSize, dateViewMode]);


    const fetchPayments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/Payment/payments?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const paymentsData = response.data.data.data;
            setPayments(paymentsData);
            setTotal(response.data.data.totalItems);
            paymentsData.forEach(payment => fetchUserName(payment.customerId));
            calculateRevenueData(paymentsData);
        } catch (error) {
            message.error('Failed to fetch payments');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserName = async (customerId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/User/searchBy${customerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserNames(prevState => ({
                ...prevState,
                [customerId]: response.data.data.fullName,
            }));
        } catch (error) {
            message.error(`Failed to fetch user name for customer ID: ${customerId}`);
        }
    };

    const calculateRevenueData = (paymentsData) => {
        const revenueMap = {};
        paymentsData.forEach(payment => {
            if (payment.paymentStatus === 2) {
                const date = new Date(payment.paymentId);
                const key = dateViewMode === 'day'
                    ? date.toISOString().split('T')[0]
                    : `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
                revenueMap[key] = (revenueMap[key] || 0) + payment.total;
            }
        });
        setRevenueData(Object.keys(revenueMap).map(key => ({ date: key, total: revenueMap[key] })));
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/User/getAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.data.results);
            setTotal(response.data.data.totalCount);
        } catch (error) {
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserStatistics = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/User/getAllUsers?pageNumber=1&pageSize=10000`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const allUsers = response.data.data.results;
            setPremiumCount(allUsers.filter(user => user.isPremium).length);
            setRegularCount(allUsers.length - premiumCount);
        } catch (error) {
            message.error('Error fetching user statistics');
        }
    };

    const handleConfirmPayment = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`https://vivudiary.azurewebsites.net/api/Payment/confirm?id=${selectedPaymentId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            message.success('Payment confirmed successfully');
            fetchPayments();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to confirm payment');
        }
    };

    const handleToggleBan = async (id, isActive) => {
        try {
            const token = localStorage.getItem('accessToken');
            const apiUrl = isActive
                ? `https://vivudiary.azurewebsites.net/api/User/ban/${id}`
                : `https://vivudiary.azurewebsites.net/api/User/unban/${id}`;
            await axios.put(apiUrl, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            message.success(isActive ? 'User banned successfully' : 'User unbanned successfully');
            fetchUsers();
            fetchUserStatistics();
        } catch (error) {
            message.error('Failed to toggle ban status');
        }
    };

    const columns = viewMode === 'payments' ? [
        { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId' },
        { title: 'Customer Name', dataIndex: 'customerId', render: (id) => userNames[id] },
        { title: 'Total', dataIndex: 'total', render: (total) => `${total.toLocaleString()} VNĐ` },
        { title: 'Payment Status', dataIndex: 'paymentStatus', render: (status) => <Tag color={status === 1 ? 'gold' : 'green'}>{status === 1 ? 'Pending' : 'Paid'}</Tag> },
        {
            title: 'Action', key: 'action', render: (_, record) => record.paymentStatus === 1 && (
                <Button type="primary" onClick={() => { setSelectedPaymentId(record.id); setIsModalVisible(true); }}>Confirm</Button>
            )
        }
    ] : [
        { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Premium', dataIndex: 'isPremium', render: (isPremium) => <Tag color={isPremium ? 'gold' : 'blue'}>{isPremium ? 'Premium' : 'Regular'}</Tag> },
        { title: 'Status', dataIndex: 'status', render: (status) => <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? 'Active' : 'Banned'}</Tag> },
        {
            title: 'Action', key: 'action', render: (_, record) => (
                <Popconfirm title={`Are you sure you want to ${record.status === 1 ? 'ban' : 'unban'} this user?`} onConfirm={() => handleToggleBan(record.id, record.status === 1)}>
                    <Button>{record.status === 1 ? <LockFilled /> : <UnlockFilled />}</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Chế độ xem:</h3>
                    <Select value={viewMode} onChange={(value) => setViewMode(value)} style={{ marginLeft: '20px' }}>
                        <Option value="payments">Quản lý Giao dịch</Option>
                        <Option value="users">Quản lý Người dùng</Option>
                    </Select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Chọn chế độ xem doanh thu:</h3>
                    <Select value={dateViewMode} onChange={(value) => {
                        setDateViewMode(value);
                        calculateRevenueData(payments);
                    }} style={{ marginLeft: '20px' }}>
                        <Option value="day">Theo Ngày</Option>
                        <Option value="month">Theo Tháng</Option>
                    </Select>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={[{ name: 'Premium', value: premiumCount }, { name: 'Regular', value: regularCount }]}
                                fill="#8884d8"
                                label
                            >
                                <Cell key="cell-premium" fill="#FFD700" />
                                <Cell key="cell-regular" fill="#1E90FF" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ width: '48%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <Table
                title={() => <h1 style={{
                    textAlign: 'center',
                    color: '#2E5C8A'
                }}>{viewMode === 'payments' ? "Quản lý Giao dịch" : "Quản lý Người dùng"}</h1>}
                dataSource={viewMode === 'payments' ? payments : users}
                columns={columns}
                loading={loading}
                pagination={false}
                rowKey={(record) => record.id || record.id}
            />

            <Pagination
                current={pageNumber}
                pageSize={pageSize}
                total={total}
                onChange={(page, size) => {
                    setPageNumber(page);
                    setPageSize(size);
                }}
                showSizeChanger
                style={{
                    transform: 'translate(40%, 30%)', marginTop: '16px'
                }}
            />
            <Modal title="Xác nhận thanh toán" open={isModalVisible} onOk={handleConfirmPayment} onCancel={() => setIsModalVisible(false)}>
                <p>Bạn có chắc chắn muốn xác nhận thanh toán này không?</p>
            </Modal>
        </div>
    );
}

export default AdminAndPayment;
