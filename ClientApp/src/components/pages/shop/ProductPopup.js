import { Fragment } from "react";
import { createPortal } from "react-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { popupActions } from "../../../store/popup/reducer";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button";
import "./ProductPopup.css";

// Backdrop component
const Backdrop = ({ onClosePopup }) => {
  // Render component
  return <div className="product-backdrop" onClick={onClosePopup}></div>;
};

// Modal component
const Modal = ({ item, onClosePopup }) => {
  // Pages history
  const history = useHistory();

  // Handler when click view detail button
  const viewDetailHandler = (e) => {
    e.preventDefault();
    // Close popup
    onClosePopup();
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Push new page
    history.push("/detail/" + item._id);
  };

  // Render component
  return (
    <div className="product-modal">
      <button onClick={onClosePopup}>&times;</button>
      <div className="row">
        <div className="col-md-6 modal-left">
          <img src={item.imgs[0]} alt="product" />
        </div>
        <div className="col-md-6 modal-right">
          <h3>{item.name}</h3>
          <div className="text--light">{Number(item.price).toLocaleString()} VND</div>
          <div>{item.short_desc}</div>
          <Button onClick={viewDetailHandler}>
            <FaShoppingCart /> View Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

// Product popup item
const ProductPopup = () => {
  // Dispatch function
  const dispatch = useDispatch();

  // Get popup item
  const item = useSelector((state) => state.popup.item);

  // Handler when close popup
  const closePopupHandler = () => dispatch(popupActions.hide());

  // Render component
  return (
    <Fragment>
      {/* Render backdrop */}
      {createPortal(<Backdrop onClosePopup={closePopupHandler} />, document.getElementById("backdrop-root"))}
      {/* Render modal */}
      {createPortal(<Modal item={item} onClosePopup={closePopupHandler} />, document.getElementById("overlay-root"))}
    </Fragment>
  );
};

export default ProductPopup;
