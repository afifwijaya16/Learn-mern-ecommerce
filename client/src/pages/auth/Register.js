import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
const Register = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Clik the link to complete registration `
    );
    window.localStorage.setItem("EmailforRegistration", email);
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Enter Email..."
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5 className="text-center">Register</h5>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;