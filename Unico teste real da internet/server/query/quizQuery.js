const mysql = require('mysql');
const query = {};
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_topquizzes'
});

query.getQuizPorId = function getQuizPorId(id, callback){
    var query = 'select * from quiz where id_quiz = ?';
    executeQuery(id, callback, query);
}

query.getQuizzesDaPagina = function getQuizzesDaPagina(nPagina, callback){
    var query = 'select * from quiz limit ?,8';
    executeQuery(id, callback, query);
}

query.getAllQuizzes = function getAllQuizzes(callback){
    var query = 'select * from quiz';
    executeQuery(null, callback, query);
}

query.getQuizzesDoUsuario = function getQuizzesDoUsuario(idUsuario, nPagina, callback){
    var query = 'select * from quiz where id_usuario = ? limit ?,8';
    executeQuery([idUsuario, nPagina-1], callback, query);
}

query.buscarQuiz = function buscarQuiz(quizQuery, nPagina, callback){
    var query = 'select * from quiz where (titulo like ?) or (resumo like ?) limit ?,8'
    executeQuery(['%'+quizQuery+'%', '%'+quizQuery+'%', nPagina], callback, query);
}

query.criarQuiz = function criarQuiz(quiz, callback){
    var query = 'insert into quiz set ?';
    executeQuery(quiz, callback, query); 
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;