const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Turmas = Schema({
    creche: { type: String, required: true },
    turma: { type: String, required: true },
    qtalunos: { type: String, required: true },
    qtdvagas: { type: String, required: true }
});

module.exports = mongoose.model("Turmas", Turmas)