import css from "./Button.module.css";

const Button = ({ children, className, onClick, type }) => {
  // Join outer and inner classes
  const classes = [className, css["btn"]].join(" ");

  // Render component
  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
