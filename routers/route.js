const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerCreche = require('../controllers/controllerCreche');
const controllerTurma = require('../controllers/controllerTurma');
const controllerCrianca = require('../controllers/controllerCrianca');
const controllerAnimal = require('../controllers/controllerAnimal');

const route = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        req.imageName = req.body.nome + '.jpg'
        cb(null, req.imageName)
    },
});

const upload = multer({ storage });
module.exports = route;

//Parte inicial do código
route.get("/home", function (req, res) {
    //if (req.session.login) {
    //    console.log(req.session.login);
    res.render('home');
    //}
    //else
    //  res.redirect('/');
});

//Parte do meio do código
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout);
//route.get("/recuperarSenha/:login", controllerUsuario.getRecuperarSenha);
//Parte final do código


//Home
route.get("/home", function (req, res) { res.render('home') });
route.get("/logout", controllerUsuario.getLogout);

//Controller Usuario
//Usuario - Login e Recuperação de Senha
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
//route.get("/recuperarSenha/:login", controllerUsuario.getRecuperarSenha);
//route.post("/recuperarSenha", controllerUsuario.postRecuperarSenha);
//Usuario - CRUD
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList); 

//Controller Animal
//Animal-CRUD
route.get("/animalCreate", controllerAnimal.getCreate);
route.get("/animalList", controllerAnimal.getList);
route.get("/animalEdit/:id", controllerAnimal.getEdit);
route.get("/animalDelete/:id", controllerAnimal.getDelete); 

route.get("/usuarioEdit/:id", controllerUsuario.getEdit);
route.post("/usuarioEdit", controllerUsuario.postEdit);
route.get("/usuarioDelete/:id", controllerUsuario.getDelete);

//Controller Creche
//Creche-CRUD
route.get("/crecheCreate", controllerCreche.getCreate);
route.post("/crecheCreate", controllerCreche.postCreate);
route.get("/crecheList", controllerCreche.getList);
route.get("/crecheEdit/:id", controllerCreche.getEdit);
route.post("/crecheEdit", controllerCreche.postEdit);
route.get("/crecheDelete/:id", controllerCreche.getDelete);

//Controller Turma
//Turma-CRUD
route.get("/turmaCreate", controllerTurma.getCreate);
route.get("/turmaList", controllerTurma.getList);
route.get("/turmaEdit/:id", controllerTurma.getEdit);
route.get("/turmaDelete/:id", controllerTurma.getDelete);

//Controller Crianca
//Crianca-CRUD
route.get("/criancaCreate", controllerCrianca.getCreate);
route.post("/criancaCreate", controllerCrianca.postCreate);
route.get("/criancaList", controllerCrianca.getList);
route.get("/criancaEdit/:id", controllerCrianca.getEdit);
route.post("/criancaEdit", controllerCrianca.postEdit);
route.get("/criancaDelete/:id", controllerCrianca.getDelete);
