import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api, { call } from "../api/api";

import OrderBanner from "../components/pages/order/OrderBanner";
import OrderTable from "../components/pages/order/OrderTable";
import Loading from "./Loading";
import NotLogin from "./NotLogin";
import "./Order.css";

const Order = () => {
  // Current user
  const user = useSelector((state) => state.user.user);

  // Get orderId
  const orderId = useParams().orderId;

  // Order state
  const [order, setOrder] = useState(null);

  // Get order
  useEffect(() => {
    call(api.order.getById(orderId), (data) => setOrder(data.item));
  }, [orderId]);

  // If user did not login
  if (!user) return <NotLogin />;
  if (!order) return <Loading />;

  // If user logged in
  return (
    <Fragment>
      <OrderBanner />
      <div className="order-info">
        <h3>INFORMATION ORDER</h3>
        <div>ID User: {order.user._id}</div>
        <div>Full Name: {order.receiver.full_name}</div>
        <div>Phone Number: {order.receiver.phone_number}</div>
        <div>Address: {order.receiver.address}</div>
        <div>Total: {Number(order.total_price).toLocaleString()} VND</div>
      </div>
      <h5 className="mb-4">ORDER</h5>
      <OrderTable order={order} />
    </Fragment>
  );
};

export default Order;
