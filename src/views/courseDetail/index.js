import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { authSelector } from 'src/redux/auth/auth.slice';
import './index.scss';
import { ApartmentOutlined, PlaySquareOutlined, FlagOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Button, Col, Row, Space, Collapse, Typography, List } from 'antd';
const { Title, Text } = Typography;
const { Panel } = Collapse;

const CourseDetail = () => {
    const [isRegister, setIsRegister] = useState(false);
    let navigate = useNavigate();
    const currentLocation = useLocation().pathname;
    const code = currentLocation.split('/')[2];
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    const learn = useSelector(courseSelector.learn);
    const currentUser = useSelector(authSelector.currentUser);
    const formRegister = { userId: currentUser?._id, courseId: course?._id };
    useEffect(() => {
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
    }, [dispatch, code]);
    useEffect(() => {
        dispatch(courseActions.getLearning({ userId: currentUser?._id, courseId: course?._id }));
    }, [dispatch, course, currentUser]);
    useEffect(() => {
        setIsRegister(learn?._id);
    }, [learn, course]);
    let listTopics = course.listTopics || [];
    let total = 0;
    listTopics = listTopics.map((t, i) => {
        let ll = t.listLessons.map((l, j) => ({ ...l, sort: j + 1 + total }));
        total = total + t.listLessons.length;
        return { ...t, listLessons: ll };
    });

    const lessonCount = listTopics.reduce((p, n) => {
        return p + n.listLessons.length;
    }, 0);
    const times = listTopics.reduce((p, n) => {
        let ll = n.listLessons;
        let t = ll.reduce((p, n) => {
            return p + n?.time || 0;
        }, 0);
        return p + t;
    }, 0);
    function secondsToHms(d, type) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        var hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) + ' giờ' : '';
        var mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) + ' phút' : '';
        var sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) + ' giây' : '';
        if (type === 'hm') {
            return hDisplay + ' ' + mDisplay;
        } else if (type === 'ms') {
            return (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s);
        } else {
            return hDisplay + ' ' + mDisplay + ' ' + sDisplay;
        }
    }
    const registerCourse = () => {
        if (currentUser?._id) {
            dispatch(courseActions.registerCourse(formRegister));
            goLearning();
        } else {
            navigate('/login', { replace: true });
        }
    };
    const goLearning = () => {
        navigate('/learning/' + code, { replace: true });
    };
    return (
        <>
            <Row>
                <Col
                    span={18}
                    style={{
                        height: `calc(100vh - 134px )`,
                        overflowY: 'overlay',
                    }}
                >
                    <Card style={{ minHeight: '100%' }}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Title>
                                    <strong>{course.name}</strong>
                                </Title>
                                <Text>
                                    <span dangerouslySetInnerHTML={{ __html: course.description }}></span>
                                </Text>
                            </Col>
                            <Col span={24}>
                                <Title level={3}>Nội dung khóa học</Title>
                                <h3>
                                    <ul className="count mt-3">
                                        <li>
                                            <strong>{course.listTopics?.length} </strong> chương
                                        </li>
                                        <li className="space">•</li>
                                        <li>
                                            <strong>{lessonCount} </strong> bài học
                                        </li>
                                        <li className="space">•</li>
                                        <li>
                                            <span>
                                                Thời lượng: <strong>{secondsToHms(times)}</strong>
                                            </span>
                                        </li>
                                    </ul>
                                </h3>
                            </Col>
                            <Col span={24}>
                                <Collapse collapsible="header" expandIconPosition={'end'} className="site-collapse-custom-collapse" bordered={false}>
                                    {listTopics.map((t, i) => {
                                        return (
                                            <Panel
                                                className="site-collapse-custom-panel"
                                                header={
                                                    <>
                                                        <Space>
                                                            <strong style={{ fontSize: '16px', flex: 1 }}>{`${i + 1}. ${t.name}`}</strong>
                                                        </Space>
                                                    </>
                                                }
                                                key={i}
                                                extra={
                                                    <span style={{ fontSize: '16px', marginRight: '10px' }}>{t.listLessons.length + ' bài học'}</span>
                                                }
                                            >
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={t.listLessons}
                                                    renderItem={(item) => (
                                                        <List.Item actions={[<p>{secondsToHms(item.time, 'ms')}</p>]}>
                                                            {item.sort + '. ' + item.name}
                                                        </List.Item>
                                                    )}
                                                />
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col
                    span={6}
                    style={{
                        height: `calc(100vh - 134px )`,
                    }}
                >
                    <Card style={{ height: '100%' }}>
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <div style={{ padding: '0 50px', marginTop: '50px' }}>
                                    <div className="player-doc">
                                        <div className="player">
                                            <img width="100%" height="100%" src={course.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={24}>
                                <Space
                                    size="large"
                                    direction="horizontal"
                                    style={{ width: '100%', justifyContent: 'center', flexDirection: 'column' }}
                                >
                                    <Title type="danger" style={{ margin: 0 }}>
                                        <strong>Miễn Phí</strong>
                                    </Title>

                                    {isRegister ? (
                                        <Button
                                            onClick={goLearning}
                                            style={{
                                                backgroundColor: 'orange',
                                                borderRadius: '16px',
                                                borderColor: 'orange',
                                                height: 'auto',
                                                padding: '8px 26px',
                                            }}
                                            type="primary"
                                        >
                                            <Title style={{ margin: 0, color: '#fff' }} level={3}>
                                                HỌC NGAY
                                            </Title>
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={registerCourse}
                                            style={{
                                                backgroundColor: 'orange',
                                                borderRadius: '16px',
                                                borderColor: 'orange',
                                                height: 'auto',
                                                padding: '8px 26px',
                                            }}
                                            type="primary"
                                        >
                                            <Title style={{ margin: 0, color: '#fff' }} level={3}>
                                                Đăng ký
                                            </Title>
                                        </Button>
                                    )}
                                    <List>
                                        <List.Item>
                                            <ApartmentOutlined style={{ marginRight: '20px' }} />
                                            {course.type?.name}
                                        </List.Item>
                                        <List.Item>
                                            <PlaySquareOutlined style={{ marginRight: '20px' }} />
                                            {'Tổng số ' + lessonCount + ' bài học'}
                                        </List.Item>
                                        <List.Item>
                                            <FlagOutlined style={{ marginRight: '20px' }} />
                                            {'Thời lượng ' + secondsToHms(times)}
                                        </List.Item>
                                        <List.Item>
                                            <StarOutlined style={{ marginRight: '20px' }} />
                                            Học mọi lúc, mọi nơi
                                        </List.Item>
                                    </List>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CourseDetail;
