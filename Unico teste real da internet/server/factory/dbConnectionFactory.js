const mysql = require('mysql');
const connectionString = {
    host     : 'localhost',
    user     : 'leo',
    password : '123',
    database : 'db_topquizzes'
  };

class DB {
  constructor () {
    this._connection = mysql.createConnection(connectionString);
  }

  get connection () {
    if (this._connection || this._connection.state === 'disconnected')
      this._connection = mysql.createConnection(connectionString);
    
    return this._connection;
  }

  dispose () {
    this._connection.end();
  }
}

module.exports = DB;