import LoginForm from "../components/pages/login/LoginForm";
import "./Login.css";

const Login = () => {
  // Render component
  return (
    <div className="login-box">
      <h1 className="box-header">Sign In</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
