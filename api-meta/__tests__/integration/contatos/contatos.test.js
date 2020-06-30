const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../src/app');

describe('Contatos', () => {
  let conexao;

  beforeAll(async () => {
    conexao = await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await conexao.close();
  });

  it('Deve salvar contato', async () => {
    const response = await request(app)
      .post('/')
      .send({
        nome: 'lohan',
        canal: 'email',
        valor: 'lohanbruno@hotmail.com',
        obs: 'na'
      });

    expect(response.body).toHaveProperty('dados');
  });
});
