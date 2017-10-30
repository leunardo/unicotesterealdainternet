const quizQuery = require('../query/quizQuery');
const auth = require('../auth');
const service = {};

service.getQuizPorId = function getQuizPorId(id, callback){
    quizQuery.getQuizPorId(id, (result) => callback(result));
}

service.getQuizzesDaPagina = function getQuizzesDaPagina(nPagina, callback){
    quizQuery.getQuizzesDaPagina(nPagina, (result) => callback(result));
}

service.getAllQuizzes = function getAllQuizzes(callback){
    quizQuery.getAllQuizzes((result) => callback(result));
}

service.getQuizzesDoUsuario = function getQuizzesDoUsuario(idUsuario, nPagina, callback){
    quizQuery.getQuizzesDoUsuario(idUsuario, nPagina, (result)=>callback(result));
}

service.buscarQuiz = function buscarQuiz(searchQuery, nPagina, callback){
    quizQuery.buscarQuiz(searchQuery, nPagina, (result) => callback(result));
}

service.criarQuiz = function criarQuiz(quiz, callback) {
    quizQuery.criarQuiz(quiz, (result) => callback(result));
}

service.buscarQuizPorTag = function buscarQuizPorTag(query, nPagina, callback){
    quizQuery.buscarQuizPorTag(query, nPagina, (result) => callback(result));
}

module.exports = service;