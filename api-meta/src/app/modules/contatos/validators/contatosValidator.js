const Joi = require('joi');

module.exports = Joi.object().keys({
  nome: Joi.string()
    .required()
    .error(() => 'Nome é obrigatório e precisa ser uma String'),
  canal: Joi.string()
    .lowercase()
    .valid('email', 'celular', 'fixo')
    .required()
    .error(
      () =>
        'Canal é obrigatório e precisa ser uma String com email, celular ou fixo'
    ),
  valor: Joi.string()
    .required()
    .error(() => 'Valor é obrigatório e precisa ser uma String'),
  obs: Joi.string().error(() => 'Obs é obrigatório e precisa ser uma String')
});
