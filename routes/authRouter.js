const { Router } = require('express');
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.get('/sign-up', authController.signUpGet)
authRouter.post('/sign-up', authController.signUpPost)
authRouter.get('/log-in', authController.loginGet)
authRouter.post('/log-in', authController.loginPost)
authRouter.get('/log-out', authController.logoutGet)
authRouter.get('/join-club', authController.joinClubGet)
authRouter.post('/join-club', authController.joinClubPost)

module.exports = authRouter;