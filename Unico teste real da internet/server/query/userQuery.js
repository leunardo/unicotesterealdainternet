const mysql = require('mysql');
const query = {};
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_topquizzes'
});

query.getUsuario = function getUsuario(id, callback) {
    connection.query("select * from usuario where id_usuario = ?", id, 
    (err, result) => {
        if (err) throw err;
        else callback(result);
    });
}


module.exports = query;