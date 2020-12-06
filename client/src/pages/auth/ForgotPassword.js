import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setloading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));
	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setloading(true);
		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
				setloading(false);
				toast.success('Check Your Email for Reset Password');
			})
			.catch((err) => {
				setloading(false);
				console.log(err);
				toast.error(err.message);
			});
	};
	return (
		<>
			<Spin spinning={loading} size="large" tip="Loading...">
				<div className="container col-md-6 offset-md-3 p-5">
					<h5 className="text-center">Forgot Password</h5>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								value={email}
								placeholder="Your Email..."
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-raised" disabled={!email}>
							Send To Email
						</button>
					</form>
				</div>
			</Spin>
		</>
	);
};

export default ForgotPassword;
