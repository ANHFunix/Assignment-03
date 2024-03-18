import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import { Fragment } from "react";
import Container from "../components/UI/Container";
import css from "./Header.module.css";
import { userActions } from "../store/user/reducer";
import { toUpperFirstCase } from "../utils/string";

const Header = () => {
  // Page history
  const history = useHistory();

  // Dispatch function
  const dispatch = useDispatch();

  // Current user
  const user = useSelector((state) => state.user.user);

  // Handler when click logout
  const logoutHandler = (e) => {
    e.preventDefault();

    // Logout
    dispatch(userActions.logout())
      .then(() => history.push("/login"))
      .catch((err) => alert(err));
  };

  // Render component
  return (
    <header className={css["header"]}>
      <Container>
        <nav>
          <ul>
            <li className={`${css["logo"]} d-none d-md-block`}>BOUTIQUE</li>
            {user.role === "admin" && (
              <>
                <li>
                  <NavLink exact to="/" activeClassName={css.active}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" activeClassName={css.active}>
                    Products
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/chat" activeClassName={css.active}>
                Live chat
              </NavLink>
            </li>
            <li className="spacer" />
            <li className="d-none d-sm-block">
              <div activeClassName={css.active}>
                <FaUser /> {toUpperFirstCase(user.role)}
              </div>
            </li>
            <li onClick={logoutHandler}>( Logout )</li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
