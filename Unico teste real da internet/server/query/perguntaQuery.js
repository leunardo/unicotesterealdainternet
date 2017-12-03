const Query = require('./query')

class PerguntaQuery extends Query {

    constructor () { super() }

    getPergunta(idPergunta, callback){
        let query = 'select * from pergunta where id_pergunta = ?';
        this.executeQuery(idPergunta, callback, query);
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
