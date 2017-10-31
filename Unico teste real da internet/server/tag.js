const router = require('express').Router();
const quizService = require('./service/quizService');

router
    .route('/tag/:tag/:page')
        .get(buscarQuizPorTag);

function buscarQuizPorTag(req, res){
    quizService.buscarQuizPorTag(req.params.tag, req.params.page, (quizzes)=>{
        res.send(quizzes);
    })
}

module.exports = router;