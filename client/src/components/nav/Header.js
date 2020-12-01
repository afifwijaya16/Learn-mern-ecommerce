import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="register" className="float-right" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
      <Item key="login" className="float-right" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
      <SubMenu key="SubMenu" icon={<UserOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;