const TagQuery = require('../query/tagQuery');
const DB = require('../factory/dbConnectionFactory')

class TagService {

    constructor() {
        this._tagQuery = new TagQuery();
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

    criarQTag(qtag, callback) {        
        this._tagQuery.criarQTag(qtag, (result) => callback(result));
    }

    getQTags(id_quiz, callback) {
        this._tagQuery.getQTags(id_quiz, (QTags) => callback(QTags));
    }

    getTag(tag, callback) {
        this._tagQuery.getTag(tag, (tagId) => callback(tagId));
    }
    
}

module.exports = TagService;
