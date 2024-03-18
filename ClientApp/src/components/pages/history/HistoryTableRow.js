import { FaArrowRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./HistoryTableRow.css";

const HistoryTableRow = ({ order }) => {
  // Page history
  const history = useHistory();

  // Render component
  return (
    <div className="row history-table__row">
      <div className="col-3 col-md-2">{order.receiver.full_name}</div>
      <div className="col-1 d-none d-md-flex">{order.receiver.phone_number}</div>
      <div className="col-3 col-md-2">{order.receiver.address}</div>
      <div className="col-3 col-md-2">{Number(order.total_price).toLocaleString()} VND</div>
      <div className="col-2 d-none d-md-flex">{order.delivered ? "Delivered" : "Waiting for progressing"}</div>
      <div className="col-2 d-none d-md-flex">{order.paid ? "Paid" : "Waiting for pay"}</div>
      <div className="col-3 col-md-1">
        <button className="history-remove-btn" onClick={() => history.push("/history/" + order._id)}>
          View <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HistoryTableRow;
