const router = require('express').Router();
const RespostaService = require('../service/respostaService');
const respostaService = new RespostaService();
router
    .route('/:id_quiz/perguntas/:id_pergunta/respostas')
        .get(getAllRespostas)
        .post(criarResposta)

function getAllRespostas(req, res){
    respostaService.getAllRespostas(req.params.id_pergunta, (respostas)=>{
        res.send(respostas)
    });
}

function criarResposta(req, res){
    respostaService.criarResposta(req.body, (result)=>{
        res.send(result)
    });
}

module.exports = router;