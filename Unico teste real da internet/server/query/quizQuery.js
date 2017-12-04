const Query = require('./query')

class QuizQuery extends Query {
    
    constructor () { super() }

    getQuizPorId(id, callback){
        let query = 'select * from q where q.id_quiz = ?'
        this.executeQuery(id, callback, query);
    }

    getQuizzesDaPagina(nPagina, callback){
        let query = 'select * from quiz limit ?,8';
        this.executeQuery((nPagina-1)*8, callback, query);
    }

    getAllQuizzes(callback){
        let query = 'select * from quiz';
        this.executeQuery(null, callback, query);
    }

    getQuizzesDoUsuario(idUsuario, nPagina, callback){
        let query = 'select * from quiz where id_usuario = ? limit ?,8';
        this.executeQuery([idUsuario, (nPagina-1)*8], callback, query);
    }

    buscarQuiz(quizQuery, nPagina, callback){
        let query = 'select * from quiz where (titulo like ?) or (resumo like ?) limit ?,8'
        this.executeQuery(['%'+quizQuery+'%', '%'+quizQuery+'%', (nPagina-1)*8], callback, query);
    }

    buscarQuizPorTag(tagQuery, nPagina, callback){
        let query = `select * from quiz q inner join quiztags qt
                     on qt.id_quiz = q.id_quiz inner join tag t
                     on t.id_tag = qt.id_tag where tag IN (?) limit ?,8`
        this.executeQuery([tagQuery, (nPagina-1)*8], callback, query);
    }

    criarQuiz(quiz, callback){
        let query = 'insert into quiz set ?';
        this.executeQuery(quiz, callback, query); 
    }

    getIdQuizzesRespondidosPeloUsuario  (idUsuario, callback) {
        let query = 'select id_quiz from userquizzes where id_usuario = ?'
        this.executeQuery(idUsuario, callback, query);    
    }

    getIdQuizzesCriadosPeloUsuario (idUsuario,callback) {
        let query = 'select id_quiz from quiz where id_usuario = ?'
        this.executeQuery(idUsuario, callback, query);
    }
    
}

module.exports = QuizQuery;
