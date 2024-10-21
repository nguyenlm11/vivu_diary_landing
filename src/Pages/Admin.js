import React, { useState, useEffect } from 'react';
import { Table, Tag, message, Button, Popconfirm, Pagination } from 'antd';
import { LockFilled, UnlockFilled } from '@ant-design/icons';
import axios from 'axios';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Admin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [premiumCount, setPremiumCount] = useState(0);
    const [regularCount, setRegularCount] = useState(0);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage or wherever it's stored
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/User/getAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.data.results);
            setTotal(response.data.data.totalCount);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error('Unauthorized: Access token may be invalid or expired.');
            } else {
                message.error('Failed to fetch users');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchUserStatistics = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`https://vivudiary.azurewebsites.net/api/User/getAllUsers?pageNumber=1&pageSize=10000`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const allUsers = response.data.data.results;
                const premiumUsersCount = allUsers.filter(user => user.isPremium).length;
                const regularUsersCount = allUsers.length - premiumUsersCount;
                setPremiumCount(premiumUsersCount);
                setRegularCount(regularUsersCount);
            } else {
                message.error('Failed to fetch user statistics');
            }
        } catch (error) {
            message.error('Error fetching user statistics');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchUserStatistics();
    }, [pageNumber, pageSize]);

    const handleToggleBan = async (id, isActive) => {
        try {
            const token = localStorage.getItem('accessToken');
            const apiUrl = isActive
                ? `https://vivudiary.azurewebsites.net/api/User/ban/${id}`
                : `https://vivudiary.azurewebsites.net/api/User/unban/${id}`;

            const response = await axios.put(apiUrl, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                message.success(isActive ? 'User banned successfully' : 'User unbanned successfully');
                fetchUsers();
                fetchUserStatistics();
            } else {
                message.error(isActive ? 'Failed to ban user' : 'Failed to unban user');
            }
        } catch (error) {
            message.error(`Failed to ${isActive ? 'ban' : 'unban'} user: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Premium',
            dataIndex: 'isPremium',
            key: 'isPremium',
            render: isPremium => <Tag color={isPremium === false ? 'blue' : 'gold'}>{isPremium === false ? 'Regular' : 'Premium'}</Tag>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? 'Active' : 'Banned'}</Tag>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title={`Are you sure you want to ${record.status === 1 ? 'ban' : 'unban'} this user?`}
                        onConfirm={() => handleToggleBan(record.id, record.status === 1)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ color: '#2E5C8A', borderColor: '#2E5C8A' }}>
                            {record.status === 1
                                ? <LockFilled style={{ color: '#ff0000' }} />
                                : <UnlockFilled style={{ color: '#009900' }} />}
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const pieData = [
        { name: 'Premium', value: premiumCount },
        { name: 'Regular', value: regularCount }
    ];

    const COLORS = ['gold', 'blue'];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <PieChart width={400} height={300}>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            <h1 style={{ textAlign: 'center', color: '#2E5C8A' }}>Quản lý thông tin người dùng</h1>
            <Table
                bordered
                dataSource={users}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
                style={{ marginBottom: '16px' }}
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
        </div>
    );
}

export default Admin;
