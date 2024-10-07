import React, { useEffect, useState } from 'react';
import { Table, Tag, message, Button, Popconfirm } from 'antd';
import { DeleteFilled, LockFilled, UnlockFilled } from '@ant-design/icons';
import axios from 'axios';

function Admin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://653d1d13f52310ee6a99e3b7.mockapi.io/user');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                message.error('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const vipCount = users.filter(user => user.vip).length;
    const nonVipCount = users.filter(user => !user.vip).length;

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://653d1d13f52310ee6a99e3b7.mockapi.io/user/${id}`);
            setUsers(users.filter(user => user.id !== id));
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const handleEdit = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            const response = await axios.put(`https://653d1d13f52310ee6a99e3b7.mockapi.io/user/${id}`, {
                status: newStatus,
            });
            setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
            message.success(`User status updated to ${newStatus}`);
        } catch (error) {
            message.error('Failed to update user status');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'VIP',
            dataIndex: 'vip',
            key: 'vip',
            render: vip => vip ? <Tag color="gold">VIP</Tag> : <Tag color="geekblue">Regular</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>,
        },
        {
            title: 'Created At',
            dataIndex: 'createAt',
            key: 'createAt',
            render: date => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button
                        style={{ borderColor: record.status === "Active" ? '#ff0000' : '#009900', marginRight: 8 }}
                        onClick={() => handleEdit(record.id, record.status)}
                    >
                        {record.status === "Active" ? <LockFilled style={{ color: '#ff0000' }} /> : <UnlockFilled style={{ color: '#009900' }} />}
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ color: '#2E5C8A', borderColor: '#2E5C8A' }}><DeleteFilled /></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1>User Management</h1>
            <p>Number of VIP Users: {vipCount}</p>
            <p>Number of Non-VIP Users: {nonVipCount}</p>
            <Table
                bordered
                dataSource={users}
                columns={columns}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
}

export default Admin;
