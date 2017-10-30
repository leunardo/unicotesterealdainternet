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

service.updateUsuario = function updateUsuario(nome, foto, descricao, id, token, callback){
    auth.authenticate(token, (payload) => {
        if (id == payload['sub'])    
            userQuery.atualizarUsuario(nome, foto, descricao, id, (result) => callback(result));
    });
};

module.exports = service;