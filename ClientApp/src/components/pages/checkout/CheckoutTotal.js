import { useSelector } from "react-redux";

import "./CheckoutTotal.css";

const CheckoutTotal = () => {
  // Get cart
  const cart = useSelector((state) => state.user.user.cart);

  // Render component
  return (
    <div className="checkout-total p-5">
      <h5 className="mb-4">CART TOTAL</h5>
      {/* Render cart items */}
      {cart.products.map((prod, index) => (
        <div className="checkout-total__item row" key={index}>
          <h6 className="col">{prod.product.name}</h6>
          <div className="col text--gray">
            {Number(prod.product.price).toLocaleString()} VND &times; {Number(prod.qty).toLocaleString()}
          </div>
        </div>
      ))}
      <div className="checkout-total__total">
        <h6>TOTAL</h6>
        <div>{Number(cart.total_price).toLocaleString()} VND</div>
      </div>
    </div>
  );
};

export default CheckoutTotal;
