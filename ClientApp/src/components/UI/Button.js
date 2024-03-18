import css from "./Button.module.css";

const Button = ({ children, className, onClick, type, disabled }) => {
  // Join outer and inner classes
  const classes = [className, css["btn"]].join(" ");

  // Render component
  return (
    <button className={classes} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
