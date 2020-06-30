const contatosRepository = require('../repositories/contatosRepository');

class ContatosService {
  async findAll(page, size) {
    console.log(
      'ContatosService - Metodo findAll chamado, chamando repositorio'
    );

    try {
      return await contatosRepository.findAll(page, size);
    } catch (err) {
      throw err;
    }
  }

  async create(dadosContato) {
    console.log(
      'ContatosService - Metodo create chamado, chamando repositorio'
    );
    return await contatosRepository.create(dadosContato);
  }

  async findContatoById(id) {
    console.log(
      'ContatosService - Metodo findContatoById chamado, chamando repositorio'
    );
    return await contatosRepository.findContatoById(id);
  }

  async updateById(id, dadosContato) {
    console.log(
      'ContatosService - Metodo updateById chamado, chamando repositorio'
    );

    return await contatosRepository.updateById(id, dadosContato);
  }

  async deleteById(id) {
    console.log(
      'ContatosService - Metodo deleteById chamado, chamando repositorio'
    );

    return await contatosRepository.deleteById(id);
  }
}

module.exports = new ContatosService();
