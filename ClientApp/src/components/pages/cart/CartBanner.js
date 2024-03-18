import "./CartBanner.css";

const CartBanner = () => {
  // Render component
  return (
    <div className="cart-banner">
      <div>
        <h3>CART</h3>
      </div>
      <div className="d-none d-sm-block">CART</div>
    </div>
  );
};

export default CartBanner;
