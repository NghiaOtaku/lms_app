/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
// import GoogleLogin from 'react-google-login';
import { useDispatch } from "react-redux";
import { authActions } from "src/redux/auth/auth.slice";
import { OthersAction } from "src/redux/others/slice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "src/redux/auth/auth.slice";
import { sendOtp } from "src/apis/auth";
import { Layout, Row, Col, Card, Button, Form, Input } from "antd";
const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const currentUser = useSelector(authSelector.currentUser);
  const dispatch = useDispatch();
  // const responseSuccessGoogle = (res) => {
  //     dispatch(authActions.googleLogin({ tokenId: res.tokenId }));
  // };
  const _sendOtp = (model) => {
    sendOtp(model)
      .then((res) => {
        dispatch(OthersAction.showToasrt({ type: res.status == 200 ? "success" : "error", message: res.data.message }));
      })
      .catch(() => {
        dispatch(OthersAction.showToasrt({ type: "error", message: "Gửi mã OTP thất bại" }));
      });
  };
  useEffect(() => {
    if (currentUser?.email) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);
  const handleSubmit = (values) => {
    dispatch(authActions.login(values));
  };
  const handleRegister = (value) => {
    Promise.resolve(dispatch(authActions.register(value))).then((res) => {
      setType("email");
    });
  };
  const handleForgot = (value) => {
    Promise.resolve(dispatch(authActions.forgotPassword(value))).then(() => {
      setType("email");
    });
  };

  const [type, setType] = useState("start");

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <div style={{ width: "600px" }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Đăng nhập vào CMS APP</h1>
                {type == "start" ? (
                  <div></div>
                ) : (
                  <Button
                    type="link"
                    htmlType="button"
                    onClick={() => {
                      setType("start");
                    }}
                  >
                    Quay lại
                  </Button>
                )}
              </div>
              {type === "email" && (
                <>
                  <Form
                    name="basic"
                    labelCol={{
                      span: 5,
                    }}
                    wrapperCol={{
                      span: 19,
                    }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 4,
                        span: 20,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Đăng nhập
                      </Button>
                      <Button
                        type="link"
                        htmlType="button"
                        onClick={() => {
                          setType("forgot");
                        }}
                      >
                        Quên mật khẩu
                      </Button>
                      <Button
                        type="link"
                        htmlType="button"
                        onClick={() => {
                          setType("register");
                        }}
                      >
                        Đăng ký
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
              {type === "register" && (
                <>
                  <Form
                    labelCol={{
                      span: 5,
                    }}
                    wrapperCol={{
                      span: 19,
                    }}
                    form={form}
                    onFinish={handleRegister}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Họ và tên"
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ và tên!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="OTP"
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập OTP!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 4,
                        span: 20,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Đăng ký
                      </Button>
                      <Button
                        type="link"
                        htmlType="button"
                        disabled={form.getFieldValue().email === ""}
                        onClick={() => {
                          _sendOtp({ email: form.getFieldValue().email, type: "register" });
                        }}
                      >
                        Gửi OTP
                      </Button>
                      <Button
                        type="link"
                        htmlType="button"
                        onClick={() => {
                          setType("email");
                        }}
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
              {type === "forgot" && (
                <>
                  <Form
                    labelCol={{
                      span: 5,
                    }}
                    wrapperCol={{
                      span: 19,
                    }}
                    form={form}
                    onFinish={handleForgot}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="OTP"
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập OTP!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 4,
                        span: 20,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Gửi
                      </Button>
                      <Button
                        type="link"
                        htmlType="button"
                        disabled={form.getFieldValue().email === ""}
                        onClick={() => {
                          _sendOtp({ email: form.getFieldValue().email, type: "forgot-password" });
                        }}
                      >
                        Gửi OTP
                      </Button>
                      <Button
                        type="link"
                        htmlType="button"
                        onClick={() => {
                          setType("email");
                        }}
                      >
                        Đăng nhập
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
              {type === "start" && (
                <>
                  <Row className="login-btn">
                    <Col span={24}>
                      <Button
                        onClick={() => {
                          setType("email");
                        }}
                        style={{ height: "auto" }}
                      >
                        Sử dụng email
                      </Button>
                    </Col>
                    {/* <Col span={24}>
                                            <GoogleLogin
                                                clientId="475624587151-p1e4spm2s469j4s9g7dq3au2flar356k.apps.googleusercontent.com"
                                                buttonText="Tiếp tục với Google"
                                                onSuccess={responseSuccessGoogle}
                                                onFailure={responseErrorGoogle}
                                                cookiePolicy={'single_host_origin'}
                                                className="google"
                                            />
                                        </Col> */}
                  </Row>
                </>
              )}
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
