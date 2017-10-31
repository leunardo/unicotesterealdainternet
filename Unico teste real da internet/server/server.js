const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const user = require('./user');
const quiz = require('./quiz');
const auth = require('./auth');
const busca = require('./busca');
const tag = require('./tag');
const pergunta = require('./pergunta');
const resposta = require('./resposta');
const top3 = require('./top3');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/quizzes', [tag, busca, quiz, pergunta, resposta, top3]);
app.use('/usuarios', user);
app.use('/authenticate', auth.router);


app.listen(5566, () => console.log('conectado'));

module.exports = express;
/**
 * 
 * const express = require('express')();
const port = 9999;

express.get('/', function (req, res) {  
  res.send('Hello World!');

  var auth  = req.get('Authorization');
})

express.listen(port, function () {
  console.log('Example app listening on port ' + port);
})



 */