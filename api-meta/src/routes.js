const { Router } = require('express');

const contatosRouter = require('./app/modules/contatos/contatos.routes');
const sessionRouter = require('./app/modules/session/session.routes');
const authMiddleware = require('./middlewares/auth');

const routes = Router();

routes.use(sessionRouter);
routes.use(authMiddleware);
routes.use(contatosRouter);

module.exports = routes;
