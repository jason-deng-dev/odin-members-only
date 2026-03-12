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
const messageRouter = require('./routes/messageRouter')

// Authentication setup
const session = require("express-session");
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }))
const passport = require('./config/passport')
app.use(passport.session());


// will have access to the currentUser variable in all of your views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/message', messageRouter)

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('ERROR');
});

const port = 3000;
app.listen(port, (error) => {
	if (error) {
		throw error;
	}
	console.log(
		`listening on port ${port}!`,
	);
});
