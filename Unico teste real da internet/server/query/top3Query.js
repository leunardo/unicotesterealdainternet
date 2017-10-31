const mysql = require('mysql');
const query = {};
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_topquizzes'
});

query.getTop3 = function getTop3(id_quiz, callback){
    var query = 'select * from top3 where id_quiz = ?';
    connection.executeQuery(id+quiz, callback, query);
}

query.insertTop3 = function insertTop3(user, callback){
    var query = 'insert into top3 set ? where id_quiz = ?'
    connection.executeQuery([user, user.id_quiz], callback, query);
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;