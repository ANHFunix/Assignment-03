import { useRef } from "react";
import { useDispatch } from "react-redux";

import Button from "../../UI/Button";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import { userActions } from "../../../store/user/reducer";

const LoginForm = () => {
  // Page history
  const history = useHistory();

  // Dispatch function
  const dispatch = useDispatch();

  // Input reference
  const emailRef = useRef();
  const passRef = useRef();

  // Handler when submit login form
  const loginHandler = (e) => {
    e.preventDefault();

    // Get input data
    const account = {
      email: emailRef.current.value.trim(),
      password: passRef.current.value,
    };

    // Login
    dispatch(userActions.login(account))
      .then(() => history.push("/"))
      .catch((err) => alert(err.message));
  };

  // Render component
  return (
    <form className="login-form" onSubmit={loginHandler}>
      <div className="input-group">
        <label className="input-group-text">Email</label>
        <input type="email" className="form-control" ref={emailRef} placeholder="Enter Your Email" required />
      </div>
      <div className="input-group last">
        <label className="input-group-text">Password</label>
        <input type="password" className="form-control" ref={passRef} placeholder="Enter Your Password" required />
      </div>
      <Button>SIGN IN</Button>
    </form>
  );
};

export default LoginForm;
