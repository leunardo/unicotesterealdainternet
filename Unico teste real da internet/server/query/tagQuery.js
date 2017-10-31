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

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;