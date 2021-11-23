const cors = require('cors');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8000; //will be added by heroku later

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} `);
});