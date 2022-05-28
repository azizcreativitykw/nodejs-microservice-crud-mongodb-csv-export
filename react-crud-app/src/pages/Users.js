import {Button, Layout, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from "react";
import {getData, openNotificationWithIcon, postData} from "../utility";
import EditButton from "./EditButton";
const { Header, Content } = Layout;


const Users = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getTheUsers()
    }, [])

    const getTheUsers = async () => {
        try {
            let {status, data} = await getData('/users');
            if (status === 200) {
                setData(data.data)
            } else {
                openNotificationWithIcon('warning', 'Warning', 'Something went wrong.')
            }
        } catch (e) {
            // openNotificationWithIcon('error', 'Error',e.toString())
        }
    }
    const submitToDB = async () => {
        try {
            let {status, data} = await postData('/users');
            console.log('data', data)
            if (status === 200) {
                getTheUsers();
                openNotificationWithIcon('success', 'Success',data.msg);
            } else {
                openNotificationWithIcon('warning', 'Warning', 'Something went wrong.')
            }
        } catch (e) {
            openNotificationWithIcon('error', 'Error',e.toString())
        }
    }

    const exportCSV = async () => {
        try {
            let {status, data} = await getData('/export');
            if (status === 200) {
                console.log('data', data)
                window.open(data.data)
            } else {
                openNotificationWithIcon('warning', 'Warning', 'Something went wrong.')
            }
        } catch (e) {
            // openNotificationWithIcon('error', 'Error',e.toString())
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <a>{text}</a>,
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditButton onPress={()=> getTheUsers()} data={record}/>
                </Space>
            ),
        },
    ];


    return (
        <Layout>
            <Header className="header">
                <div className="logo">
                    TensorGo
                </div>
                <div className="btns">
                    <Button type="primary" onClick={()=> exportCSV()} style={{marginRight:8}}>
                        Export CSV
                    </Button >
                    <Button type="primary" onClick={()=> submitToDB()}>
                        Get data from the gorest
                    </Button >
                </div>
            </Header>
            <Layout>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Table dataSource={data} columns={columns}/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Users;
