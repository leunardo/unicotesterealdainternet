const Query = require('./query');

class TagQuery extends Query {

    constructor (connection) {
        super(connection);
    }

    getAllTags(callback){
        let query = 'select * from tag';
        this.executeQuery(null, callback, query);
    }

    criarTag(tag, callback){
        let query = 'insert into tag set ?';
        this.executeQuery(tag, callback, query);
    }

    tagsDoUsuario(idUsuario, callback) {
        let query = `Select t.tag, count(t.id_tag) n from quiz q 
                        inner join usuario u on u.id_usuario = q.id_usuario
                        inner join quiztags qt on qt.id_quiz = q.id_quiz
                        inner join tag t on t.id_tag = qt.id_tag
                        where u.id_usuario = ?
                        group by t.id_tag;`;
    
        this.executeQuery(idUsuario, callback, query);   
    }
    
    getQTags(id_quiz, callback){
        let query = `select * from quiztags where id_quiz = ?`;
        this.executeQuery(id_quiz, callback, query);
    }

    criarQTag(id_quiz, id_tag, callback){
        let qtag = {
            'id_quiz': id_quiz,
            'id_tag': id_tag
        }
        let query = `inser into quiztags set ?`;
        this.executeQuery(qtag, callback, query);
    }
    
}

module.exports = TagQuery;
