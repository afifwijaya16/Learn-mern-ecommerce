import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));

	return user && user.token ? (
		<Route {...rest} render={() => children} />
	) : (
		<div
			className="container-fluid d-flex justify-content-center align-items-center"
			style={{ height: '600px' }}
		>
			<LoadingToRedirect />
		</div>
	);
};

export default UserRoute;
