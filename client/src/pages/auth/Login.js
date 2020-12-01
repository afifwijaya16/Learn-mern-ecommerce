import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Enter Email..."
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="Enter Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        type="primary"
        shape="round"
        block
        onClick={handleSubmit}
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h5 className="text-center">Login</h5>
          {LoginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
