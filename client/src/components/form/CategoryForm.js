import React from 'react';

const categoryForm = ({ handleSubmit, name, setName }) => (
	<form onSubmit={handleSubmit}>
		<div className="form-group">
			<label>Name</label>
			<input
				type="text"
				className="form-control"
				onChange={(e) => setName(e.target.value)}
				value={name}
				autoFocus
				required
			/>
		</div>
		<button className="btn btn-primary">Save</button>
	</form>
);

export default categoryForm;
