const router = require('express').Router();
const quizService = require('./service/quizService');

router
    .route('/:id')
        .get(getQuizPorId);
router
    .route('/user/:userid/:page')
        .get(getQuizzesDoUsuario);
router 
    .route('/')
        .get(getAllQuizzes)
        .post(criarQuiz);
router
    .route('/pagina/:page')
        .get(getQuizzesDaPagina);



function getQuizPorId(req, res) {
    quizService.getQuizPorId(req.params.id, (quiz) => {
        res.send(quiz);
    })
}

function getQuizzesDoUsuario(req, res) {
    quizService.getQuizzesDoUsuario(req.params.userid, req.params.page, (quizzes) => {
        res.send(quizzes);
    })
}

function getAllQuizzes(req, res) {
    quizService.getAllQuizzes((quizzes) => {
        res.send(quizzes);
    })
}

function criarQuiz(req, res) {
    quizService.criarQuiz(req.body.quiz, (response) => {
        res.send(response);
    })
}

function buscarQuiz(req, res) {
    console.log('AAAAAA')
    quizService.buscarQuiz(req.query.busca, req.query.page, (quizzes) => {
        res.send(quizzes);
    })
}

function buscarQuizPorTag(req, res) {
    quizService.buscarQuizPorTag(req.query.tag, req.query.page, (quizzes) => {
        res.send(quizzes);
    })
}

function getQuizzesDaPagina(req, res) {
    quizService.getQuizzesDaPagina(req.params.page, (quizzes) => {
        res.send(quizzes);
    });
}

module.exports = router;
