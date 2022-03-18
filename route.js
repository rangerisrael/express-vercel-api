let fs = require('fs');

const express = require('express');

const {
	get,
	getByID,
	filterServicesByQuery,
	createServices,
	updateServices,
	deleteEachServices,
	deleteAllServices,
} = require('./api');
const router = express.Router();

router.get('/', (req, res) => {
	res.send({ message: 'Hello world' });
});

const db = './api/db.json';

router.get('/services', (req, res, next) => {
	get(db, function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'OK',
			messagae: 'Success 202 Ok',
			data: data,
		});
	});
});

router.get('/filter', (req, res, next) => {
	let searchObject = {
		id: req.query.id,
		name: req.query.name,
	};

	filterServicesByQuery(db, searchObject, function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'OK',
			message: 'Record filter success.',
			data: data,
		});
	});
});

router.get('/:id', (req, res, next) => {
	getByID(db, req.params.id, function (data) {
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

router.post('/create', (req, res, next) => {
	get(db, function (data) {
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

		createServices(
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

router.put('/update/:id', (req, res, next) => {
	getByID(db, req.params.id, function (data) {
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

		updateServices(db, req.body, req.params.id, function (data) {
			res.status(201).json({
				status: 201,
				statusText: 'Accepted',
				messagae: 'Updated Request',
				data: data,
			});
		});
	});
});

router.patch('/update/:id', (req, res, next) => {
	getByID(db, req.params.id, function (data) {
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

		updateServices(db, req.body, req.params.id, function (data) {
			res.status(201).json({
				status: 201,
				statusText: 'Accepted',
				messagae: 'Updated Request',
				data: data,
			});
		});
	});
});

router.delete('/deleted/:id', (req, res, next) => {
	getByID(db, req.params.id, function (data) {
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

		deleteEachServices(db, req.params.id, function (data) {
			res.status(200).json({
				status: 200,
				statusText: 'Accepted',
				messagae: 'Deleted Request' + req.params.id,
				data: data,
			});
		});
	});
});

router.delete('/deletedAll', (req, res, next) => {
	deleteAllServices(db, function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'Accepted',
			messagae: 'Deleted All Request',
			data: 'All record deleted successfully',
		});
	});
});

module.exports = router;
