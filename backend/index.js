import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'employees_db',
});

app.get('/', (req, res) => {
	res.json('Hello');
});

app.get('/employees', (req, res) => {
	const q = 'SELECT * FROM employee';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post('/employees', (req, res) => {
	const q =
		'INSERT INTO employee (`firstName`, `lastName`, `age`, `jobPosition`, `photo`) VALUES (?)';

	const values = [
		req.body.firstName,
		req.body.lastName,
		req.body.age,
		req.body.jobPosition,
		req.body.photo,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json('Employee has been added successfully!');
	});
});

app.delete('/employees/:id', (req, res) => {
	const employeeId = req.params.id;
	const q = ' DELETE FROM employee WHERE id = ? ';

	db.query(q, [employeeId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

app.put('/employees/:id', (req, res) => {
	const employeeId = req.params.id;

	const q =
		'UPDATE employee SET `firstName`=?, `lastName`=?, `age`=?, `jobPosition`=?, `photo`=? WHERE id = ?';

	const values = [
		req.body.firstName,
		req.body.lastName,
		req.body.age,
		req.body.jobPosition,
		req.body.photo,
	];

	db.query(q, [...values, employeeId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

app.listen(8800, () => {
	console.log('Connected to backend!');
});
