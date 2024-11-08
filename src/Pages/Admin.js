import React, { useState, useEffect } from 'react';
import { Table, Tag, message, Button, Popconfirm, Pagination, Modal, Select } from 'antd';
import { LockFilled, UnlockFilled } from '@ant-design/icons';
import axios from 'axios';
import '../../src/App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const { Option } = Select;

function AdminAndPayment() {
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [dailyTransactionCount, setDailyTransactionCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [currentPage, setCurrentPage] = useState({ payments: 1, users: 1 });

    // Pagination states for payments
    const [paymentPageNumber, setPaymentPageNumber] = useState(1);
    const [paymentPageSize, setPaymentPageSize] = useState(10);
    const [paymentTotal, setPaymentTotal] = useState(0);

    // Pagination states for users
    const [userPageNumber, setUserPageNumber] = useState(1);
    const [userPageSize, setUserPageSize] = useState(10);
    const [userTotal, setUserTotal] = useState(0);

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

        if (viewMode === 'payments') {
            calculateRevenueData(payments);
        }
    }, [viewMode, paymentPageNumber, paymentPageSize, userPageNumber, userPageSize, dateViewMode]);

    const calculateTotalRevenue = (paymentsData) => {
        const total = paymentsData.reduce((acc, payment) => {
            return payment.paymentStatus === 2 ? acc + payment.total : acc;
        }, 0);
        setTotalRevenue(total);
    };

    const countDailyPayments = (paymentsData) => {
        const count = paymentsData.filter(payment => {
            const paymentDate = new Date(payment.paymentId).toISOString().split('T')[0];
            return paymentDate === selectedDate;
        }).length;
        setDailyTransactionCount(count);
    };

    const fetchAllPayments = async (pageNumber = 1, accumulatedPayments = []) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiaryapi.azurewebsites.net/api/Payment/payments?pageNumber=${pageNumber}&pageSize=10`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { data, totalItems } = response.data.data;

            const newAccumulatedPayments = [...accumulatedPayments, ...data];

            if (newAccumulatedPayments.length < totalItems) {
                return fetchAllPayments(pageNumber + 1, newAccumulatedPayments);
            } else {
                return newAccumulatedPayments;
            }
        } catch (error) {
            message.error('Không thể lấy dữ liệu thanh toán');
            return accumulatedPayments;
        }
    };

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const allPayments = await fetchAllPayments();
            setPayments(allPayments.slice((currentPage.payments - 1) * paymentPageSize, currentPage.payments * paymentPageSize));
            setPaymentTotal(allPayments.length);
            if (viewMode === 'payments') {
                calculateRevenueData(allPayments);
                calculateTotalRevenue(allPayments);
            }
            allPayments.forEach(payment => fetchUserName(payment.customerId));
            countDailyPayments(allPayments); // Tính tổng số giao dịch trong ngày
        } catch (error) {
            message.error('Không thể lấy tất cả dữ liệu thanh toán');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserName = async (customerId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiaryapi.azurewebsites.net/api/User/searchBy${customerId}`, {
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
        const sortedRevenueData = Object.keys(revenueMap)
            .map(key => ({ date: key, total: revenueMap[key] }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        setRevenueData(sortedRevenueData);
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiaryapi.azurewebsites.net/api/User/getAllUsers?pageNumber=${currentPage.users}&pageSize=${userPageSize}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const allUsers = response.data.data.results.filter(user => user.roles.includes("User"));
            setUsers(allUsers);
            setUserTotal(response.data.data.totalCount);
        } catch (error) {
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserStatistics = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiaryapi.azurewebsites.net/api/User/getAllUsers?pageNumber=1&pageSize=10000`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const allUsers = response.data.data.results.filter(user => user.roles.includes("User"));
            setPremiumCount(allUsers.filter(user => user.isPremium).length);
            setRegularCount(allUsers.filter(user => !user.isPremium).length);
        } catch (error) {
            message.error('Error fetching user statistics');
        }
    };

    const handleConfirmPayment = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`https://vivudiaryapi.azurewebsites.net/api/Payment/confirm?id=${selectedPaymentId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            message.success('Payment confirmed successfully');
            fetchPayments();
            fetchUserStatistics();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to confirm payment');
        }
    };

    const handleToggleBan = async (id, isActive) => {
        try {
            const token = localStorage.getItem('accessToken');
            const apiUrl = isActive
                ? `https://vivudiaryapi.azurewebsites.net/api/User/ban/${id}`
                : `https://vivudiaryapi.azurewebsites.net/api/User/unban/${id}`;
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

    const handleCountUser = (number) => {
        const currentUser = Math.max(number - 4, 0);
        return currentUser;
    }

    const columns = viewMode === 'payments' ? [
        { title: 'Mã giao dịch', dataIndex: 'paymentId', key: 'paymentId' },
        { title: 'Tên khách hàng', dataIndex: 'customerId', render: (id) => userNames[id] },
        { title: 'Gói đăng ký', dataIndex: 'total', render: (total) => `${total.toLocaleString()} VNĐ` },
        { title: 'Trạng thái', dataIndex: 'paymentStatus', render: (status) => <Tag color={status === 1 ? 'gold' : 'green'}>{status === 1 ? 'Chờ xác nhận' : 'Đã thanh toán'}</Tag> },
        {
            title: '', key: 'action', render: (_, record) => record.paymentStatus === 1 && (
                <Button type="primary" onClick={() => { setSelectedPaymentId(record.id); setIsModalVisible(true); }}>Xác nhận</Button>
            )
        }
    ] : [
        { title: 'Tên khách hàng', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Tài khoản', dataIndex: 'isPremium', render: (isPremium) => <Tag color={isPremium ? 'gold' : 'blue'}>{isPremium ? 'Premium' : 'Thường'}</Tag> },
        { title: 'Trạng thái', dataIndex: 'status', render: (status) => <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? 'Hoạt động' : 'Bị khóa'}</Tag> },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Popconfirm title={`Bạn có muốn ${record.status === 1 ? 'khóa' : 'gỡ khóa'} người dùng này?`} onConfirm={() => handleToggleBan(record.id, record.status === 1)}>
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
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="linear" dataKey="total" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Tổng người dùng</h2>
                    <h4 style={{ color: '#2E5C8A' }}>{handleCountUser(userTotal)}</h4>
                </div>

                <div style={{ textAlign: 'center', }}>
                    <h2>Tổng giao dịch</h2>
                    <h4 style={{ color: '#FF5733' }}>{premiumCount}</h4>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h2>Tổng doanh thu</h2>
                    <h4 style={{ color: '#45A022' }}>{totalRevenue.toLocaleString()} VNĐ</h4>
                </div>
            </div>

            <Table
                style={{ marginBottom: 16 }}
                title={() =>
                    <h1 style={{ textAlign: 'center', color: '#2E5C8A' }}>
                        {viewMode === 'payments' ? "Quản lý Giao dịch" : "Quản lý Người dùng"}
                    </h1>}
                dataSource={viewMode === 'payments' ? payments : users}
                columns={columns}
                loading={loading}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.paymentId || record.id}
            />

            <Pagination
                current={viewMode === 'payments' ? paymentPageNumber : userPageNumber}
                pageSize={viewMode === 'payments' ? paymentPageSize : userPageSize}
                total={viewMode === 'payments' ? paymentTotal : userTotal}
                onChange={(page, pageSize) => {
                    setCurrentPage(prev => ({ ...prev, [viewMode]: page }));
                    if (viewMode === 'payments') {
                        setPaymentPageNumber(page);
                        setPaymentPageSize(pageSize);
                    } else {
                        setUserPageNumber(page);
                        setUserPageSize(pageSize);
                    }
                }}
                align='center'
                showSizeChanger
            />

            <Modal title="Xác nhận thanh toán" open={isModalVisible} onOk={handleConfirmPayment} onCancel={() => setIsModalVisible(false)}>
                <p>Bạn có muốn xác nhận khoản thanh toán này không?</p>
            </Modal>
        </div>
    );
}

export default AdminAndPayment;
