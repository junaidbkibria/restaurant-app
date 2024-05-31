import { Row, Switch } from "antd";
import "../Login/Login.css";
import { Button, Form, Input } from "antd";
import { setItem } from "../../Storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    setItem('profile', {
      name: values.name,
      email: values.email,
      password: values.password,
      user_type: values.userType? 'admin' : 'customer'
    });
    navigate('/dashboard');
  };

  return (
    <Row className="wrapper">
      <Row className="login">
        <Row className="container">
          <p className="title">Restaurant App</p>
          <p>(System analysis and design)</p>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ userType: true }}
            style={{ width: "100%" }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input className="input"/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="input"/>
            </Form.Item>

            <Form.Item
              label="User type"
              name="userType"
            >
              <Switch
                checkedChildren="Admin"
                unCheckedChildren="Customer"
                defaultChecked = "Admin"
                valuePropName="checked"
              />
            </Form.Item>

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button style={{width: '150px', height: '44px'}} type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Row>
    </Row>
  );
};

export default Login;
