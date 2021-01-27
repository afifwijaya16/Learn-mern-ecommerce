import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};
	return (
		<div className="container py-2">
			<input
				type="search"
				placeholder="Search..."
				value={keyword}
				onChange={handleSearchChange}
				className="form-control p"
			/>
		</div>
	);
};

export default LocalSearch;
