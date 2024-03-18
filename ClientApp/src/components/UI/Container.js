import css from "./Container.module.css";

const Container = ({ className, children }) => {
  // Join inner and outer classes
  const classList = [className, css["container"]].join(" ");

  // Render component
  return <div className={classList}>{children}</div>;
};

export default Container;
