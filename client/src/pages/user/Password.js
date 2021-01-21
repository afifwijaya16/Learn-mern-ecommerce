import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';

// auth firebase
import { auth } from '../../firebase';
// toast
import { toast } from 'react-toastify';
const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// console.log(password);
		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				setLoading(false);
				setPassword('');
				toast.success('Password Updated');
			})
			.catch((err) => {
				setLoading(false);
				setPassword('');
				toast.error(err.message);
			});
	};
	const passwordUpdatedForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Your Password</label>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					className="form-control"
					placeholder="Enter new password"
					disabled={loading}
					value={password}
				/>
			</div>
			<button
				className="btn btn-primary"
				disabled={!password || password.length < 6 || loading}
			>
				Submit
			</button>
		</form>
	);
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col-md-6">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Password Update</h4>
					)}

					{passwordUpdatedForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
