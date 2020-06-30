const mongoose = require('mongoose');

const { host, options, port, name } = require('../config/database');

const url = `mongodb://${host}:${port}/${name}`;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connection.on('connecting', () => {
    console.log(`Tentando conectar ao banco de dados ${url}`);
  });

  mongoose.connection.on('connected', () => {
    console.log(`Conectado com sucesso no banco de dados ${url}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`A conexão com o banco de dados ${url} foi perdida`);
  });

  mongoose.connection.on('error', () => {
    console.log(`Erro ao conectar com banco de dados ${url}`);
  });

  mongoose.connection.on('close', () => {
    console.log(`A conexão com o banco de dados foi fechada ${url}`);
  });
}
mongoose.connect(url, options);

module.exports = mongoose;
