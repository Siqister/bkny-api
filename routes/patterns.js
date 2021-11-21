const express = require('express');
const router = express.Router();
const PatternModel = require('../model/pattern');

router.get('/', async (req, res) => {

	console.log(`GET /patterns`)

	try{
		const patterns = await PatternModel.find();
		res.status(200).json(patterns);
		
	}catch(err){
		console.log(err)
	}

});

module.exports = router;