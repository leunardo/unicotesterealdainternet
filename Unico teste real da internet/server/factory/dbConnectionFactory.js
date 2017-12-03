const mysql = require('mysql');
let pool = undefined;
/**
 * Classe que conecta-se ao banco de dados e gerencia sua conexão.
 */
class DB {

  static createPool() {
    pool = mysql.createPool({
      connectionLimit: 100,
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db_topquizzes',
      port     : '3306',
    });          
  }

  static getConnection (callback) {
    pool.getConnection(function(err, conn) {
      if (err) throw err;
      else callback(conn);
    });
  }

}

module.exports = DB;