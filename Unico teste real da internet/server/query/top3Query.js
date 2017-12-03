const Query = require('./query');

class Top3Query extends Query {

    constructor () { super() }

    getTop3(id_quiz, callback){
        let query = 'select * from top3 where id_quiz = ?';
        this.executeQuery(id_quiz, callback, query);
    }

    insertTop3(user, callback){
        let query = 'insert into top3 set ? where id_quiz = ?'
        this.executeQuery([user, user.id_quiz], callback, query);
    }
}

module.exports = Top3Query;
