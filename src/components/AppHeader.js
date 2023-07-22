import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'src/assets/logo.png';
import { Layout, Menu, Dropdown, Avatar, Input, List, Typography, Space, Col, Row } from 'antd';
import { authSelector, authActions } from 'src/redux/auth/auth.slice';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
const { Search } = Input;
const { Header } = Layout;
const MenuItem = () => {
    const currentUser = useSelector(authSelector.currentUser);
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        dispatch(authActions.logout());
    };
    return (
        <Menu
            style={{ width: '160px' }}
            items={[
                {
                    key: '1',
                    label: <span>{currentUser.fullName}</span>,
                },
                {
                    key: '2',
                    label: <a href="/profile">Trang cá nhân</a>,
                },
                {
                    key: '3',
                    label: (
                        <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(authActions.handleVisibleModal(true));
                            }}
                        >
                            Chỉnh sửa thông tin
                        </a>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <a
                            href="/"
                            onClick={(e) => {
                                logout(e);
                            }}
                        >
                            Đăng xuất
                        </a>
                    ),
                },
            ]}
        />
    );
};

const AppHeader = () => {
    const currentUser = useSelector(authSelector.currentUser);
    let navigate = useNavigate();
    const courses = useSelector(courseSelector.sCourses);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    useEffect(() => {
        dispatch(courseActions.searchCourse({ name: search }));
    }, [dispatch, search]);
    useEffect(() => {
        dispatch(courseActions.getLearningByUserId(currentUser));
    }, [dispatch, currentUser]);
    const listLearn = useSelector(courseSelector.listLearn);

    return (
        <>
            <Header className="header" style={{ backgroundColor: '#f2ce5f' }} id='header'>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'inline-flex', alignItems: 'center' }}>
                        <img src={logo} height={40} alt="Logo" style={{ cursor: 'pointer' }} />
                    </a>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Dropdown
                            overlay={<RenderItem data={courses} />}
                            placement="bottom"
                            onVisibleChange={(e) => {
                                if (!e) setSearch('');
                            }}
                        >
                            <Search
                                placeholder="Tìm kiếm khóa học"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                style={{ borderRadius: '20px', overflow: 'hidden', width: '300px' }}
                            />
                        </Dropdown>
                    </div>
                    <Space align="center" style={{ cursor: 'pointer' }}>
                        {currentUser?._id ? (
                            <>
                                <Dropdown
                                    overlay={
                                        <List
                                            header={<Typography.Title level={5}>Khóa học của tôi</Typography.Title>}
                                            bordered
                                            style={{ backgroundColor: '#fff', width: '400px' }}
                                            dataSource={listLearn}
                                            renderItem={(l) => (
                                                <List.Item key={l.title}>
                                                    <Row style={{ width: '100%' }} gutter={8}>
                                                        <Col span={14}>
                                                            <div className="player-doc">
                                                                <div className="player">
                                                                    <img width="100%" height="100%" src={l.courseId.image} alt="" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col span={10}>
                                                            <Typography.Title level={5}>
                                                                <a href={'/courses/' + l.courseId.code}>{l.courseId.name}</a>
                                                            </Typography.Title>
                                                        </Col>
                                                    </Row>
                                                </List.Item>
                                            )}
                                        />
                                    }
                                    placement="bottomRight"
                                >
                                    <Typography.Title level={5}>Khóa học của tôi</Typography.Title>
                                </Dropdown>
                                <Dropdown overlay={<MenuItem />} placement="bottomRight">
                                    <Avatar size={40} icon={<UserOutlined />} src={currentUser?.avatar} />
                                </Dropdown>
                            </>
                        ) : (
                            <Avatar
                                size={40}
                                icon={<UserOutlined />}
                                onClick={() => {
                                    navigate('/login', { replace: true });
                                }}
                            />
                        )}
                    </Space>
                </div>
            </Header>
        </>
    );
};

const RenderItem = ({ data }) => {
    let navigate = useNavigate();
    let datas = data || [];
    return (
        <List
            header={<Typography.Title level={5}>Kết quả tìm kiếm</Typography.Title>}
            bordered
            style={{ backgroundColor: '#fff', width: '400px' }}
            dataSource={datas}
            renderItem={(l, li) => (
                <List.Item
                    onClick={() => {
                        navigate('/courses/' + l.code, { replace: true });
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <List.Item.Meta
                        avatar={<Avatar size={30} src={l?.image} icon={<AntDesignOutlined />} />}
                        title={<a href={'/courses/' + l.code}>{l.name}</a>}
                    />
                </List.Item>
            )}
        />
    );
};

export default AppHeader;
