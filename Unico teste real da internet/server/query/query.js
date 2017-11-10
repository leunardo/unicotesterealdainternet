class Query {
    constructor(connection) {
        this._connection = connection;
    }

    executeQuery(obj, callback, query) {
        this._connection.query(query, obj, (err, result) => {
            if (err) throw err;
            else callback(result);
        })
    }
}

module.exports = Query;