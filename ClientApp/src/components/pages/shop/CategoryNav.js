import { NavLink } from "react-router-dom";

import "./CategoryNav.css";

const CategoryNav = ({ pathname }) => {
  // Render component
  return (
    <div className="category-nav">
      <h5>CATEGORIES</h5>
      <ul className="category-items">
        <h6>APPLE</h6>
        <li>
          <NavLink exact to={pathname}>
            All
          </NavLink>
        </li>
        <h6>IPHONE & MAC</h6>
        <li>
          <NavLink to={`${pathname}/iphone`}>iPhone</NavLink>
        </li>
        <li>
          <NavLink to={`${pathname}/ipad`}>iPad</NavLink>
        </li>
        <li>
          <NavLink to={`${pathname}/macbook`}>MacBook</NavLink>
        </li>
        <h6>WIRELESS</h6>
        <li>
          <NavLink to={`${pathname}/airpod`}>Airpod</NavLink>
        </li>
        <li>
          <NavLink to={`${pathname}/watch`}>Watch</NavLink>
        </li>
        <h6>OTHER</h6>
        <li>
          <NavLink to={`${pathname}/mouse`}>Mouse</NavLink>
        </li>
        <li>
          <NavLink to={`${pathname}/keyboard`}>Keyboard</NavLink>
        </li>
        <li>
          <NavLink to={`${pathname}/other`}>Other</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default CategoryNav;
