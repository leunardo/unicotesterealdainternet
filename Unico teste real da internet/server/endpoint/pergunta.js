const router = require('express').Router();
const PerguntaService = require('../service/perguntaService');
const perguntaService = new PerguntaService();

router
    .route('/:id_quiz/perguntas/:nPergunta')
        .get(getPergunta)
router
    .route('/:id_quiz/perguntas')
        .get(getAllPerguntas)
        .post(criarPergunta)

function getPergunta(req, res){
    perguntaService.getPergunta(req.params.nPergunta, req.params.id_quiz, (pergunta)=>{
        res.send(pergunta)
    });
}

function getAllPerguntas(req, res){
    perguntaService.getAllPerguntas(req.params.id_quiz, (perguntas)=>{
        res.send(perguntas)
    });
}

function criarPergunta(req, res){
    perguntaService.criarPergunta(req.body, (result)=>{
        res.send(result)
    });
}

module.exports = router;