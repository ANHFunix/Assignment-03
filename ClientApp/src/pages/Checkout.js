import { Fragment } from "react";
import { useSelector } from "react-redux";

import CheckoutBanner from "../components/pages/checkout/CheckoutBanner";
import CheckoutTotal from "../components/pages/checkout/CheckoutTotal";
import CheckoutForm from "../components/pages/checkout/CheckoutForm";
import NotLogin from "./NotLogin";

const Checkout = () => {
  // Current user
  const user = useSelector((state) => state.user.user);

  // If user did not login
  if (!user) return <NotLogin />;

  // If user logged in
  return (
    <Fragment>
      <CheckoutBanner />
      <h5 className="mb-4">BILLING DETAILS</h5>
      <div className="row">
        <div className="col-sm-6 col-lg-8 pe-4 mb-4">
          <CheckoutForm />
        </div>
        <div className="col-sm-6 col-lg-4 mb-4">
          <CheckoutTotal />
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
