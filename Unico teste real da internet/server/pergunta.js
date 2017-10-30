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
    perguntaService.getAllPerguntas(req, (pergunta)=>{
        res.send(pergunta)
    });
}

function criarPergunta(req, res){
    perguntaService.criarPergunta(req, (pergunta)=>{
        res.send(pergunta)
    });
}

module.exports = router;