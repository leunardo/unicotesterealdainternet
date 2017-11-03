const userQuery = require('../query/userQuery');
const auth = require('../auth');
const service = {};

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

module.exports = service;