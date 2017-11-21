const router = require('express').Router();
const UserService = require('../service/userService');
const userService = new UserService();
router
    .route('/:id')
        .get(getUserPorId)
        .put(updateUsuario)
router
    .route('/')
        .get(getUsuarios)        
        .post(criarUsuario)
router
    .route('/gid/:gid')
        .get(usuarioJaCadastrado)

router
    .route('/:id/amigosSugeridos')
        .get(amigosSugeridos)
        

function getUserPorId(req, res) {
   userService.getUsuarioPorId(req.params.id, (user) => {
    res.send(user);
   })
}

function getUsuarios(req, res) {
    userService.getUsuarios((users) => {
        res.send(users);
    })
}

function criarUsuario(req, res) {
    userService.criarUsuario(req.body, (response) => {
        res.send(response);
    })
}

function updateUsuario(req, res) {
    userService.updateUsuario(req.body[0], req.body[1], req.params.id, (response) => {
        res.send(response);
    })
}

function usuarioJaCadastrado(req, res) {
    userService.usuarioJaCadastrado(req.params.gid, (response) =>{
        res.send(response);
    })
}

function amigosSugeridos(req, res) {
    userService.amigosSugeridos(req.params.id, usuarios => res.send(usuarios));
}


module.exports = router;
