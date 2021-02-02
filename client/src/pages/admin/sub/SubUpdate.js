import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { getSub, updateSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/form/CategoryForm';

const SubUpdate = ({ match }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [categories, setCategories] = useState([]);
	const [name, setName] = useState('');
	const [parent, setParent] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	let loadSubs = () =>
		getSub(match.params.slug).then((c) => {
			setName(c.data.name);
			setParent(c.data.parent);
		});

	const loadCategories = () =>
		getCategories().then((dataCategories) =>
			setCategories(dataCategories.data)
		);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateSub(match.params.slug, { name, parent }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				setParent('');
				toast.success(`${res.data.name} is updated`);
				history.push('/admin/sub');
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
						<div className="form-group">
							<label>Category</label>
							<select
								name="category"
								className="form-control"
								onChange={(e) => setParent(e.target.value)}
							>
								<option value="" disabled>
									Choise Category
								</option>
								{categories.length > 0 &&
									categories.map((c) => (
										<option
											key={c._id}
											value={c._id}
											selected={c._id === parent}
										>
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
				</div>
			</div>
		</div>
	);
};
export default SubUpdate;
