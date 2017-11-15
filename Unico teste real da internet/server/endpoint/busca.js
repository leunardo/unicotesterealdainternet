const router = require('express').Router();
const QuizService = require('../service/quizService');
const quizService = new QuizService();


router 
    .route('/busca/:busca/:page')
        .get(buscarQuiz);

function buscarQuiz(req, res){
    console.log(req.params);
    quizService.buscarQuiz(req.params.busca, req.params.page, (quizzes)=>{
        res.send(quizzes);
    });
}

module.exports = router;