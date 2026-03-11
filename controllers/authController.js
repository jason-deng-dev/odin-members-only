const db = require('../db/queries');

exports.signUpGet = async (req, res, next) => {
	try {
		res.render('auth/sign-up-form');
	} catch (err) {
		next(err);
	}
};

exports.signUpPost = async (req, res, next) => {
	try {
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const username = req.body.username;
		const password = req.body.password;
		const isAdmin = req.body.isAdmin === 'true';
		db.addUser(
			firstName,
			lastName,
			username,
			password,
			isAdmin,
		);
		res.redirect('/');
	} catch (err) {
		next(err);
	}
};

exports.loginGet = async (req, res, next) => {
	try {
		res.render('auth/log-in-form');
	} catch (err) {
		next(err);
	}
};

exports.loginPost = async (req, res, next) => {
	try {
		res.render('auth/log-in-form');
	} catch (err) {
		next(err);
	}
};