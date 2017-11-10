const mysql = require('mysql');
/**
 * Classe base que faz chamadas ao banco de dados.
 */
class Query {

    constructor(connection) {
        this._connection = connection;
    }

    /**
     * Executa uma query e retorna o obtido por callback.
     * 
     * @param {Array} obj: parametros da query
     * @param {*} callback: callback a ser executada caso não haja erro. 
     * @param {*} query: query a ser executada. 
     */
    executeQuery(obj, callback, query) {
        this._connection.query(query, obj, (err, result) => {
            if (err) throw err;
            else callback(result);
        })
    }
}

module.exports = Query;
