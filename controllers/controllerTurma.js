const Turma = require('../models/models_nosql/turma');

module.exports = {

    async getCreate(req, res) {
        res.render('turma/turmaCreate');
    },
    async postCreate(req, res) {
        const {creche, identificador, qtalunos, qtdvagas} = req.body;
        const turma = new Turma({creche, identificador, qtalunos, qtdvagas});
        await creche.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Turma.find().then((turmas) => {
            res.render('turma/turmaList', {turmas: turmas.map(turmas => turmas.toJSON())});
        });
    },
    async getEdit(req, res) {
        await Turma.findOne({_id:req.params.id}).then((turmas)=>{
        res.render('turma/turmaEdit', {turmas:turmas.toJSON()});
    });
    },
    async postEdit(req, res) {
        const {creche, identificador, qtalunos, qtdvagas} = req.body;
        await Turma.findOneAndUpdate({_id:req.body.id}, {creche, identificador, qtalunos, qtdvagas});
        res.redirect('/turmaList');
    },
    async getDelete(req, res) {
        await Turma.findOneAndRemove({_id:req.params.id});
        res.redirect('/turmaList');
    }
                
}
