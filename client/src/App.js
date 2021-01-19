import React, { useEffect } from 'react';
// router
import { Switch, Route } from 'react-router-dom';
// toast message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/Home';
import Header from './components/nav/Header';
import History from './pages/user/History';

// protected route
import UserRoute from './components/routes/UserRoute';
// firebase
import { auth } from './firebase';
// redux
import { useDispatch } from 'react-redux';
// function
import { currentUser } from './functions/auth';
const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubcriber = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				currentUser(idTokenResult.token)
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
					})
					.catch((err) => console.log(err));
			}
		});
		// cleanup
		return () => unsubcriber();
	}, []);
	return (
		<>
			<Header />
			<ToastContainer />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/register/complete" component={RegisterComplete} />
				<Route exact path="/forgot/password" component={ForgotPassword} />
				<UserRoute exact path="/user/history" component={History} />
			</Switch>
		</>
	);
};

export default App;
