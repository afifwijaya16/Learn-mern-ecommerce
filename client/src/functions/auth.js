import axios from 'axios';

// create or update user
export const createOrUpdateUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/create-or-update-user`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
// auth user
export const currentUser = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-user`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
// auth admin
export const currentAdmin = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-admin`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
