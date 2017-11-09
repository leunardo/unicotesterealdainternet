const openConnection = require('../factory/dbConnectionFactory')
const userQuery = require('../query/userQuery');
const tagQuery = require('../query/tagQuery');
const quizQuery = require('../query/quizQuery');
const auth = require('../endpoint/auth');
//const friendship = require('../integration/friendship-ml')
const service = {};

service.userService = function userService() {
    let db = openConnection();
    userQuery.userQuery(db);
    tagQuery.tagQuery(db);
    quizQuery.quizQuery(db);
}

service.getUsuarioPorId = function getUsuarioPorId(id, callback) {
    userQuery.getUsuarioPorId(id, (result) => callback(result));
};

service.getUsuarios = function getUsuarios(callback) {
    userQuery.getUsuarios((result) => callback(result));
};

service.criarUsuario = function criarUsuario(user, callback) {
    userQuery.criarUsuario(user, (result) => callback(result));
};

service.updateUsuario = function updateUsuario(user, token, id, callback){
    auth.authenticate(token, (payload) => {
        if (user.id_google == payload['sub'])    
            userQuery.atualizarUsuario(user.nome, user.url_foto, user.descricao, id, (result) => callback(result));
    });
};

service.usuarioJaCadastrado = function usuarioJaCadastrado(gid, callback){
    userQuery.usuarioJaCadastrado(gid, (result) => callback(result));
}

service.sugestaoAmigos = function sugestaoAmigos(idUsuario, callback) {
    userQuery.amigosDosAmigos(idUsuario, (result) => {
        let usuarios = [];
        for (let usuario of result) {
            usuarios.push(usuario.id_usuario2);
        }
        callback(usuarios);
    });    
}

service.amigos = function(idUsuario, callback) {
    userQuery.amigos(idUsuario, (result) => {
        let usuarios = [];
        for (let usuario of result) {
            usuarios.push(usuario.id_usuario2);
        }

        callback(usuarios);
    });
}

module.exports = service;