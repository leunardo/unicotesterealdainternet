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
        .post(criarTag);
router
    .route('/QTags/')
        .post(criarQTag);
router 
    .route('/QTags/:idquiz')
        .get(getQTags);
router
    .route('/tag/:tag')
        .get(getTag);
router
    .route('/tag/usuario/:id')
        .get(getTagsUsuario)

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

function getTag(req, res){
    tagService.getTag(req.params.tag, (tagId) => {
        res.send(tagId)
    });
}

function criarTag(req, res){
    tagService.criarTag(req.body, (result)=>{
        res.send(result);
    });
}

function getQTags(req, res){
    tagService.getQTags(req.params.idquiz, (tags)=>{
        res.send(tags);
    })
}

function criarQTag(req, res){ 
    tagService.criarQTag(req.body, (result)=>{ 
        res.send(result); 
    });
}

function getTagsUsuario(req, res) {
    tagService.buscarTagsUsuario(req.params.id, (dados) => {
        res.send(dados);
    })
}

module.exports = router;