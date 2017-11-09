const mysql = require('mysql');
const connectionString = mysql.createConnection({
    host     : 'localhost',
    user     : 'leo',
    password : '123',
    database : 'db_topquizzes'
  });

module.exports = mysql.createConnection(connectionString);
