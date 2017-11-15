const mysql = require('mysql');
const connectionString = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_topquizzes'
  };

/**
 * Classe que conecta-se ao banco de dados e gerencia sua conexão.
 */
class DB {
  constructor () {
    this._connection = mysql.createConnection(connectionString);
  }

  get connection () {
    if (this._connection || this._connection.state === 'disconnected')
      this._connection = mysql.createConnection(connectionString);
    
    return this._connection;
  }

  /**
   * Fecha a conexão com o banco. Cuidado que isso poderá causar erro caso
   * exista querys para serem executadas na fila.
   */
  dispose () {
    this._connection.end((err) => { if (err) console.log(err) });
  }
}

module.exports = DB;