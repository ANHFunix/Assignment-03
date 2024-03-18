import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import CartBanner from "../components/pages/cart/CartBanner";
import CartTable from "../components/pages/cart/CartTable";
import CartTotal from "../components/pages/cart/CartTotal";
import NotLogin from "./NotLogin";
import "./Cart.css";

const Cart = () => {
  // Current user
  const user = useSelector((state) => state.user.user);

  // If user did not login
  if (!user) return <NotLogin />;

  // If user logged in
  return (
    <Fragment>
      <CartBanner />
      <h5 className="mb-4">SHOPPING CART</h5>
      <div className="row cart-item-list">
        <div className="col-sm-6 col-lg-8 px-4 mb-4">
          <CartTable />
        </div>
        <div className="col-sm-6 col-lg-4 mb-4">
          <CartTotal />
        </div>
        <div className="col-lg-8 cart-footer mb-4">
          <Link to="/shop">
            <FaArrowLeft /> Continue shopping
          </Link>
          <Link to="/checkout" className="cart-checkout">
            Proceed to checkout <FaArrowRight />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
