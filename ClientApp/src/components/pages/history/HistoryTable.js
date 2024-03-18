import { useSelector } from "react-redux";

import HistoryTableRow from "./HistoryTableRow";
import "./HistoryTable.css";
import { useEffect, useState } from "react";
import api, { call } from "../../../api/api";

const HistoryTable = () => {
  // Orders state
  const [orders, setOrders] = useState([]);

  // Get current user
  const user = useSelector((state) => state.user.user);

  // Get orders
  useEffect(() => {
    call(api.order.getAll({ user: user._id, sort: "-createdAt" }), (data) => setOrders(data.items));
  }, [user._id]);

  // Render component
  return (
    <div className="history-table">
      <div className="row history-table__header">
        <h6 className="col-3 col-md-2">NAME</h6>
        <h6 className="col-1 d-none d-md-flex">PHONE</h6>
        <h6 className="col-3 col-md-2">ADDRESS</h6>
        <h6 className="col-3 col-md-2">TOTAL</h6>
        <h6 className="col-2 d-none d-md-flex">DELIVERY</h6>
        <h6 className="col-2 d-none d-md-flex">STATUS</h6>
        <h6 className="col-3 col-md-1">DETAIL</h6>
      </div>
      {/* Render orders */}
      {orders.map((order, index) => (
        <HistoryTableRow order={order} key={index} />
      ))}
    </div>
  );
};

export default HistoryTable;
