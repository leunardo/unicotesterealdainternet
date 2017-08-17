var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://user:pMvutHTGrzecqdQ1@dev-topteste-shard-00-00-gyr9r.mongodb.net:27017,dev-topteste-shard-00-01-gyr9r.mongodb.net:27017,dev-topteste-shard-00-02-gyr9r.mongodb.net:27017/user?ssl=true&replicaSet=dev-topteste-shard-0&authSource=admin";

MongoClient.connect(uri, function(err, db) {
  
  /* comandos basicos de insert
  db.collection('inventory').insertOne({"batata": 123});
  db.collection('inventory').insertMany([
    {"batata": 789}, 
    {"batata": 456}]);
  */

  // select buscando tudo do banco
  db.collection('inventory')
    .find({})
    .toArray((err, res) => {
      if(err != undefined)
        throw err;
      else
        console.log(res);
  });

  db.close(); // dispose
});
