const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = require('../config/token');
const UserModel = require('../model/user');

router.post('/', async (req, res) => {

	console.log('POST /login');

	try {
		// get and validate user input
		const { email, password } = req.body;
		if(!(email && password)){
			res.status(400).send("All input is required");
		}

		// find user in db and validate password credentials
		const user = await UserModel.findOne({ email });

		if(user && (await bcrypt.compare(password, user.password))){
			// validation success, create new JWT
			const token = jwt.sign(
					{ user_id: user._id, email },
					TOKEN_KEY,
					{
						expiresIn: '24h'
					}
				);

			const t = new Date();
			user.token = token;
			user.tokenExpiry = new Date(t.valueOf() + 24*3600*1000);

			res.status(200).json(user);
		}else{
			res.status(400).send("Invalid credentials");
		}

	}catch(err){
		console.log(err);
	}

});

module.exports = router;