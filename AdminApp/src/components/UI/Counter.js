import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import css from "./Counter.module.css";

const Counter = ({ counter, onChange }) => {
  // Handler when increase counter
  const increaseCounterHandler = (e) => {
    e.preventDefault();
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
