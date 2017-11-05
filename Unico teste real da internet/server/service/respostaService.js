const respostaQuery = require('../query/respostaQuery');
const auth = require('../auth');
const service = {};

service.getAllRespostas = function getAllRespostas(idPergunta, callback){
    respostaQuery.getAllRespostas(idPergunta, (result) => callback(result));
}

service.criarResposta = function criarResposta(resposta, callback){
    respostaQuery.criarResposta(resposta, (result) => callback(result));
}

module.exports = service;