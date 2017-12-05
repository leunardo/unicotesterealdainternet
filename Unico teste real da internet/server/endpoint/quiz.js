const router = require('express').Router();
const QuizService = require('../service/quizService');
const quizService = new QuizService();
router
    .route('/:id')
        .get(getQuizPorId)
        .post(usuarioRespondeu);
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
router
    .route('/:id/usuarios')
        .get(usuariosQueResponderam);



function usuariosQueResponderam(req, res) {
    quizService.usuariosQueResponderam(req.params.id, (usuarios) => {
        res.send(usuarios);
    })
}

function usuarioRespondeu(req, res) {
    quizService.usuarioRespondeu(req.body, req.params.id, (resposta) => {
        res.send(resposta);
    })
}

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
    quizService.criarQuiz(req.body, (response) => {
        res.send(response);
    })
}

function getQuizzesDaPagina(req, res) {
    quizService.getQuizzesDaPagina(req.params.page, (quizzes) => {
        res.send(quizzes);
    });
}

module.exports = router;
