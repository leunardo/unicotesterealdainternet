const respostaQuery = require('../query/respostaQuery');
const openConnection = require('../factory/dbConnectionFactory')
const auth = require('../auth');
const service = {};

service.respostaService = function respostaService() {
    let db = openConnection();
    respostaQuery.respostaQuery(db);
}

service.getAllRespostas = function getAllRespostas(idPergunta, callback){
    respostaQuery.getAllRespostas(idPergunta, (result) => callback(result));
}

service.criarResposta = function criarResposta(resposta, callback){
    respostaQuery.criarResposta(resposta, (result) => callback(result));
}

module.exports = service;