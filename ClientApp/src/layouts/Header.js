import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import { Fragment } from "react";
import Container from "../components/UI/Container";
import css from "./Header.module.css";
import { userActions } from "../store/user/reducer";

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
            <li>
              <NavLink exact to="/" activeClassName={css.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" activeClassName={css.active}>
                Shop
              </NavLink>
            </li>
            <li className="spacer" />
            <li>
              <NavLink to="/cart" activeClassName={css.active}>
                <FaShoppingCart /> Cart
              </NavLink>
            </li>
            {user ? (
              <Fragment>
                <li className="d-none d-sm-block">
                  <NavLink to="/history" activeClassName={css.active}>
                    <FaUser /> {user.full_name}
                  </NavLink>
                </li>
                <li onClick={logoutHandler}>( Logout )</li>
              </Fragment>
            ) : (
              <li>
                <NavLink to="/login" activeClassName={css.active}>
                  <FaUser /> Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
