import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import css from "./Counter.module.css";

const Counter = ({ counter, maxCount, onChange }) => {
  // Handler when increase counter
  const increaseCounterHandler = (e) => {
    e.preventDefault();
    if (counter === maxCount) {
      if (maxCount === 0) alert("This product is currently out of stock, please choose another product to purchase");
      else alert(`The stock only has ${maxCount} products left, can't increase the quantity`);
      return;
    }
    onChange(counter + 1);
  };

  // Handler when decrease counter
  const decreaseCounterHandler = (e) => {
    e.preventDefault();
    if (counter === 0) return;
    onChange(counter - 1);
  };

  // Render component
  return (
    <div className={css["counter"]}>
      <button onClick={decreaseCounterHandler}>
        <FaCaretLeft />
      </button>
      <div>{counter}</div>
      <button onClick={increaseCounterHandler}>
        <FaCaretRight />
      </button>
    </div>
  );
};

export default Counter;
