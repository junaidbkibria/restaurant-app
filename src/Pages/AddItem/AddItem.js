import { Button, Col, Form, Input, Row, Select, message } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import { getItem, setItem } from "../../Storage";
import "../AddItem/AddItem.css";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const options = [
    { value: "burger", label: "Burger" },
    { value: "sandwich", label: "Sandwich" },
    { value: "soda", label: "Soda" },
    { value: "rice", label: "Rice Bowl" },
    { value: "chicken", label: "Chicken" },
    { value: "noodle", label: "Noodles" },
  ];
  const onFinish = (values) => {
    console.log(values);
    const menu = getItem("menu");
    if (!menu) {
      setItem("menu", [values]);
      navigate("/dashboard");
    } else {
      const found = menu?.find((item) => item.name === values.name);
      if (found) {
        message.error("This Item already exists in the menu");
      } else {
        setItem("menu", [...menu, values]);
        navigate("/dashboard");
      }
    }
  };

  return (
    <Row>
      <Navbar />
      <Row style={{ width: "80%", margin: "0 auto" }}>
        <Col span={12}>
          <Row>
            <p className="title-add-new-item">Add new item</p>
            <Form
              name="login"
              layout="vertical"
              initialValues={{ userType: true }}
              style={{ width: "100%" }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Item type"
                name="itemtype"
                rules={[{ required: true, message: "Please input Item type!" }]}
              >
                <Select
                  className="input-add-new-item"
                  //   onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input className="input-add-new-item" />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input your Price!" },
                ]}
              >
                <Input className="input-add-new-item" />
              </Form.Item>

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button className="add-button" type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>

        <Col span={12} className="logo-section">
          <img className="logo-style" src={logo} alt="logo" />
        </Col>
      </Row>
    </Row>
  );
};

export default AddItem;
