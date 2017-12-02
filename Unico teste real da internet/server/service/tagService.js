const TagQuery = require('../query/tagQuery');
const DB = require('../factory/dbConnectionFactory')

class TagService {

    constructor(db = new DB()) {
        this._tagQuery = new TagQuery(db.connection);
    }

    getAllTags(callback) {
        this._tagQuery.getAllTags((tags) => callback(tags));
    }

    criarTag(tag, callback) {
        this._tagQuery.criarTag(tag, (result) => callback(result));
    }

    buscarTagsUsuario(idUsuario, callback) {
        this._tagQuery.tagsDoUsuario(idUsuario, (result) => {
            let tags = {};
            for (let tag of result) {
                tags[tag.tag] = tag.n
            }
            callback(tags);
        });
    }

    criarQTag(id_quiz, id_tag, callback) {        
        this._tagQuery.criarQTag(id_quiz, id_tag, (result) => callback(result));
    }

    getQTags(id_quiz, callback) {
        this._tagQuery.getQTags(id_quiz, (QTags) => callback(QTags));
    }
    
}

module.exports = TagService;
