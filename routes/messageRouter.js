const { Router } = require('express');
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const {
	ensureLoggedIn,
} = require('../config/auth');


messageRouter.get('/new', ensureLoggedIn, messageController.newMessageGet)
messageRouter.post('/new', ensureLoggedIn, messageController.newMessagePost)

module.exports = messageRouter;