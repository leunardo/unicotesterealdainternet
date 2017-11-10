const Top3Query = require('../query/top3Query');
const DB = require('../factory/dbConnectionFactory');

class Top3Service {

    constructor(db = new DB()) {
        this._top3Query = new Top3Query(db.connection);
    }

    getTop3(callback){
        this._top3Query.getTop3((top3) => callback(top3));
    }

    insertTop3(user, callback){
        this._top3Query.insertTop3(user, (newTop3) => callback(newTop3));
    }    

}

module.exports = Top3Service;
