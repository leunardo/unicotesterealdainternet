const Query = require('./query')

class RespostaQuery extends Query {
    
    constructor () { super() }

    criarResposta(resposta, callback){
        let query = 'insert into resposta set ?';
        this.executeQuery(resposta, callback, query);
    }

    getAllRespostas(idPergunta, callback){
        let query = 'select * from resposta where id_pergunta = ?';
        this.executeQuery(idPergunta, callback, query);
    }
    
}

module.exports = RespostaQuery;
