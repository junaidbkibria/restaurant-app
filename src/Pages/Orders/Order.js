import { Button, Row } from "antd";
import burger from "../../Assets/burger.png";
import chicken from "../../Assets/fried-chicken.png";
import noodle from "../../Assets/noodles.png";
import drinks from "../../Assets/soft-drink.png";
import sandwich from "../../Assets/sandwich.png";
import rice from "../../Assets/rice.png";
import { useOrderStore } from "../../Store/OrderStore";
import { getItem } from "../../Storage";

const Order = ({ item }) => {
  const { cancelOrder, completeOrder } = useOrderStore();
  const user = getItem("currentUser");

  const iconFinder = (itemType) => {
    console.log(itemType);
    if (itemType === "burger") {
      return burger;
    } else if (itemType === "chicken") {
      return chicken;
    } else if (itemType === "noodle") {
      return noodle;
    } else if (itemType === "soda") {
      return drinks;
    } else if (itemType === "sandwich") {
      return sandwich;
    } else if (itemType === "rice") {
      return rice;
    }
  };

  return (
    <Row
      className="order-wrapper"
      style={{
        justifyContent:
          item.status === "pending" ? "space-between" : "flex-start",
      }}
    >
      <Row
        className="order-name"
        style={{
          backgroundColor:
            item.status === "pending"
              ? "orange"
              : item.status === "done"
              ? "#B0EBB4"
              : "#E97777",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ margin: 0, textAlign: "center" }}>{item.name}</p>
          <p className="status-text">[{item.status}]</p>
        </div>
      </Row>
      <Row className="order-details">
        {item.cart.map((i) => (
          <Row className="item-row-order">
            <img
              style={{ width: "50px" }}
              src={iconFinder(i.itemtype)}
              alt="item"
            />
            <p>{i.name}</p>
            <p>x{i.count}</p>
          </Row>
        ))}
      </Row>
      {item.status === "pending" && (
        <Row className="order-action">
          {user.user_type === "admin" && (
            <Button
              className="deliver-btn"
              onClick={() => completeOrder(item.orderId)}
            >
              Deliver
            </Button>
          )}
          <Button
            className="cancel-btn"
            style={{ width: user.user_type === "customer" && "100%" }}
            onClick={() => cancelOrder(item.orderId)}
          >
            Cancel
          </Button>
        </Row>
      )}
    </Row>
  );
};

export default Order;
