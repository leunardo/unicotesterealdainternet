const express = require('express')();
const port = 9999;

express.get('/', function (req, res) {
  res.send('Hello World!');
})

express.listen(port, function () {
  console.log('Example app listening on port ' + 9999);
})