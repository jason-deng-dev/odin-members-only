const { Router } = require('express');
const indexRouter = Router();
const db = require('../db/queries');

indexRouter.get('/', async (req, res, send) => {
    const messages = await db.getAllMsg()
    messages.map((msg) => msg.created_at = new Date(msg.created_at).toLocaleString())
	res.render('index', {messages});
});

indexRouter.post('/delete/:msg_id', async (req, res, send) => {
    await db.deleteMsg(req.params.msg_id)
    res.redirect('/')
})

module.exports = indexRouter;
