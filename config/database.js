// create and maintain database connection
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// const DB_CONNECTION_URL = 'mongodb://127.0.0.1:27017/bkny'

exports.connect = () => {

	mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log('Successfully connected to db ');
		})
		.catch(error => {
			console.log("Database connection failed. Exiting now");
			console.error(error);
			process.exit(1);
		})
}