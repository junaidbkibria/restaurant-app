import { Button, Col, Row, Table, message } from "antd";
import { useCartStore } from "../../Store/CartStore";
import burger from "../../Assets/burger.png";
import chicken from "../../Assets/fried-chicken.png";
import noodle from "../../Assets/noodles.png";
import drinks from "../../Assets/soft-drink.png";
import sandwich from "../../Assets/sandwich.png";
import rice from "../../Assets/rice.png";
import "../Cart/Cart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useOrderStore } from "../../Store/OrderStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, total_price, addToCart, removeFromCart, reinitialiseCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const navigate = useNavigate();

  const foodIcon = (itemtype) => {
    if (itemtype === "burger") {
      return burger;
    } else if (itemtype === "chicken") {
      return chicken;
    } else if (itemtype === "noodle") {
      return noodle;
    } else if (itemtype === "soda") {
      return drinks;
    } else if (itemtype === "sandwich") {
      return sandwich;
    } else if (itemtype === "rice") {
      return rice;
    }
  };

  const payMoney = () => {
    message.success('Your order is confirmed');
    addOrder(cart);
    reinitialiseCart();
    navigate('/orders');
  }
  const columns = [
    {
      key: "icon",
      render: (record) => (
        <img
          src={foodIcon(record.itemtype)}
          style={{ width: "75px" }}
          alt="food"
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price in TK",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (record) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <Button onClick={() => removeFromCart(record.name)}>-</Button>
          <p style={{margin: '0 10px', fontWeight: '600'}}>{record.count}</p>
          <Button onClick={() => addToCart(record)}>+</Button>
        </div>
      ),
    },
    {
      title: "Subtotal in TK",
      key: "total_price",
      render: (record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>{record.count * Number(record.price)}</p>
        </div>
      ),
    },
  ];

  return (
    <Row className="cart-wrapper">
      <Navbar />
      <Row className="cart-container">
        <p className="cart-text">Cart</p>
      </Row>
      <Row className="cart-container">
        <Col span={18}>
          <Table
            columns={columns}
            dataSource={cart}
            pagination={false}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={5} className="right-section">
          <p className="billing-text">Billing Summary</p>
          <hr />
          <p className="subtotal-text">Subtotal: {total_price} TK</p>
          <p className="delivery-text">Delivery: 100 TK</p>
          <p className="total-text">Total: {total_price + 100} TK</p>
        </Col>
      </Row>
      <Row className="cart-container">
        <Button className="pay-btn" type="primary" disabled= {cart.length === 0} onClick={()=>payMoney()}>Pay online</Button>
      </Row>
    </Row>
  );
};

export default Cart;
