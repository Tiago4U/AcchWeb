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
            res.render('turma/turmaList', {turmas: turmas.map(turmas => turmas.toJSON())});
        });
        
    },
    async getEdit(req, res) {
        console.log('passou1');
        console.log(req.body);
        await Turma.findOne({_id:req.params.id}).then((turmas)=>{
        res.render('turma/turmaEdit', {turmas:turmas.toJSON()});
        console.log('passou asd');
    });
    },
    
    /*
    async postEdit(req, res) {
        console.log('passou2');
        const {creche, turma, qtalunos, qtdvagas} = req.body;
        await Turma.findOneAndUpdate({_id:req.body.id}, {creche, turma, qtalunos, qtdvagas});
        res.redirect('/turmaList');
    },
*/
    async postEdit(req, res) {
        console.log('passou2');
        await Turma.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.redirect('/turmaList');
    },


    async getDelete(req, res) {
        await Turma.findOneAndRemove({_id:req.params.id});
        res.redirect('/turmaList');
    }
                
}
