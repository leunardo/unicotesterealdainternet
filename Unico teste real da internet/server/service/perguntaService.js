const perguntaQuery = require('../query/perguntaQuery');
const auth = require('../auth');
const service = {};

service.getPergunta = function getPergunta(idPergunta, callback){
    perguntaQuery.getPergunta(idPergunta, (result) => callback(result))
}

service.getAllPerguntas = function getAllPerguntas(callback){
    perguntaQuery.getAllPerguntas((result) => callback(result));
}

service.criarPergunta = function criarPergunta(pergunta, callback){
    perguntaQuery.criarPergunta(pergunta, (result) => callback(result));
}

module.exports = service;