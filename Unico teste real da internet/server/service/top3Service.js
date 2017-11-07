const top3Query = require('../query/top3Query');
const service = {};

service.getTop3 = function getTop3(callback){
    top3Query.getTop3((top3)=>callback(top3));
}

service.insertTop3 = function insertTop3(user, callback){
    top3Query.insertTop3(user, (newTop3)=>callback(newTop3));
}

module.exports = service;