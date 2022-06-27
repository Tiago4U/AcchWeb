const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Turmas = Schema({
    creche: { type: String, required: true },
    turma: { type: String, required: true },
    qtalunos: { type: Number, required: true },
    qtdvagas: { type: Number, required: true }
});

module.exports = mongoose.model("Turmas", Turmas)