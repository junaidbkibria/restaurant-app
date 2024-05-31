import { Avatar, Badge, Col, Row } from "antd";
import logo from "../../Assets/logo.png";
import "../Navbar/Navbar.css";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../Store/CartStore";
import { getItem } from "../../Storage";

const Navbar = () => {
  const navigate = useNavigate();
  const { count } = useCartStore();
  const user = getItem('currentUser');
  return (
    <Row className="nav-wrapper">
      <Row className="nav-container">
        <Col
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          span={12}
          onClick={() => navigate("/dashboard")}
        >
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={logo}
            alt="nav logo"
          />
          <p className="nav-title">Restaurant App</p>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          span={12}
        >
          {user && user.user_type === 'admin' && <p className="nav-item item-style" onClick={() => navigate("/add-item")}>
            Add item
          </p>}
          <p className="nav-item item-style" onClick={() => navigate("/orders")}>
            Orders
          </p>

          <p className="nav-item item-style" onClick={() => navigate("/")}>
            Logout
          </p>

          {/* <p className="nav-item item-style" onClick={() => navigate("/reservation")}>
            Reservation
          </p> */}
          <Badge count={count} className="item-style" onClick={()=> navigate('/cart')}>
            <Avatar shape="square" icon={<ShoppingOutlined />} />
          </Badge>
          <div className="profile-icon">
            <UserOutlined />
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default Navbar;
