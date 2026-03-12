const db = require('../db/queries');
const passport = require('passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const {
	body,
	validationResult,
	matchedData,
} = require('express-validator');

exports.signUpGet = async (req, res, next) => {
	try {
		res.render('auth/sign-up-form');
	} catch (err) {
		next(err);
	}
};

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const emptyErr = 'is required.';

const validateUser = [
	body('firstName')
		.trim()
		.notEmpty()
		.withMessage(`Last name ${emptyErr}`)
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body('lastName')
		.trim()
		.notEmpty()
		.withMessage(`Last name ${emptyErr}`)
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ max: 10 })
		.withMessage(`Last name ${lengthErr}`),
	body('username')
		.trim()
		.notEmpty()
		.withMessage(`Username ${emptyErr}`),
	body('password')
		.trim()
		.notEmpty()
		.withMessage(`Password ${emptyErr}`),
	body('passwordConfirm')
		.trim()
		.notEmpty()
		.withMessage(`Password confirmation ${emptyErr}`)
		.custom( (value, {req}) => {
			if (req.body.password !== value) {
				throw new Error('Passwords do not match')
			}
			return true
		}),
];

exports.signUpPost = [
	validateUser,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('auth/sign-up-form', {
				title: 'Create user',
				errors: errors.array(),
			});
		}
		try {
			const firstName = req.body.firstName;
			const lastName = req.body.lastName;
			const username = req.body.username;
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				10,
			);
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
	},
];

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
		res.redirect('/');
	});
};

exports.joinClubGet = (req, res, next) => {
	try{
		res.render('auth/join-club-form')
	}catch(err) {
		next(err)
	}	
}

const passcode = process.env.MEMBER_PASSCODE;

const validatePasscode = [
	body('passcode')
	.custom(( value ) => {
		if ( value !== passcode) {
			throw new Error('Wrong passcode')
		}
		return true
	})
];


exports.joinClubPost = [
	validatePasscode,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('auth/join-club-form', {
				title: 'Enter passcode',
				errors: errors.array(),
			})
		}
		try {
			console.log(req.user)
			// db query to change membership to true

		} catch (err) {
			next(err)
		}

	}


]
	