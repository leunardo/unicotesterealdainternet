const Query = require('./query')

class UserQuery extends Query {
    
    constructor (connection) {
        super(connection);
    }

    getUsuarioPorId(id, callback) {
        let query = 'select * from usuario where id_usuario = ?';
        this.executeQuery(id, callback, query);
    }

    getUsuarios(callback){
        let query = 'select * from usuario';
        this.executeQuery(null, callback, query);
    }

    criarUsuario(user, callback){
        let query = 'insert into usuario set ?';
        this.executeQuery(user, callback, query);
    }

    atualizarUsuario(nome, foto, descricao, id, callback){
        let query = 'update usuario set nome = ?, url_foto = ?, descricao = ? where id_usuario = ?';
        this.executeQuery([nome, foto, descricao, id], callback, query);
    }

    usuarioJaCadastrado(gid, callback){
        let query = 'select * from usuario where id_google = ?';
        this.executeQuery(gid, callback, query);
    }

    amigosDosAmigos(idUsuario, callback) {
        let query = `select distinct id_usuario2 from friendship where id_usuario in
                            (select id_usuario2 from friendship 
                                    where id_usuario = 12 and pendente = 0)
                        and id_usuario2 not in (select id_usuario2 from friendship 
                            where id_usuario = 12 and pendente = 0)
                        and pendente = 0
                        and id_usuario <> 12
                        and id_usuario2 <> 12;`;
        this.executeQuery([idUsuario, idUsuario], callback, query);
    }

    amigos(idUsuario,callback) {
        let query = 'select id_usuario2 from friendship where id_usuario = ? and pendente = 0';
        this.executeQuery(idUsuario, callback, query);    
    }   
}

module.exports = UserQuery;
