const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Creche = Schema({
    nome: { type: String, required: true },
    bairro: { type: String, required: true },
    endereco: { type: String, required: true }
});

module.exports = mongoose.model("Creches", Creche)