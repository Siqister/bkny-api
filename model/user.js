const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	password: {type: String},
	token: {type: String}
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;