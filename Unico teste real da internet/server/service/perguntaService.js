const perguntaQuery = require('../query/perguntaQuery');
const service = {};

service.getPergunta = function getPergunta(idPergunta, callback){
    perguntaQuery.getPergunta(idPergunta, (result) => callback(result))
}

service.getAllPerguntas = function getAllPerguntas(idQuiz, callback){
    perguntaQuery.getAllPerguntas(idQuiz, (result) => callback(result));
}

service.criarPergunta = function criarPergunta(pergunta, callback){
    perguntaQuery.criarPergunta(pergunta, (result) => callback(result));
}

module.exports = service;