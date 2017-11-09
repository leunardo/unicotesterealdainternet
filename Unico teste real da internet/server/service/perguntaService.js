const openConnection = require('../factory/dbConnectionFactory');
const perguntaQuery = require('../query/perguntaQuery');
const auth = require('../auth');
const service = {};

service.perguntaService = function perguntaService() {
    const db = openConnection();
    perguntaQuery.perguntaQuery(db);
}

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