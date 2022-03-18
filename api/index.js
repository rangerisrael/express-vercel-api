const express = require('express');
const router = express.Router();
const {
	get,
	getByID,
	create,
	update,
	deleteAll,
	deleteEach,
	filterByQuery,
} = require('api-localdb-latest');

const db = './db.json';

// router.get('/', async (req, res) => {
// 	try {
// 		res.json({
// 			status: 200,
// 			message: 'Get data has successfully',
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(500).send('Server error');
// 	}
// });

router.get('/', (req, res, next) => {
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

	filterByQuery(db, searchObject, function (data) {
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

		create(
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

		update(db, req.body, req.params.id, function (data) {
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

		update(db, req.body, req.params.id, function (data) {
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

		deleteEach(db, req.params.id, function (data) {
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
	deleteAll(db, function (data) {
		res.status(200).json({
			status: 200,
			statusText: 'Accepted',
			messagae: 'Deleted All Request',
			data: 'All record deleted successfully',
		});
	});
});

module.exports = router;
