const DB = require('../factory/dbConnectionFactory')
const UserQuery = require('../query/userQuery');
const auth = require('../endpoint/auth');

class UserService {
    constructor(db = new DB()) {
        this._userQuery = new UserQuery(db.connection);
    }

    getUsuarioPorId(id, callback) {
        this._userQuery.getUsuarioPorId(id, (result) => callback(result));
    }

    getUsuarios(callback) {
        this._userQuery.getUsuarios((result) => callback(result));
    }

    criarUsuario(user, callback) {
        this._userQuery.criarUsuario(user, (result) => callback(result));
    };

    updateUsuario(user, token, id, callback){
        auth.authenticate(token, (payload) => {
            if (user.id_google == payload['sub'])    
                this._userQuery.atualizarUsuario
                    (user.nome, user.url_foto, user.descricao, id, 
                        (result) => callback(result));
        })
    }

    usuarioJaCadastrado(gid, callback){
        this._userQuery.usuarioJaCadastrado(gid, (result) => callback(result));
    }

    sugestaoAmigos(idUsuario, callback) {
        this._userQuery.amigosDosAmigos(idUsuario, (result) => {
            let usuarios = [];
            for (let usuario of result) {
                usuarios.push(usuario.id_usuario2);
            }
            callback(usuarios);
        })  
    }   

    amigos(idUsuario, callback) {
        this._userQuery.amigos(idUsuario, (result) => {
            let usuarios = [];
            for (let usuario of result) {
                usuarios.push(usuario.id_usuario2);
            }    
            callback(usuarios);
        });
    }

}
module.exports = UserService;
