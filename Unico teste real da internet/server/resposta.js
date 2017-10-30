const router = require('express').Router();
const respostaService = require('./service/respostaService');

router
    .route('/')
        .get(getAllRespostas)
        .put(criarResposta)

function getAllRespostas(req, res){
    respostaService.getAllRespostas(req, (respostas)=>{
        res.send(respostas)
    });
}

function criarResposta(req, res){
    respostaService.criarResposta(req, (result)=>{
        res.send(result)
    });
}

module.exports = router;