const query = {};
let connection;

query.top3Query = function top3Query(conn) {
    connection = conn;
}

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