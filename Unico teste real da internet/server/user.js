const router = require('express').Router();
const userService = require('./service/userService');

router
    .route('/:id')
        .get(getUserPorId)
        .put(atualizarUsuario)
router
    .route('/')
        .get(getUsuarios)        
        .post(criarUsuario)
router
    .route('/gid/:gid')
        .get(usuarioJaCadastrado)
        
        //router        
    //.route('/euae')
    //    .get(getCurrentUser);
/*
    var token = gapi.GetUSer().Audhfasdj
    $put(usuario, token) http:localhost/usuario/idDele
-,

    token => usuario 

*/


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

function atualizarUsuario(req, res) {
    userService.atualizarUsuario(req.body.user, req.body.token, req.params.id, (response) => {
        res.send(response);
    })
}

function usuarioJaCadastrado(req, res) {
    userService.usuarioJaCadastrado(req.params.gid, (response) =>{
        res.send(response);
    })
}


module.exports = router;
