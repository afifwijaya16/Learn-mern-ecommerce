import React, { useState } from 'react';
import { Menu } from 'antd';
import {
	AppstoreOutlined,
	UserOutlined,
	UserAddOutlined,
	LoginOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState('home');
	let dispatch = useDispatch();
	let history = useHistory();
	let { user } = useSelector((state) => ({ ...state }));
	const handleClick = (e) => {
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: 'LOG_OUT',
			payload: null,
		});
		history.push('/login');
	};
	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>

			{!user && (
				<Item key="register" className="float-right" icon={<UserAddOutlined />}>
					<Link to="/register">Register</Link>
				</Item>
			)}
			{!user && (
				<Item key="login" className="float-right" icon={<LoginOutlined />}>
					<Link to="/login">Login</Link>
				</Item>
			)}
			{user && (
				<SubMenu
					key="SubMenu"
					icon={<UserOutlined />}
					className="float-right"
					title={user.email && user.email.split('@')[0]}
				>
					<Item key="setting:1">Option 1</Item>
					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
