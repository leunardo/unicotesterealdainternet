const router = require('express').Router();
const userService = require('./service/userService');

router
    .route('/:id')
        .get(getUser);

//router        
    //.route('/euae')
    //    .get(getCurrentUser);


function getUser(req, res) {
   userService.getUsuario(req.params.id, (user) => {
    res.send(user);
   })
}

module.exports = router;
