import { Col, Row } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import "../Orders/Orders.css";
import Order from "./Order";
import { useOrderStore } from "../../Store/OrderStore";
import { useEffect, useState } from "react";
import { getItem } from "../../Storage";

const Orders = () => {
  const { orders } = useOrderStore();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const user = getItem('currentUser');

  useEffect(()=>{
    if(user.user_type === 'admin') {
        setFilteredOrder(orders);
    }else {
        const dummy = orders.filter(item => item.email === user.email);
        setFilteredOrder(dummy);
    }
  },[]);

  return (
    <Row>
      <Navbar />
      <Row className="orders-container">
        <p className="orders-page-title">Orders</p>
      </Row>
      <Row className="orders-container">
        {filteredOrder.length > 0 &&
          filteredOrder.map((item) => (
            <Col span={8} style={{marginBottom: '10px'}}>
              <Order item = {item}/>
            </Col>
          ))}
      </Row>
    </Row>
  );
};

export default Orders;
