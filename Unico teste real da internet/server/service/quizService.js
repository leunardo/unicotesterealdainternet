const QuizQuery = require('../query/quizQuery');
const DB = require('../factory/dbConnectionFactory');

class QuizService {

    constructor() {
        this._quizQuery = new QuizQuery();
    }

    usuariosQueResponderam(id, callback){
        this._quizQuery.getUsuariosQueResponderam(id, (result) => callback(result));
    }

    usuarioRespondeu(idUser, idQuiz, callback){
        this._quizQuery.postUsuarioRespondeu(idUser, idQuiz, (result) => callback(result));
    }

    getQuizPorId(id, callback){
        this._quizQuery.getQuizPorId(id, (result) => callback(result));
    }

    getQuizzesDaPagina(nPagina, callback){
        this._quizQuery.getQuizzesDaPagina(nPagina, (result) => callback(result));
    }

    getAllQuizzes(callback){
        this._quizQuery.getAllQuizzes((result) => callback(result));
    }

    getQuizzesDoUsuario(idUsuario, nPagina, callback){
        this._quizQuery.getQuizzesDoUsuario(idUsuario, nPagina, (result)=>callback(result));
    }

    buscarQuiz(searchQuery, nPagina, callback){
        this._quizQuery.buscarQuiz(searchQuery, nPagina, (result) => callback(result));
    }

    criarQuiz(quiz, callback) {
        this._quizQuery.criarQuiz(quiz, (result) => callback(result));
    }
    
    buscarQuizPorTag(tagQuery, nPagina, callback){
        this._quizQuery.buscarQuizPorTag(tagQuery, nPagina, (result) => callback(result));
    }

    quizzesRespondidos(idUsuario, callback) {
        this._quizQuery.getIdQuizzesRespondidosPeloUsuario(idUsuario, (result) => {
            let quizzes = [];
            for (let quiz of result) {
                quizzes.push(quiz.id_quiz);
            }
            callback(quizzes);
        });
    } 
    
    quizzesFeitos(idUsuario, callback) {
        this._quizQuery.getIdQuizzesCriadosPeloUsuario(idUsuario, (result) => {
            let quizzes = [];
            for (let quiz of result) {
                quizzes.push(quiz.id_quiz);
            }
            callback(quizzes);
        });
    }
}

module.exports = QuizService;
