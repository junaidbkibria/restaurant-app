import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import { getItem, setItem } from "../../Storage";
import "../AddItem/AddItem.css";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useReservationStore } from "../../Store/ReservationStore";

const Reservation = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState();
  const user = getItem('currentUser');
  const { add } = useReservationStore();

  const convertToCustomFormat = (dateString) => {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
    };
    return date.toLocaleDateString('en-US', options);
}
  const options = [
    { value: 2, label: "2 chairs" },
    { value: 4, label: "4 chairs" },
    { value: 8, label: "8 chairs" },
    { value: 12, label: "12 chairs" },
  ];
  const onFinish = (values) => {
    const reservation = {
        date: convertToCustomFormat(selectedDate),
        phone: values.phone,
        tables: values.tables,
        name: user.name,
        email: user.email,
        status: "pending",
        reservationId: uuidv4()
    }
    add(reservation);
  };

  return (
    <Row>
      <Navbar />
      <Row style={{ width: "80%", margin: "0 auto" }}>
        <Col span={12}>
          <Row>
            <p className="title-add-new-item">Reservation</p>
            <Form
              name="login"
              layout="vertical"
              initialValues={{ userType: true }}
              style={{ width: "100%" }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Date and Time"
                name="datetime"
                rules={[
                  { required: true, message: "Please input your Date & Time!" },
                ]}
              >
                <DatePicker
                  style={{ height: "44px", width: "100%" }}
                  showTime
                  onChange={(value, dateString) => {
                    setSelectedDate(dateString);
                  }}
                  //   onOk={onOk}
                />
              </Form.Item>

              <Form.Item
                label="Tables"
                name="tables"
                rules={[
                  {
                    required: true,
                    message: "Please input tables for booking",
                  },
                ]}
              >
                <Select
                  className="input-add-new-item"
                  mode="multiple"
                  options={options}
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your Phone!" },
                ]}
              >
                <Input className="input-add-new-item" />
              </Form.Item>

              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button className="add-button" type="primary" htmlType="submit">
                  Book
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

export default Reservation;
