const router = require('express').Router();
const perguntaService = require('./service/perguntaService');

router
    .route('/:id')
        .get(getPergunta)
router
    .route('/')
        .get(getAllPerguntas)
        .put(criarPergunta)

function getPergunta(req, res){
    perguntaService.getPergunta(req, (pergunta)=>{
        res.send(pergunta)
    });
}

function getAllPerguntas(req, res){
    perguntaService.getAllPerguntas(req, (perguntas)=>{
        res.send(perguntas)
    });
}

function criarPergunta(req, res){
    perguntaService.criarPergunta(req, (result)=>{
        res.send(result)
    });
}

module.exports = router;