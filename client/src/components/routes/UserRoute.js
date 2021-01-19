import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));

	return user && user.token ? (
		<Route {...rest} render={() => children} />
	) : (
		<div
			className="container-fluid d-flex justify-content-center align-items-center"
			style={{ height: '600px' }}
		>
			<h1>
				<Spin size="large" tip="Loading..." />
			</h1>
		</div>
	);
};

export default UserRoute;
