import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api, { call } from "../api/api";

import Loading from "./Loading";
import NotLogin from "./NotLogin";
import Card from "../components/UI/Card";
import DataTable from "react-data-table-component";

const Order = () => {
  // Current user
  const user = useSelector((state) => state.user.user);

  // Get orderId
  const orderId = useParams().orderId;

  // Order state
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  // Get order
  useEffect(() => {
    call(api.order.getById(orderId), (data) => {
      setOrder(data.item);
      setProducts(data.item.products);
    });
  }, [orderId]);

  // If user did not login
  if (!user) return <NotLogin />;
  if (!order) return <Loading />;

  // Table props
  const columns = [
    {
      name: "ID",
      selector: (row) => row.product._id,
      sortable: true,
      center: true,
      hide: "lg",
      grow: 2,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.product.imgs[0]} alt="product" className="w-100 p-1" style={{ maxWidth: "150px" }} />
      ),
      center: true,
      hide: "md",
      grow: 2,
    },
    {
      name: "Name",
      selector: (row) => row.product.name,
      sortable: true,
      center: true,
      grow: 3,
    },
    {
      name: "Price",
      selector: (row) => `${Number(row.product.price).toLocaleString()} VND`,
      sortable: true,
      sortFunction: (rowA, rowB) => rowA.product.price - rowB.product.price,
      center: true,
    },
    {
      name: "Count",
      selector: (row) => row.qty,
      sortable: true,
      center: true,
    },
  ];

  // If user logged in
  return (
    <div className="order-info px-3 py-5">
      <h5>Order information</h5>
      <Card className="row mt-3 mx-0 p-3">
        <div className="col-md-4 col-sm-6 ps-0 my-2">
          <h5>Customer</h5>
          <div className="mb-2">Full Name: {order.user.full_name}</div>
          <div className="mb-2">Phone Number: {order.user.phone_number}</div>
          <div className="">Email: {order.user.email}</div>
        </div>
        <div className="col-md-4 col-sm-6 ps-0 my-2">
          <h5>Receiver</h5>
          <div className="mb-2">Full Name: {order.receiver.full_name}</div>
          <div className="mb-2">Phone Number: {order.receiver.phone_number}</div>
          <div className="">Address: {order.receiver.address}</div>
        </div>
        <div className="col-md-4 col-sm-6 ps-0 my-2">
          <h5>Order status</h5>
          <div className="mb-2">Total: {Number(order.total_price).toLocaleString()} VND</div>
          <div className="mb-2">Delivered: {order.delivered ? "Đã vận chuyển" : "Chưa vận chuyển"}</div>
          <div>Paid: {order.paid ? "Đã thanh toán" : "Chưa thanh toán"}</div>
        </div>
      </Card>
      <h5 className="mt-4">Order</h5>
      <Card className="mt-3 p-3">
        <DataTable columns={columns} data={products} theme="solarized" />
      </Card>
    </div>
  );
};

export default Order;
