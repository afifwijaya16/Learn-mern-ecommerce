import axios from 'axios';

// list category
export const getCategories = async () =>
	await axios.get(`${process.env.REACT_APP_API}/category`);

// read category
export const getCategory = async (slug) =>
	await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// delete category
export const removeCategory = async (slug, authtoken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
		header: {
			authtoken,
		},
	});
};

// update category
export const updateCategory = async (slug, category, authtoken) => {
	return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
		header: {
			authtoken,
		},
	});
};

// create category
export const createCategory = async (category, authtoken) => {
	return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
		header: {
			authtoken,
		},
	});
};
