import express from 'express';
import { services } from './api.js';

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

app.get('/', (req, res) => {
	res.send({ message: 'Hello world' });
});

const db = '';

app.get('/services', (req, res, next) => {
	services.get('db.json', function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'OK',
			messagae: 'Success 202 Ok',
			data: data,
		});
	});
});

app.get('/filter', (req, res, next) => {
	let searchObject = {
		id: req.query.id,
		name: req.query.name,
	};

	services.filterServicesByQuery(db, searchObject, function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'OK',
			message: 'Record filter success.',
			data: data,
		});
	});
});

app.get('/:id', (req, res, next) => {
	services.getByID(db, req.params.id, function (data) {
		if (!data) {
			res.status(404).send({
				status: 404,
				statusText: 'Not Found',
				message: "Invalid ID'" + req.params.id,
				error: {
					code: 'NOT_FOUND',
					message: "ID '" + req.params.id + "' could not be found.",
				},
			});
		}
		res.status(200).json({
			status: 200,
			statusText: 'OK',
			messagae: 'Success 202 Ok',
			data: data,
		});
	});
});

app.post('/create', (req, res, next) => {
	services.get(db, function (data) {
		let _record = data.filter((d) => d.id);
		req.body.id = _record.length + 1;

		let exist = data.find((rec) => rec.name === req.body.name);

		if (exist) {
			res.status(400).send({
				status: 400,
				statusText: 'Conflict',
				message: "Data has a same input '" + req.body.name,
				error: {
					code: 'Bad Request',
					message: "Duplicate Record '" + req.body.name,
				},
			});
		}

		services.createServices(
			db,
			req.body,
			function (data) {
				res.status(201).json({
					status: 201,
					statusText: 'Created',
					messagae: 'New file added',
					data: data,
				});
			},
			function (err) {
				next(err);
			}
		);
	});
});

app.put('/update/:id', (req, res, next) => {
	services.getByID(db, req.params.id, function (data) {
		if (!data) {
			res.status(404).send({
				status: 404,
				statusText: 'Not Found',
				message: "Invalid ID'" + req.params.id,
				error: {
					code: 'NOT_FOUND',
					message: "ID '" + req.params.id + "' could not be found.",
				},
			});
		}

		let exist = data.name === req.body.name;

		if (exist) {
			res.status(400).send({
				status: 400,
				statusText: 'Conflict',
				message: "Data has a same input '" + req.body.name,
				error: {
					code: 'Bad Request',
					message: "Duplicate Record '" + req.body.name,
				},
			});
		}

		services.updateServices(db, req.body, req.params.id, function (data) {
			res.status(201).json({
				status: 201,
				statusText: 'Accepted',
				messagae: 'Updated Request',
				data: data,
			});
		});
	});
});

app.patch('/update/:id', (req, res, next) => {
	services.getByID(db, req.params.id, function (data) {
		if (!data) {
			res.status(404).send({
				status: 404,
				statusText: 'Not Found',
				message: "Invalid ID'" + req.params.id,
				error: {
					code: 'NOT_FOUND',
					message: "ID '" + req.params.id + "' could not be found.",
				},
			});
		}

		let exist = data.name === req.body.name;

		if (exist) {
			res.status(400).send({
				status: 400,
				statusText: 'Conflict',
				message: "Data has a same input '" + req.body.name,
				error: {
					code: 'Bad Request',
					message: "Duplicate Record '" + req.body.name,
				},
			});
		}

		services.updateServices(db, req.body, req.params.id, function (data) {
			res.status(201).json({
				status: 201,
				statusText: 'Accepted',
				messagae: 'Updated Request',
				data: data,
			});
		});
	});
});

app.delete('/deleted/:id', (req, res, next) => {
	services.getByID(db, req.params.id, function (data) {
		if (!data) {
			res.status(404).send({
				status: 404,
				statusText: 'Not Found',
				message: "Invalid ID'" + req.params.id,
				error: {
					code: 'NOT_FOUND',
					message: "ID '" + req.params.id + "' could not be found.",
				},
			});
		}

		services.deleteEachServices(db, req.params.id, function (data) {
			res.status(200).json({
				status: 200,
				statusText: 'Accepted',
				messagae: 'Deleted Request' + req.params.id,
				data: data,
			});
		});
	});
});

app.delete('/deletedAll', (req, res, next) => {
	services.deleteAllServices(db, function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'Accepted',
			messagae: 'Deleted All Request',
			data: 'All record deleted successfully',
		});
	});
});
