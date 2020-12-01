import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("afif0071997@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
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
    <>
      <Spin spinning={loading}>
        <div className="container p-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h5 className="text-center">Login</h5>
              {LoginForm()}
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default Login;
