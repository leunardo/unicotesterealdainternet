const router = require('express').Router();
const Top3Service = require('../service/top3Service');
const top3Service = new Top3Service();

router
    .route(':id_quiz/top3')
        .get(getTop3)
        .put(insertTop3);

function getTop3(req, res){
    top3Service.getTop3(req.params.id_quiz, (top3)=>res.send(top3));
}

function insertTop3(req, res){
    top3Service.insertTop3(req.body.user, (result)=>res.send(result));
}

module.exports = router;