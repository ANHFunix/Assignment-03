import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

import Counter from "../../UI/Counter";
import "./CartTableRow.css";
import { userActions } from "../../../store/user/reducer";

const CartTableRow = ({ product, qty }) => {
  // Dispatch function
  const dispatch = useDispatch();

  // Handler when change counter
  const changeCounterHandler = (counter) => {
    dispatch(userActions.changeCartProductQty({ product, qty: counter - qty }));
    dispatch(userActions.save());
  };

  // Handler when remove item
  const removeItemHandler = () => {
    // Ask user when remove item
    if (window.confirm("Are you sure you want to remove this item? ") === true) {
      dispatch(userActions.changeCartProductQty({ product, qty: -qty }));
      dispatch(userActions.save());
    } else return;
  };

  // Render component
  return (
    <div className="row cart-table__row">
      <div className="col-1 d-none d-lg-block">
        <img src={product.imgs[0]} alt="product" />
      </div>
      <div className="col-5 col-lg-3 ">
        <h6>{product.name}</h6>
      </div>
      <div className="col-3 col-lg-2 text--gray">{Number(product.price).toLocaleString()} VND</div>
      <div className="col-4 col-lg-2">
        <Counter counter={qty} onChange={changeCounterHandler} />{" "}
      </div>
      <div className="col-2 d-none d-lg-block text--gray">{Number(product.price * qty).toLocaleString()} VND</div>
      <div className="col-2 d-none d-lg-block">
        <button onClick={removeItemHandler} className="cart-remove-btn">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default CartTableRow;
