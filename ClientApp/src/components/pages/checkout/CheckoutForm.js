import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import api, { call } from "../../../api/api";
import { userActions } from "../../../store/user/reducer";

import Button from "../../UI/Button";
import "./CheckoutForm.css";
import { useHistory } from "react-router-dom";

const CheckoutForm = () => {
  // Dispatch function
  const dispatch = useDispatch();

  // Page history
  const history = useHistory();

  // Input reference
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  // Get current user
  const user = useSelector((state) => state.user.user);

  // Handler when submit form
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Check if order is valid
    if (user.cart.total_price === 0) {
      alert("You must add some product to cart to create order");
      return;
    }

    // Get data from input
    const receiver = {
      full_name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      phone_number: phoneRef.current.value.trim(),
      address: addressRef.current.value.trim(),
    };

    const newOrder = {
      user,
      receiver,
      delivered: false,
      paid: false,
      products: user.cart.products,
      total_price: user.cart.total_price,
    };

    // Create order
    call(
      api.order.create({ ...newOrder }),
      // Function to apply data
      (data) => {
        call(api.mail.sendOrder(newOrder));
        alert(data.message);
        dispatch(userActions.clearCart());
        dispatch(userActions.save());
        history.push("/history");
      }
    );

    // Reset input field
    nameRef.current.value = user.full_name;
    emailRef.current.value = user.email;
    phoneRef.current.value = user.phone_number;
    addressRef.current.value = "";
  };

  // Render component
  return (
    <form className="checkout-form" onSubmit={formSubmitHandler}>
      <div>FULL NAME:</div>
      <input
        type="text"
        placeholder="Enter Your Full Name Here!"
        ref={nameRef}
        defaultValue={user.full_name}
        required
      />
      <div>EMAIL:</div>
      <input type="email" placeholder="Enter Your Mail Here!" defaultValue={user.email} ref={emailRef} />
      <div>PHONE NUMBER:</div>
      <input
        type="tel"
        ref={phoneRef}
        placeholder="Enter Your Phone Number Here!"
        defaultValue={user.phone_number}
        required
      />
      <div>ADDRESS:</div>
      <input type="text" placeholder="Enter Your Address Here!" ref={addressRef} required />
      <Button type="submit">Place order</Button>
    </form>
  );
};

export default CheckoutForm;
