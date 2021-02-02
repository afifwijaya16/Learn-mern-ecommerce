import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CategoryForm from '../../../components/form/CategoryForm';
import LocalSearch from '../../../components/form/LocalSearch';

const SubCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState('');
	const [subs, setSubs] = useState([]);

	// search and filter 1
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const loadCategories = () =>
		getCategories().then((dataCategories) =>
			setCategories(dataCategories.data)
		);

	const loadSubs = () => getSubs().then((dataSubs) => setSubs(dataSubs.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				setCategory('');
				toast.success(`${res.data.name} is created`);
				loadSubs();
			})
			.catch((err) => {
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	const handleRemove = async (slug) => {
		if (window.confirm('Delete')) {
			setLoading(true);
			removeSub(slug, user.token)
				.then((res) => {
					setLoading(false);
					setCategory('');
					toast.success(`${res.data.name} is deleted`);
					loadSubs();
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
					{loading ? <h4>Loading...</h4> : <h4>Sub Category</h4>}
					<div className="col-md-12">
						<div className="form-group">
							<label>Category</label>
							<select
								name="category"
								className="form-control"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="">Choise Category</option>
								{categories.length > 0 &&
									categories.map((c) => (
										<option key={c._id} value={c._id}>
											{c.name}
										</option>
									))}
							</select>
						</div>
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>
					</div>
					<hr />
					<LocalSearch keyword={keyword} setKeyword={setKeyword} />
					<hr />

					{subs.filter(searched(keyword)).map((cat) => (
						<div className="alert alert-secondary" key={cat._id}>
							{cat.name}
							<span
								className="btn btn-sm float-right"
								onClick={() => handleRemove(cat.slug)}
							>
								<DeleteOutlined className="text-danger" />
							</span>
							<Link to={`/admin/sub/${cat.slug}`}>
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
export default SubCreate;
