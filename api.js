import fs from 'fs';
import path from 'path';

export const services = {
	get: function (resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));
			resolve(JSON.parse(rawdata));
		} catch (err) {
			console.log(err);
		}
	},
	getByID: function (id, resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));

			let getId = JSON.parse(rawdata).find((p) => +p.id === +id);
			console.log(getId);
			resolve(getId);
		} catch (err) {
			console.log(err);
		}
	},
	createServices: function (newData, resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));

			let result = JSON.parse(rawdata);
			result.push(newData);

			fs.writeFileSync(path.resolve('db.json'), JSON.stringify(result));
			resolve(newData);
		} catch (err) {
			console.log(err);
		}
	},

	updateServices: function (updateData, id, resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));

			let result = JSON.parse(rawdata);

			let resbyId = result.find((rec) => +rec.id === +id);

			if (resbyId) {
				Object.assign(resbyId, updateData);
				fs.writeFileSync(path.resolve('db.json'), JSON.stringify(result));
				resolve(updateData);
			}
		} catch (err) {
			console.log(err);
		}
	},
	deleteEachServices: function (id, resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));

			let result = JSON.parse(rawdata);

			let resId = result.findIndex((rec) => +rec.id === +id);

			if (resId !== -1) {
				result.splice(resId, 1);
				fs.writeFileSync(path.resolve('db.json'), JSON.stringify(result));
				resolve(resId);
			}
		} catch (err) {
			console.log(err);
		}
	},
	deleteAllServices: function (resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));

			let result = JSON.parse(rawdata);

			let resId = result.filter((rec) => rec);

			if (resId !== -1) {
				result.splice(resId);
				fs.writeFileSync(path.resolve('db.json'), JSON.stringify(result));
				resolve(resId);
			}
		} catch (err) {
			console.log(err);
		}
	},
	filterServicesByQuery: function (searchQuery, resolve, reject) {
		try {
			let rawdata = fs.readFileSync(path.resolve('db.json'));

			let res = JSON.parse(rawdata);
			// Perform search
			if (searchQuery) {
				res = res.filter(
					(p) =>
						(searchQuery.id ? +p.id === +searchQuery.id : true) &&
						(searchQuery.name
							? p.name.toLowerCase().indexOf(searchQuery.name) >= 0
							: true)
				);
			}

			resolve(res);
		} catch (err) {
			console.log(err);
		}
	},
};
