'use strict'
const gauth = require('google-auth-library');
const router = require('express').Router();
const CLIENT_ID = '24339375695-sngstbgelv3cpvvgs96ndoa6n472u3n4.apps.googleusercontent.com';

router
    .route('/')
        .post(authenticate);


function authenticate(req, res) {
    let idtoken = req.body.idtoken;
    verifyIdToken(idtoken, callback);
    
    function callback(err, login) {
        if(err) 
            res.status(500).send(err.message);
        else {
            let payload = login.getPayload();
            res.send({ "message": "Success", "data": payload});   
        }
            
    }
}

function verifyIdToken(idtoken, callback) {
    let auth = new gauth;
    let client = new auth.OAuth2(CLIENT_ID, '', '');
    client.verifyIdToken(
        idtoken,
        CLIENT_ID,
        callback
    );
}

module.exports = router;