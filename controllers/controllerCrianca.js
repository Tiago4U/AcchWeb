const Criancas = require('../models/models_nosql/crianca');
function dataAtualFormatada(){
    let data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

module.exports = {

    async getCreate(req, res) {
        res.render('crianca/criancaCreate');
    },
    async postCreate(req, res) {
        const {nome, rg, nomedopai, endereco, bairro, datanasc, turma} = req.body;
        const Crianca = new crianca({nome, rg, nomedopai, endereco, bairro, datanasc, turma});
        await Crianca.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Crianca.find().then((criancas) => {
            res.render('crianca/criancaList', {criancas: criancas.map(criancas => criancas.toJSON())});
        });
    },
    async getEdit(req, res) {
        await Crianca.findOne({_id:req.params.id}).then((criancas)=>{
        res.render('crianca/criancaEdit', {criancas:criancas.toJSON()});
    });
    },
    async postEdit(req, res) {
        const {nome, rg, nomedopai, endereco, bairro, datanasc, turma} = req.body;
        await Crianca.findOneAndUpdate({_id:req.body.id}, {nome, rg, nomedopai, endereco, bairro, datanasc, turma});
        res.redirect('/criancaList');
    },
    async getDelete(req, res) {
        await Crianca.findOneAndRemove({_id:req.params.id});
        res.redirect('/criancaList');
    }
                
}
