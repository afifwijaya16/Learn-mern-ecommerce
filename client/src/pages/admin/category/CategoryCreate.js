import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import {
	createCategory,
	getCategories,
	removeCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CategoryForm from '../../../components/form/CategoryForm';
import LocalSearch from '../../../components/form/LocalSearch';

const CategoryCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	// search and filter 1
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () =>
		getCategories().then((dataCategories) =>
			setCategories(dataCategories.data)
		);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`${res.data.name} is created`);
				loadCategories();
			})
			.catch((err) => {
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	const handleRemove = async (slug) => {
		if (window.confirm('Delete')) {
			setLoading(true);
			removeCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.success(`${res.data.name} is deleted`);
					loadCategories();
				})
				.catch((err) => {
					setLoading(false);
					if (err.response.status === 400) toast.error(err.response.data);
				});
		}
	};

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col mt-1">
					{loading ? <h4>Loading...</h4> : <h4>Category</h4>}
					<div className="col-md-12">
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>
					</div>
					<hr />
					<LocalSearch keyword={keyword} setKeyword={setKeyword} />
					<hr />
					{/* Edit for serach {categories.map((cat) => ( */}
					{categories.filter(searched(keyword)).map((cat) => (
						<div className="alert alert-secondary" key={cat._id}>
							{cat.name}{' '}
							<span
								className="btn btn-sm float-right"
								onClick={() => handleRemove(cat.slug)}
							>
								<DeleteOutlined className="text-danger" />
							</span>{' '}
							<Link to={`/admin/category/${cat.slug}`}>
								<span className="btn btn-sm float-right">
									<EditOutlined className="text-warning" />
								</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default CategoryCreate;
