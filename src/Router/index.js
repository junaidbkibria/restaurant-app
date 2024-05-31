import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddItem from "../Pages/AddItem/AddItem";
import Cart from "../Pages/Cart/Cart";
import Orders from "../Pages/Orders/Orders";
import { getItem } from "../Storage";
import NotFound from "../Components/NotFound/NotFound";
import Reservation from "../Pages/Reservation/Reservation";

const Router = () => {
  const user = getItem("currentUser");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {user &&
          (user.user_type === "admin" || user.user_type === "customer") && (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/orders" element={<Orders />} />

              <Route path="/reservation" element={<Reservation />} />
            </>
          )}

        {user && user.user_type === "admin" && (
          <Route path="/add-item" element={<AddItem />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
