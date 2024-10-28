import React, { useState, useEffect } from 'react';
import { Table, Tag, message, Button, Pagination, Modal, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Option } = Select;

function Payment() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [userNames, setUserNames] = useState({});
    const [revenueData, setRevenueData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [viewMode, setViewMode] = useState('day'); // Thêm trạng thái để chọn chế độ xem

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/Payment/payments?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const paymentsData = response.data.data.data;
            setPayments(paymentsData);
            setTotal(response.data.data.totalItems);
            paymentsData.forEach(payment => fetchUserName(payment.customerId));
            calculateRevenueData(paymentsData); // Tính toán dữ liệu doanh thu mặc định là theo ngày
        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error('Unauthorized: Access token may be invalid or expired.');
            } else {
                message.error('Failed to fetch payments');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchUserName = async (customerId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/User/searchBy${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = response.data.data;
            setUserNames(prevState => ({
                ...prevState,
                [customerId]: userData.fullName,
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
                const key = viewMode === 'day'
                    ? date.toISOString().split('T')[0] // Ngày
                    : `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`; // Tháng

                if (revenueMap[key]) {
                    revenueMap[key] += payment.total;
                } else {
                    revenueMap[key] = payment.total;
                }
            }
        });

        const revenueArray = Object.keys(revenueMap)
            .map(key => ({
                date: key,
                total: revenueMap[key],
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        setRevenueData(revenueArray);
    };

    const handleConfirmPayment = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put(`https://vivudiary.azurewebsites.net/api/Payment/confirm?id=${selectedPaymentId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                message.success('Payment confirmed successfully');
                fetchPayments();
                setIsModalVisible(false);
            } else {
                message.error('Failed to confirm payment');
            }
        } catch (error) {
            message.error(`Error confirming payment: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const showConfirmModal = (paymentId) => {
        setSelectedPaymentId(paymentId);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    const handleChangeViewMode = (value) => {
        setViewMode(value);
        calculateRevenueData(payments); // Cập nhật dữ liệu theo chế độ xem đã chọn
    };

    useEffect(() => {
        fetchPayments();
    }, [pageNumber, pageSize, viewMode]);

    const mapPaymentStatus = (status) => {
        switch (status) {
            case 1:
                return <Tag color="gold">Pending</Tag>;
            case 2:
                return <Tag color="green">Paid</Tag>;
            case 3:
                return <Tag color="green">Refunded</Tag>;
        }
    };

    const mapPaymentMethod = (method) => {
        switch (method) {
            case 1:
                return "VnPay";
            case 2:
                return "Momo";
            case 3:
                return "Cash";
        }
    };

    const columns = [
        {
            title: 'Payment ID',
            dataIndex: 'paymentId',
            key: 'paymentId',
            sorter: (a, b) => new Date(b.paymentId) - new Date(a.paymentId),
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerId',
            key: 'customerId',
            render: (customerId) => userNames[customerId],
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => `${total.toLocaleString()} VNĐ`,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status) => mapPaymentStatus(status),
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (method) => mapPaymentMethod(method),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {record.paymentStatus === 1 && (
                        <Button
                            type="primary"
                            style={{ marginRight: 8 }}
                            onClick={() => showConfirmModal(record.id)}
                        >
                            Confirm
                        </Button>
                    )}
                    <Button type="danger" icon={<DeleteOutlined />} />
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '20px' }}>Xem thống kê theo: </h3>
            <Select value={viewMode} onChange={handleChangeViewMode} style={{ marginBottom: '20px' }}>
                <Option value="day">Ngày</Option>
                <Option value="month">Tháng</Option>
            </Select>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" name="Revenue" />
                </LineChart>
            </ResponsiveContainer>

            <h1 style={{ textAlign: 'center', color: '#2E5C8A' }}>Quản lý thanh toán</h1>
            <Table
                bordered
                dataSource={payments}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
                style={{ marginBottom: '16px', marginTop: '20px' }}
            />
            <Pagination
                current={pageNumber}
                pageSize={pageSize}
                total={total}
                onChange={(page, pageSize) => {
                    setPageNumber(page);
                    setPageSize(pageSize);
                }}
                showSizeChanger
                pageSizeOptions={['10', '20', '50']}
                style={{
                    transform: 'translate(40%, 30%)', marginTop: '16px'
                }}
            />
            <Modal
                title="Confirm Payment"
                open={isModalVisible}
                onOk={handleConfirmPayment}
                onCancel={handleCancelModal}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to confirm this payment?</p>
            </Modal>
        </div>
    );
}

export default Payment;
