import React from 'react';
import LoadingToRedirect from '../components/routes/LoadingToRedirect';
const NotFoundPage = () => {
	return (
		<div
			className="container-fluid d-flex justify-content-center align-items-center"
			style={{ height: '600px' }}
		>
			<LoadingToRedirect />
		</div>
	);
};

export default NotFoundPage;
