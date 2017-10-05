const userQuery = require('../query/userQuery');
const service = {};

service.getUsuario = function getUsuario(id, callback) {
    var results;
    userQuery.getUsuario(id, (result) => callback(result));
};



module.exports = service;