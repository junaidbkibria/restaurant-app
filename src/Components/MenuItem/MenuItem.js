import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Rate, Row } from "antd";
import "../MenuItem/MenuItem.css";
import burger from "../../Assets/burger.png";
import chicken from '../../Assets/fried-chicken.png';
import noodle from '../../Assets/noodles.png';
import drinks from '../../Assets/soft-drink.png';
import sandwich from '../../Assets/sandwich.png';
import rice from '../../Assets/rice.png';
import { useEffect, useState } from "react";
import { getItem, setItem } from "../../Storage";
import { useCartStore } from "../../Store/CartStore";


const MenuItem = ({name, itemType, price, menuList, setMenuList}) => {
  const [menuIcon, setMenuIcon] = useState(null);
  const {addToCart, removeWholeItem, cart} = useCartStore();
  const user = getItem('currentUser');

  const deleteItem = () => {
    const newList = menuList.filter( item => item.name !== name);
    setMenuList(newList);
    setItem('menu',newList);
    if(cart.length > 0) {
      removeWholeItem(name);
    }
  }

  const addToCartFunction = () => {
    addToCart({
      name: name,
      itemtype: itemType,
      price: price,	
    })
  }

  useEffect(()=> {
    if(itemType === 'burger') {
      setMenuIcon(burger);
    }else if (itemType === 'chicken') {
      setMenuIcon(chicken);
    }else if (itemType === 'noodle') {
      setMenuIcon(noodle);
    }else if (itemType === 'soda') {
      setMenuIcon(drinks);
    }else if (itemType === 'sandwich') {
      setMenuIcon(sandwich);
    }else if (itemType === 'rice') {
      setMenuIcon(rice);
    }
  },[]);

  return (
    <Row className="item-row">
      <img style={{ width: "100px" }} src={menuIcon} alt="item_logo" />
      <p className="item-name">{name}</p>
      <Rate value={5} />
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col>
          <p className="item-price">{price} TK</p>
        </Col>
        <Col>
          <Button type="primary" onClick={()=> addToCartFunction()}>
            <ShoppingCartOutlined />
          </Button>
        </Col>
      </Row>
      {user.user_type === 'admin' && <div className="delete-icon" onClick={deleteItem}>
        <DeleteOutlined />
      </div>}
    </Row>
  );
};

export default MenuItem;
