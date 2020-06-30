const contatoModel = require('../models/Contato');

class ContatosRepository {
  async findAll(page = 1, size = 10) {
    console.log('ContatosRepository - procurando contatos no mongo');
    return contatoModel.paginate({}, { page, limit: size }, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      return result;
    });
  }

  async create(dadosContato) {
    console.log('ContatosRepository - Salvando dados no mongo');
    return await contatoModel.create(dadosContato);
  }

  async findContatoById(id) {
    console.log('ContatosRepository - Procurando um contato no mongo');
    return await contatoModel.findById(id);
  }

  async updateById(id, dadosContato) {
    console.log('ContatosRepository - Atualizando um contato no mongo');
    return await contatoModel.findByIdAndUpdate(id, dadosContato);
  }

  async deleteById(id) {
    console.log('ContatosRepository - deletando um contato no mongo');
    return await contatoModel.findByIdAndDelete(id);
  }
}

module.exports = new ContatosRepository();
