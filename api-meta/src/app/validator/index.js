const Joi = require('joi');

const joiValidador = (dados, joiSchema) => {
  const { error } = Joi.validate(dados, joiSchema, { abortEarly: false });
  if (error) {
    const msg = error.details.map(i => i.message).join('.');
    return { error: msg };
  }

  return true;
};

module.exports = joiValidador;
