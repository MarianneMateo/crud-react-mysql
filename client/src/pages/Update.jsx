import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
	const [employees, setEmployees] = useState({
		firstName: '',
		lastName: '',
		age: null,
		jobPosition: '',
		photo: '',
	});

	const [error, setError] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	const employeeId = location.pathname.split('/')[2];

  const handleChange = (e) => {
		setEmployees((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			await axios.put(`http://localhost:8800/employees/${employeeId}`, employees);
			navigate('/');
		} catch (err) {
			console.log(err);
			setError(true);
		}
	};
	return (
		<div className="form">
			<h1>Update New Employee</h1>
			<input
				type="text"
				placeholder="First Name"
				onChange={handleChange}
				name="firstName"
			/>
			<input
				type="text"
				placeholder="Last Name"
				onChange={handleChange}
				name="lastName"
			/>
			<input
				type="number"
				placeholder="Age"
				onChange={handleChange}
				name="age"
			/>
			<input
				type="text"
				placeholder="Job Position"
				onChange={handleChange}
				name="jobPosition"
			/>
			<input
				type="text"
				placeholder="Photo"
				onChange={handleChange}
				name="photo"
			/>
			<button onClick={handleClick} className="update">
				Update
			</button>
			{error && 'Something went wrong!'}
			<Link to="/" className="list">
				See all employees
			</Link>
		</div>
	);
};

export default Update;
