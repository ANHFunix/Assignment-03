import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaFileAlt, FaMoneyBill, FaMoneyBillAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api, { call } from "../api/api";
import Card from "../components/UI/Card";
import "./Dashboard.css";

const Dashboard = () => {
  // Table column options
  const columns = [
    {
      name: "Name",
      selector: (row) => row.receiver.full_name,
      sortable: true,
      center: true,
      grow: 1,
    },
    {
      name: "Phone",
      selector: (row) => row.receiver.phone_number,
      sortable: true,
      center: true,
      grow: 1,
    },
    {
      name: "Address",
      selector: (row) => row.receiver.address,
      sortable: true,
      center: true,
      grow: 1,
    },
    {
      name: "Total",
      selector: (row) => `${Number(row.total_price).toLocaleString()} VND`,
      sortable: true,
      center: true,
      grow: 1,
    },
    {
      name: "Delivery",
      selector: (row) => (row.delivered ? "Đã vận chuyển" : "Chưa vận chuyển"),
      sortable: true,
      center: true,
      hide: "lg",
      grow: 1,
    },
    {
      name: "Status",
      selector: (row) => (row.paid ? "Đã thanh toán" : "Chưa thanh toán"),
      sortable: true,
      center: true,
      hide: "md",
      grow: 1,
    },
    {
      name: "Detail",
      selector: (row) => (
        <Link to={`/history/${row._id}`} className="btn btn-success text-light">
          View
        </Link>
      ),
      center: true,
      grow: 0,
    },
  ];

  // Table data state
  const [orders, setOrders] = useState([]);
  const [custCount, setCustCount] = useState(0);
  const [earning, setEarning] = useState(0);
  const [avgEarning, setAvgEarning] = useState(0);

  // Get orders data
  useEffect(() => {
    call(api.order.getAll({ sort: "createdAt" }), (resData) => {
      // Set orders
      const orders = resData.items;
      setOrders(orders);
      // Get earning this month
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const ordersThisMonth = orders.filter((order) => new Date(order.createdAt) > firstDay);
      const earningThisMonth = ordersThisMonth.reduce((sum, order) => sum + order.total_price, 0);
      setEarning(earningThisMonth);
      // Get average earning
      const totalEarning = orders.reduce((sum, order) => sum + order.total_price, 0);
      const startDate = new Date(orders[0].createdAt);
      const endDate = new Date(orders[orders.length - 1].createdAt);
      const diffMonth =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth() + 1);
      const averageEarning = totalEarning / diffMonth;
      setAvgEarning(averageEarning);
    });
  }, []);

  // Get dashboard info
  useEffect(() => {
    call(api.user.getAll(), (resData) => setCustCount(resData.items.length));
  }, []);

  // Render component
  return (
    <div className="dashboard px-3 py-5">
      <h5>Dashboard</h5>
      <Card className="mt-3 d-flex">
        <div className="dashboard-item">
          <div>
            <h3>{custCount}</h3>
            <div>Clients</div>
          </div>
          <FaUserAlt fontSize="1.5rem" color="gray" />
        </div>
        <div className="dashboard-item">
          <div>
            <h3>{orders.length}</h3>
            <div>Number of orders</div>
          </div>
          <FaFileAlt fontSize="1.5rem" color="gray" />
        </div>
        <div className="dashboard-item">
          <div>
            <h3>{Number(earning).toLocaleString()} VND</h3>
            <div>Earning of month</div>
          </div>
          <FaMoneyBill fontSize="1.5rem" color="gray" />
        </div>
        <div className="dashboard-item">
          <div>
            <h3>{Number(avgEarning).toLocaleString()} VND</h3>
            <div>Average earning</div>
          </div>
          <FaMoneyBillAlt fontSize="1.5rem" color="gray" />
        </div>
      </Card>
      <h5 className="mt-4">History</h5>
      <Card className="mt-3 p-3">
        <DataTable className="dashboard-table" columns={columns} data={orders} pagination />
      </Card>
    </div>
  );
};

export default Dashboard;
