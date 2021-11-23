// module deals with interaction with flowell
const fetch = require('node-fetch');
const https = require('https');
const base64 = require('base-64');
const dotenv = require('dotenv');
dotenv.config();

const apiRoot = process.env.FLOWELL_API;
const username = process.env.FLOWELL_API_USERNAME;
const password = process.env.FLOWELL_API_PASSWORD;

// need these FETCH options to work with Flowell API
const agent = new https.Agent({
	rejectUnauthorized: false
});
const headers = new fetch.Headers();
headers.append('Authorization', 'Basic ' + base64.encode(username+':'+password));

// need to call this once at least every 10 min to keep WAGO controller alive
const callHeartBeat = () => {
	const url = `${apiRoot}?type=security&command=heartbeat&number=200`;

	//TODO need to deal with fetch timeout: https://stackoverflow.com/questions/46946380/fetch-api-request-timeout/57888548#57888548
	fetch(url, { agent, headers }).then(res => {
		if(res.status==200){
			console.log(`Controller is ok at ${new Date()}`); 
		}else{
			console.log('Controller is not ok');
		}
	}).catch(err => console.log('keep alive fetch error'));
}
const keepAlive = () => setInterval(callHeartBeat, 300*1000); //every minute

module.exports = {
	apiRoot,
	keepAlive,
	agent,
	headers
}