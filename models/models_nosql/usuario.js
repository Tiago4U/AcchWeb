const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = Schema({
    nome: { type: String, required: true }, 
    login: { type: String, required: true },
    senha: { type: String, required: true },
    datanasc: { type: Date, required: true },
    email: { type: String, required: true },
    tipo: { type: String, required: true }  
});

module.exports = mongoose.model("Usuario", Usuario);


