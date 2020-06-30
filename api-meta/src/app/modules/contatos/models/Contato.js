const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  canal: { type: String, required: true },
  valor: { type: String, required: true },
  obs: { type: String }
});

contatoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('contatos', contatoSchema);
