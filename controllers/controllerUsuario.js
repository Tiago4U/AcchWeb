const { where } = require('../models/models_nosql/usuario');
const Usuario = require('../models/models_nosql/usuario');

module.exports = {

    async getLogin(req, res) {
        req.session.destroy();
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    async postLogin(req, res) {
        Usuario.findOne({ login: req.body.login, senha: req.body.senha }).then((usuario) => {
            if (usuario != null) {
                req.session.login = req.body.login;
                res.render('home');
            } else {
                res.redirect('/');
            }
        });
    },
    async getLogout(req, res) {
        res.cookie("userData", req.cookies.userData, { maxAge: 0, httpOnly: true });
        res.redirect('/');
    },
    /*
    async getRecuperarSenha(req, res) {
        Usuario.findOne({ login: req.body.login }).then((usuario) => {
            if (usuario != null) {
                res.render('usuario/recuperarSenha', { layout: 'noMenu.handlebars', login: req.params.login, pergunta: usuario[0].pergunta_secreta });
            } else {
                res.redirect('/');
            }
        });
    },*/
    /*
    async postRecuperarSenha(req, res) {
        Usuario.findOne({ login: req.body.login, resposta_pergunta: req.body.resposta }).then((usuario) => {
            if (usuario.length > 0) {
                res.render('usuario/senhaRecuperada', { layout: 'noMenu.handlebars', senha: usuario[0].senha });
            } else {
                res.redirect('/');
            }
        });
    },*/
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },
    async postCreate(req, res) {
        function dataAtualFormatada(){
            let data = new Date(),
                dia  = data.getDate().toString().padStart(2, '0'),
                mes  = (data.getMonth()+1).toString().padStart(2, '0'),
                ano  = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }
        
        console.log(dataAtualFormatada());
        
        const {login, senha, datanasc, email, nome, tipo} = req.body;
        const usuario = new Usuario({login, senha, datanasc, email, nome, tipo});
        await usuario.save();
        res.redirect('/home');
    },
    async getList(req, res) {
        Usuario.find().then((usuario) => {
            res.render('usuario/usuarioList', { usuarios: usuario.map(usuario => usuario.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Usuario.findOne({ _id: req.params.id }).then((usuario) => {
            res.render('usuario/usuarioEdit', { usuario: usuario.toJSON() });
        });
    },
    async postEdit(req, res) {
        await Usuario.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.redirect('/usuarioList');
    },
    async getDelete(req, res) {
        await Usuario.findOneAndRemove({ _id: req.params.id });
        res.redirect('/usuarioList');
    }

}   