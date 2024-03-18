import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user/reducer";

import Button from "../../UI/Button";
import Counter from "../../UI/Counter";
import "./DetailInfo.css";

const DetailInfo = ({ item }) => {
  // Dispatch function
  const dispatch = useDispatch();

  // Current user
  const user = useSelector((state) => state.user.user);

  // Quantity of item
  const [qty, setQty] = useState(0);

  // Handler when change counter
  const changeCounterHandler = (counter) => setQty(counter);

  // Handler when add product to cart
  const addProductHandler = () => {
    // If quantity = 0, return
    if (qty === 0) return;
    // If user did not login
    if (!user) {
      alert("You must login to use this feature!");
      return;
    }

    // If user logged in, update cart
    dispatch(userActions.changeCartProductQty({ product: item, qty }));
    dispatch(userActions.save()).then(() => {
      setQty(0);
      alert("Product added to cart successfully!");
    });
  };

  // Render component
  return (
    <div className="detail-info">
      <h1 className="detail-info__name">{item.name}</h1>
      <h5 className="detail-info__price text--gray">{Number(item.price).toLocaleString()} VND</h5>
      <div className="detail-info__desc text--gray">{item.short_desc}</div>
      <div className="detail-info__cate text--gray">
        <h6>CATEGORY: </h6>
        {item.category}
      </div>
      <div className="detail-info__cate text--gray">
        <h6>REMAINING: </h6>
        {item.remaining} products
      </div>
      <div className="detail-info__cart">
        {!!item.remaining && (
          <>
            <label className="text--gray">QUANTITY</label>
            <Counter key={Math.random()} counter={qty} maxCount={item.remaining} onChange={changeCounterHandler} />
          </>
        )}
        <Button onClick={addProductHandler} disabled={item.remaining === 0}>
          {item.remaining ? "Add to cart" : "Sold out"}
        </Button>
      </div>
    </div>
  );
};

export default DetailInfo;
