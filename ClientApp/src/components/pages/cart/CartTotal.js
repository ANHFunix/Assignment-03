import { FaGift } from "react-icons/fa";
import { useSelector } from "react-redux";

import Button from "../../UI/Button";
import "./CartTotal.css";

const CartTotal = () => {
  // Get cart
  const cart = useSelector((state) => state.user.user.cart);

  // Render component
  return (
    <div className="cart-total p-5">
      <h5 className="mb-4">CART TOTAL</h5>
      <div className="cart-total__sub d-flex justify-content-between align-items-center">
        <h6>SUBTOTAL</h6>
        <div className="text--gray">{Number(cart.total_price).toLocaleString()} VND</div>
      </div>
      <div className="cart-total__total d-flex justify-content-between align-items-center">
        <h6>TOTAL</h6>
        <div>{Number(cart.total_price).toLocaleString()} VND</div>
      </div>
      <div className="d-flex flex-column">
        <input type="text" placeholder="Enter your coupon" className="px-3 py-2" />
        <Button className="py-2">
          <FaGift />
          &nbsp;&nbsp;&nbsp;Apply coupon
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
