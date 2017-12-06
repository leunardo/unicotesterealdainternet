const Query = require('./query')

class PerguntaQuery extends Query {

    constructor () { super() }

    getPergunta(idPergunta, idQuiz, callback){
        let query = 'select * from pergunta where nPergunta = ? AND id_quiz = ?';
        this.executeQuery([idPergunta, idQuiz], callback, query);
    }

    criarPergunta(pergunta, callback){
        let query = 'insert into pergunta set ?';
        this.executeQuery(pergunta, callback, query);
    }

    getAllPerguntas(idQuiz, callback){
        let query = 'select * from pergunta where id_quiz = ?';
        this.executeQuery(idQuiz, callback, query);
    }
}

module.exports = PerguntaQuery;
