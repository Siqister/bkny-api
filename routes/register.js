const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = require('../config/token');
const UserModel = require('../model/user');

router.post('/', async (req, res) => {

	try {

		// get and validate user input
		const { email, password } = req.body;
		if(!(email && password)){
			res.status(400).send("All inputs are required");
		}

		// check if user already exits in db
		const oldUser = await UserModel.findOne({ email });
		if(oldUser){
			return res.status(409).send("User already exists. Please login");
		}

		// encrypt user password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// create user in our database
		const user = await UserModel.create({
			email: email.toLowerCase(),
			password: encryptedPassword
		});

		// create JWT token
		const token = jwt.sign(
				{ user_id: user._id, email },
				TOKEN_KEY,
				{
					expiresIn: "24h"
				}
			);

		const t = new Date()
		user.token = token;
		user.tokenExpiry = new Date(t.valueOf() + 24*3600*1000);

		res.status(201).json(user);

	} catch(err){
		console.log(err);
	}

});

module.exports = router;
