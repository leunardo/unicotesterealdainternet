const tagQuery = require('../query/tagQuery');
const openConnection = require('../factory/dbConnectionFactory')
const service = {};

service.tagService = function tagService {
    let db = openConnection();
    tagQuery.tagQuery(db);
}

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

service.buscarTagsUsuario = function(idUsuario, callback) {
    tagQuery.tagsDoUsuario(idUsuario, (result) => {
        let tags = {};
        for (let tag of result) {
            tags[tag.tag] = tag.n
        }
        callback(tags);
    });
}

service.dispose = tagQuery.dispose;

module.exports = service;