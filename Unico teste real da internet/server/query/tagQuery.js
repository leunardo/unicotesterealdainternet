const mysql = require('mysql');
const query = {};
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_topquizzes'
});

query.getAllTags = function getAllTags(callback){
    var query = 'select * from tag';
    executeQuery(null, callback, query);
}

query.criarTag = function criarTag(tag, callback){
    var query = 'insert into tag set ?';
    executeQuery(tag, callback, query);
}

query.tagsDoUsuario = function tagsDoUsuario(idUsuario, callback) {
    var query = `Select t.tag, count(t.id_tag) n from userquizzes u
                    inner join quiztags q on u.id_quiz = q.id_quiz
                    inner join tag t on t.id_tag = q.id_tag
                    group by t.tag desc
                    where u.id_usuario = ?;`;
    executeQuery(idUsuario, callback, query);
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;