import React from 'react';

const TextField = (props) => {
	const {id,type,name,placeholder,onChange,label ,value} = props;
	return (
		<div className="form-group">
			<label htmlFor={id} className="text-info">{label || placeholder}</label><br />
			<input
				id={id}
				className="form-control"
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				required />
		</div>
	);
}



export default TextField;