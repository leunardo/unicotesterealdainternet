const router = require('express').Router();
const quizService = require('./service/quizService');

router 
    .route('/busca/:busca/:page')
        .get(buscarQuiz);

function buscarQuiz(req, res){
    quizService.buscarQuiz(req.params.busca, req.params.page, (quizzes)=>{
        res.send(quizzes);
    });
}

module.exports = router;