import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import LoginForm from "../components/pages/login/LoginForm";
import "./Login.css";

const Login = () => {
  // Page history
  const history = useHistory();

  // If user has been logged in, go to home page
  const user = useSelector((state) => state.user.user);
  if (user) history.push("/");

  // Render component
  return (
    <div className="login-box">
      <h1 className="box-header">Sign In</h1>
      <LoginForm />
      <div className="box-footer">
        <span>Create an account? </span>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
