const { Router } = require('express');
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.get('/sign-up', authController.signUpGet)
authRouter.post('/sign-up', authController.signUpPost)

module.exports = authRouter;