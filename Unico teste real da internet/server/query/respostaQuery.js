const query = {};
let connection;

query.respostaQuery = function respostaQuery(conn) {
    connection = conn;
}

query.criarResposta = function criarResposta(resposta, callback){
    var query = 'insert into resposta set ?';
    executeQuery(resposta, callback, query);
}

query.getAllRespostas = function getAllRespostas(idPergunta, callback){
    var query = 'select * from resposta where id_pergunta = ?';
    executeQuery(idPergunta, callback, query);
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;