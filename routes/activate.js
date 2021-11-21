const express = require('express');
const router = express.Router();

const { apiRoot: flowellApi, agent, headers } = require('../config/flowell');
const fetch = require('node-fetch');
const { delay } = require('../config/utils');

router.get('/:id?', async (req, res) => {

	console.log(`GET /activate/${req.params.id}`);

	// get pattern id, delay and duration query params and validate
	const ID = req.params.id;
	const DURATION = req.query.duration || 60;
	const DELAY = req.query.delay || 0;

	if(!ID){
		res.status(400).send('Require a pattern ID');
	}

	// call Flowell API with delay timer
	const url = `${flowellApi}?type=scenario&command=set&number=${ID}&p1=${DURATION}`;
	await delay(DELAY); // delay by DELAY seconds
	const result = await fetch(url, { agent, headers });
	//TODO: have to check if pattern already on before activating new pattern
	//TODO: result is not parseable JSON
	if(result.status == 200){
		res.status(200).json({
			duration: DURATION,
			message: `Pattern ${ID} started successfully for ${DURATION} seconds after ${DELAY} seconds delay`
		})
	}else{
		res.status(500).send('Error occurred with Flowell API');
	}

});

module.exports = router;