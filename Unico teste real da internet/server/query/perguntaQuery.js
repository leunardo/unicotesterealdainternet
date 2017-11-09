const query = {};
let connection;

query.perguntaQuery = function perguntaQuery(conn) { 
    connection = conn;
}

query.getPergunta = function getPergunta(idPergunta, callback){
    var query = 'select * from pergunta where id_pergunta = ?';
    executeQuery(idPergunta, callback, query);
}

query.criarPergunta = function criarPergunta(pergunta, callback){
    var query = 'insert into pergunta set ?';
    executeQuery(pergunta, callback, query);
}

query.getAllPerguntas = function getAllPerguntas(idQuiz, callback){
    var query = 'select * from pergunta where id_quiz = ?';
    executeQuery(idQuiz, callback, query);
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;