import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductPopup from "./ProductPopup";
import { popupActions } from "../../../store/popup/reducer";
import "./ProductItem.css";

const ProductItem = ({ item }) => {
  // Dispatch function
  const dispatch = useDispatch();

  // Show popup state
  const isShowPopup = useSelector((state) => state.popup.isShow);

  // Popup item state
  const itemPopupId = useSelector((state) => state.popup.itemId);

  // Handler when open popup
  const openPopupHandler = () => dispatch(popupActions.show({ item: item }));

  // Render component
  return (
    <Fragment>
      <div className="product-item">
        <img src={item.imgs[0]} alt="product" onClick={openPopupHandler} />
        <h6>{item.name}</h6>
        <div className="text--light">{Number(item.price).toLocaleString()} VND</div>
      </div>
      {itemPopupId === item._id && isShowPopup && <ProductPopup />}
    </Fragment>
  );
};

export default ProductItem;
