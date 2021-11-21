// create and maintain database connection
const mongoose = require('mongoose');

exports.connect = () => {

	mongoose.connect('mongodb://127.0.0.1:27017/bkny')
		.then(() => {
			console.log('Successfully connected to db');
		})
		.catch(error => {
			console.log("Database connection failed. Exiting now");
			console.error(error);
			process.exit(1);
		})
}