const tagQuery = require('../query/tagQuery');
const auth = require('../auth');
const service = {};

service.getAllTags = function getAllTags(callback){
    tagQuery.getAllTags((tags)=>{
        callback(tags);
    });
}
service.criarTag = function criarTag(tag, callback){
    tagQuery.criarTag(tag, (result)=>{
        callback(result);
    });
}

module.exports = service;