const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res, send) => res.render('index'))

module.exports = indexRouter;