import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button, Spin } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	let dispatch = useDispatch();

	const history = useHistory();

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user, history]);

	const roleBasedRedirect = (res) => {
		if (res.data.role === 'admin') {
			history.push('/admin/dashboard');
		} else {
			history.push('/user/history');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			createOrUpdateUser(idTokenResult.token)
				.then((res) => {
					dispatch({
						type: 'LOGGED_IN_USER',
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					roleBasedRedirect(res);
				})
				.catch((err) => console.log(err));
			// history.push('/');
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
			setEmail('');
			setPassword('');
		}
	};
	const googleLogin = () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createOrUpdateUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
						roleBasedRedirect(res);
					})
					.catch();
				// history.push('/');
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
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
			<Spin spinning={loading} size="large" tip="Loading...">
				<div className="container p-5">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<h5 className="text-center">Login</h5>
							{LoginForm()}
							<Button
								type="danger"
								shape="round"
								block
								onClick={googleLogin}
								icon={<GoogleOutlined />}
								size="large"
							>
								Login With Google
							</Button>
							<Link
								to="forgot/password"
								className="my-2 float-right text-danger"
							>
								Forgot Password
							</Link>
						</div>
					</div>
				</div>
			</Spin>
		</>
	);
};

export default Login;
