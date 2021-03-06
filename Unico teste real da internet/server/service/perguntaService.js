const PerguntaQuery = require('../query/perguntaQuery');

class perguntaService {
    constructor() {
        this._perguntaQuery = new PerguntaQuery();
    }

    getPergunta(idPergunta, idQuiz, callback){
        this._perguntaQuery.getPergunta(idPergunta, idQuiz, (result) => callback(result))
    }

    getAllPerguntas(idQuiz, callback){
        this._perguntaQuery.getAllPerguntas(idQuiz, (result) => callback(result));
    }

    criarPergunta(pergunta, callback){
        this._perguntaQuery.criarPergunta(pergunta, (result) => callback(result));
    }
}

module.exports = perguntaService;
