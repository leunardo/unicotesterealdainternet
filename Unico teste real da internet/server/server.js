const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const user = require('./user');
const auth = require('./auth');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/usuarios', user);
app.use('/authenticate', auth);


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