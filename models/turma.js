const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Turma = Schema({
    creche: { type: String, required: true },
    identificador: { type: String, required: true },
    qtalunos: { type: String, required: true },
    qtdvagas: { type: String, required: true }
});

module.exports = mongoose.model("Turmas", Turma)