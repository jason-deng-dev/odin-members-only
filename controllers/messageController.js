const db = require('../db/queries');

exports.newMessageGet = async (req, res, next) => {
	try {
		res.render('message-form');
	} catch (err) {
		next(err);
	}
};

const {
	body,
	validationResult,
} = require('express-validator');

const emptyErr = 'is required.';

const validateMessage = [
	body('msgTitle')
		.trim()
		.notEmpty()
		.withMessage(`Message title ${emptyErr}`)
		.isLength({ max: 100 })
		.withMessage(
			'Message title exceeds 100 character limit',
		),
	body('msgContent')
		.trim()
		.notEmpty()
		.withMessage(`Message content ${emptyErr}`),
];

exports.newMessagePost = [
	validateMessage,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('message-form', {
				title: 'Create message',
				errors: errors.array(),
			});
		}
		try {
			const msgTitle = req.body.msgTitle;
			const msgContent = req.body.msgContent;
			const userId = req.user.id
			db.addMsg(userId, msgTitle, msgContent)
			res.redirect('/')
		} catch (err) {
			next(err);
		}
	},
];
