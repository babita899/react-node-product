import React from 'react';

const Button = (props) => {
	const { name,value } = props;
	return (
		<div className="d-flex justify-content-between align-items-end">
			<input type="submit" name={name} className="btn btn-info btn-md" value={value} />
		</div>
	);
}



export default Button;