const mysql = require('mysql');
const query = {};
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_topquizzes'
});

query.criarResposta = function criarResposta(resposta, callback){
    var query = 'insert into resposta set ?';
    executeQuery(resposta, callback, query);
}

query.getAllRespostas = function getAllRespostas(idPergunta, callback){
    var query = 'select * from resposta where id_pergunta = ?';
    executeQuery(idPergunta, callback, query);
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;