const { Router } = require('express');

const contatosController = require('./controllers/contatosController');

const contatosRouter = Router();

contatosRouter.get('/', contatosController.index);
contatosRouter.post('/', contatosController.create);
contatosRouter.get('/:id', contatosController.show);
contatosRouter.put('/:id', contatosController.update);
contatosRouter.delete('/:id', contatosController.delete);

module.exports = contatosRouter;
