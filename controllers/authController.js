const db = require('../db/queries');
const passport = require('passport');
const bcrypt = require("bcryptjs");

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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const isAdmin = req.body.isAdmin === 'true';
		await db.addUser(
			firstName,
			lastName,
			username,
			hashedPassword,
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

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/log-in',
});

exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
