import { useSelector } from "react-redux";

import CartTableRow from "./CartTableRow";
import "./CartTable.css";

const CartTable = () => {
  // Get cart
  const cart = useSelector((state) => state.user.user.cart);

  // Render component
  return (
    <div className="cart-table">
      <div className="row cart-table__header">
        <h6 className="col-1 d-none d-lg-block">IMAGE</h6>
        <h6 className="col-5 col-lg-3">PRODUCT</h6>
        <h6 className="col-3 col-lg-2">PRICE</h6>
        <h6 className="col-4 col-lg-2">QUANTITY</h6>
        <h6 className="col-2 d-none d-lg-block">TOTAL</h6>
        <h6 className="col-2 d-none d-lg-block">REMOVE</h6>
      </div>
      {/* Render cart items */}
      {cart.products.map((prod, index) => (
        <CartTableRow product={prod.product} qty={prod.qty} key={index} />
      ))}
    </div>
  );
};

export default CartTable;
