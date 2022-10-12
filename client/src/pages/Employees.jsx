import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employees = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		const fetchAllEmployees = async () => {
			try {
				const res = await axios.get('http://localhost:8800/employees');
				console.log(res.data);
				setEmployees(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchAllEmployees();
	}, []);

	console.log(employees);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8800/employees/${id}`);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<h1>Employees List</h1>
			<button className="addHome">
				<Link to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>
					Add new employee
				</Link>
			</button>
			<div className="employees">
				{employees.map((employee) => (
					<div className="employee" key={employee.id}>
						<img src={employee.photo} alt="img" />
						<h2>
							{employee.firstName} {employee.lastName}
						</h2>
						<span className="title">Job Position</span>
						<span>{employee.jobPosition}</span>
						<span className="title">Age</span>
						<span>{employee.age}</span>
						<div className="bottoms">
							<button className="update">
								<Link
									to={`/update/${employee.id}`}
									style={{ color: 'inherit', textDecoration: 'none' }}
								>
									Update
								</Link>
							</button>
							<button
								className="delete"
								onClick={() => handleDelete(employee.id)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Employees;
