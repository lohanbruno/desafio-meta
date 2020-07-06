const request = require('supertest');
const mongoose = require('mongoose');
const contatosRepository = require('../../../src/app/modules/contatos/repositories/contatosRepository');

const app = require('../../../src/app');

const payloadValido = {
  nome: 'lohan',
  canal: 'email',
  valor: 'lohanbruno@hotmail.com',
  obs: 'na'
};

const payloadValidoSecundario = {
  nome: 'bruno',
  canal: 'celular',
  valor: '(21)91111-1111',
  obs: 'alo'
};

describe('Contatos', () => {
  let conexao;
  let token;

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

    const response = await request(app).get('/session/auth');
    token = response.body.token;
  });

  afterEach(async () => {
    const colecoes = mongoose.connection.collections;

    for (const key in colecoes) {
      const colecao = colecoes[key];
      await colecao.deleteMany();
    }
  });

  afterAll(async () => {
    await conexao.dropDatabase();
    await conexao.close();
  });

  it('Deve retornar 200 e trazer 1 contato', async () => {
    await contatosRepository.create(payloadValido);

    const response = await request(app)
      .get('/')
      .set('authorization', token)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.docs.length).toBe(1);
    expect(response.body.docs[0].nome).toBe('lohan');
  });

  it('Deve retornar 200 e trazer 2 contatos', async () => {
    await contatosRepository.create(payloadValido);
    await contatosRepository.create(payloadValidoSecundario);

    const response = await request(app)
      .get('/')
      .set('authorization', token)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.docs.length).toBe(2);
    expect(response.body.docs[0].nome).toBe('lohan');
    expect(response.body.docs[1].nome).toBe('bruno');
  });

  it('Deve retornar 401 quando token não for enviado e retornar mensagem de erro', async () => {
    const response = await request(app)
      .get('/')
      .send();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 404 e não trazer contato', async () => {
    const response = await request(app)
      .get('/')
      .set('authorization', token)
      .send();

    expect(response.statusCode).toBe(404);
    expect(response.body.docs.length).toBe(0);
  });

  it('Deve retornar 201 e salvar contato', async () => {
    const response = await request(app)
      .post('/')
      .set('authorization', token)
      .send(payloadValido);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar 401 quando token não for enviado e retornar mensagem de erro', async () => {
    const response = await request(app)
      .post('/')
      .send(payloadValido);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 400 quando nome não for enviado e retornar mensagem de erro', async () => {
    const response = await request(app)
      .post('/')
      .set('authorization', token)
      .send({
        nome: '',
        canal: 'email',
        valor: 'lohanbruno@hotmail.com',
        obs: 'na'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 400 quando canal não for enviado e retornar mensagem de erro', async () => {
    const response = await request(app)
      .post('/')
      .set('authorization', token)
      .send({
        nome: 'lohan',
        canal: '',
        valor: 'lohanbruno@hotmail.com',
        obs: 'na'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 400 quando valor não for enviado e retornar mensagem de erro', async () => {
    const response = await request(app)
      .post('/')
      .set('authorization', token)
      .send({
        nome: 'lohan',
        canal: 'email',
        valor: '',
        obs: 'na'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 400 quando canal não for email, celular ou fixo e retornar mensagem de erro', async () => {
    const response = await request(app)
      .post('/')
      .set('authorization', token)
      .send({
        nome: 'lohan',
        canal: 'opcao invalida',
        valor: 'lohanbruno@hotmail.com',
        obs: 'na'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 200 e trazer o contato procurado', async () => {
    const contatoSalvo = await contatosRepository.create(payloadValido);

    const response = await request(app)
      .get(`/${contatoSalvo.id}`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(contatoSalvo.id);
    expect(response.body.nome).toBe('lohan');
  });

  it('Deve retornar 401 quando token não for enviado e retornar mensagem de erro', async () => {
    const id = 'af02d4278bcc2290524194d8';

    const response = await request(app)
      .get(`/${id}`)
      .send();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 404 e mensagem de erro informando que não encontrou o contato', async () => {
    const idNaoExistente = 'af02d4278bcc2290524194d8';

    const response = await request(app)
      .get(`/${idNaoExistente}`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve retornar 204 e atualizar o contato', async () => {
    const contatoSalvo = await contatosRepository.create(payloadValido);

    const response = await request(app)
      .put(`/${contatoSalvo.id}`)
      .set('authorization', token)
      .send(payloadValidoSecundario);

    expect(response.statusCode).toBe(204);

    const contatoAtualizado = await contatosRepository.findContatoById(
      contatoSalvo.id
    );

    expect(contatoAtualizado.nome).toBe(payloadValidoSecundario.nome);
    expect(contatoAtualizado.canal).toBe(payloadValidoSecundario.canal);
    expect(contatoAtualizado.valor).toBe(payloadValidoSecundario.valor);
    expect(contatoAtualizado.obs).toBe(payloadValidoSecundario.obs);
  });

  it('Deve retornar 401 quando token não for enviado e retornar mensagem de erro', async () => {
    const id = 'af02d4278bcc2290524194d8';

    const response = await request(app)
      .put(`/${id}`)
      .send();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 400 quando dados inválidos são enviados e retornar mensagem de erro', async () => {
    const contatoSalvo = await contatosRepository.create(payloadValido);

    const response = await request(app)
      .put(`/${contatoSalvo.id}`)
      .set('authorization', token)
      .send({
        nome: '',
        canal: '',
        valor: '',
        obs: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 404 e mensagem de erro informando que não encontrou o contato', async () => {
    const idNaoExistente = 'af02d4278bcc2290524194d8';

    const response = await request(app)
      .put(`/${idNaoExistente}`)
      .set('authorization', token)
      .send(payloadValido);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve retornar 204 e remover o contato', async () => {
    const contatoSalvo = await contatosRepository.create(payloadValido);
    let contatoEncontrado = await contatosRepository.findContatoById(
      contatoSalvo.id
    );

    expect(contatoSalvo.nome).toBe(contatoEncontrado.nome);
    expect(contatoSalvo.canal).toBe(contatoEncontrado.canal);
    expect(contatoSalvo.valor).toBe(contatoEncontrado.valor);
    expect(contatoSalvo.obs).toBe(contatoEncontrado.obs);

    const response = await request(app)
      .delete(`/${contatoSalvo.id}`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toBe(204);

    contatoEncontrado = await contatosRepository.findContatoById(
      contatoSalvo.id
    );

    expect(contatoEncontrado).toBeNull();
  });

  it('Deve retornar 401 quando token não for enviado e retornar mensagem de erro', async () => {
    const id = 'af02d4278bcc2290524194d8';

    const response = await request(app)
      .delete(`/${id}`)
      .send();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('Deve retornar 404 e mensagem de erro informando que não encontrou o contato', async () => {
    const idNaoExistente = 'af02d4278bcc2290524194d8';

    const response = await request(app)
      .delete(`/${idNaoExistente}`)
      .set('authorization', token)
      .send(payloadValido);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

});
