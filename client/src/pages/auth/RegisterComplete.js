import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');

	useEffect(() => {
		setEmail(window.localStorage.getItem('EmailforRegistration'));
		// console.log(window.location.href);
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email && !password) {
			toast.error('Email and Password is required');
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 charater');
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			if (result.user.emailVerified) {
				// remove localstorage
				window.localStorage.removeItem('EmailforRegistration');
				// get id user
				let user = auth.currentUser;
				await user.updatePassword(password);
				//token
				const idTokenResult = await user.getIdTokenResult();

				// redux store
				console.log('user', user, 'token id', idTokenResult);
				//redirect
				history.push('/');
			}
		} catch (error) {
			//   console.log(error);
			toast.error(error.message);
		}
	};
	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Email</label>
				<input type="email" className="form-control" value={email} disabled />
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					value={password}
					placeholder="Enter Password..."
					onChange={(e) => setpassword(e.target.value)}
					autoFocus
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
					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
