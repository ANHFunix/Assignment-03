import { useRef } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api/api";

import Button from "../../UI/Button";
import "./RegisterForm.css";

const RegisterForm = () => {
  // Pages history
  const history = useHistory();

  // Input reference
  const nameRef = useRef();
  const emailRef = useRef();
  const pass1Ref = useRef();
  const pass2Ref = useRef();
  const phoneRef = useRef();

  // Handler when submit register form
  const registerHandler = (e) => {
    e.preventDefault();

    const pass1 = pass1Ref.current.value;
    const pass2 = pass2Ref.current.value;

    if (pass1 !== pass2) {
      alert("Password does not match");
      return;
    }

    // Get input data
    const user = {
      full_name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: pass1,
      phone_number: phoneRef.current.value.trim(),
    };

    // Create user
    api.user
      .create(user)
      // Execute
      .then((res) => {
        alert(res.data.message);
        history.push("/login");
      })
      // Catch error
      .catch((err) => alert(err.response.data.error));
  };

  // Render component
  return (
    <form className="register-form" onSubmit={registerHandler}>
      <div className="input-group">
        <label className="input-group-text">Full Name</label>
        <input type="text" className="form-control" ref={nameRef} placeholder="Enter Your Full Name" required />
      </div>
      <div className="input-group">
        <label className="input-group-text">Email</label>
        <input type="email" className="form-control" ref={emailRef} placeholder="Enter Your Email" required />
      </div>
      <div className="input-group">
        <label className="input-group-text">Password</label>
        <input type="password" className="form-control" ref={pass1Ref} placeholder="Enter Your Password" required />
      </div>
      <div className="input-group">
        <label className="input-group-text">Retype</label>
        <input type="password" className="form-control" ref={pass2Ref} placeholder="Retype Your Password" required />
      </div>
      <div className="input-group last">
        <label className="input-group-text">Phone</label>
        <input type="tel" className="form-control" ref={phoneRef} placeholder="Enter Your Phone Number" required />
      </div>
      <Button>SIGN UP</Button>
    </form>
  );
};

export default RegisterForm;
