const router = require('express').Router();
const QuizService = require('../service/quizService');
const TagService = require('../service/tagService');
const quizService = new QuizService();
const tagService = new TagService();


router
    .route('/tag/:tag/:page')
        .get(buscarQuizPorTag);
router
    .route('/tag/')
        .get(getAllTags)
        .put(criarTag);

function buscarQuizPorTag(req, res){
    quizService.buscarQuizPorTag(req.params.tag, req.params.page, (quizzes)=>{
        res.send(quizzes);
    })
}

function getAllTags(req, res){
    tagService.getAllTags((tags)=>{
        res.send(tags);
    });
}

function criarTag(req, res){
    tagService.criarTag(req.body.tag, (result)=>{
        res.send(result);
    });
}

module.exports = router;