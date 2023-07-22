/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from 'src/redux/course/course.slice';
import { useNavigate } from 'react-router-dom';
import { OthersSelector } from 'src/redux/others/slice';
import { Col, Row, Card, Typography, Layout } from 'antd';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { AppHeader } from 'src/components';
import banner from 'src/assets/english.webp';

const { Footer } = Layout;
const { Title } = Typography;
const { Meta } = Card;
const Home = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        let header = document.getElementById('header');
        header.style.background = 'transparent';
        dispatch(courseActions.setFilter(filterForm));
        return () => {
            header.style.background = '#f2ce5f';
        };
    }, []);
    const options = useSelector(OthersSelector.options);
    const courses = useSelector(courseSelector.courses);
    const filterForm = useSelector(courseSelector.filterForm);
    const [courses1, setCourses1] = useState([]);
    const [courses2, setCourses2] = useState([]);

    const typeCourse = options?.typeCourse || [];
    useEffect(() => {
        if (typeCourse.length > 0) {
            setCourses1(courses.filter((x) => x.type === typeCourse[0]?._id));
            setCourses2(courses.filter((x) => x.type === typeCourse[1]?._id));
        }
    }, [dispatch, courses, typeCourse]);
    return (
        <>
            <Layout style={{ backgroundImage: 'url(' + banner + ') ' }} className="cus-layout">
                <AppHeader />
                <Layout style={{ background: 'transparent' }}>
                    <Card className="cus-card">
                        <Row>
                            <Title level={2}>
                                <strong>Khóa học Tiếng Anh cơ bản</strong>
                            </Title>
                        </Row>
                        <Row gutter={[16, 16]}>
                            {courses1.map((c, i) => {
                                return (
                                    <Col span={6} key={i}>
                                        <Card
                                            onClick={() => {
                                                navigate('/courses/' + c.code, { replace: true });
                                            }}
                                            hoverable
                                            cover={
                                                <div className="cus-box-img thumbnail">
                                                    <div className="img">
                                                        <img src={c.image} alt="" />
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <Meta
                                                title={c.name}
                                                description={
                                                    <div>
                                                        <UsergroupDeleteOutlined />
                                                        <span style={{ marginLeft: '5px' }}>{c.count}</span>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Title level={2}>
                                <strong>Khóa học Tiếng Anh nâng cao</strong>
                            </Title>
                        </Row>
                        <Row gutter={[16, 16]}>
                            {courses2.map((c, i) => {
                                return (
                                    <Col span={6} key={i}>
                                        <Card
                                            onClick={() => {
                                                navigate('/courses/' + c.code, { replace: true });
                                            }}
                                            hoverable
                                            cover={
                                                <div className="cus-box-img thumbnail">
                                                    <div className="img">
                                                        <img src={c.image} alt="" />
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <Meta
                                                title={c.name}
                                                description={
                                                    <div>
                                                        <UsergroupDeleteOutlined />
                                                        <span style={{ marginLeft: '5px' }}>{c.count}</span>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Card>
                </Layout>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Bản quyền thuộc về <a href="">TMN</a>
                </Footer>
            </Layout>
        </>
    );
};

export default Home;
