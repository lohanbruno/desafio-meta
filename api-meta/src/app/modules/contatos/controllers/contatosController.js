const contatosService = require('../services/contatosService');
const contatosValidator = require('../validators/contatosValidator');
const validator = require('../../../validator');

class ContatosController {
  async index(req, res) {
    console.log('ContatosController - Chamando metodo index');
    const { page, size } = req.query;

    try {
      console.log(
        'ContatosController - Chamando service passando pagina = %s size = %s',
        page,
        size
      );
      let contatos = await contatosService.findAll(page, size);
      if (contatos.docs.length === 0) {
        console.log('ContatosController - Não foram encontrados contatos');
        return res.status(404).json(contatos);
      }

      console.log(
        'ContatosController - Retornando dados encontrados no mongo %O',
        contatos
      );

      return res.status(200).json(contatos);
    } catch (err) {
      console.error('ContatosController - erro ao consultar contatos', err);
      return res.status(500).json();
    }
  }

  async create(req, res) {
    console.log('ContatosController - Chamando metodo create');
    const dadosContato = req.body;
    console.log(
      'ContatosController - Verificando dados enviados pra %O',
      dadosContato
    );

    const { error } = validator(dadosContato, contatosValidator);
    if (error) {
      console.error(
        'ContatosController - Dados nao atendem as especificacoes %O %O',
        dadosContato,
        error
      );
      return res.status(400).json({ error });
    }

    console.log('ContatosController - Dados validados com sucesso');
    try {
      const { id, nome, canal, valor, obs } = await contatosService.create(
        dadosContato
      );

      console.log(
        `ContatosController - Retornando dados salvos no mongo ${id} ${nome} ${canal} ${valor} ${obs}`
      );

      return res.status(201).json({ id, nome, canal, valor, obs });
    } catch (err) {
      console.log(`ContatosController - Erro ao salvar contato`);
      return res.status(500).json();
    }
  }

  async show(req, res) {
    console.log('ContatosController - Chamando metodo show');
    try {
      const { id } = req.params;
      console.log(
        'ContatosController - Chamando serviço para procurar contato de id %s',
        id
      );
      const contato = await contatosService.findContatoById(id);

      if (!contato) {
        console.log('ContatosController - Contato não encontrado');
        return res.status(404).json({ message: 'usuario nao encontrado' });
      }
      console.log(
        `ContatosController - Retornando dados salvos no mongo ${contato.id} ${contato.nome} ${contato.canal} ${contato.valor} ${contato.obs}`
      );

      return res.json({
        id: contato.id,
        nome: contato.nome,
        canal: contato.canal,
        valor: contato.valor,
        obs: contato.obs
      });
    } catch (err) {
      console.error(
        'ContatosController - Erro ao procurar contato no mongo',
        err
      );
      return res.status(500).json();
    }
  }
  async update(req, res) {
    console.log('ContatosController - Chamando metodo update');
    try {
      const { id } = req.params;
      const dadosContato = req.body;

      console.log(
        'ContatosController - Verificando dados enviados pra %O',
        dadosContato
      );

      const { error } = validator(dadosContato, contatosValidator);
      if (error) {
        console.error(
          'ContatosController - Dados nao atendem as especificacoes %O %O',
          dadosContato,
          error
        );
        return res.status(400).json({ error });
      }
      console.log(
        'ContatosController - Chamando serviço para atualizar contato de id %s',
        id
      );
      const contato = await contatosService.updateById(id, dadosContato);

      if (!contato) {
        console.log('ContatosController - Contato não encontrado');
        return res.status(404).json({ message: 'usuario nao encontrado' });
      }
      console.log('ContatosController - Contato atualizado com sucesso');

      return res.status(204).json();
    } catch (err) {
      console.error(
        'ContatosController - Erro ao atualizar contato no mongo',
        err
      );
      return res.status(500).json();
    }
  }

  async delete(req, res) {
    console.log('ContatosController - Chamando metodo delete');
    try {
      const { id } = req.params;
      console.log(
        'ContatosController - Chamando serviço para deletar contato de id %s',
        id
      );

      const contato = await contatosService.deleteById(id);

      if (!contato) {
        console.log('ContatosController - Contato não encontrado');
        return res.status(404).json({ message: 'usuario nao encontrado' });
      }
      console.log('ContatosController - Contato deletado com sucesso');

      return res.status(204).json();
    } catch (err) {
      console.error(
        'ContatosController - Erro ao deletar contato no mongo',
        err
      );
      return res.status(500).json();
    }
  }
}

module.exports = new ContatosController();
