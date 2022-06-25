const Creche = require('../models/models_nosql/creche');

module.exports = {

    async getCreate(req, res) {
        res.render('creche/crecheCreate');
    },
    async postCreate(req, res) {
        const {nome, bairro, endereco} = req.body;
        const creche = new Creche({nome, bairro, endereco});    
        await creche.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Creche.find().then((creches) => {
            res.render('creche/crecheList', {creches: creches.map(creches => creches.toJSON())});
        });
    },
    async getEdit(req, res) {
        await Creche.findOne({_id:req.params.id}).then((creches)=>{
        res.render('creche/crecheEdit', {creches:creches.toJSON()});
    });
    },
    async postEdit(req, res) {
        const {nome, bairro, endereco} = req.body;
        await Creche.findOneAndUpdate({_id:req.body.id}, {nome, bairro, endereco});
        res.redirect('/crecheList');
    },
    async getDelete(req, res) {
        await Creche.findOneAndRemove({_id:req.params.id});
        res.redirect('/crecheList');
    }
                
}
