const query = {};
let connection;

query.tagQuery = function tagQuery(conn) {
    connection = conn;
}

query.getAllTags = function getAllTags(callback){
    var query = 'select * from tag';
    executeQuery(null, callback, query);
}

query.criarTag = function criarTag(tag, callback){
    var query = 'insert into tag set ?';
    executeQuery(tag, callback, query);
}

query.tagsDoUsuario = function tagsDoUsuario(idUsuario, callback) {
    var query = `Select t.tag, count(t.id_tag) n from quiz q 
                    inner join usuario u on u.id_usuario = q.id_usuario
                    inner join quiztags qt on qt.id_quiz = q.id_quiz
                    inner join tag t on t.id_tag = qt.id_tag
                    where u.id_usuario = ?
                    group by t.id_tag;`;

    let resultado = executeQuery(idUsuario, callback, query);
    return resultado;

}

query.dispose = () => { connection.end() };

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
    connection.end();
}

module.exports = query;