import "./OrderTableRow.css";

const OrderTableRow = ({ product, qty }) => {
  // Render component
  return (
    <div className="row order-table__row">
      <div className="col-3">{product._id}</div>
      <div className="col-3">
        <img src={product.imgs[0]} alt="product" />
      </div>
      <div className="col-3">{product.name}</div>
      <div className="col-2">{Number(product.price).toLocaleString()} VND</div>
      <div className="col-1">{qty}</div>
    </div>
  );
};

export default OrderTableRow;
