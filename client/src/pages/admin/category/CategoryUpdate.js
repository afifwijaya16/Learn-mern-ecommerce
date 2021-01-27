import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../functions/category';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/form/CategoryForm';

const CategoryUpdate = ({ match }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	useEffect(() => {
		loadCategory();
	}, []);

	let loadCategory = () =>
		getCategory(match.params.slug).then((c) => setName(c.data.name));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`${res.data.name} is updated`);
				history.push('/admin/category');
			})
			.catch((err) => {
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col mt-1">
					{loading ? <h4>Loading...</h4> : <h4>Update Category</h4>}
					<div className="col-md-12">
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CategoryUpdate;
