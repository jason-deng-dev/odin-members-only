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
        const username = req.body.username;
        const password = req.body.password;
		db.addUser(username, password)
		res.redirect('/');

	} catch (err) {
		next(err);
	}
};
