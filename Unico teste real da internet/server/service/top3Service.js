const top3Query = require('../query/top3Query');
const openConnection = require('../factory/dbConnectionFactory');
const auth = require('../auth');
const service = {};

service.top3Service = function top3Service() {
    let db = openConnection();
    top3Query.top3Query(db);
}

service.getTop3 = function getTop3(callback){
    top3Query.getTop3((top3)=>callback(top3));
}

service.insertTop3 = function insertTop3(user, callback){
    top3Query.insertTop3(user, (newTop3)=>callback(newTop3));
}

module.exports = service;