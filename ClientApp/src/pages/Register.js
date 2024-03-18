import { Link } from "react-router-dom";

import RegisterForm from "../components/pages/register/RegisterForm";
import "./Register.css";

const Register = () => {
  // Render component
  return (
    <div className="register-box">
      <h1 className="box-header">Sign Up</h1>
      <RegisterForm />
      <div className="box-footer">
        <span>Login? </span>
        <Link to="/login">Click</Link>
      </div>
    </div>
  );
};

export default Register;
