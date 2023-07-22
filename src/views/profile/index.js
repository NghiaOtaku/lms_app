import React, { useEffect } from 'react';
import { Col, Row, List } from 'antd';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import banner from 'src/assets/english.jpg';
import { authSelector } from 'src/redux/auth/auth.slice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const currentUser = useSelector(authSelector.currentUser);
    useEffect(() => {
        if (!currentUser?.email) {
            navigate('/login', { replace: true });
            return;
        }
        dispatch(courseActions.getLearningByUserId(currentUser));
    }, [dispatch, currentUser, navigate]);
    const listLearn = useSelector(courseSelector.listLearn);

    return (
        <>
            <div style={{ backgroundImage: 'url(' + banner + ')' }} className="banner">
                <div className="avatar-info">
                    <div className="Profile_user-avatar__y8fSV">
                        <img className="Profile_avatar__0ZkLo" src={currentUser?.avatar} alt={currentUser?.fullName} />
                    </div>
                    <div className="Profile_user-name__xIJlY">
                        <span>{currentUser?.fullName}</span>
                    </div>
                </div>
            </div>
            <Row className="box-content">
                <Col span={24}>
                    <div className="box-wrapper">
                        <h4 className="text-header">Các khóa học đã tham gia</h4>
                        <div>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={listLearn}
                                renderItem={(l) => (
                                    <List.Item
                                        key={l.title}
                                        extra={
                                            <div className="cus-box-img thumbnail">
                                                <div className="img" style={{ width: '100%', height: '100%' }}>
                                                    <img src={l.courseId.image} alt="" width="100%" height="100%" />
                                                </div>
                                            </div>
                                        }
                                    >
                                        <List.Item.Meta title={<a href={'/courses/' + l.courseId.code}>{l.courseId.name}</a>} />
                                        <span dangerouslySetInnerHTML={{ __html: l.courseId.description }} className="wrapword"></span>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Profile;
