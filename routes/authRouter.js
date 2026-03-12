const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');
const {
	ensureLoggedOut,
	ensureLoggedIn,
	ensureNotMember,
	ensureNotAdmin
} = require('../config/auth');

authRouter.get(
	'/sign-up',
	ensureLoggedOut,
	authController.signUpGet,
);
authRouter.post(
	'/sign-up',
	ensureLoggedOut,
	authController.signUpPost,
);
authRouter.get(
	'/log-in',
	ensureLoggedOut,
	authController.loginGet,
);
authRouter.post(
	'/log-in',
	ensureLoggedOut,
	authController.loginPost,
);
authRouter.get(
	'/log-out',
	ensureLoggedIn,
	authController.logoutGet,
);
authRouter.get(
	'/join-club',
	ensureLoggedIn,
	ensureNotMember,
	ensureNotAdmin,
	authController.joinClubGet,
);
authRouter.post(
	'/join-club',
	ensureLoggedIn,
	ensureNotMember,
	ensureNotAdmin,
	authController.joinClubPost,
);

module.exports = authRouter;
