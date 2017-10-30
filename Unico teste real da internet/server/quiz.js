const router = require('express').Router();
const quizService = require('./service/quizService');

router
    .route('/:id')
        .get(getQuizPorId)
router
    .route('/?user_:idUsuario&page_:nPagina')
        .get(getQuizzesDoUsuario)
router 
    .route('/')
        .get(getAllQuizzes)
        .post(criarQuiz)
router 
    .route('/?:busca&page_:nPagina')
        .get(buscarQuiz)
router
    .route('/?tags_:tag&page_:nPagina')
        .get(buscarQuizPorTag)
router
    .route('/?page_:nPagina')
        .get(getQuizzesDaPagina)

function getQuizPorId(req, res) {
    userService.getQuizPorId(req.params.id, (quiz) => {
        res.send(quiz);
    })
}

function getQuizzesDoUsuario(req, res) {
    userService.getQuizzesDoUsuario(req.params.idUsuario, req.body.nPagina, (quizzes) => {
        res.send(quizzes);
    })
}

function getAllQuizzes(req, res) {
    userService.getAllQuizzes((quizzes) => {
        res.send(quizzes);
    })
}

function criarQuiz(req, res) {
    userService.criarQuiz(req.body.quiz, (response) => {
        res.send(response);
    })
}

function buscarQuiz(req, res) {
    userService.buscarQuiz(req.body.busca, req.body.nPagina, (quizzes) => {
        res.send(quizzes);
    })
}

function buscarQuizPorTag(req, res) {
    userService.buscarQuizPorTag(req.body.tag, req.body.nPagina, (quizzes) => {
        res.send(quizzes);
    })
}

function getQuizzesDaPagina(req, res) {
    userService.getQuizzesDaPagina(req.body.nPagina, (quizzes) => {
        res.send(quizzes);
    });
}
