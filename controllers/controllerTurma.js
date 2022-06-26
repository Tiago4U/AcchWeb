const Turma = require('../models/models_nosql/turma');

module.exports = {

    async getCreate(req, res) {
        res.render('turma/turmaCreate');
        
    },
    async postCreate(req, res) {
        const {creche, turma, qtalunos, qtdvagas} = req.body;
        console.log(req.body);
        const turmas = new Turma({creche, turma, qtalunos, qtdvagas});
        await turmas.save();
        res.redirect('/home');
        
        
    },
    async getList(req, res) {
        Turma.find().then((turmas) => {
            console.log(turmas);
            res.render('turma/turmaList', {turmas: turmas.map(turmas => turmas.toJSON())});
        });
        console.log("passou");
    },
    async getEdit(req, res) {
        await Turma.findOne({_id:req.params.id}).then((turmas)=>{
        res.render('turma/turmaEdit', {turmas:turmas.toJSON()});
    });
    },
    async postEdit(req, res) {
        const {creche, turmas, qtalunos, qtdvagas} = req.body;
        await Turma.findOneAndUpdate({_id:req.body.id}, {creche, turmas, qtalunos, qtdvagas});
        res.redirect('/turmaList');
    },
    async getDelete(req, res) {
        await Turma.findOneAndRemove({_id:req.params.id});
        res.redirect('/turmaList');
    }
                
}
