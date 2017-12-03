const mysql = require('mysql');
const DB = require('../factory/dbConnectionFactory')
/**
 * Classe base que faz chamadas ao banco de dados.
 */
class Query {

    constructor() { }

    /**
     * Executa uma query e retorna o obtido por callback.
     * 
     * @param {Array} obj: parametros da query
     * @param {*} callback: callback a ser executada caso não haja erro. 
     * @param {*} query: query a ser executada. 
     */
    executeQuery(obj, callback, query) {
        DB.getConnection(conn => {
            conn.query(query, obj, (err, result) => {
                if (err) throw err;
                else {
                    console.log('QUERY | conectado como: ', conn.threadId, ' ', query)
                    conn.release();
                    callback(result);
                }
            })
        })
    }
    
}

module.exports = Query;
