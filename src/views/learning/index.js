/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { useLocation } from 'react-router-dom';
import clock from '../../assets/icon-lesson/Icon.svg';
import './index.scss';
import { Button, Col, Row, Space, Collapse, Layout, Typography, List, Input, Avatar, Comment, Form } from 'antd';
import { commentActions, commentSelector } from 'src/redux/comment/comment.slice';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './video';
import 'react-circular-progressbar/dist/styles.css';
import { authSelector } from 'src/redux/auth/auth.slice';
import socketIOClient from 'socket.io-client';
import doneImg from '../../assets/done.png';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import { DOMAIN } from 'src/constants/api';
const { TextArea } = Input;
const { Title } = Typography;
const { Header, Content } = Layout;
const { Panel } = Collapse;

const Learning = () => {
    const currentLocation = useLocation().pathname;
    let navigate = useNavigate();
    const [get, setGet] = useState(0);
    const [lesson, setLesson] = useState({});
    const [tCount, setTCount] = useState([]);
    const dispatch = useDispatch();
    const course = useSelector(courseSelector.course);
    const learn = useSelector(courseSelector.learn);
    const currentUser = useSelector(authSelector.currentUser);
    const socketRef = useRef();

    useEffect(() => {
        const code = currentLocation.split('/')[2];
        if (code) {
            dispatch(courseActions.getCourseByCode({ code: code }));
        }
        socketRef.current = socketIOClient.connect(DOMAIN); // connect to backend
        socketRef.current.on('getMessage', (users) => {
            setGet((p) => p + 1);
        });
        return () => {
            socketRef.current.disconnect(); // disconect
        };
    }, []);
    useEffect(() => {
        if (!currentUser?._id && course.code) {
            navigate('/courses/' + course.code, { replace: true });
        } else if (!currentUser?._id) {
            navigate('/login', { replace: true });
        }
        dispatch(courseActions.getLearning({ userId: currentUser?._id, courseId: course?._id }));
        if (currentUser?._id && course._id) socketRef.current.emit('addUser', { userId: currentUser?._id, courseId: course._id });
    }, [currentUser, navigate, course, dispatch]);
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
    useEffect(() => {
        if (learn._id) {
            let listId = learn?.listLessonId || [];
            let lessonIdx = -1;
            setTCount([]);
            let topicIdx = listTopics.findIndex((t, i) => {
                lessonIdx = t.listLessons.findIndex((l) => l._id === listId[listId.length - 1]);
                let count;
                if (lessonIdx >= 0) count = lessonIdx + 1;
                setTCount((p) => {
                    return [...p, count || 0];
                });
                return lessonIdx >= 0;
            });

            if (lessonIdx === listTopics[topicIdx]?.listLessons.length) {
                if (topicIdx === listTopics.length) {
                    topicIdx = 0;
                    lessonIdx = 0;
                } else {
                    topicIdx = topicIdx + 1;
                    lessonIdx = 0;
                }
            } else {
                if (!(topicIdx >= 0)) topicIdx = 0;
                if (!(lessonIdx >= 0)) {
                    lessonIdx = 0;
                } else {
                    lessonIdx = lessonIdx + 1;
                }
            }
            setLesson({ ...listTopics[topicIdx]?.listLessons[lessonIdx], topicIdx: topicIdx, lessonIdx: lessonIdx });
        }
    }, [learn]);

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

    const endVideo = useCallback(() => {
        let obj = learn?.listLessonId?.find((x) => x === lesson._id);
        if (!obj) {
            dispatch(courseActions.done({ userId: currentUser?._id, courseId: course._id, lessonId: lesson._id }));
            dispatch(courseActions.getLearning({ userId: currentUser?._id, courseId: course._id }));
        }
    }, [currentUser, course, lesson]);
    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Header className="header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                        <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'inline-flex', alignItems: 'center' }}>
                            <DoubleLeftOutlined />
                            <Title level={3} style={{ margin: '0 0 0 10px', color: '#fff' }}>
                                {course.name}
                            </Title>
                        </a>
                        <div style={{ width: '40px' }}>
                            <Progress
                                type="circle"
                                percent={(
                                    (tCount.reduce((t, n) => {
                                        return t + n;
                                    }, 0) *
                                        100) /
                                    lessonCount
                                ).toFixed(0)}
                                status="active"
                                width={45}
                            />

                            <strong>
                                {tCount.reduce((t, n) => {
                                    return t + n;
                                }, 0) +
                                    '/' +
                                    lessonCount}
                            </strong>
                            {' bài học'}
                        </div>
                    </div>
                </Header>
                <Layout style={{ background: '#fff' }}>
                    <Content>
                        <Row>
                            <Col
                                span={18}
                                style={{
                                    height: `calc(100vh - 64px )`,
                                    overflowY: 'overlay',
                                    borderRight: '1px solid #ccc',
                                }}
                            >
                                <div className="box-player-doc" style={{ backgroundColor: ' #000' }}>
                                    <div className="player-doc">
                                        <div className="player">
                                            <VideoPlayer lesson={lesson} endVideo={endVideo} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box-player-doc mt-4">
                                    <div style={{ width: '80%' }}>
                                        <Title level={2}>
                                            <strong>{lesson?.name}</strong>
                                        </Title>

                                        <div className="mt-4">
                                            <span dangerouslySetInnerHTML={{ __html: lesson.description }}></span>
                                        </div>
                                        <CommentBox currentUser={currentUser} course={course} socketRef={socketRef} get={get} />
                                    </div>
                                </div>
                            </Col>
                            <Col
                                span={6}
                                style={{
                                    height: `calc(100vh - 64px )`,
                                    overflowY: 'overlay',
                                }}
                            >
                                <Collapse collapsible="header" expandIconPosition={'end'} bordered={false} className="custom-collapse">
                                    {listTopics.map((t, topicIdx) => {
                                        return (
                                            <Panel
                                                header={
                                                    <>
                                                        <Space>
                                                            <strong style={{ fontSize: '16px', flex: 1 }}>{`${topicIdx + 1}. ${t.name}`}</strong>
                                                            <span style={{ fontSize: '16px', marginRight: '10px' }}>
                                                                {`${tCount[topicIdx] || 0}/${t.listLessons.length}`}
                                                            </span>
                                                        </Space>
                                                    </>
                                                }
                                                key={topicIdx}
                                            >
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={t.listLessons}
                                                    renderItem={(item, lessonIdx) => (
                                                        <List.Item
                                                            actions={[
                                                                learn?.listLessonId?.find((x) => x === item._id) && <img src={doneImg} alt="done" />,
                                                            ]}
                                                            className={lesson.topicIdx === topicIdx && lesson.lessonIdx === lessonIdx ? 'active' : ''}
                                                            onClick={() => {
                                                                setLesson({ ...item, topicIdx: topicIdx, lessonIdx: lessonIdx });
                                                            }}
                                                        >
                                                            <div>
                                                                <span>{item.sort + '. ' + item.name}</span>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <p style={{ margin: '0 10px 0 0' }}>{secondsToHms(item.time, 'ms')}</p>
                                                                    <img src={clock} alt="clock" className="me-2" />
                                                                </div>
                                                            </div>
                                                        </List.Item>
                                                    )}
                                                />
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

const CommentList = ({ comments }) => {
    let listComment = [...comments];
    listComment.reverse();
    let _comment = listComment.map((c) => {
        return {
            author: c.userId?.fullName,
            avatar: c.userId?.avatar,
            content: <p>{c.text}</p>,
            datetime: TimeAgo(c.createdAt),
        };
    });
    return (
        <List dataSource={_comment} header={`${_comment.length} bình luận`} itemLayout="horizontal" renderItem={(props) => <Comment {...props} />} />
    );
};

const CommentBox = ({ currentUser, course, socketRef, get }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(commentActions.getComment({ courseId: course?._id }));
    }, [dispatch, get, course]);
    const comments = useSelector(commentSelector.comments);
    return (
        <>
            <Comment
                avatar={<Avatar src={currentUser?.avatar} alt="Han Solo" />}
                content={<Editor currentUser={currentUser} course={course} socketRef={socketRef} />}
            />
            {comments.length > 0 && <CommentList comments={comments} />}
        </>
    );
};

const Editor = ({ currentUser, course, socketRef }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!comment) return;
        let model = { userId: currentUser?._id, courseId: course._id, text: comment };
        dispatch(commentActions.saveComment(model));
        socketRef.current.emit('sendMessage', { courseId: course._id });
        setComment('');
    };

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };
    return (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={handleChangeComment} value={comment} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" onClick={handleSubmit} type="primary">
                    Thêm bình luận
                </Button>
            </Form.Item>
        </>
    );
};
export default Learning;
const TimeAgo = (value) => {
    if (value) {
        const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
        if (seconds <= 60) return 'gần đây';

        const intervals = {
            year: 31536000,

            month: 2592000,

            week: 604800,

            day: 86400,

            hour: 3600,

            minute: 60,

            second: 1,
        };
        if (seconds > intervals.minute && seconds < intervals.hour) {
            return Math.floor(seconds / intervals.minute) + ' phút trước';
        }
        if (seconds > intervals.hour && seconds < intervals.day) {
            return Math.floor(seconds / intervals.hour) + ' giờ trước';
        }
        if (seconds > intervals.day && seconds < intervals.week) {
            return Math.floor(seconds / intervals.day) + ' ngày trước';
        } else {
            return new Date(value).toLocaleString().split(',')[0];
        }
    }
    return value;
};
