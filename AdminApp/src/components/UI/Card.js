import css from "./Card.module.css";

const Card = ({ className, children }) => {
  // Join inner and outer classes
  const classList = [className, css["card"]].join(" ");

  // Render component
  return <div className={classList}>{children}</div>;
};

export default Card;
