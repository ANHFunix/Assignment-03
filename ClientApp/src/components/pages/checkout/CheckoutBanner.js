import "./CheckoutBanner.css";

const CheckoutBanner = () => {
  // Render component
  return (
    <div className="checkout-banner">
      <div>
        <h3>CHECKOUT</h3>
      </div>
      <div className="d-none d-sm-block">
        HOME / CART / <span>CHECKOUT</span>
      </div>
    </div>
  );
};

export default CheckoutBanner;
