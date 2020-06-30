const { Router } = require('express');

const sessionController = require('./controllers/sessionController');

const sessionRouter = Router();

sessionRouter.get('/session/auth', sessionController.generateToken);

module.exports = sessionRouter;