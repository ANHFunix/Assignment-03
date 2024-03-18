import OrderTableRow from "./OrderTableRow";
import "./OrderTable.css";

const OrderTable = ({ order }) => {
  // Render component
  return (
    <div className="order-table">
      <div className="row order-table__header">
        <h6 className="col-3">ID PRODUCT</h6>
        <h6 className="col-3">IMAGE</h6>
        <h6 className="col-3">NAME</h6>
        <h6 className="col-2">PRICE</h6>
        <h6 className="col-1">COUNT</h6>
      </div>
      {/* Render orders */}
      {order.products.map((prod, index) => (
        <OrderTableRow product={prod.product} qty={prod.qty} key={index} />
      ))}
    </div>
  );
};

export default OrderTable;
