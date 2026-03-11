const express = require('express');
require('dotenv').config();

const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// routers
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter')

// Authentication setup
const session = require("express-session");
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }))
const passport = require('./config/passport')
app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter)

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('ERROR');
});

app.listen(process.env.PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(
		`My first Express app - listening on port ${PORT}!`,
	);
});
