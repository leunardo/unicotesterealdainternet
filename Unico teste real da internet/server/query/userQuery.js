const query = {};
let connection;

query.userQuery = function userQuery(conn) {
    connection = conn;
}

query.getUsuarioPorId = function getUsuarioPorId(id, callback) {
    var query = 'select * from usuario where id_usuario = ?';
    executeQuery(id, callback, query);
}

query.getUsuarios = function getUsuarios(callback){
    var query = 'select * from usuario';
    executeQuery(null, callback, query);
}

query.criarUsuario = function criarUsuario(user, callback){
    var query = 'insert into usuario set ?';
    executeQuery(user, callback, query);
}

query.atualizarUsuario = function atualizarUsuario(nome, foto, descricao, id, callback){
    var query = 'update usuario set nome = ?, url_foto = ?, descricao = ? where id_usuario = ?';
    executeQuery([nome, foto, descricao, id], callback, query);
}

query.usuarioJaCadastrado = function usuarioJaCadastrado(gid, callback){
    var query = 'select * from usuario where id_google = ?';
    executeQuery(gid, callback, query);
}

query.amigosDosAmigos = function amigosDosAmigos(idUsuario, callback) {
    var query = `select id_usuario2 from friendship where id_usuario in 
                    (select id_usuario2 where id_usuario = ?) and pendente = 0;`;
    executeQuery(idUsuario, callback, query);
}

query.amigos = function amigos(idUsuario,callback) {
    var query = 'select id_usuario2 from friendship where id_usuario = ? and pendente = 0';
    executeQuery(idUsuario, callback, query);    
}

function executeQuery(obj, callback, query) {
    connection.query(query, obj, (err, result) => {
        if (err) throw err;
        else callback(result);
    })
}

module.exports = query;