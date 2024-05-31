import { Col, Row } from "antd";
import "../Dashboard/Dashboard.css";
import { getItem } from "../../Storage";
import logo from "../../Assets/logo.png";
import MenuItem from "../../Components/MenuItem/MenuItem";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";

const Dashboard = () => {
  const currentUser = getItem("currentUser");
  const [menuList, setMenuList] = useState(getItem("menu"));
  return (
    <Row className="main">
      <Navbar />
      <Row className="container-dashboard">
        <Row gutter={10} style={{ width: "100%" }}>
          <Col span={12} className="user-welcome-section">
            <div>
              <p className="welcome-text">Welcome</p>
              <p className="name-text">{currentUser.name}</p>
            </div>
          </Col>
          <Col span={12} className="logo-section">
            <img className="logo-style" src={logo} alt="logo" />
          </Col>
        </Row>
      </Row>

      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "24px" }}>Menu</p>
      </Row>

      <Row gutter={10} className="menu-list-container">
        {(!menuList) && <p style={{color: 'black', textAlign: 'center', fontSize: '24px'}}>No menu items created yet !</p>}
        {menuList && menuList?.map((item) => (
          <Col key = {item.name} span={8}>
            <MenuItem 
                name={item.name}
                price={item.price}
                itemType={item.itemtype}
                setMenuList = {setMenuList}
                menuList = {menuList}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default Dashboard;
