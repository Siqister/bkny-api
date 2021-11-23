const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require('./config/database');
const flowell = require('./config/flowell');

// routers and middleware
const auth = require('./middleware/auth');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const activateRoute = require('./routes/activate');
const patternRoute = require('./routes/patterns');

// connect to MongoDB
db.connect();

// start Flowell keepalive
const timer = flowell.keepAlive();

// app logic
app.get('/', (req, res) => {
	res.send('hello to BKNY Flex Curb API');
});

// register and login
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// patterns and activation
app.use('/patterns', auth, patternRoute)
app.use('/activate', auth, activateRoute);

module.exports = app;