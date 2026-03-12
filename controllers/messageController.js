const db = require('../db/queries');

exports.newMessageGet = async (req, res, next) => {
	try {
		res.render('message-form');
	} catch (err) {
		next(err);
	}
};

exports.newMessagePost = async (req, res, next) => {
	try {
		res.render('message-form');
	} catch (err) {
		next(err);
	}
};
