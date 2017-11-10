const RespostaQuery = require('../query/respostaQuery');
const DB = require('../factory/dbConnectionFactory')

class RespostaService {

    constructor(db = new DB()) {
        this._respostaQuery = new RespostaQuery(db.connection);
    }

    getAllRespostas(idPergunta, callback){
        this._respostaQuery.getAllRespostas(idPergunta, (result) => callback(result));
    }

    criarResposta(resposta, callback){
        this._respostaQuery.criarResposta(resposta, (result) => callback(result));
    }    
    
}

module.exports = RespostaService;
