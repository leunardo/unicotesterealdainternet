const router = require('express').Router();
const perguntaService = require('./service/perguntaService');

router
    .route('/:id_quiz/perguntas/:id_pergunta')
        .get(getPergunta)
router
    .route('/:id_quiz/perguntas')
        .get(getAllPerguntas)
        .put(criarPergunta)

function getPergunta(req, res){
    perguntaService.getPergunta(req.params.id_pergunta, (pergunta)=>{
        res.send(pergunta)
    });
}

function getAllPerguntas(req, res){
    perguntaService.getAllPerguntas(req.params.id_quiz, (perguntas)=>{
        res.send(perguntas)
    });
}

function criarPergunta(req, res){
    perguntaService.criarPergunta(req.body.pergunta, (result)=>{
        res.send(result)
    });
}

module.exports = router;